import { Pagination } from './pagination.model';
import { Component, OnInit, Output, Input, EventEmitter, AfterContentInit, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'truffle-adm-pagination',
  templateUrl: './pagination.component.html'
})
export class PaginationComponent implements OnInit {

  amountPagesAvailable: number = 10
  pageActive: number = 1
  size: number
  numberOfElements: number
  linesPerPage: number [] = [10,50,100]
  linesPerPageSelected: number = this.linesPerPage[0]
  totalElements: number
  totalPages: number
  isFirstPage: boolean
  isLastPage: boolean

  pages: string[] = []

  pageStart: number = 0
  pageEnd: number = 0
  
  @Input() page: any
  @Output() load = new EventEmitter<Pagination>()

  @ViewChild('pageNumber') pageNumber: ElementRef

  pagination = new Pagination()

  constructor() {}

  ngOnInit() {
    this.pagination.page = 0
    this.pagination.linesPerPage = this.linesPerPageSelected
    this.load.emit(this.pagination)
  }

  ngOnChanges() {
    this.loadValues()
    this.setupPages()
  }

  
  setupPages() {
    
    if(this.totalPages > 10) {
      if(!this.pageEnd || this.pageEnd == 0) {
        this.pageEnd = 10
      }
    } else {
      this.pageEnd = this.totalPages
    }
    
    console.log('pageend',  this.totalPages)

    this.pages = []
    for(let i = this.pageStart; i < this.pageEnd; i++) {
      this.pages.push((i + 1) + "")
    }
  
  }

  loadValues() {
    if(this.page) {
      this.totalElements = this.page.totalElements
      this.totalPages = this.page.totalPages
      this.isFirstPage = this.page.first
      this.isLastPage = this.page.last
      this.size = this.page.size
      this.numberOfElements = this.page.numberOfElements
    }
  }

  linesSelected(event) {
    let value: number = event.target.value
    
    for(let i= 0; i< this.linesPerPage.length; i++) {
      if(value == this.linesPerPage[i]) {
        this.linesPerPageSelected = this.linesPerPage[i]
        break    
      }
    }

    this.pagination.page = 0
    this.pageActive = 1
    this.pagination.linesPerPage = this.linesPerPageSelected
    this.load.emit(this.pagination)
  }

  loadPage(_page: any) {
    this.pageActive = _page
    let pageSelectedOnPagination =  _page
    if(_page <= this.totalPages) {
      this.pagination.page = pageSelectedOnPagination - 1
      this.pagination.linesPerPage = this.linesPerPageSelected
      this.load.emit(this.pagination)
    }
  }

  nextPage() {
    //this.pagesLength = this.pagesLength +this.amountPagesAvailable

    this.pageStart = this.pageEnd
    this.pageEnd += this.amountPagesAvailable
    console.log('page start', this.pageStart)

    this.pageActive = this.pageStart + 1
    this.pagination.page = this.pageActive - 1
    this.pagination.linesPerPage = this.linesPerPageSelected
    this.load.emit(this.pagination)
  }

  previousPage() {
    if(this.pageActive > 1) {

      this.pageEnd = this.pageStart
      this.pageStart -= this.amountPagesAvailable

      this.pageActive = this.pageStart + 1
      this.pagination.page = this.pageActive -1
      this.pagination.linesPerPage = this.linesPerPageSelected
      this.load.emit(this.pagination)
    }
  }

  firstPage() {

    this.pageStart = 0
    this.pageEnd = this.amountPagesAvailable

    this.pageActive = 1
    this.pagination.page = 0
    this.pagination.linesPerPage = this.linesPerPageSelected
    this.load.emit(this.pagination)
  }

  lastPage() {
    if(this.totalPages) {

      let lastPage = this.totalPages - 1
      this.pageActive = this.totalPages
      
      let rest = this.totalPages % this.amountPagesAvailable
      this.pageStart = this.totalPages - rest
      this.pageEnd = this.totalPages
    
      //backend
      this.pagination.page = lastPage
      this.pagination.linesPerPage = this.linesPerPageSelected
      this.load.emit(this.pagination)
    }
  }

  showTotals(): string {
    let offset: number =  1+ (this.pageActive * this.linesPerPageSelected) - this.linesPerPageSelected
    let size: number  = this.pageActive * this.numberOfElements
    if(this.numberOfElements !== this.linesPerPageSelected) {
      size = (this.pageActive * this.linesPerPageSelected) - (this.linesPerPageSelected - this.numberOfElements)
    }
    return `${offset} à ${size}  de Total ${this.totalElements }`
  }

}
