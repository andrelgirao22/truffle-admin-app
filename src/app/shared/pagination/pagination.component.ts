import { Component, OnInit, Output, Input, EventEmitter, AfterContentInit } from '@angular/core';

@Component({
  selector: 'truffle-adm-pagination',
  templateUrl: './pagination.component.html'
})
export class PaginationComponent implements OnInit {

  size: number
  totalElements: number
  totalPages: number
  isFirstPage: boolean
  isLastPage: boolean

  @Input() page: any
  @Output() load = new EventEmitter()

  constructor() {}

  ngOnInit() {
    this.load.emit("")
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
      this.load.emit(`?page=${pageSelected}`)
    }
  }

  firstPage() {
    this.load.emit(`?page=0`)
  }

  lastPage() {
    if(this.totalPages) {
      let lastPage = this.totalPages - 1
      this.load.emit(`?page=${lastPage}`)
    }
  }

}
