const express = require('express');
const cors = require('cors');
const productsRouter = require('./routes/products');

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/products', productsRouter);

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('Servidor de Productos Funcionando');
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor de Productos escuchando en http://localhost:${PORT}`);
});
