import { Answer } from './answer.model';
import { Img } from './image.model';

export interface Question {
    id: string;
    label: string;
    answers: Answer[];
    quizId?: string;
    imageId?: string;
    image?: Img;
}
