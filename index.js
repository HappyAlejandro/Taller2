const express= require('express');
const bodyParser= require('body-parser');
const hbs=require('express-handlebars');
const MongoClient= require('mongodb').MongoClient;

const app= express();
const url= 'mongodb://localhost:27017';
const dbName= 'tienda';

const client= new MongoClient(url);
var db=null;

client.connect(function(err){
    if(err){
        console.error(err);
        return;
    }
   db= client.db(dbName);
});

app.use(express.static('public'));

app.engine('handlebars', hbs());
app.set('view engine', 'handlebars');

app.get('/', function(request,response){
    const collection= db.collection('productos');
    collection.find({}).toArray(function(err,docs){
        if(err){
            console.error(err);
            response.send(err);
            return;
        }
        var contexto={
        title: 'El titulo',
        products: docs,
    };
   response.render('index', contexto);
    });

});


app.get('/agregarDocumento',function(request,response){
    const collection= db.collection('productos');
    collection.insert({

    },function(err,result){
        if(err){
            console.error(err);
            response.send(err);
            return;
        }

        response.send('documento agregado');
    });

});


app.listen(5500, function(){
    console.log('el servidor escucha')
});