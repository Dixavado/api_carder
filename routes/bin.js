const express = require('express');
const router = express.Router();
const lookup = require('binlookup')();

router.get('/bin/:binNumber', async (req, res) => {
  try {
    const binNumber = req.params.binNumber;

    lookup(binNumber)
      .then((data) => {
        const filteredData = {
          scheme: data.scheme,
          type: data.type,
          brand: data.brand,
          prepaid: data.prepaid,
          country: {
            name: data.country.name,
            currency: data.country.currency
          },
          bank: {
            name: data.bank.name
          }
        };

        res.json(filteredData);
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ message: 'Ocorreu um erro ao consultar o BIN.' });
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ocorreu um erro ao processar a requisição.' });
  }
});

module.exports = router;
