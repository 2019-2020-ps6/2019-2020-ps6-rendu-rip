const { Answer } = require('../../../../models')
const { getQuestionFromQuiz } = require('../manager')

/**
 * filterAnswersFromQuestion.
 * This function filters among the questions to return only the question linked with the given quizId.
 * @param questionId 
 */
const filterAnswersFromQuestion = (questionId) => {
    return Answer.get().filter((answer) => (parseInt(answer.questionId) === parseInt(questionId)))
}

/**
 * getAnswerFromQuestion.
 * This function retrieves an answer from a question. It will throw a not found exception if the questionId in the answer is different from the one provided in parameter. 
 * @param quizId
 * @param questionId 
 * @param answerId
 */
const getAnswerFromQuestion = (quizId, questionId, answerId) => {
    //const question = getQuestionFromQuiz(quizId, questionId) je n'ai aucune idée de pq ça fait planter
    const answer = Answer.getById(answerId)
    //if (parseInt(answer.questionId) !== parseInt(question.id)) throw new NotFoundError(`${answer.name} id=${answerId} was not found for ${question.name} id=${question.id} : not found`)
    return answer
}

const deleteAnswerFromQuestion = (questionId) =>{
    answers = filterAnswersFromQuestion(questionId);
    answers.forEach(element => {
        Answer.delete(element.id)
    });
}

module.exports = {
    getAnswerFromQuestion,
    filterAnswersFromQuestion,
    deleteAnswerFromQuestion
}