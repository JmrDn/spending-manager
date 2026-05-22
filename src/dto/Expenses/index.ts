export interface ExpenseDTO {
    id: number
    created_at: string | Date
    name: string
    price: number | null | undefined
    qty: number | null | undefined
}

export type FormExpenseDTO = Omit<ExpenseDTO, 'id' | 'created_at'>