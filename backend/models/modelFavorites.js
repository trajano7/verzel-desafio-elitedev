const { get, set } = require("./dbUtils");

// Retrieves user favorites list based on the username
async function getFavoriteListByUsername(username) {
  const sqlQuery = `
    SELECT M.* FROM Favorite F JOIN Movie M ON F.MovieID = M.MovieID JOIN User U ON F.UserID = U.UserID WHERE U.Username = ?;`;

  const result = await get(sqlQuery, [username]);

  if (!result.length) {
    return [];
  }

  return result;
}

// Retrieves user favorites list IDs based on the UserID
async function getFavoriteListIDs(userID) {
  const sqlQuery = `
    SELECT M.MovieID FROM Favorite F JOIN Movie M ON F.MovieID = M.MovieID JOIN User U ON F.UserID = U.UserID WHERE U.UserID = ?;`;

  const result = await get(sqlQuery, [userID]);

  if (!result.length) {
    return [];
  }

  return result;
}

// Add new favorite to user list
async function addNewFavorite(userID, movieID) {
  const sqlQuery = `INSERT IGNORE INTO Favorite (UserID, MovieID) VALUES (?, ?)`;
  const params = [userID, movieID];

  await set(sqlQuery, params);
}

// Delete a movie from user favorites list
// async function deleteFavoriteMovie(userID, movieID) {
async function deleteFavorite(userID, movieID) {
  const sqlQuery = `DELETE FROM Favorite WHERE UserID = ? AND MovieID = ?`;
  const params = [userID, movieID];

  await set(sqlQuery, params);
}

module.exports = { getFavoriteListByUsername, getFavoriteListIDs, addNewFavorite, deleteFavorite };
