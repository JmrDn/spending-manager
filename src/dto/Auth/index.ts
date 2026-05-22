export interface SignupDTO {
    username: string
    email: string
    firstName: string
    lastName: string
    password: string
    confirmPassword: string
}

export type LoginDTO = Omit<SignupDTO, 'email' | 'lastName' | 'firstName' | 'confirmPassword' >