const express = require('express')
require('dotenv').config()
const app = express()
var cors = require('cors')
const port = process.env.PORT || 3000;

app.use(cors())
app.use(express.json());


let arr = []

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/api/v1/todo', (req, res) => {
    res.send(arr)
})

app.post('/api/v1/todo', (req, res) => {
    const { title } = req.body
    arr.push({
        title: title,
        id: Date.now()
    })
    res.send('Todo Added Successfully')
})

app.delete('/api/v1/todo/:id', (req, res) => {
    const { id } = req.params
    const index = arr.findIndex((todo) => todo.id === Number(id))
    if (index === -1) {
        res.send('Todo Not Found')
        return
    }
    arr.splice(index, 1)
    res.send('Todo Deleted Successfully')
})

app.put('/api/v1/todo/:id', (req, res) => {
    const { id } = req.params;
    const { title } = req.body;
    const index = arr.findIndex((todo) => todo.id === Number(id))
    if (index === -1) {
        res.send('Todo Not Found')
        return;
    }
    arr[index].title = title;
    res.send('Todo Edit Successfully')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})