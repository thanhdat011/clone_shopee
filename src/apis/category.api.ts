import { Category } from "../types/category.type"
import { SuccesReponse } from "../types/utils.type"
import http from "../utils/http"

const URL = 'categories'

const categoryApi = {
    getCategories() {
        return http.get<SuccesReponse<Category[]>>(URL)
    }
}

export default categoryApi