
import { Comment } from '../comment/type';

export interface Board {
    id: string;
    name: string;
    interComments: Comment[];
    isLocked: boolean;
    background: string;
    links: string[];
    theme: Theme;
}

export interface BoardInput {
    name: string;
    isLocked: boolean;
    background: string;
    theme_id : string;
    user_id : string;
}


interface Theme {
    id: string;
    name: string;
    color: string;
}