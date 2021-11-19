import { middyfy } from '@libs/lambda'
import { createNewProduct } from '../../services/productService'
import { ErrorMessage } from '../../error/const'
import { v4 as uuid4 } from 'uuid'
import { ValidationError } from '../../error/errors'
import { executeAction } from '../../util/actionHandler'

export interface ProductDTO {
  id: string
  title: string
  description: string
  image: string
  price: number
  count: number
}

const createProduct = async (event) => {
  return await executeAction(async () => {
    console.log(`Got event -> ${event}`)
    const productDto = getValidDTO(event)
    await createNewProduct(productDto)
    return 'Product successfully added'
  })
}

const getValidDTO = (event): ProductDTO => {
  const productDto: ProductDTO = {
    id: uuid4(),
    title: event.body.title,
    description: event.body.description,
    image: event.body.image,
    price: event.body.price,
    count: event.body.count,
  }
  console.log('Got product DTO -> ', productDto)
  validate(productDto)
  return productDto
}

const validate = (productDto) => {
  console.log('Try to validate DTO')
  if (!productDto.title
    || !productDto.count
    || productDto.count < 0
    || productDto.price < 0) {
    throw new ValidationError(ErrorMessage.BAD_REQUEST)
  }
}
export const main = middyfy(createProduct)