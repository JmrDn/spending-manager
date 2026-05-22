import { defineStore } from "pinia";
import { type CategoriesDTO } from "@/dto/Category";
const useCategoryStore = defineStore('category', {
    state: (): {
        categories: CategoriesDTO[]
    } => ({
        categories: [
            {
                category: 'Drinks',
                noOfItems: 10
            },
        ]
    }),
    getters: {
        getCategories (): CategoriesDTO[] {
            return this.categories
        }
    },
    actions: {
        addCategory (category: CategoriesDTO): void{
            this.categories.push(category)
        }
    },
    persist: {
        storage: sessionStorage
    }
})


export default useCategoryStore