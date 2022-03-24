/**
 * Carrega as bibliotecas que vamos utilizar
 * O mocha nao eh carregado aqui, pois ele que executa este arquivo
 */
 var request = require("request");
 var chai = require("chai");
 var expect = chai.expect;
 let token = "";
 
 describe("Testando cidadaos",function(){

  before(() => {
    var options = {
      'method': 'POST',
      'url': 'http://localhost:3333/login',
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
   
  it("Deve criar um cidadao",function(done){
    var options = {
        'method': 'POST',
        'url': 'http://localhost:3333/cidadao',
        'headers': {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "cpf": "987654321",
          "nome": "Thiago Costa",
          "email": "thiago@gmail.com",
          "cidade": "83900000000",
          "senha": "123"
        })
      
      };
    request.post(options, function(error, response){
        // utilizando a funcao expect do chai, vamos verificar se o resultado da chamada foi sucesso (200)
        expect(response.statusCode).to.equal(201);

        done(); // avisamos o test runner que acabamos a validacao e ja pode proseeguir
      }
    );
  });

  it("Deve retorna um cidadao",function(done){
    var options = {
        'method': 'POST',
        'url': 'http://localhost:3333/search/cidadao',
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

});