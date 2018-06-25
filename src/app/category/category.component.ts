import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
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

  searchForm: FormGroup

  page: any

  constructor(
      private categoryService: CategoryService,
      private formBuilder: FormBuilder,
      private notificationService: NotificationService,
      private router: Router) { }

  ngOnInit() {
    this.searchForm = this.formBuilder.group({
      search: this.formBuilder.control('', [])
    })
  }

  loadCategories(parameters: string) {
     
    parameters += parameters ? "&orderby=id" : "?orderby=id"
    this.categoryService.getCategories(parameters).subscribe(_page => {
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
      this.loadCategories("?linesPerPage=5")

      this.categoryService.deletePicture(this.categorySelected.id).subscribe(res=> {
        console.log('image deleted')
      })

    }, error => {
      console.log(error)
      this.notificationService.notify(`${error.status === 403 ? 'Você não tem permissão para executar esta operação.': error.message }`)
    })
  }

}
