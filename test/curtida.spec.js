var request = require("request");
var chai = require("chai");
const connection = require('../api/database/connections');
var expect = chai.expect;
let token = '';

describe("Testando curtida", async function (){

    before(async () => {
        await makeRequerimento()
        token = await makeToken()
    })

    it("Deve curtir um requerimento", function (done){
        var options = {
            'method': 'POST',
            'url': 'http://localhost:3333/curtida',
            'headers': {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+token,
            },
            body: JSON.stringify({
                "idRequerimento": "26",
                "cpf": "132456"
            })

        };
        request.post(options, function(error, response){
                expect(response.statusCode).to.equal(200);

                done();
            }
        );
    })

    it("Deve retornar a quantidade de curtidas de um requerimento", function (done){
        var options = {
            'method': 'POST',
            'url': 'http://localhost:3333/curtidas_por_requerimento',
            'headers': {
              'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjcGYiOiI2NTQzMjEiLCJ0aXBvX2RlX3VzdWFyaW8iOiJsZWdpc2xhZG9yIiwiaWF0IjoxNjQ4MjQ1MjAxLCJleHAiOjE2NDgyNDg4MDF9.2WYwsGrSSOQAS-4bdp49f7_TeB0diyiOYsRjrekDXJM',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({"idRequerimento":27})
          
          };
          request(options, function (error, response) {
            expect(response.statusCode).to.equal(200);

                done();
          });
    })

    it("Deve retornar os requerimentos curtidos pelo usuário", function (done){
        var options = {
            'method': 'POST',
            'url': 'http://localhost:3333/curtidas_por_usuario',
            'headers': {
              'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjcGYiOiI2NTQzMjEiLCJ0aXBvX2RlX3VzdWFyaW8iOiJsZWdpc2xhZG9yIiwiaWF0IjoxNjQ4MjQ1MjAxLCJleHAiOjE2NDgyNDg4MDF9.2WYwsGrSSOQAS-4bdp49f7_TeB0diyiOYsRjrekDXJM',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({"cpf":"123456"})
          
        };
          
        request(options, function (error, response) {
            expect(response.statusCode).to.equal(200);

            done();
        });
    })

    it("Deve retornar se o requerimento foi curtido pelo usuário", function (done){
        var options = {
            'method': 'POST',
            'url': 'http://localhost:3333/curtidas_por_requerimento',
            'headers': {
              'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjcGYiOiI2NTQzMjEiLCJ0aXBvX2RlX3VzdWFyaW8iOiJsZWdpc2xhZG9yIiwiaWF0IjoxNjQ4MjQ1MjAxLCJleHAiOjE2NDgyNDg4MDF9.2WYwsGrSSOQAS-4bdp49f7_TeB0diyiOYsRjrekDXJM',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({"idRequerimento":27})
          
          };
          request(options, function (error, response) {
            expect(response.statusCode).to.equal(200);

                done();
          });
    })

    it("Deve descurtir um requerimento previamente curtido pelo usuário", function (done){
        var options = {
            'method': 'DELETE',
            'url': 'http://localhost:3333/curtida',
            'headers': {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+token,
            },
            body: JSON.stringify({
                "idRequerimento": "26"
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
                resolve(response.body)
            });
        })
    }

})