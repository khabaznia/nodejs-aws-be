import { middyfy } from '@libs/lambda'
import { getAllProducts } from '../../services/productService'
import { executeAction } from '../../util/actionHandler'

const getProductList = async (event) => {
  console.log(`Got event -> ${event}`)
  return await executeAction(getAllProducts)
}

export const main = middyfy(getProductList)