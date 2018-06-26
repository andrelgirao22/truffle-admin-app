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

    this.itemService.getItens(pagination).subscribe(_page => {
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
      let pagination = new Pagination()
      pagination.linesPerPage = 5
      this.loadItens(pagination)
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
