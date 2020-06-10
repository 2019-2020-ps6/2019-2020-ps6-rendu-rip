import { Answer } from './answer.model';
import { Question } from './question.model';
import { Quiz } from './quiz.model';

export interface Attempt {
    id?: string,
    playerId: string,
    quiz: Quiz,
    date?: Date,
    timeOuts?: number,
    wrongAnswers?: Answer[]
}