const routes = (router) => {
  router.get("/health", (req, res) =>
    res.set("Content-Type", "text/plain").send("All good!")
  );

  return router;
};

module.exports = routes;
