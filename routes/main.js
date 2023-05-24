const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/cpf', (req, res) => {
  res.render(path.join(__dirname, '../views/cpf_full.ejs'), {
    title: 'Bem-vindo(a) à API!'
  });
});
router.get('/cpf1', (req, res) => {
  res.render(path.join(__dirname, '../views/template1.ejs'), {
    title: 'Bem-vindo(a) à API!'
  });
});
router.get('/cxtem', (req, res) => {
  res.render(path.join(__dirname, '../views/template.ejs'), {
    title: 'Bem-vindo(a) à API!'
  });
});
router.get('/', (req, res) => {
  res.render(path.join(__dirname, '../views/index.ejs'), {
    title: 'Bem-vindo(a) à API!'
  });
});

module.exports = router;
