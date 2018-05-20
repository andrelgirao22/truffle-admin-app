import { element } from 'protractor';
import { NotificationService } from '../shared/messages/notification.service';
import { Component, OnInit } from '@angular/core';
import { Category } from './category.model';
import { CategoryService } from './category.service';

@Component({
  selector: 'truffle-adm-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  categories: Category[] = []
  categorySelected: Category

  size: number
  totalElements: number
  totalPages: number
  isFirstPage: boolean
  isLastPage: boolean

  constructor(
      private categoryService: CategoryService,
      private notificationService: NotificationService) { }

  ngOnInit() {
    this.loadCategories("")
  }

  loadCategories(parameters: string) {
    this.categoryService.getCategories(parameters).subscribe(_page => {
      if(_page) {
        console.log(_page)
        this.categories = _page.content
        this.isFirstPage = _page.first
        this.isLastPage = _page.last
        this.totalElements = _page.totalElements
        this.totalPages = _page.totalPages
        console.log(this.categories)
      }
    })
  }

  getTotalPages() {
    let page: string[] = []
    if(this.totalPages) {
      for(let i = 0; i < this.totalPages; i++) {
        page.push((i + 1) + "")
      }
    }
    return page
  }

  loadPage(page: any) {
    if(page < this.totalPages) {
      this.loadCategories(`&page=${page}`)
    }
  }

  firstPage() {
    this.loadCategories(`&page=0`)
  }

  lastPage() {
    let lastPage = this.totalPages - 1
    this.loadCategories(`&page=${lastPage}`)  
  }

  selecteCategory(category: Category) {
    this.categorySelected = category
  }

  deleteCategory() {
    this.categoryService.delete(this.categorySelected.id).subscribe(res => {
      this.notificationService.notify(`Categoria excluida com sucesso ${this.categorySelected.name}`)
      this.loadCategories("")
    })
  }

}
