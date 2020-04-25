const { Attempt } = require('../../../models')
const { Player } = require('../../../models')

/**
 * Attempt Manager.
 * This file contains all the logic needed to by the attempt routes.  
 */

/**
 * filterAttemptsFromplayers.
 * This function filters among the attempts to return only the questions linked with the given playerId.
 * @param playerId 
 */
const filterAttemptsFromPlayers = (playerId) => {
    const allAttempts = Attempt.get()
    const parsedId = parseInt(playerId, 10) // Decimal base
    return allAttempts.filter((attempt) => parseInt(attempt.playerId) === parsedId)
}

/**
 * getAttemptFromplayer.
 * This function retrieves an attempt from a player. 
 * @throws NotFoundError if the playerId in the attempt is different from the one provided in parameter. 
 * @param playerId
 * @param attemptId
 */
const getAttemptFromPlayer = (playerId, attemptId) => {
    // Check if playerId exists, if not it will throw a NotFoundError
    const player = Player.getById(playerId)
    const playerIdInt = parseInt(playerId, 10)
    const attempt = Attempt.getById(attemptId)
    if (parseInt(attempt.playerId) !== playerIdInt) 
        throw new NotFoundError(`Attempt with id=${attemptId} was not found for ${player.name} id=${player.id}`)
    return attempt
}

const deleteAttemptsFromPlayer = (playerId) => {
    attempts = filterAttemptsFromPlayers(playerId);
    attempts.forEach(element => {
      Attempt.delete(element.id)
    });
}

module.exports = {
    filterAttemptsFromPlayers,
    getAttemptFromPlayer,
    deleteAttemptsFromPlayer
}