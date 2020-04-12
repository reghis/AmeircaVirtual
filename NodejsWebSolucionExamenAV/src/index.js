const express = require('express');
const morgan = require('morgan');
const path = require('path');
const session = require('express-session');
const TWO_HOURS = 1000 * 60 * 60 * 2;
const bodyParser = require('body-parser');


// settings
//app.set('port', process.env.PORT || 3000);
        
const {
    PORT = 3000,
    NODE_ENV = 'development',
    SESS_NAME = 'sid',
    SESS_SECRET =  '123a',
    SESS_LIFETIME = TWO_HOURS,
} = process.env

const IN_PROD = NODE_ENV === 'production'

// TODO: DB

const users = [
    {
       id: 1, Nombre: 'reghisbot', email : 'reghisbot@gmail.com', password : '123' 
    },
    {
        id: 2, Nombre: 'america', email: 'america@gmail.com', password: '123'
    },
    {
        id: 3, Nombre: 'admin', email: 'admin@gmail.com', password: '123'
    }
]

const app = express();

app.use(bodyParser.urlencoded({
    extended:true
}));


// static files
app.use(express.static(path.join(__dirname, '/public')));

//app.listen(app.get('port'), () => {
//    console.log('Server esta ejecutando en el puerto [' + app.get('port') + ']');
//})

app.listen(PORT, () => {
    console.log('server REGHISBOT se esta ejecutando en el puerto[' + PORT + ']');
    'http://localhost:'+ PORT
})

app.use(session({
    name: SESS_NAME,
    resave: false,
    saveUninitialized: false,
    secret: SESS_SECRET,
    cookie: {
        maxAge: SESS_LIFETIME,
        sameSite: true,    // 'strict'
        secure: IN_PROD
    }
}))

// manejo de session

const redirectLogin = (req, res, next) => {
    if (!req.session.userId) {
        res.redirect('/login')
    } else {
       next()
    }

}


const redirectHome = (req, res, next) => {
    if (!req.session.userId) {
        res.redirect('/Home')
    } else {
        next()
    }

}



// routes login
app.get('/alfa', (req, res) => {
    //console.log(req.session)
    //const { userId } = req.session
    const userId = 1
    console.log(userId)
    res.send(`
        <h1>Welcome</h1>
        ${userId ? `
                <a href='/home'>Home </a>
                <form method='post' action='/logout'> 
                    <button>Logout</button>
                </form>
            `: `
                <a href='/login'>Login </a>
                <a href='/register'>Register </a>
            `}
        
        `)
});

// routes login
app.get('/home', (req, res) => {   
    res.send(`
        <h1>Home</h1>
        <a href='/alfa'> Main </a>
            <ul>
                <li>Nombre: </li>
                <li>Email:  </li>
            </ul>
    `)
});

// routes login
app.get('/login' , (req, res) => {
    res.send(`
        <h1>Login </h1>
        <form method='POST' action='/login' >
            <input type='email' name='email' placeholder='Email' required />
            <input type='password' name='email' placeholder='Password' required />
            <input type='submit'/>
        </form>
       <a href='/register'>Register</a>
    `)
});

// register
app.get('/register', redirectHome, (req, res) => {
    res.send(`
        <h1>Register </h1>
        <form method='POST' action='/register' >
            <input name='Nombre' placeholder='Nombre' required />
            <input type='email' name='email' placeholder='Email' required />
            <input type='password' name='email' placeholder='Password' required />
            <input type='submit'/>
        </form>
        <a href='/login'>Login</a>
    `)
});


// routes login

app.post('/login', redirectHome, (req, res) => {
    const { email, password } = req.body

    if (email && password) {    // TODO: Validation
        const user = users.find(u => u.email === email && u.password === password); // TODO hash
        if (user) {
            req.session.userId = user.id
            return res.redirect('/home');
        }
    }
    res.redirect('/login')
});

// register
app.post('/register', redirectHome, (req, res) => {
    const { Nombre, email, password } = req.body

    if (Nombre && email && password) {    // TODO: Validation
        const exists = users.some(
            u => u.email ===  email
        )
        if (!exists) {
            const user = {
                Id: users.length + 1,
                Nombre,
                email,
                password // TODO: hash
            }

        users.push(user);

        req.session.userId = user.id;
        return res.redirect('/home');
        }

        
    }
    return res.redirect('/register');     // TODO: qs /register?error = error.auth.emailTooShort

});


// logout 
app.post('/logout', redirectLogin, (req, res) => {
    req.session.destroy(err => {
        if (err) {
           return res.redirect('/home')
        }
        res.clearCookie(SESS_NAME)

        res.redirect('/login')
    })
})

// database
const usuarios = [
    {
        "id" : 1,
        "nombre": 'admin',
        "pwd":"123"
    },
    {
        "id" : 2,
        "nombre": 'reghisbot',
        "pwd" : "1234"
    }
];

// database Lista

const lista = [
    {
        "idSis" : 1,
        "Descripcion": "Sistema de Inventarios.",
    },
    {
        "idSis": 2,
        "Descripcion": "Sistema de nómina.",
    },
    {
        "idSis": 3,
        "Descripcion": "sistema de contabilidad.",
    },
    {
        "idSis": 4,
        "Descripcion": "Sistema de administración de riesgo financiero.",
    },
    {
        "idSis": 5,
        "Descripcion": "Sistema de administración financiera.",
    },
    {
        "idSis": 6,
        "Descripcion": "Sistema de solicitudes de crédito.",
    },
    {
        "idSis": 7,
        "Descripcion": "Sistema de puntos de venta.",
    },
    {
        "idSis": 8,
        "Descripcion": "Sistema de administración inmobiliaria.",
    },
    {
        "idSis": 9,
        "Descripcion": "Sistema de reclutamiento de personal.",
    },
    {
        "idSis": 10,
        "Descripcion": "Sistema de control de servicios bancarios.",
    }
];





// routes

app.get('/usuarios', (req, res) => {
    res.json(usuarios);
});

app.get('/rvr', (req, res) => {
    console.log("en rvr");
    res.json(usuarios);
});


// post usuarios
app.post('/usuarios', (req, res) => {
    //const { nombre } = req.body;    //elmet script 6
    res.json('Satisfactoriamente Agregado!!!');
    
});


app.get('/lista', (req, res) => {
    res.json(lista);
})









