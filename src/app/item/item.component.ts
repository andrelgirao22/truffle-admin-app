import { Item } from './item.model';
import { ItemService } from './item.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'truffle-adm-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  itens: Item[] = []
  loading: boolean = false
  errorMessage: string
  itemSelected: Item

  constructor(private itemService: ItemService) { }

  ngOnInit() {
    this.loadItens()
  }

  loadItens() {
    this.itemService.getItens().subscribe(_itens => {
      this.itens = _itens
      console.log(this.itens)
    },
    error => { 
      console.log(error)
    })
  }

  select(item: Item) {
    this.itemSelected = item
  }

  delete() {
    console.log(this.itemSelected)
    this.itemService.delete(this.itemSelected.id).subscribe(res => {
      console.log(res)
      this.loadItens()
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
