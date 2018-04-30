import { TRUFFLE_API } from './../../truffle.adm.api';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { Category } from './../category.model';
import { CategoryService } from './../category.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'truffle-adm-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.css']
})
export class CategoryDetailComponent implements OnInit {

  selectedFile: File
  imageSelected: any
  category: Category = new Category()

  private readonly imageType: string = 'data:image/PNG;base64,'

  constructor(
    private categoryService: CategoryService,
    private activedRouter: ActivatedRoute,
    private sanitizer: DomSanitizer) { }

  ngOnInit() {
    let id: string = this.activedRouter.snapshot.params['id']
    if(id) {
      this.categoryService.getCategory(id).toPromise().then(res => {

       this.category.id = res.id
       this.category.name = res.name
       this.category.image = res.image
       
        this.categoryService.getImage(res.image).toPromise().then((data: any) =>{
          if(data) {
            this.imageSelected = this.sanitizer.bypassSecurityTrustUrl(this.imageType + data.image)
          }
        })

      }).catch(error => {
        console.log(error)
      })
      
    }
  }

  saveCategory(form: any) {

    let category = new Category()
    category.name = form.name
    category.id = this.category.id

    if(this.selectedFile) {
      category.image = this.selectedFile.name
    } else {
      category.image = this.category.image
    }
    
    const fd = new FormData()
    fd.append('file', this.selectedFile)

    this.categoryService.sendImage(fd, category.id + "").subscribe(res => {
      this.categoryService.addCategory(category).subscribe(data => {
        console.log(data)
      })
    })
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
