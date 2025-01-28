const { createPool } = require('./utils/db');

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'GET') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const pool = await createPool();
    const params = event.queryStringParameters || {};
    const pathSegments = event.path.split('/');
    const type = pathSegments[pathSegments.length - 2]; // 'software' or 'courses'
    const id = pathSegments[pathSegments.length - 1];

    // If ID is provided, fetch single product
    if (id && id !== 'software' && id !== 'courses') {
      const [product] = await pool.query(
        'SELECT * FROM appsumo_products WHERE absolute_href LIKE ?',
        [`%${id}%`]
      );
      return {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify(product[0])
      };
    }

    // Otherwise, fetch product list
    const limit = parseInt(params.limit) || 12;
    const offset = parseInt(params.offset) || 0;
    const searchTerm = params.search || '';
    const category = params.category || '';
    const sortOrder = params.sortOrder || '';

    let query = `
      SELECT * FROM appsumo_products 
      WHERE product_type = ?
    `;
    
    let queryParams = [type];

    if (searchTerm) {
      query += ` AND (sr_only LIKE ? OR my_1 LIKE ?)`;
      queryParams.push(`%${searchTerm}%`, `%${searchTerm}%`);
    }

    if (category) {
      query += ` AND relative = ?`;
      queryParams.push(category);
    }

    // Add sorting
    switch (sortOrder) {
      case 'price_asc':
        query += ` ORDER BY CAST(REPLACE(REPLACE(font_medium, '$', ''), ',', '') AS DECIMAL(10,2)) ASC`;
        break;
      case 'price_desc':
        query += ` ORDER BY CAST(REPLACE(REPLACE(font_medium, '$', ''), ',', '') AS DECIMAL(10,2)) DESC`;
        break;
      case 'name_asc':
        query += ` ORDER BY sr_only ASC`;
        break;
      case 'name_desc':
        query += ` ORDER BY sr_only DESC`;
        break;
      default:
        query += ` ORDER BY absolute_href ASC`;
    }

    query += ` LIMIT ? OFFSET ?`;
    queryParams.push(limit, offset);

    const countQuery = query.split(' ORDER BY ')[0].replace('SELECT *', 'SELECT COUNT(*) as total');
    
    const [countResults] = await pool.query(countQuery, queryParams.slice(0, -2));
    const [results] = await pool.query(query, queryParams);

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        total: countResults[0].total,
        products: results
      })
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Database error' })
    };
  }
}; 