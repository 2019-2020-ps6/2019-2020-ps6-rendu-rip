const { Attempt } = require('../../../models')
const { User } = require('../../../models')

/**
 * Attempt Manager.
 * This file contains all the logic needed to by the attempt routes.  
 */

/**
 * filterAttemptsFromUsers.
 * This function filters among the attempts to return only the questions linked with the given userId.
 * @param userId 
 */
const filterAttemptsFromUsers = (userId) => {
    const allAttempts = Attempt.get()
    const parsedId = parseInt(userId, 10) // Decimal base
    return allAttempts.filter((attempt) => parseInt(attempt.userId) === parsedId)
}

/**
 * getAttemptFromUser.
 * This function retrieves an attempt from a user. 
 * @throws NotFoundError if the userId in the attempt is different from the one provided in parameter. 
 * @param userId
 * @param attemptId
 */
const getAttemptFromUser = (userId, attemptId) => {
    // Check if userId exists, if not it will throw a NotFoundError
    const user = User.getById(userId)
    const userIdInt = parseInt(userId, 10)
    const attempt = Attempt.getById(attemptId)
    if (parseInt(attempt.userId) !== userIdInt) 
        throw new NotFoundError(`Attempt with id=${attemptId} was not found for ${user.name} id=${user.id}`)
    return attempt
}

const deleteAttemptsFromUser = (userId) => {
    attempts = filterAttemptsFromUsers(userId);
    attempts.forEach(element => {
      Attempt.delete(element.id)
    });
}

module.exports = {
    filterAttemptsFromUsers,
    getAttemptFromUser,
    deleteAttemptsFromUser
}