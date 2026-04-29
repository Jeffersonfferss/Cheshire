const express = require('express');
const conectarDB = require('./db/database.js');
const rutasCompletas = require('./routes/rutas.js');

const app = express();


conectarDB();

app.use(express.json());

app.use('/api', rutasCompletas);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(` Servidor de Golf listo en http://localhost:${PORT}`);
});

app.get('/', (req, res) => {
    res.send('<h1> Bienvenido al Club de Golf Cheshire</h1><p>El servidor está funcionando perfectamente.</p>');
});
