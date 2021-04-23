const routes = (router) => {
  router.get("/accounts/3544/transactions", (req, res) => {
    res.set("X-Total-Count", 4);
    res.json([
      {
        id: 2943,
        description: "Transferência para Cartão Master 5384",
        amount: -159.9,
        date: "2013-08-02",
        notes: "",
        is_income: false,
        is_transfer: true,
        account_id: 1214,
        related_transfer_id: 2947,
        created: "2013-08-02 07:48:37",
        modified: "2013-08-02 07:48:37",
      },
      {
        id: 2944,
        description: "Lazer",
        amount: -27.0,
        date: "2013-08-02",
        notes: "",
        is_income: false,
        is_transfer: false,
        account_id: 1214,
        related_transfer_id: null,
        created: "2013-08-02 07:48:37",
        modified: "2013-08-02 07:48:37",
      },
      {
        id: 2945,
        description: "Saúde & Higiene",
        amount: -4.0,
        date: "2013-08-02",
        notes: "",
        is_income: false,
        is_transfer: false,
        account_id: 1214,
        related_transfer_id: null,
        created: "2013-08-02 07:48:37",
        modified: "2013-08-02 07:48:37",
      },
      {
        id: 2946,
        description: "Transporte",
        amount: -5.08,
        date: "2013-08-02",
        notes: "",
        is_income: false,
        is_transfer: false,
        account_id: 1214,
        related_transfer_id: null,
        created: "2013-08-02 07:48:37",
        modified: "2013-08-02 07:48:37",
      },
    ]);
  });

  return router;
};

module.exports = routes;
