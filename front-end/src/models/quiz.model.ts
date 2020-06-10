import { Question } from './question.model';
import { Theme } from './theme.model';
import { Img } from './image.model';

export interface Quiz {
    id: string;
    name: string;
    theme?: string;
    questions?: Question[];
    creationDate?: Date;
    imageId?: string;
    random?: boolean;
    image?: Img;
}
