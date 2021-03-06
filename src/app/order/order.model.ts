import { Item } from './../item/item.model';
import { Account } from '../account/account.model';

class Order {
    
    id: number
    orderValue: number
    orderItens: OrderItem[]
    payments: Payment[]
    account: Account
    date: Date
    status: string
}

class OrderItem {
    
    item: Item
    quantity: Number
    value: Number
}

class Payment {
    
    paymentType: string
    value: number
    authorizationCode: string
}

export {Order, OrderItem, Payment}