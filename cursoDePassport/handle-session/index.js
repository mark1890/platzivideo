const express = require('express');
const session = require('express-session');

const app = express();

app.use(session({
	resave: false, //que no guarde la cookie cada vez que haya un cambio
	saveUninitialized: false, // si la cookie no se ha inicializado que no la guarde por defecto
	secret: "keyword cat"
}))

app.get('/', (req, res) => {
	req.session.count = req.session.count ? req.session.count + 1 : 1;
	res.status(200).json({ hello: 'world', counter: req.session.count })
})

app.listen(3000, () => {
	console.log('Listening http://localhost:3000')
})