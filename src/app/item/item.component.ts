import { Item } from './item.model';
import { ItemService } from './item.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'truffle-adm-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  page: any
  itens: Item[] = []
  loading: boolean = false
  errorMessage: string
  itemSelected: Item

  constructor(private itemService: ItemService) { }

  ngOnInit() {
  }

  loadItens(parameters: string) {

    this.itemService.getItens(parameters).subscribe(_page => {
      this.page = _page
      this.itens = _page.content
      console.log(this.itens)
    },
    error => { 
      console.log(error)
    })
  }

  getPage() {
    return this.page
  }

  select(item: Item) {
    this.itemSelected = item
  }

  delete() {
    console.log(this.itemSelected)
    this.itemService.delete(this.itemSelected.id).subscribe(res => {
      console.log(res)
      this.loadItens("")
    })
  }

  setStatus(item: Item) {
    item.status = item.status === 'PUBLICADO' ? "PENDENTE" : "PUBLICADO"
    this.itemService.addItem(item).subscribe(res => {
      this.itemService.setMessage(`Status do item mudou para ${item.status}`)
    }, 
    error => {

   })
    
  }

}
