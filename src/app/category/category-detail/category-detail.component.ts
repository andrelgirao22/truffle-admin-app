import { NotificationService } from './../../shared/messages/notification.service';
import { TRUFFLE_API } from './../../truffle.adm.api';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { Category } from './../category.model';
import { CategoryService } from './../category.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  private readonly imageType: string = 'data:image/JPG;base64,'

  constructor(
    private categoryService: CategoryService,
    private notificationService: NotificationService,
    private activedRouter: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer) { }

  ngOnInit() {
    let id: string = this.activedRouter.snapshot.params['id']
    if(id) {
      this.categoryService.getCategory(id).subscribe(res => {

       this.category.id = res.id
       this.category.name = res.name
       this.category.imageUrl = res.imageUrl
       this.imageSelected = res.imageUrl
       this.imageSelected = `${TRUFFLE_API.basePictureUrl}/cat${id}.jpg`
       console.log(res)
        /*this.categoryService.getImage(res.image).toPromise().then((data: any) =>{
          if(data) {
            this.imageSelected = this.sanitizer.bypassSecurityTrustUrl(this.imageType + data.image)
          }
        })*/

      }, error => {
        this.router.navigate(['/category'])
        this.notificationService.notify(`${error.status == 403 ? 'Você não tem permissão para executar esta operação': error.message}`)
        console.log(error)
      })
    }
  }

  saveCategory(form: any) {

    let category = new Category()
    category.name = form.name
    category.id = this.category.id

    /*if(this.selectedFile) {
      category.image = this.selectedFile.name
    } else {
      category.image = this.category.image
    }*/
    
    
    console.log(this.selectedFile)
    const fd = new FormData()
    fd.append('file', this.selectedFile)

    this.categoryService.addCategory(category).subscribe(data => {
      this.categoryService.sendImage(fd, category.id + "").subscribe(res => {
        this.router.navigate(['/category'])
        let text = category.id ? "alterada" : "incluida"
        console.log(this.notificationService) 
        this.notificationService.notify(`Categoria  ${category.name} ${text} com sucesso`)
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
