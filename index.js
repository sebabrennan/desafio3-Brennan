const express = require('express')
const contenedor = require('./contenedor.js')
const app = express()

const DB = new contenedor ("data")

app.get('/', (req, res) => {
    res.send('<h1 style="color: blue;">Bienvenidos al servidor express</h1>')
})

app.get('/products', async (req, res) => {
    const data = await DB.getAll();
    return res.send(data)
})

app.get('/randomProducts', (req, res) => {
    res.send('<h1>Random Products</h1>')
})

const server = app.listen(8080, () => {
    console.log('Servidor iniciado')
})

server.on("error", (error) => {
    console.error(`Error: ${error}`)
})