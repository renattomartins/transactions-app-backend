const express = require("express");
const app = express();
const port = 3000;

// Initial end point:
app.get("/", (req, res) => {
  res.json({
    code: 0,
    message: "success",
    resources: {
      account_url: `http://localhost:${port}/accounts`,
    },
  });
});

// Accounts end points:
app.get("/accounts", (req, res) => {
  // X-Total-Count: 3
  res.json([
    {
      id: 3541,
      name: "Bradesco, C/C",
      icon: "icon-bradesco",
      description: "",
      type: 1,
      current_amount: 2349.89,
      activated: true,
      created: "2012-06-13 19:05:15",
      modified: "2015-01-16 18:49:26",
      account_url: `http://localhost:${port}/accounts/3541`,
    },
    {
      id: 3542,
      name: "Bradesco, C/P",
      icon: "icon-bradesco",
      description: "",
      type: 2,
      current_amount: 1804.32,
      activated: true,
      created: "2012-06-13 19:08:04",
      modified: "2015-01-16 18:49:29",
      account_url: `http://localhost:${port}/accounts/3542`,
    },
    {
      id: 3543,
      name: "Carteira",
      icon: "icon-wallet",
      description: "",
      type: 5,
      current_amount: 34.0,
      created: "2012-06-13 19:08:08",
      modified: "2014-03-15 11:25:31",
      account_url: `http://localhost:${port}/accounts/3543`,
    },
  ]);
});

app.get("/accounts/3541", (req, res) => {
  res.json({
    id: 3541,
    name: "Bradesco, C/C",
    icon: "icon-bradesco",
    description: "",
    type: 1,
    current_amount: 2349.89,
    activated: true,
    created: "2012-06-13 19:05:15",
    modified: "2015-01-16 18:49:26",
    account_url: `http://localhost:${port}/accounts/3541`,
  });
});

app.post("/", (req, res) => {
  res.send("Got a POST request");
});

app.put("/user", (req, res) => {
  res.send("Got a PUT request at /user");
});

app.delete("/user", (req, res) => {
  res.send("Got a DELETE request at /user");
});

app.listen(port, () => {
  console.log(`Transactions App listening at http://localhost:${port}`);
});
