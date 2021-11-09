import {middyfy} from "@libs/lambda";
import {getProductById} from "../../services/productService";
import {formatJSONResponse} from "@libs/apiGateway";

const getProductsById = async (event) => {
  console.log(event);
  const productId = event.pathParameters.productId;
  return formatJSONResponse(getProductById(productId));
}

export const main = middyfy(getProductsById);