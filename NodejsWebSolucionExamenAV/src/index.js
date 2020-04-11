const express = require('express');
const morgan = require('morgan');
const path = require('path');

const app = express();

// settings 

app.set('port', process.env.PORT || 3000);

// routes

app.get('/sistemas', (req, res) => {
    res.json({
        sistemas: ['sistema1','sistema2']
    })
});


// static files
app.use(express.static(path.join(__dirname, '/public')));


app.listen(app.get('port'), () => {
    console.log('Server esta ejecutando en el puerto ['+ app.get('port') +']');
})

