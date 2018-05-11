import { Item } from './../item/item.model';
import { Account } from '../account/account.model';

class Order {
    
    orderValue: number
    orderItens: OrderItem[]
    payments: Payment[]
    account: Account
    date: Date
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