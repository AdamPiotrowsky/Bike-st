const express = require('express');
const bodyParser = require('body-parser');
const pool = require('./db');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')); // Serwowanie plików statycznych
app.set('view engine', 'ejs');

// Routes
app.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM bikes');
    res.render('index', { bikes: result.rows, message: '' });
  } catch (err) {
    console.error(err.message);
  }
});

app.post('/add-to-cart/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const checkCart = await pool.query('SELECT * FROM cart WHERE bike_id = $1', [id]);
    if (checkCart.rows.length > 0) {
      return res.status(400).json({ message: 'This bike is already in the cart!' });
    }
    await pool.query('INSERT INTO cart (bike_id) VALUES ($1)', [id]);
    res.status(200).json({ message: 'Bike added to cart successfully!' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Failed to add bike to cart.' });
  }
});

app.get('/cart', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT c.id, b.name, b.mark, b.color, b.price, b.type, b.quality, b.image 
      FROM cart c 
      JOIN bikes b ON c.bike_id = b.id
    `);
    res.render('cart', { cart: result.rows, message: '' });
  } catch (err) {
    console.error(err.message);
  }
});

app.post('/remove-from-cart/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM cart WHERE id = $1', [id]);
    res.redirect('/cart');
  } catch (err) {
    console.error(err.message);
    res.render('message', { message: 'Failed to remove bike from cart.' });
  }
});

app.post('/checkout', async (req, res) => {
  try {
    const cartItems = await pool.query('SELECT bike_id FROM cart');
    const bikeIds = cartItems.rows.map(item => item.bike_id);

    // Clear the cart first to avoid foreign key constraint issues
    await pool.query('DELETE FROM cart WHERE bike_id = ANY($1::int[])', [bikeIds]);

    // Delete bikes from bikes table
    if (bikeIds.length > 0) {
      await pool.query('DELETE FROM bikes WHERE id = ANY($1::int[])', [bikeIds]);
    }

    res.status(200).json({ message: 'Purchase successful!' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Purchase failed!' });
  }
});

app.post('/cancel', async (req, res) => {
  try {
    await pool.query('DELETE FROM cart');
    res.redirect('/');
  } catch (err) {
    console.error(err.message);
    res.render('message', { message: 'Failed to cancel cart.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
