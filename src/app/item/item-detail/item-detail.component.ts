import { TRUFFLE_API } from './../../truffle.adm.api';

import { Category } from './../../category/category.model';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ItemService } from './../item.service';
import { Item } from './../item.model';
import { Component, OnInit } from '@angular/core';
import { Price } from '../price.model';
import { CategoryService } from '../../category/category.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Moment } from '../../../../node_modules/moment';
import { DomSanitizer } from '@angular/platform-browser';
import { ImageUtilService } from '../../services/image-util.service';

const defaultPathImage: string = "assets/images/150x100.png"

@Component({
  selector: 'truffle-adm-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css']
})
export class ItemDetailComponent implements OnInit {

  imageSelected: any

  dateSelected: {startDate: Moment, endDate: Moment};

  categories: Category[] = []
  priceTypes: any [] = []
  prices: Price[] = []
  priceSelected: Price
  categorySelected: Category = new Category()

  itemForm: FormGroup
  imageForm: FormGroup
  priceForm: FormGroup

  images: any [] = [defaultPathImage, defaultPathImage, defaultPathImage]

  numberPattern = /^[0-9]*$/

  mask: any[] = ['+', '1', ' ', '(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

  constructor(
    private itemService: ItemService,
    private categoryService: CategoryService,
    private activatedRouter: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private sanitizer: DomSanitizer,
    private imageUtilService: ImageUtilService) { 
    }

  ngOnInit() {
    this.setupForm()
    this.loadCategories()
    this.loadItem()
    this.loadPriceTypes()
    this.loadImages()
  }


  setupForm() {
    this.priceForm = this.formBuilder.group({
      typePrice: '',
      price: '',
      dates: '',
      dtStart: '',
      dtEnd: ''
    })

    this.itemForm = this.formBuilder.group({
      id: this.formBuilder.control(''),
      name: this.formBuilder.control('', [Validators.required, Validators.minLength(5)]),
      description: this.formBuilder.control('', [Validators.required, Validators.minLength(5)]),
      category: this.formBuilder.control('', [Validators.required]),
      image: this.formBuilder.control(''),
      imageUrl: this.formBuilder.control(''),
      prices: this.formBuilder.array([])
    })

    this.imageForm = this.formBuilder.group({
      file: this.formBuilder.control(null)
    })
  }

  resetPriceForm() {
    this.priceForm.reset()
  }

  loadItem() {

    let id: string = this.activatedRouter.snapshot.params['id']
    if(id) {
      this.itemService.getItem(id).subscribe(res => {

        this.prices = res.prices
        this.itemForm.patchValue({
          id: res.id,
          name: res.name,
          description: res.description,
          category: res.category.id,
          imageUrl: res.imageUrl
        })
        
        this.imageSelected = res.imageUrl
        this.selectCategory(this.itemForm.value.category)
        this.prices.forEach(price => {
          this.itemForm.value.prices.push(price)
        })
      }) 
    }
  }

  loadCategories() {
    //let pagination = new Pagination()
    this.categoryService.getAllCategories().subscribe(_categories => {
      this.categories = _categories
    }, error => console.log(error))
  }

  loadPriceTypes() {
    this.itemService.getPriceType().subscribe(types=> {
      this.priceTypes = types
    })
  }

  loadImages() {

    for(let i = 0 ; i < 3; i++) {
      let id: string = this.activatedRouter.snapshot.params['id']
      
      this.itemService.getImage(id, `${i}`).subscribe(res => {
        console.log('image',res)

        const blob = new Blob([res.body], { type: 'application/octet-stream' })
        let image = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(blob))

        this.images[i] = image
        
      }, error => {
        console.log(error)
      })

    }

  }
  
  save() {

    let item = new Item()
    item.id = this.itemForm.value.id
    item.status = "PENDENTE"
    item.name = this.itemForm.value.name
    item.description = this.itemForm.value.description
    item.category = this.categorySelected
    item.prices = this.itemForm.value.prices
    item.imageUrl = this.itemForm.value.imageUrl
    
    let id: string = this.activatedRouter.snapshot.params['id']

    if(id) {
      this.itemService.update(item).subscribe(res => {

        this.sendImage(id)
        this.showAlert()
      }, error=> {
        this.itemService.setMessage(`Problemas ao salvar item ${error}`)
      })
    } else {
      this.itemService.insert(item).subscribe(res => {

        let id: string = res.headers["location"]["id"]

        this.sendImage(id)
        this.showAlert()
      }, error=> {
        this.itemService.setMessage(`Problemas ao salvar item ${error}`)
      })
    }
  }


  showAlert() {
    let msg: string = this.itemForm.value.id ? "alterado" : "incluído"
    this.itemService.setMessage(`Item ${msg} com sucesso`)
    this.router.navigate(['/item'])
  }

  sendImage(id: string) {

    this.images.forEach((i, index) => {
      debugger
      if (typeof i === "string" && i !== defaultPathImage) {
        this.itemService.sendImage(id, `${index}.png`, this.images[index]).subscribe(res => {
          this.images[index] = res
        }, error => {
          this.itemService.setMessage(`Problemas ao gravar imagens: ${error.error.message}`)
        })
      }
    })
  }

  removerImage(_image) {
    let index = this.images.findIndex(i => i === _image)
    debugger
    let defaultImage: boolean = (_image == defaultPathImage)
    if(index > - 1 && !defaultImage) {

      let id: string = this.activatedRouter.snapshot.params['id']
  
      this.itemService.deleteImage(id, `${index}`).subscribe(res => {
        this.images[index] = defaultPathImage
      }, error => {
        console.log(error)
      })
    }
  }

  addPrice() {
    
    let price = new Price()
    price.typePrice = this.priceForm.value.typePrice
    price.price = this.priceForm.value.price
    price.dtStart = this.priceForm.value.dtStart
    price.dtEnd = this.priceForm.value.dtEnd
    this.prices.push(price)
    
    this.itemForm.value.prices.push(price)

  }

  deletePrice() {
    
    if(this.priceSelected) {
      let index = this.prices.indexOf(this.priceSelected)
      if(index > -1) {
        this.prices.splice(index, 1)
        this.itemForm.value.prices.splice(index, 1)
      }
    }
  }

  selectPrice(price: Price) {
    this.priceSelected = price
  }

  selectCategory(value: any) {
    console.log('valor categoria', value)
    this.categorySelected.id = value
  }

  onFileSelected(event: any) {
    let selectedFile = event.target.files[0]

    let reader = new FileReader()
    reader.onload = (e: any) => {
      let index = this.images.findIndex(i=> i === defaultPathImage)
      this.images[index] =  e.target.result
    }

    reader.readAsDataURL(selectedFile)
  }

  changeDate(event: any) {
    console.log(this.dateSelected)
    let startDate = this.dateSelected.startDate
    let endDate = this.dateSelected.endDate
    
    this.priceForm.controls.dtStart.setValue(startDate)
    this.priceForm.controls.dtEnd.setValue(endDate)
  }

}
