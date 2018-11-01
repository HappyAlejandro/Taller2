const express= require('express');
const bodyParser= require('body-parser');
const hbs=require('express-handlebars');

const app= express();
app.use(express.static('public'));

app.engine('handlebars', hbs());
app.set('view engine', 'handlebars');

app.get('/', function(request,response){
   response.render('index')
});

app.listen(5500, function(){
    console.log('el servidor escucha')
});