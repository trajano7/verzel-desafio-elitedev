const app = require("./src");
const { port } = require("./config");

const PORT = port || 3000;

app.listen(PORT, () => {
  console.log(`Running in port ${PORT}`);
});