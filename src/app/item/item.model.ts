import { Category } from './../category/category.model';
import { Price } from './price.model';
import { Note } from './note.model'

export class Item {

    id: number
    name: string
    description: string
    image: string
    imageLoaded: any
    category: Category
    prices: Price[] = []
    notes: Note[] = []
    note: number

}