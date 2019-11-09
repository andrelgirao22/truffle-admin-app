import { Component, OnInit } from '@angular/core';
import { Account } from './account.model';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Pagination } from '../shared/pagination/pagination.model';
import { AccountService } from './account.service';

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
      private service: AccountService,
      private formBuilder: FormBuilder) { }

  ngOnInit() {

    this.searchControl = this.formBuilder.control('')

    this.searchForm = this.formBuilder.group({
      search: this.searchControl
    })
    let pagination = new Pagination() 

    this.searchControl.valueChanges
      .switchMap(term => this.service.get(pagination, term))
      .subscribe(result => {
        this.accounts = result.content
      })
  }

  load(pagination: Pagination, seach?: string) { 
    this.pagination = pagination
    this.pagination.orderby = "id"
    this.service.get(this.pagination, seach).subscribe(_page => {
      if(_page) {
        this.page = _page
        this.accounts = _page.content
        console.log(this.accounts)
      }
    })
  }

  getPage() {
    return this.page
  }

  select(obj: Account) {
    this.accountSelected = obj
  }

}
