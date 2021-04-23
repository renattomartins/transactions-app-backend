const routes = (router) => {
  router.get("/accounts/3544/transactions", (req, res) => {
    res.set("X-Total-Count", 4);
    res.json([
      {
        id: 12943,
        description: "Transferência para Cartão Master 5384",
        amount: -159.9,
        date: "2013-08-02",
        notes: "",
        is_income: false,
        is_transfer: true,
        account_id: 3544,
        related_transfer_id: 12947,
        created: "2013-08-02 07:48:37",
        modified: "2013-08-02 07:48:37",
      },
      {
        id: 12944,
        description: "Lazer",
        amount: -27.0,
        date: "2013-08-02",
        notes: "",
        is_income: false,
        is_transfer: false,
        account_id: 3544,
        related_transfer_id: null,
        created: "2013-08-02 07:48:37",
        modified: "2013-08-02 07:48:37",
      },
      {
        id: 12945,
        description: "Saúde & Higiene",
        amount: -4.0,
        date: "2013-08-02",
        notes: "",
        is_income: false,
        is_transfer: false,
        account_id: 3544,
        related_transfer_id: null,
        created: "2013-08-02 07:48:37",
        modified: "2013-08-02 07:48:37",
      },
      {
        id: 12946,
        description: "Transporte",
        amount: -5.08,
        date: "2013-08-02",
        notes: "",
        is_income: false,
        is_transfer: false,
        account_id: 3544,
        related_transfer_id: null,
        created: "2013-08-02 07:48:37",
        modified: "2013-08-02 07:48:37",
      },
    ]);
  });

  router.post("/accounts/3544/transactions", (req, res) => {
    let location = `${req.protocol}://${req.get(
      "host"
    )}/accounts//3544/transactions/13004`;

    res.set("Location", location);
    res.status(201).json({
      id: 13004,
      description: "Lazer",
      amount: -127.0,
      date: "2021-04-23",
      notes: "",
      is_income: false,
      is_transfer: false,
      account_id: 3544,
      related_transfer_id: null,
      created: "2021-04-23 08:27:37",
      modified: "2021-04-23 08:27:37",
    });
  });

  router.get("/accounts/3544/transactions/12944", (req, res) => {
    res.json({
      id: 12944,
      description: "Lazer",
      amount: -27.0,
      date: "2013-08-02",
      notes: "",
      is_income: false,
      is_transfer: false,
      account_id: 3544,
      related_transfer_id: null,
      created: "2013-08-02 07:48:37",
      modified: "2013-08-02 07:48:37",
    });
  });

  return router;
};

module.exports = routes;
