const express = require("express");
const app = express();

app.use(express.json());

// Initial end point:
app.get("/", (req, res) => {
  res.json({
    code: 0,
    message: "success",
    resources: {
      account_url: `${req.protocol}://${req.get('host')}/accounts`,
    },
  });
});



module.exports = app;