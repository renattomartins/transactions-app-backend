const app = require("./src/index.js");
const port = 3000;

app.listen(port, () => {
  console.log(`Transactions API listening at http://localhost:${port}`);
});
