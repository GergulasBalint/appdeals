const { createPool } = require('./utils/db');

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'GET') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const pool = await createPool();
    const query = `
      SELECT DISTINCT relative as category
      FROM appsumo_products
      WHERE relative IS NOT NULL
      AND relative != ''
      ORDER BY relative;
    `;

    const [results] = await pool.query(query);
    
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify(results)
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Database error' })
    };
  }
}; 