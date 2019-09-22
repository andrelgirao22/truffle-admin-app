import { Pagination } from './../shared/pagination/pagination.model';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { NotificationService } from '../shared/messages/notification.service';
import { Component, OnInit } from '@angular/core';
import { Category } from './category.model';
import { CategoryService } from './category.service';

import 'rxjs/add/operator/switchMap'
import 'rxjs/add/operator/debounce'

@Component({
  selector: 'truffle-adm-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  categories: Category[] = []
  categorySelected: Category

  searchForm: FormGroup
  searchControl: FormControl

  pagination:Pagination

  page: any

  constructor(
      private categoryService: CategoryService,
      private formBuilder: FormBuilder,
      private notificationService: NotificationService,
      private router: Router) { }

  ngOnInit() {

    this.searchControl = this.formBuilder.control('')

    this.searchForm = this.formBuilder.group({
      search: this.searchControl
    })
    let pagination = new Pagination() 

    this.searchControl.valueChanges
      .switchMap(term => this.categoryService.getCategories(pagination, term))
      .subscribe(result => {
        this.categories = result.content
      })
  }

  loadCategories(pagination: Pagination, seach?: string) { 
    this.pagination = pagination
    this.pagination.orderby = "id"
    this.categoryService.getCategories(this.pagination, seach).subscribe(_page => {
      if(_page) {
        this.page = _page
        this.categories = _page.content
      }
    })
  }

  getPage() {
    return this.page
  }

  selecteCategory(category: Category) {
    this.categorySelected = category
  }

  deleteCategory() {
    this.categoryService.delete(this.categorySelected.id).subscribe(res => {
      this.notificationService.notify(`Categoria excluida com sucesso ${this.categorySelected.name}`)
      
      this.loadCategories(this.pagination)

      this.categoryService.delete(this.categorySelected.id).subscribe(res=> {
        console.log('image deleted')
      })

    }, error => {
      console.log(error)
      this.notificationService.notify(`${error.status === 403 ? 'Você não tem permissão para executar esta operação.': error.message }`)
    })
  }

}
