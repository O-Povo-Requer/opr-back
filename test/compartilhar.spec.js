var request = require("request");
var chai = require("chai");
const connection = require('../api/database/connections');
var expect = chai.expect;
let token = '';

describe("Testando compartilhamento", async function (){

  before(async () => {
    await makeRequerimento()
    token = await makeToken()
  })

  it("Deve compartilhar um requerimento", function (done){
    var options = { 
        'method': 'POST',
        'url': 'http://localhost:3333/compartilhar',
        'headers': {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+token,
        },
        body: JSON.stringify({
          "idRequerimento": "1"
        })
      
      };
    request.post(options, function(error, response){
        expect(response.statusCode).to.equal(201);

        done();
      }
    );
  })

  it("Deve retornar os requerimentos compartilhados pelo usuário", function (done){
    var options = { 
        'method': 'GET',
        'url': 'http://localhost:3333/compartilhamentos?userCpf=123456',
        'headers': {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+token,
        }
      };
    request.get(options, function(error, response){
        const requerimentoRetornado = JSON.parse(response.body)[0]

        expect(requerimentoRetornado.id, 1)
        expect(requerimentoRetornado.cpf_criador, 123456)

        expect(response.statusCode).to.equal(200);

        done();
      }
    );
  })

  it("Deve descompartilhar um requerimento", function (done){
    var options = { 
        'method': 'DELETE',
        'url': 'http://localhost:3333/compartilhar',
        'headers': {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+token,
        },
        body: JSON.stringify({
          "idRequerimento": "1"
        })
      
      };
    request.delete(options, function(error, response){
        expect(response.statusCode).to.equal(200);

        done();
      }
    );
  })

  async function makeRequerimento() {
    id = Math.random() * 3;
    var options = {
        'method': 'POST',
        'url': 'http://localhost:3333/requerimento/novo',
        'headers': {
          'Authorization': 'Bearer '+ token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "titulo": `Novo requerimento Teste Mock#${id}`,
            "localidade": "Catolé, Campina Grande - PB",
            "descricao": "Ta tudo alagado",
            "data": "20/01/2022"
        })
      
      };
    return new Promise(function(resolve, reject) {
      request.post(options, function (error, response) {
        if (error) reject(error);
        resolve(response.body)
      });
    })
  }

  function makeToken() {
    const options = {
        'method': 'POST',
        'url': 'http://localhost:3333/cidadao/login',
        'headers': {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "cpf": "123456",
          "senha": "123"
        })
  
      };
      return new Promise(function(resolve, reject) {
        request(options, function (error, response) {
          if (error) reject(error);
          resolve(response.body)
        });
      })
  }

})