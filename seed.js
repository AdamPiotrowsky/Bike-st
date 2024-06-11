const pool = require('./db');

const bikes = [
    { name: 'Mountain King', mark: 'Kona', color: 'Red', price: 999.99, type: 'Mountain', quality: 'High', image: 'r1.jpg' },
    { name: 'Speedster', mark: 'Cannondale', color: 'Blue', price: 799.99, type: 'Road', quality: 'Medium', image: 'r2.jpg' },
    { name: 'Trail Blazer', mark: 'Trek', color: 'Green', price: 899.99, type: 'MTB', quality: 'High', image: 'r3.jpg' },
    { name: 'Urban Cruiser', mark: 'Giant', color: 'Black', price: 499.99, type: 'City', quality: 'Low', image: 'r4.jpg' },
    { name: 'All-Terrain', mark: 'Specialized', color: 'Yellow', price: 1099.99, type: 'Mountain', quality: 'High', image: 'r5.jpg' },
    { name: 'Commuter Pro', mark: 'Scott', color: 'White', price: 699.99, type: 'Road', quality: 'Medium', image: 'r6.jpg' },
    { name: 'Adventure Rider', mark: 'Merida', color: 'Orange', price: 1199.99, type: 'MTB', quality: 'High', image: 'r7.jpg' },
    { name: 'Speed Demon', mark: 'Bianchi', color: 'Purple', price: 1299.99, type: 'Road', quality: 'High', image: 'r8.jpg' },
    { name: 'Trail Crusher', mark: 'Santa Cruz', color: 'Gray', price: 999.99, type: 'Mountain', quality: 'Medium', image: 'r9.jpg' },
    { name: 'City Explorer', mark: 'Cube', color: 'Pink', price: 499.99, type: 'City', quality: 'Low', image: 'r10.jpg' }
];

const seedBikes = async () => {
  try {
    for (const bike of bikes) {
      await pool.query(
        'INSERT INTO bikes (name, mark, color, price, type, quality, image) VALUES ($1, $2, $3, $4, $5, $6, $7)',
        [bike.name, bike.mark, bike.color, bike.price, bike.type, bike.quality, bike.image]
      );
    }
    console.log('Bikes have been added to the database.');
  } catch (err) {
    console.error('Error seeding bikes:', err);
  } finally {
    pool.end();
  }
};

seedBikes();
