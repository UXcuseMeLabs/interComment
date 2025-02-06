import { Comment, Vote } from "../type";


export const createComment = async (comment: Comment) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/interComment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(comment),
  });
  if (!response.ok) {
    throw new Error("Failed to create comment");
  }
  const data = await response.json();
  return data;
}

export const  getUserByTwitchId = async (twitchId: string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/${twitchId}`);
    if (!response.ok) throw new Error('Error fetching user birthday');
    const user = await response.json();
    return user;
}

export const createUser = async (twitchId: string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ twitch_id: twitchId })
    });
    console.log(JSON.stringify(response));
    if (!response.ok) throw new Error('Error creating user');
    const user = await response.json();
    return user;
}

export const getComments = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/interComment`, { cache: 'no-store' });
    if (!response.ok) throw new Error('Error fetching comments');
    const comments = await response.json();
    return comments;
}

export const upVote = async (vote: Vote) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/vote`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(vote),
        cache: 'no-store'

    });
    if (!response.ok) throw new Error('Error upvoting comment');
    const comment = await response.json();
    return comment;
}