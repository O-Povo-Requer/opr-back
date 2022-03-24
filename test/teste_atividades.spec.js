/**
 * Carrega as bibliotecas que vamos utilizar
 * O mocha nao eh carregado aqui, pois ele que executa este arquivo
 */
 var request = require("request");
 var chai = require("chai");
 var expect = chai.expect;
 let token = "";
 
 describe("Testando atividades",function(){

  before(async () => {
    token = await getToken();
  });
   
  it("Deve criar uma atividade",function(done){
    var options = {
      'method': 'POST',
      'url': 'http://localhost:3333/atividade',
      'headers': {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "titulo": "teste",
        "link": "htpp://testedesite1.com",
        "data_ocorrencia": "2022-03-01",
        "descricao": "teste de descrição 1 ",
        "legisladores": "legislador2",
        "status": false
      })
    
    };
    request.post(options, function (error, response) {
      // utilizando a funcao expect do chai, vamos verificar se o resultado da chamada foi sucesso (200)
      expect(response.statusCode).to.equal(201);
      done(); // avisamos o test runner que acabamos a validacao e ja pode proseeguir
      
    });
    
  });

  it("Deve retorna uma atividade",function(done){
    var options = {
        'method': 'POST',
        'url': 'http://localhost:3333/search/atividade',
        'headers': {
          'Authorization': 'Bearer '+ token,
          'Content-Type': 'application/json'
        },
      };
    request.post(options, function(error, response){
        
        // utilizando a funcao expect do chai, vamos verificar se o resultado da chamada foi sucesso (200)
        expect(response.statusCode).to.equal(200);
        done(); // avisamos o test runner que acabamos a validacao e ja pode proseeguir
      }
    );
  });

  it("Deve atualizar um cidadao",function(done){
    var options = {
        'method': 'PUT',
        'url': 'http://localhost:3333/cidadao',
        'headers': {
          'Authorization': 'Bearer '+token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "cpf": "987654321",
          "nome": "Thiago Lira",
          "email": "thiago@gmail.com",
          "cidade": "83900000000",
          "senha": "123"
        })
      
      };
    request.put(options, function(error, response){
        // utilizando a funcao expect do chai, vamos verificar se o resultado da chamada foi sucesso (200)
        expect(response.statusCode).to.equal(200);

        done(); // avisamos o test runner que acabamos a validacao e ja pode proseeguir
      }
    );
  });

  it("Deve deletar um cidadao",function(done){
    var options = {
        'method': 'DELETE',
        'url': 'http://localhost:3333/cidadao',
        'headers': {
          'Authorization': 'Bearer '+token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "cpf": "987654321"
        })
      
    };
    request.delete(options, function(error, response){
        // utilizando a funcao expect do chai, vamos verificar se o resultado da chamada foi sucesso (200)
        expect(response.statusCode).to.equal(200);

        done(); // avisamos o test runner que acabamos a validacao e ja pode proseeguir
      }
    );
  });

  it("Deve listar os cidadaos",function(done){
    var options = {
      'method': 'GET',
      'url': 'http://localhost:3333/cidadaos',
      'headers': {
        'Authorization': 'Bearer 123'
      }
    };

    request.get(options, function(error, response){
        // utilizando a funcao expect do chai, vamos verificar se o resultado da chamada foi sucesso (200)
        expect(response.statusCode).to.equal(200);

        done(); // avisamos o test runner que acabamos a validacao e ja pode proseeguir
      }
    );

  });

  function getToken() {
    var options = {
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
        resolve(response.body);
      });
    });
  }


});