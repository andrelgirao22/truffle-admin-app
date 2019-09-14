import { Pagination } from './../shared/pagination/pagination.model';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Item } from './item.model';
import { ItemService } from './item.service';
import { Component, OnInit } from '@angular/core';

import 'rxjs/add/operator/switchMap'

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

  searchForm: FormGroup
  searchControlForm: FormControl

  pagination: Pagination

  constructor(
      private itemService: ItemService,
      private formBuilder: FormBuilder) { }

  ngOnInit() {
    
    this.searchControlForm = this.formBuilder.control('')

    this.searchForm = this.formBuilder.group({
      search : this.searchControlForm
    })

    this.searchControlForm.valueChanges.switchMap(term => this.itemService.getItens(new Pagination(), term))
      .subscribe(result => {
        this.itens = result.content
      })

  }

  loadItens(pagination: Pagination) {
    this.pagination = pagination
    this.pagination.orderby = "id"
    this.itemService.getItens(this.pagination).subscribe(_page => {
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

      this.itemService.deletePicture(this.itemSelected.id).subscribe(res=> {

      }, error => {
        this.itemService.setMessage(`Operação não permitida ${error}`)
      })
      
      this.loadItens(this.pagination)
    })
  }

  setStatus(item: Item) {
    item.status = item.status === 'PUBLICADO' ? "PENDENTE" : "PUBLICADO"
    this.itemService.update(item).subscribe(res => {
      this.itemService.setMessage(`Status do item mudou para ${item.status}`)
    }, 
    error => {

   })
    
  }

}
