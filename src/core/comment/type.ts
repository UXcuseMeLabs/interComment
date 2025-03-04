

export interface Comment {
    id?: string;
    comment: string;
    user_id: string;
    username: string;
    votes?: Vote[];
    board_id: string;
    createdAt: string
}

export interface Vote {
    id?: string;
    comment_id: string;
    user_id: string;
    value: boolean;
}