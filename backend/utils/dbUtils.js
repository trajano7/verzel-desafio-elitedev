const { getMovieByID } = require("./dbAccess");
const { NotFoundError } = require("./errors");

async function isMovieStored(movieID) {
  try {
    await getMovieByID(movieID);
    return true;
  } catch (error) {
    if (error instanceof NotFoundError) {
      return false;
    }
    throw error;
  }
}

exports.isMovieStored = isMovieStored;