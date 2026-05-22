import { defineStore } from "pinia";
import { type UsersDTO } from "@/dto/Users";
const useUserStore = defineStore('users', {
    state: (): {
        user: UsersDTO
    } => ({
        user: {
                email: '',
                username: '',
                fullName: ''
            },
    }),
    getters: {
        getUserInfo (): UsersDTO {
            return this.user
        },
        getUsername (): string {
            return this.user.username
        },
        getFirstName (): string {
            return this.user.fullName.split(' ')[0]
        },
        getEmail (): string {
            return this.user.email
        },
        getFullname () : string {
            return this.user.fullName
        }

    },
    actions: {
        updateUserInfo (data: UsersDTO): void{
            this.user = data
        }
    },
    persist: {
        storage: sessionStorage
    }
})


export default useUserStore