import { Img } from './image.model';

export interface Answer {
    id?:string;//why '?'
    type?: string;//type???
    value: string;
    isCorrect: boolean;
    questionId?: string;
    imageId?: string;
    image?: Img;
}
