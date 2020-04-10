const express = require('express');
const morgan = require('morgan');
const path = require('path');

const app = express();

// settings 

app.set('port', process.env.PORT || 3000);

// static files

//app.use(express.static(path.join(__dirname, '/public/virtue/product/racer-t-shirt')));
app.use(express.static(path.join(__dirname, '/public')));


app.listen(app.get('port'), () => {
    console.log('Server esta ejecutando en el puerto ['+ app.get('port') +']');
})

