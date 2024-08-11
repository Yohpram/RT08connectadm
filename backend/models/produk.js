const pool = require('../config/config');

const getProductById = async (id) => {
    const result = await pool.query('SELECT * FROM tabel WHERE id = $1', [id]);
    return result.rows[0];
};

const getProducts = (callback) => {
    pool.query('SELECT * FROM tabel', (err, results) => {
        if (err) {
            return callback(err, null);
        }
        return callback(null, results.rows);
    });
};

const addProduct = (product, callback) => {
    const { nama, kategori_diamond, harga, keterangan, image } = product;
    pool.query(
        'INSERT INTO tabel (nama, kategori_diamond, harga, keterangan, image) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [nama, kategori_diamond, harga, keterangan, image],
        (err, results) => {
            if (err) {
                return callback(err, null);
            }
            return callback(null, results.rows[0]);
        }
    );
};

module.exports = {
    getProducts,
    getProductById,
    addProduct
};

