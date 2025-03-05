import { Board, BoardInput } from "../type";

export const getBoardByTwichId = async (id: string) => {
    console.log(`${process.env.NEXT_PUBLIC_API_URL}/board/${id}`)
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/board/${id}`, { cache: 'no-store' });
    console.log(response.status);
    if (!response.ok) throw new Error('Error fetching board');
    const board: Board  = await response.json();
    return board;
}

export const createBoard = async (board: BoardInput) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL ?? process.env.API_URL}/board`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(board)
    });
    if (!response.ok) throw new Error('Error creating board');
    const newBoard: Board = await response.json();
    return newBoard;
}