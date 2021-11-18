import productList from 'src/services/productList.json'

export interface Product {
    id: string
    title: string
    description: string
    image: string
    price: number
    count: number
}

export const getProductById = (id: string): Product => productList.find(product => product.id === id)
export const getAllProducts = (): Product[] => productList