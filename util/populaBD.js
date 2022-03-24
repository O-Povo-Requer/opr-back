const connection = require('../api/database/connections')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const criaRequerimentos = async () => {
    try {
        await connection('requerimento').insert({
            cpf_criador: 123456,
            titulo: "teste1",
            localidade: "teste",
            descricao: "Apenas um teste",
        })
        await connection('requerimento').insert({
            cpf_criador: 123456,
            titulo: "teste2",
            localidade: "teste",
            descricao: "Apenas um teste",
        })
        await connection('requerimento').insert({
            cpf_criador: 123456,
            titulo: "teste3",
            localidade: "teste",
            descricao: "Apenas um teste",
        })
        await connection('requerimento').insert({
            cpf_criador: 123456,
            titulo: "teste4",
            localidade: "teste",
            descricao: "Apenas um teste",
        })
        await connection('requerimento').insert({
            cpf_criador: 123456,
            titulo: "teste5",
            localidade: "teste",
            descricao: "Apenas um teste",
        })
        await connection('requerimento').insert({
            cpf_criador: 123456,
            titulo: "teste6",
            localidade: "teste",
            descricao: "Apenas um teste",
        })
    } catch (error) {
        console.log(error)
    }
}

const criaCurtidas = async () => {
    try {
        await connection('curtida').insert({
            cpf: 123456,
            requerimento: 1,
            tipo_usuario: "cidadao"
        })
        await connection('curtida').insert({
            cpf: 123456,
            requerimento: 1,
            tipo_usuario: "cidadao"
        })
        await connection('curtida').insert({
            cpf: 123456,
            requerimento: 1,
            tipo_usuario: "cidadao"
        })
        await connection('curtida').insert({
            cpf: 123456,
            requerimento: 1,
            tipo_usuario: "cidadao"
        })
        
    } catch (error) {
        console.log(error)
    }
}

const criaComentarios = async () => {
    try {
        await connection('comentario').insert({
            cpf: 123456,
            requerimento: 1,
            comentario: "Muito massa",
            tipo_usuario: "cidadao"
        })
        await connection('comentario').insert({
            cpf: 123456,
            requerimento: 1,
            comentario: "Muito massa",
            tipo_usuario: "cidadao"
        })
        await connection('comentario').insert({
            cpf: 123456,
            requerimento: 1,
            comentario: "Muito massa",
            tipo_usuario: "cidadao"
        })
        await connection('comentario').insert({
            cpf: 123456,
            requerimento: 1,
            comentario: "Muito massa",
            tipo_usuario: "cidadao"
        })
        
    } catch (error) {
        console.log(error)
    }
}

criaComentarios()
