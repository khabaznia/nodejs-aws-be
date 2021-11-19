import { CREATE_PRODUCT, CREATE_STOCK, SELECT_PRODUCT_BY_ID, SELECT_PRODUCTS } from '../const/queries'
import { ProductDTO } from '@functions/createProduct/handler'
import { ApplicationError, DatabaseError } from '../error/errors'
import { ErrorCode, ErrorMessage } from '../error/const'
import { Client } from 'pg'
import { DB_CONFIG } from '../const/db_config'

export interface Product {
  id: string
  title: string
  description: string
  image: string
  price: number
}

export interface Stock {
  product_id: string
  count: number
}

async function getClient () {
  const client = new Client(DB_CONFIG)
  try {
    await client.connect()
    console.log('Successfully connected to DB')
  } catch (err) {
    console.log(`An error during connection -> ${err.message}`)
    throw new DatabaseError(err.message)
  }
  return client
}

export const getProductById = async (id: string): Promise<Product> => {
  const client = await getClient()
  try {
    const response = await client.query(SELECT_PRODUCT_BY_ID, [id])
    if (!response.rows.length) {
      console.log(`No product for id -> ${id}`)
      throw new ApplicationError(ErrorMessage.NOT_FOUND, ErrorCode.NOT_FOUND)
    }
    console.log(`Products found -> ${response} `)
    return response.rows[0] as Product
  } catch (err) {
    console.log(`An error during execution -> ${err.message}`)
    throw new DatabaseError(err.message)
  } finally {
    client.end()
  }
}

export const getAllProducts = async (): Promise<Product[]> => {
  const client = await getClient()
  try {
    console.log('Try to get all products')
    const { rows: selectedProduct } = await client.query(SELECT_PRODUCTS)
    return selectedProduct as Product[]
  } catch (err) {
    console.log(`An error during execution -> ${err.message}`)
    throw new DatabaseError(err.message)
  } finally {
    client.end()
  }
}

export const createNewProduct = async (product: ProductDTO): Promise<void> => {
  const client = await getClient()
  try {
    console.log('Try to create new product')
    await client.query('BEGIN')
    await client.query(CREATE_PRODUCT, [product.id, product.title, product.description, product.image, product.price])
    await client.query(CREATE_STOCK, [product.id, product.count])
    await client.query('COMMIT')
  } catch (err) {
    await client.query('ROLLBACK')
    throw new DatabaseError(`Rollback transaction due to ${err.message}`)
  } finally {
    client.end()
  }
}
