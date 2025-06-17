import { Product, ProductList, ProductListConfig } from '../types/product.type'
import { SuccesReponse } from '../types/utils.type'
import http from '../utils/http'

const URL = 'products'
const productApi = {
  getProduct(params: ProductListConfig) {
    return http.get<SuccesReponse<ProductList>>(URL, {
      params
    })
  },
  getProductDetail(id: string) {
    return http.get<SuccesReponse<Product>>(`${URL}/${id}`)
  }
}

export default productApi
