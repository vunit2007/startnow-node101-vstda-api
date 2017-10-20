const express = require('express');
const morgan = require('morgan');
const app = express();
const bodyParser = require('body-parser');
const ok = { status: 'ok'};
let counter = 0;
let mockData = [
    {
      todoItemId: 0,
      name: 'an item',
      priority: 3,
      completed: false
    },
    {
      todoItemId: 1,
      name: 'another item',
      priority: 2,
      completed: false
    },
    {
      todoItemId: 2,
      name: 'a done item',
      priority: 1,
      completed: true
    }
];

app.use(bodyParser.json());
app.use(morgan('dev'));

app.get('/', (req, res) => {
    res.status(200).send(ok);
});


app.get('/api/TodoItems', (req, res) => {
res.status(200).send(mockData);
});

app.get('/api/TodoItems/1', (req, res) => {
    var itemZero = mockData[0];
    res.status(200).send(itemZero); 
});

app.get('/api/TodoItems/2', (req, res) => {
    var itemUno = mockData[1];
    res.status(200).send(itemUno); 
});

app.get('/api/TodoItems/3', (req, res) => {
    var itemDos = mockData[2];
    res.status(200).send(itemDos); 
});

app.post('/api/TodoItems', function(req, res) {
    
        let obj = {
            todoItemId: counter,
            name: req.body.name,
            priority: req.body.priority,
            completed: req.body.completed
        }
        mockData.push(obj);
        counter++;
    
        res.status(201).send(obj);
    });


app.delete('/api/TodoItems/:number', function(req, res) {
    
        let delObj = [];
        const delId = req.params.number;
        for(i = 0; i < mockData.length; i++) {
            if (delId == mockData[i].todoItemId) {
                delObj = mockData.splice(i, 1);
            }
        }
        res.status(200).send(delObj[0]);
    });
    
    
    
// app.get('/api/TodoItems/:1', (req, res) => {
//     res.status(200).send(mockData);
//     });
// app.get('/api/TodoItems/:2', (req, res) => {
//     res.status(200).send(mockData);
//     });

// add your code here

module.exports = app;
