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

  snackbarMessage: string = 'Item excluido com sucesso'
  snackVisibility: string = 'hidden'

  constructor(private itemService: ItemService) { }

  ngOnInit() {
    this.loadItens()
  }

  loadItens() {
    this.itemService.getItens().subscribe(_itens => {
      this.itens = _itens
      console.log(this.itens)
      //this.loading = false
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
      this.snackbarVisibilityState()
      this.loadItens()
    })
  }

  snackbarVisibilityState() {
    this.snackVisibility = this.snackVisibility === 'hidden' ? 'visible': 'hidden'
  }

}
