import { Component, OnInit } from '@angular/core';
import { Account } from './account.model';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Pagination } from '../shared/pagination/pagination.model';
import { NotificationService } from '../shared/messages/notification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'truffle-adm-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  accounts: Account[] = []
  accountSelected: Account

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
        this.accounts = result.content
      })
  }

  load(pagination: Pagination, seach?: string) { 
    this.pagination = pagination
    this.pagination.orderby = "id"
    this.categoryService.getCategories(this.pagination, seach).subscribe(_page => {
      if(_page) {
        this.page = _page
        this.accounts = _page.content
      }
    })
  }

  getPage() {
    return this.page
  }

  select(obj: Account) {
    this.accountSelected = obj
  }

  delete() {
    this.categoryService.delete(this.accountSelected.id).subscribe(res => {
      this.notificationService.notify(`Categoria excluida com sucesso ${this.accountSelected.name}`)
      
      this.loadCategories(this.pagination)

      this.categoryService.delete(this.accountSelected.id).subscribe(res=> {
        console.log('image deleted')
      })

    }, error => {
      console.log(error)
      this.notificationService.notify(`${error.status === 403 ? 'Você não tem permissão para executar esta operação.': error.message }`)
    })
  }


}
