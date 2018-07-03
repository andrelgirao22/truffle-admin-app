import { Pagination } from './../../shared/pagination/pagination.model';
import { state } from '@angular/animations';
import { Category } from './../../category/category.model';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ItemService } from './../item.service';
import { Item } from './../item.model';
import { Component, OnInit } from '@angular/core';
import { Price } from '../price.model';
import { CategoryService } from '../../category/category.service';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'truffle-adm-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css']
})
export class ItemDetailComponent implements OnInit {

  selectedFile: File
  imageSelected: any

  categories: Category[] = []
  priceTypes: any [] = []
  prices: Price[] = []
  priceSelected: Price
  categorySelected: Category = new Category()

  itemForm: FormGroup
  priceForm: FormGroup

  numberPattern = /^[0-9]*$/

  mask: any[] = ['+', '1', ' ', '(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];


  constructor(
    private itemService: ItemService,
    private categoryService: CategoryService,
    private activedRouter: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.loadCategories()
    this.loadItem()
    this.loadPriceTypes()
    this.setupForm()
  }

  setupForm() {

    this.priceForm = this.formBuilder.group({
      typePrice: '',
      price: '',
      dtStart: '',
      dtEnd: ''
    })

    this.itemForm = this.formBuilder.group({
      name: this.formBuilder.control('', [Validators.required, Validators.minLength(5)]),
      description: this.formBuilder.control('', [Validators.required, Validators.minLength(5)]),
      category: this.formBuilder.control('', [Validators.required]),
      image: this.formBuilder.control(''),
      prices: this.formBuilder.array([])
    })
  }

  loadItem() {
    let id: string = this.activedRouter.snapshot.params['id']
    console.log(id)
    if(id) {
     /* this.itemService.getItem(id).subscribe(res => {

        this.itemForm.patchValue({
          name: res.name,
          description: res.description,
          category: `${res.category.id} - ${res.category.name}` 
        })
        
        this.selectCategory(`${res.category.id} - ${res.category.name}`)

        this.itemForm.value.id = res.id
        this.itemForm.value.name = res.name
        this.itemForm.value.description = res.description
        this.itemForm.value.image = res.image
        this.itemForm.value.prices = res.prices
        this.itemForm.value.status = res.status
      }) */
    }
  }

  loadCategories() {
    let pagination = new Pagination()
    this.categoryService.getAllCategories().subscribe(_categories => {
      this.categories = _categories
    }, error => console.log(error))
  }

  loadPriceTypes() {
    this.itemService.getPriceType().subscribe(types=> {
      console.log(types)
      this.priceTypes = types
    })
  }
  
  save() {

    let item = new Item()
    item.id = this.itemForm.value.id
    item.status = "PENDENTE"
    item.name = this.itemForm.value.name
    item.description = this.itemForm.value.description
    item.category = this.categorySelected
    item.prices = this.itemForm.value.prices

    /*if(this.selectedFile) {
      item.image = this.selectedFile.name
    } else {
      item.image = this.itemForm.value.image
    }*/
    
    const fd = new FormData()
    fd.append('file', this.selectedFile)

    this.itemService.addItem(item).subscribe(res => {

      if(!item.id) {
        let location = res.headers.get('location')
        let id = location.substring(location.lastIndexOf('/') + 1)
        item.id = id
      }

      this.itemService.sendImage(fd, item.id + "").subscribe(res => {
        this.router.navigate(['/item'])
        let msg: string = this.itemForm.value.id ? "alterado" : "incluído"
        this.itemService.setMessage(`Item ${item.description} ${msg} com sucesso`)
      })
    })

    

  }

  addPrice() {
    
    let price = new Price()
    price.typePrice = this.priceForm.value.typePrice
    price.price = this.priceForm.value.price
    this.prices.push(price)
    
    this.itemForm.value.prices.push(price)

    console.log('prices', this.prices)

  }

  deletePrice() {
    if(this.priceSelected) {
      let index = this.itemForm.value.prices.indexOf(this.priceSelected)
      if(index > -1) {
        this.itemForm.value.prices.slice(index, 1)
      }
    }
  }

  selectPrice(price: Price) {
    this.priceSelected = price
  }

  selectCategory(value: any) {
    console.log('valor categoria', value)
    this.categorySelected.id = value
    //this.categorySelected.name = value.split('-')[1]
    //console.log(this.categorySelected)*/
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0]

    let reader = new FileReader()
    reader.onload = (e: any) => {
      this.imageSelected = e.target.result
    }

    reader.readAsDataURL(this.selectedFile)
  }


}
