import { Category } from './category.model';
import { CategoryService } from './category.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'truffle-adm-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  categories: Category[] = []
  categorySelected: Category

  snackbarMessage: string = 'Categoria excluida com sucesso'
  snackVisibility: string = 'hidden'

  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
    this.loadCategories()
  }

  loadCategories() {
    this.categoryService.getCategories().subscribe(_categories => {
      if(_categories) {
        this.categories = _categories
      }
    })
  }

  selecteCategory(category: Category) {
    this.categorySelected = category
  }

  deleteCategory() {
    console.log(this.categorySelected)
    this.categoryService.delete(this.categorySelected.id).subscribe(res => {
      console.log(res)
      this.snackbarVisibilityState()
      this.loadCategories()
    })
  }

  snackbarVisibilityState() {
    this.snackVisibility = this.snackVisibility === 'hidden' ? 'visible': 'hidden'
  }

}
