var request = require('request');
var token = "";
var options = {
  'method': 'POST',
  'url': 'http://localhost:3333/cidadao',
  'headers': {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    "cpf": "123456",
    "nome": "Teste",
    "email": "teste@email.com",
    "cidade": "exemplo",
    "senha": "123"
  })

};

request(options, function (error, response) {
  console.log("---------Criando cidadao default---------");
});

options = {
  'method': 'POST',
  'url': 'http://localhost:3333/legislador',
  'headers': {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    "cpf": "123456",
    "nome": "LegTeste",
    "email": "legteste@email.com",
    "cidade": "exemplo",
    "senha": "123",
    "partido": "PARTIDO TESTE"
  })

};

request(options, function (error, response) {
  console.log("---------Criando legislador default---------");
});
