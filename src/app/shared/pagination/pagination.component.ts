import { Pagination } from './pagination.model';
import { Component, OnInit, Output, Input, EventEmitter, AfterContentInit } from '@angular/core';

@Component({
  selector: 'truffle-adm-pagination',
  templateUrl: './pagination.component.html'
})
export class PaginationComponent implements OnInit {

  size: number
  linesPerPage: number [] = [5,10,50,100]
  linesPerPageSelected: number = 5 
  totalElements: number
  totalPages: number
  isFirstPage: boolean
  isLastPage: boolean

  pagination = new Pagination()

  @Input() page: any
  @Output() load = new EventEmitter<Pagination>()

  constructor() {}

  ngOnInit() {
    this.pagination.linesPerPage = this.linesPerPageSelected
    this.load.emit(this.pagination)
  }

  ngOnChanges() {
    this.loadValues()
  }

  loadValues() {
    if(this.page) {
      this.totalElements = this.page.totalElements
      this.totalPages = this.page.totalPages
      this.isFirstPage = this.page.first
      this.isLastPage = this.page.last
      console.log(this.totalElements)
      console.log(this.totalPages)
      console.log(this.isFirstPage)
      console.log(this.isLastPage)
    }
  }

  linesSelected(event) {
    this.linesPerPageSelected = event.target.value
    this.pagination.linesPerPage = event.target.value
    this.pagination.page = 0
    this.load.emit(this.pagination)
  }

  getTotalPages() {
    let pages: string[] = []
    if(this.totalPages) {
      for(let i = 0; i < this.totalPages; i++) {
        pages.push((i + 1) + "")
      }
    }
    return pages
  }

  loadPage(_page: any) {
    let pageSelected = _page - 1
    console.log(pageSelected)
    if(_page <= this.totalPages) {
      this.pagination.page = pageSelected
      this.pagination.linesPerPage = this.linesPerPageSelected
      this.load.emit(this.pagination)
    }
  }

  firstPage() {
    this.pagination.page = 0
    this.pagination.linesPerPage = this.linesPerPageSelected
    this.load.emit(this.pagination)
  }

  lastPage() {
    if(this.totalPages) {
      let lastPage = this.totalPages - 1
      this.pagination.page = lastPage
      this.pagination.linesPerPage = this.linesPerPageSelected
      this.load.emit(this.pagination)
    }
  }

}
