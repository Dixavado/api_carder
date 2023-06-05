//  SISTEMA DE GERAÇÃO DE CARTOES
//  Feito por Diixavado
//
//  Recebe via rota o valor de Quantidade-Cartao-Data 
//  Apos isso ele gera os DADOS, valida usado LUHN e apos isso insere os CVV aleatorios

const express = require('express');
const router = express.Router();

const generateRandomDigits = (length) => {
  return Math.floor(Math.random() * Math.pow(10, length)).toString().padStart(length, '0');
};

const generateRandomCVV = () => {
  return generateRandomDigits(3);
};

const isValidCreditCardNumber = (cardNumber) => {
  const cleanedNumber = cardNumber.replace(/\D/g, '');
  if (cleanedNumber.length < 13 || cleanedNumber.length > 16) {
    return false;
  }
  let sum = 0;
  let shouldDouble = false;
  for (let i = cleanedNumber.length - 1; i >= 0; i--) {
    let digit = parseInt(cleanedNumber[i]);
    digit *= shouldDouble ? 2 : 1;
    digit = digit > 9 ? digit - 9 : digit;
    sum += digit;
    shouldDouble = !shouldDouble;
  }
  return sum % 10 === 0;
};

router.get('/gg/:dados', async (req, res) => {
  try {
    const [quantidade, cartaoParcial, data] = req.params.dados.split('-');
    const quantidadeNum = parseInt(quantidade);

    if (isNaN(quantidadeNum) || quantidadeNum < 1 || quantidadeNum > 999) {
      return res.status(400).json({ message: 'A quantidade deve ser um valor numérico de 1 a 999.' });
    }

    if (!/^\d{6,12}$/.test(cartaoParcial) || !/^\d{4,6}$/.test(data)) {
      return res.status(400).json({ message: 'Os dados devem estar no formato QUANTIDADE-CC-DATA.' });
    }

    const resultados = [];

    for (let i = 0; i < quantidadeNum; i++) {
      let cartaoCompleto = '';
      let cvv = '';
      let isValid = false;
    
      do {
        const digitosFaltantes = 16 - cartaoParcial.length;
        cartaoCompleto = `${cartaoParcial}${generateRandomDigits(digitosFaltantes)}`;
        cvv = generateRandomCVV();
        isValid = isValidCreditCardNumber(cartaoCompleto);
      } while (!isValid);
    
      const dataFormatada = `${data.slice(0, 2)}/${data.slice(2)}`;
      const resultado = `${cartaoCompleto}|${dataFormatada}|${cvv}`;
      resultados.push({ resultado });
    }
    
    res.json(resultados);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ocorreu um erro ao processar a requisição.' });
  }
});

module.exports = router;
