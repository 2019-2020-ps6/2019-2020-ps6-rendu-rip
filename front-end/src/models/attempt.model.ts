import { Answer } from './answer.model';
import { Question } from './question.model';
import { Quiz } from './quiz.model';

export interface Attempt {
    id?: string;
    date?: Date;
    quizId: string;
    playerId: string;
    timeOuts?: number;
    quiz?: Quiz;
    questions?: Question[];
    wrongAnswers?: Answer[];
}