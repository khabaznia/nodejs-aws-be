import { middyfy } from '@libs/lambda'
import { getProductById } from '../../services/productService'
import { executeAction } from '../../util/actionHandler'

const getProductsById = async (event) => {
  return await executeAction(async () => {
    console.log(`Got event -> ${event}`)
    const productId = event.pathParameters.productId
    console.log(`Product id -> ${productId}`)
    return await getProductById(productId)
  })
}

export const main = middyfy(getProductsById)