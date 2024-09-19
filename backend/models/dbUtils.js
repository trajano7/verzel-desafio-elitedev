const { connectToDb } = require("./dbConnection");


// Função genérica para consultas (GET)
async function get(query, params) {
  const connection = await connectToDb();
  let resultList;

  try {
    const [rows] = await connection.execute(query, params);
    resultList = rows;
  } catch (error) {
    console.error(`Error in GET query. More details: ${error.message}`);
    throw new Error("Internal server error.");
  } finally {
    if (connection && connection.end) {
      connection.end();
    }
  }
  return resultList;
}

// Função genérica para operações (SET)
async function set(query, params) {
  const connection = await connectToDb();
  let setResult;
  try {
    const [result] = await connection.execute(query, params);
    setResult = result;
  } catch (error) {
    console.error(`Error in SET query. More details: ${error.message}`);
    throw new Error("Internal server error.");
  } finally {
    if (connection && connection.end) {
      connection.end();
    }
  }
  return setResult;
}

module.exports = { get, set };
