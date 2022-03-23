/**
 * Carrega as bibliotecas que vamos utilizar
 * O mocha nao eh carregado aqui, pois ele que executa este arquivo
 */
 var request = require("request");
 var chai = require("chai");
 var expect = chai.expect;
 let token = "";
 
 describe("Testando atividades",function(){

  before(() => {
    var options = {
      'method': 'POST',
      'url': 'http://localhost:3333/legislador/login',
      'headers': {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "cpf": "123456",
        "senha": "123"
      })

    };
    request(options, function (error, response) {
      if (error) throw new Error(error);
      token = response.body;
    });
  });
   
  it("Deve criar uma atividade",function(done){
    var options = {
        'method': 'POST',
        'url': 'http://localhost:3333/atividade',
        'headers': {
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
    request.post(options, function(error, response){
        // utilizando a funcao expect do chai, vamos verificar se o resultado da chamada foi sucesso (200)
        expect(response.statusCode).to.equal(201);

        done(); // avisamos o test runner que acabamos a validacao e ja pode proseeguir
      }
    );
  });

  it("Deve retornar um legislador",function(done){
    var options = {
        'method': 'POST',
        'url': 'http://localhost:3333/search/atividade',
        'headers': {
          'Authorization': 'Bearer '+ '123',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "cpf": "987654321"
        })
      
      };
    request.post(options, function(error, response){
        // utilizando a funcao expect do chai, vamos verificar se o resultado da chamada foi sucesso (200)
        expect(response.statusCode).to.equal(200);

        done(); // avisamos o test runner que acabamos a validacao e ja pode proseeguir
      }
    );
  });

  it("Deve atualizar um legislador",function(done){
    var options = {
        'method': 'PUT',
        'url': 'http://localhost:3333/legislador',
        'headers': {
          'Authorization': 'Bearer '+token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "cpf": "987654321",
          "nome": "Delo Figueiredo",
          "email": "thiago@gmail.com",
          "cidade": "Araripina",
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

  it("Deve deletar um legislador",function(done){
    var options = {
        'method': 'DELETE',
        'url': 'http://localhost:3333/legislador',
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

  it("Deve listar os legisladores",function(done){
    var options = {
      'method': 'GET',
      'url': 'http://localhost:3333/legisladores',
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

});

