import { Category } from './../category/category.model';
import { Price } from './price.model';
import { Note } from './note.model'

export class Item {

    id: number
    name: string
    date = new Date()
    description: string
    imageUrl: string
    imageLoaded: any
    category: Category
    prices: Price[] = []
    notes: Note[] = []
    note: number
    status: string

}