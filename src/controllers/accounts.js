exports.getAccounts = (req, res, next) => {
  res.set('X-Total-Count', 3);
  res.json([
    {
      id: 3541,
      name: 'Bradesco, C/C',
      icon: 'icon-bradesco',
      description: '',
      type: 1,
      current_amount: 2349.89,
      activated: true,
      created: '2012-06-13 19:05:15',
      modified: '2015-01-16 18:49:26',
      account_url: `${req.protocol}://${req.get('host')}/accounts/3541`,
    },
    {
      id: 3542,
      name: 'Bradesco, C/P',
      icon: 'icon-bradesco',
      description: '',
      type: 2,
      current_amount: 1804.32,
      activated: true,
      created: '2012-06-13 19:08:04',
      modified: '2015-01-16 18:49:29',
      account_url: `${req.protocol}://${req.get('host')}/accounts/3542`,
    },
    {
      id: 3543,
      name: 'Carteira',
      icon: 'icon-wallet',
      description: '',
      type: 5,
      current_amount: 34.0,
      created: '2012-06-13 19:08:08',
      modified: '2014-03-15 11:25:31',
      account_url: `${req.protocol}://${req.get('host')}/accounts/3543`,
    },
  ]);
};

exports.createAccount = (req, res, next) => {
  const location = `${req.protocol}://${req.get('host')}/accounts/3544`;

  res.set('Location', location);
  res.status(201).json({
    id: 3544,
    name: 'Banco Inter, C/C',
    icon: 'icon-inter',
    description: '',
    type: 1,
    current_amount: 0.0,
    activated: true,
    created: '2021-04-09 08:13:15',
    modified: '2021-04-09 08:13:15',
    account_url: location,
  });
};

exports.getAccount = (req, res, next) => {
  res.json({
    id: 3541,
    name: 'Bradesco, C/C',
    icon: 'icon-bradesco',
    description: '',
    type: 1,
    current_amount: 2349.89,
    activated: true,
    created: '2012-06-13 19:05:15',
    modified: '2015-01-16 18:49:26',
    account_url: `${req.protocol}://${req.get('host')}/accounts/3541`,
  });
};

exports.updateAccount = (req, res, next) => {
  res.json({
    id: 3544,
    name: 'Banco Intermedium, C/C',
    icon: 'icon-inter',
    description: 'Banco para investimentos e reserva de emergência',
    type: 1,
    current_amount: 10000.0,
    activated: true,
    created: '2021-04-09 08:13:15',
    modified: '2021-04-09 08:37:36',
    account_url: `${req.protocol}://${req.get('host')}/accounts/3544`,
  });
};

exports.partiallyUpdateAccount = (req, res, next) => {
  res.json({
    id: 3544,
    name: 'Banco Intermedium, C/C',
    icon: 'icon-inter',
    description: 'Banco para investimentos e reserva de emergência',
    type: 1,
    current_amount: 10000.0,
    activated: false,
    created: '2021-04-09 08:13:15',
    modified: '2021-04-09 08:37:36',
    account_url: `${req.protocol}://${req.get('host')}/accounts/3544`,
  });
};

exports.deleteAccount = (req, res, next) => {
  res.sendStatus(204);
};
