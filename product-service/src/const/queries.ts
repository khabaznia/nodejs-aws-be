export const SELECT_PRODUCTS = `SELECT p.*, s.count
                                FROM products p
                                         LEFT JOIN stocks s on p.id = s.product_id;`

export const SELECT_PRODUCT_BY_ID = `SELECT p.*, s.count
                                     FROM products p
                                              LEFT JOIN stocks s on p.id = s.product_id
                                     WHERE id = $1;`

export const CREATE_PRODUCT = `INSERT INTO products (id, title, description, image, price)
                               VALUES ($1, $2, $3, $4, $5)`

export const CREATE_STOCK = `INSERT INTO stocks (product_id, count)
                             VALUES ($1, $2)`
