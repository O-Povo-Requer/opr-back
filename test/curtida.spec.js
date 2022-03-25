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
                "idRequerimento": "1"
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
            'method': 'GET',
            'url': 'http://localhost:3333/curtidas_por_requerimento',
            'headers': {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+token,
            },
            body: JSON.stringify({
                "idRequerimento": "1"
            })
        };
        request.get(options, function(error, response){
                const totalCurtidas = JSON.parse(response.body)['total_curtidas']

                expect(totalCurtidas).to.equals(1)

                expect(response.statusCode).to.equal(200);

                done();
            }
        );
    })

    it("Deve retornar os requerimentos curtidos pelo usuário", function (done){
        var options = {
            'method': 'GET',
            'url': 'http://localhost:3333/curtidas_por_usuario',
            'headers': {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+token,
            }
        };
        request.get(options, function(error, response){
                const requerimentosRetornados = JSON.parse(response.body)['requerimentos_curtidos']

                expect(requerimentosRetornados.length).to.equals(1)

                expect(response.statusCode).to.equal(200);

                done();
            }
        );
    })

    it("Deve retornar se o requerimento foi curtido pelo usuário", function (done){
        var options = {
            'method': 'GET',
            'url': 'http://localhost:3333/verifica_curtida',
            'headers': {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+token,
            },
            body: JSON.stringify({
                "idRequerimento": "1"
            })
        };
        request.get(options, function(error, response){
                const requerimentoCurtido = JSON.parse(response.body)['requerimento_curtido']

                expect(requerimentoCurtido).to.equals(true)

                expect(response.statusCode).to.equal(200);

                done();
            }
        );
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