import {middyfy} from "@libs/lambda";
import {getAllProducts} from "../../services/productService";
import {formatJSONResponse} from "@libs/apiGateway";

const getProductList = async (event) => {
  console.log(event);
  return formatJSONResponse(getAllProducts());
}

export const main = middyfy(getProductList);