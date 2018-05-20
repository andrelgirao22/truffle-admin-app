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

  constructor(
      private categoryService: CategoryService,
      private notificationService: NotificationService) { }

  ngOnInit() {
    this.loadCategories()
  }

  loadCategories() {
    this.categoryService.getCategories().subscribe(_categories => {
      if(_categories) {
        this.categories = _categories
        console.log(this.categories)
      }
    })
  }

  selecteCategory(category: Category) {
    this.categorySelected = category
  }

  deleteCategory() {
    this.categoryService.delete(this.categorySelected.id).subscribe(res => {
      this.notificationService.notify(`Categoria excluida com sucesso ${this.categorySelected.name}`)
      this.loadCategories()
    })
  }

}
