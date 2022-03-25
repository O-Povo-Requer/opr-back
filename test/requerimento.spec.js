/**
 * Carrega as bibliotecas que vamos utilizar
 * O mocha nao eh carregado aqui, pois ele que executa este arquivo
 */
 var request = require("request");
 var chai = require("chai");
 var expect = chai.expect;
 let token = "";
 let id;
 
 describe("Testando requerimentos",function(){

  before(async () => {
    token = await getToken();
  });
   
  it("Deve criar um requerimento",function(done){
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
    request.post(options, function(error, response){
      //console.log(response);
        // utilizando a funcao expect do chai, vamos verificar se o resultado da chamada foi sucesso (200)
        expect(response.statusCode).to.equal(201);

        done(); // avisamos o test runner que acabamos a validacao e ja pode proseeguir
      }
    );
  });

  it("Deve retornar um requerimento",function(done){
    var options = {
        'method': 'GET',
        'url': 'http://localhost:3333/requerimento/26',
        'headers': {
          'Authorization': 'Bearer '+ token,
          'Content-Type': 'application/json'
        },
      
      };
    request.get(options, function(error, response){
        // utilizando a funcao expect do chai, vamos verificar se o resultado da chamada foi sucesso (200)
        expect(response.statusCode).to.equal(200);

        done(); // avisamos o test runner que acabamos a validacao e ja pode proseeguir
      }
    );
  });

  it("Deve atualizar um requerimento",function(done){
    var options = {
        'method': 'PUT',
        'url': 'http://localhost:3333/requerimento/edit/26',
        'headers': {
          'Authorization': 'Bearer '+token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "titulo": "Novo requerimento Teste Mock Update",
            "localidade": "Catolé, Campina Grande - PB",
            "descricao": "Ta tudo alagado",
            "data": "20/01/2022",
            "tags": "Rua",
        })
      
      };
    request.put(options, function(error, response){
        // utilizando a funcao expect do chai, vamos verificar se o resultado da chamada foi sucesso (200)
        expect(response.statusCode).to.equal(204);

        done(); // avisamos o test runner que acabamos a validacao e ja pode proseeguir
      }
    );
  });

  // it("Deve deletar um requerimento",function(done){
  //   var options = {
  //       'method': 'DELETE',
  //       'url': 'http://localhost:3333/requerimento/6',
  //       'headers': {
  //         'Authorization': 'Bearer '+token,
  //         'Content-Type': 'application/json'
  //       },
  //   };
  //   request.delete(options, function(error, response){
  //       // utilizando a funcao expect do chai, vamos verificar se o resultado da chamada foi sucesso (200)
  //       expect(response.statusCode).to.equal(200);

  //       done(); // avisamos o test runner que acabamos a validacao e ja pode proseeguir
  //     }
  //   );
  // });

  it("Deve listar os requerimentos",function(done){
    var options = {
      'method': 'GET',
      'url': 'http://localhost:3333/requerimentos',
      'headers': {
        'Authorization': 'Bearer '+token
      }
    };

    request.get(options, function(error, response){
        // utilizando a funcao expect do chai, vamos verificar se o resultado da chamada foi sucesso (200)
        expect(response.statusCode).to.equal(200);

        done(); // avisamos o test runner que acabamos a validacao e ja pode proseeguir
      }
    );

  });

  it("Deve mostrar a contagem dos requerimentos",function(done){
    var options = {
      'method': 'GET',
      'url': 'http://localhost:3333/requerimentos/analise',
      'headers': {
        'Authorization': 'Bearer '+ token
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
      'url': 'http://localhost:3333/login',
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