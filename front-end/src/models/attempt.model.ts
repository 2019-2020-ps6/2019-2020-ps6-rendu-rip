import { Answer } from './answer.model';

export interface Attempt {
    id?: string;
    date?: Date;
    quizId: string;
    userId: string;
    timeOuts?: number;
    wrongAnswers?: Answer[];
}