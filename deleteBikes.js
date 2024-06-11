const pool = require('./db');

const deleteBikes = async () => {
  try {
    await pool.query('DELETE FROM bikes');
    console.log('All bikes deleted from the database successfully!');
  } catch (err) {
    console.error('Error deleting bikes from the database', err);
  } finally {
    pool.end();
  }
};

deleteBikes();
