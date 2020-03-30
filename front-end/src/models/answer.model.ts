export interface Answer {
    id?:string;//why '?'
    type?: string;//type???
    value: string;
    isCorrect: boolean;
    imageId?: string;
}
