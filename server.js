var express = require('express');
var app = express();

var mongojs = require('mongojs');
var db = mongojs('listadeContatos', ['listadeContatos']);

var bodyParser = require('body-parser');

app.use(bodyParser.json());

var cors = require('cors');

// use it before all route definitions
app.use(cors({origin: 'http://localhost:63342'}));

//Busca todos os contatos da lista
app.get('/listadeContatos', function (req, res) {
    //console.log('recebi uma requisiçao get');
    db.listadeContatos.find(function (erro, resposta) {
        //console.log(resposta);
        res.json(resposta);
    })
});

//Insere um novo contato na lista
app.post('/listadeContatos', function (req, res) {
    //console.log(req.body);
    db.listadeContatos.insert(req.body, function (err, resposta) {
        res.json(resposta)
    })
});

//Deleta um contato da lista
app.delete('/listadeContatos/:id', function (req, res) {
    var id = req.params.id;
    //console.log(id)
    db.listadeContatos.remove({_id: mongojs.ObjectId(id)}, function (req, resposta) {
        res.json(resposta)
    });
});


//Busca um contato da lista para atualizar
app.get('/listadeContatos/:id', function (req, res) {
    var id = req.params.id;
    //console.log(id);
    db.listadeContatos.findOne({_id: mongojs.ObjectId(id)}, function (req, resposta) {
        res.json(resposta)
    })
})


//Atualiza o contato que foi buscado
app.put('/listadeContatos/:id', function (req, res) {
    var id = req.params.id;
    console.log(req.body.name);
    db.listadeContatos.findAndModify({query:{_id: mongojs.ObjectId(id)},
        update: {$set: {name: req.body.name, email: req.body.email, telefone: req.body.telefone}},
        new: true}, function (req, resposta) {
            res.json(resposta);
    });
});




app.listen('3000');
console.log('Servidor ativo na porta 3000');
