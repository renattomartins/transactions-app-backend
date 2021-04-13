const app = require("./server.js");
const port = 3000;

app.listen(port, () => {
  console.log(`Transactions App listening at http://localhost:${port}`);
});
