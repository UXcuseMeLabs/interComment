import { HelixUser } from "@twurple/api"

interface IProfileAvatar {
    user: HelixUser;
    onLogout?: () => void;
}

export const ProfileAvatar = ({ user, onLogout }: IProfileAvatar) => {
  return (
    <div className="flex items-center text-paragraph">
        <img className="size-14" src={user.profilePictureUrl} alt={user.displayName} />
        <div className="flex flex-col ml-2">
        <span className="font-semibold">{user.displayName}</span>
        <button onClick={() => onLogout && onLogout()} className="text-sky-500 flex font-medium">
        Salir
        </button>
        </div>
    </div>
  )
}
