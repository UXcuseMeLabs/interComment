'use client';
import { useEffect, useState } from "react";
import { exchangeCode, RefreshingAuthProvider } from "@twurple/auth";
import { ApiClient } from "@twurple/api";
import Cookies from "universal-cookie";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/userProvider";
import { createUser } from "@/core/comment/service/commentService";

interface IUserTwitch {
    code?: string;
}

export const useTwitch = ({ code }: IUserTwitch) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const {handleUser} = useUser();
    const [error, setError] = useState<Error | null>(null);
    const router = useRouter()


    const logout = () => {
        const cookies = new Cookies();
        cookies.remove("interComments");
        setIsLoggedIn(false);
        handleUser(null);
    };

    const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID ?? "";
    const CLIENT_SECRET = process.env.NEXT_PUBLIC_CLIENT_SECRET ?? "";
    const redirectUri = process.env.NODE_ENV === 'development' ? 'https://localhost:3000' : 'https://intercomments.vercel.app';

    const loginTwitchUrl = `https://id.twitch.tv/oauth2/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${redirectUri}`;

    const authRefreshFn = async (code: string) => {
        try {
            const authProvider = new RefreshingAuthProvider({
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
            });

            const tokenData = await exchangeCode(CLIENT_ID, CLIENT_SECRET, code, redirectUri);
            const userId = await authProvider.addUserForToken(tokenData, ["chat"]);

            return {
                authProvider,
                userId,
                tokenData,
            };
        } catch (err) {
            throw new Error(`Authentication failed: ${err}`);
        }
    };

    useEffect(() => {
        const authenticate = async () => {
            setIsLoading(true);
            try {
                const cookies = new Cookies();
                const userCookies = cookies.get("interComments");

                // Check if user data exists in cookies
                if (userCookies) {
                    const authProvider = new RefreshingAuthProvider({
                        clientId: CLIENT_ID,
                        clientSecret: CLIENT_SECRET,
                    });
                    await authProvider.addUserForToken(userCookies.accessToken, ["chat"]);
                    const apiClient = new ApiClient({ authProvider });

                    const user = await apiClient.users.getUserById(userCookies.userId);
                    handleUser(user);
                    setIsLoggedIn(true);
                    return;
                }

                // Proceed with Twitch authentication if no cookie is found
                if (code && code.length > 0) {
                    const { userId, authProvider, tokenData } = await authRefreshFn(code);
                    const apiClient = new ApiClient({ authProvider });

                    const user = await apiClient.users.getUserById(userId);
                    cookies.set("interComments", JSON.stringify({ userId, accessToken: tokenData }), { path: "/" });
                    
                    handleUser(user);
                    await createUser(userId, user!.displayName);
                    setIsLoggedIn(true);
                    router.replace('/')
                }   
            } catch (err) {
                setError(err as Error);
                console.error("Error during Twitch authentication:", err);
            } finally {
                setIsLoading(false);
            }
        };

        authenticate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [code]);

    return {
        loginTwitchUrl,
        isLoggedIn,
        isLoading,
        error,
        logout,
    };
};
