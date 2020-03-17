import { Quiz } from '../models/quiz.model';
import { Question } from '../models/question.model';

 export const QUESTION_ACTOR: Question = {
     label: 'Jean Gabin a joué dans...',
     answers: [
         {
             value: 'Les tuches II',
             isCorrect: false,
         },
         {
             value: 'La grande illusion',
             isCorrect: true,
         }
     ],
     id : '0'
 };

export const QUESTION_SPORT: Question = {
    label: 'Qui est l\'homme le plus rapide',
    answers: [
        {
            value: 'Usain Bolt',
            isCorrect: false,
        },
        {
            value: 'Les Tuches',
            isCorrect: true,
        }
    ],
    id : '0' 
};

export const QUIZ_LIST: Quiz[] = [
    {
        name: 'Acteurs', // What's happening if I change this value..?
        theme: 'Actor',
        questions: [QUESTION_ACTOR],
        id: '0',
    },
    {
        name: 'Sportifs',
        theme: 'Sport',
        questions: [QUESTION_SPORT],
        id: '1',
    }
];
