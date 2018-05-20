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
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'truffle-adm-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css']
})
export class ItemDetailComponent implements OnInit {

  selectedFile: File
  imageSelected: any
  item: Item = new Item()

  categories: Category[] = []
  priceTypes: any [] = []
  priceSelected: Price
  categorySelected: Category = new Category()

  itemForm: FormGroup

  numberPattern = /^[0-9]*$/

  private readonly imageType: string = 'data:image/PNG;base64,'

  constructor(
    private itemService: ItemService,
    private categoryService: CategoryService,
    private activedRouter: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.loadCategories()
    this.loadItem()
    this.loadPriceTypes()
    this.setupForm()
  }

  setupForm() {
    this.itemForm = this.formBuilder.group({
      name: this.formBuilder.control(this.item.name, [Validators.required, Validators.minLength(5)]),
      description: this.formBuilder.control('', [Validators.required, Validators.minLength(5)]),
      category: this.formBuilder.control('', [Validators.required]),
      image: this.formBuilder.control('')
    })
  }

  loadItem() {
    let id: string = this.activedRouter.snapshot.params['id']
    console.log(id)
    if(id) {
      this.itemService.getItem(id).subscribe(res => {

        this.itemForm.patchValue({
          name: res.name,
          description: res.description,
          category: `${res.category.id} - ${res.category.name}` 
        })
        
        this.selectCategory(`${res.category.id} - ${res.category.name}`)

        this.item.id = res.id
        this.item.name = res.name
        this.item.description = res.description
        this.item.image = res.image
        this.item.prices = res.prices
        this.item.status = res.status
        this.itemService.getImage(this.item.image).subscribe((data: any) => {
          if(data) {
            this.imageSelected = this.sanitizer.bypassSecurityTrustUrl(this.imageType + data.image)
          }
        },
        error => console.log(error))
      })
    } 
  }

  loadCategories() {
    this.categoryService.getCategories("").subscribe(_categories => {
      this.categories = _categories
    }, error => console.log(error))
  }

  loadPriceTypes() {
    this.itemService.getPriceType().subscribe(types=> {
      console.log(types)
      this.priceTypes = types
    })
  }
  
  save(form: any) {

    let item = new Item()
    item.id = this.item.id
    item.status = "PENDENTE"
    item.name = form.name
    item.description = form.description
    item.category = this.categorySelected
    item.prices = this.item.prices

    if(this.selectedFile) {
      item.image = this.selectedFile.name
    } else {
      item.image = this.item.image
    }
    
    const fd = new FormData()
    fd.append('file', this.selectedFile)

    this.itemService.sendImage(fd, item.id + "").subscribe(res => {
      
      this.itemService.addItem(item).subscribe(data => {
        this.router.navigate(['/item'])
        let msg: string = this.item.id ? "alterado" : "incluído"
        this.itemService.setMessage(`Item ${item.description} ${msg} com sucesso`)
      })
    })

  }

  addPrice(formPrice: any) {
    
    let price = new Price()
    price.typePrice = formPrice.priceType
    price.price = formPrice.price
    this.item.prices.push(price)
  }

  deletePrice() {
    if(this.priceSelected) {
      let index = this.item.prices.indexOf(this.priceSelected)
      if(index > -1) {
        this.item.prices.slice(index, 1)
      }
    }
  }

  selectPrice(price: Price) {
    this.priceSelected = price
  }

  selectCategory(value: any) {
    this.categorySelected.id = value.split('-')[0]
    this.categorySelected.name = value.split('-')[1]
    console.log(this.categorySelected)
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