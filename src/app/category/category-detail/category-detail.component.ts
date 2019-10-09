
import { NotificationService } from './../../shared/messages/notification.service';
import { TRUFFLE_API } from './../../truffle.adm.api';
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
    private activatedRouter: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private router: Router) { }

  ngOnInit() {
    let id: string = this.activatedRouter.snapshot.params['id']
    if(id) {
      this.categoryService.getCategory(id).subscribe(res => {

       this.category.id = res.id
       this.category.name = res.name
       this.category.imageUrl = res.imageUrl
       
       this.categoryService.getImage(id, "0").subscribe(res => {
        
         const blob = new Blob([res.body], { type: 'application/octet-stream' })
         let image = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(blob))
         this.imageSelected = image

      }, error => {
        console.log("error ao carregar imagens ", error)
      })
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
    category.imageUrl = this.category.imageUrl

    let id: string = this.activatedRouter.snapshot.params['id']
    if(id) {
      this.categoryService.update(category).subscribe(res => {
        this.sendImage(id)
        this.sucesso(category)
      }, error => {})
    } else {
      this.categoryService.addCategory(category).subscribe(res => {
        
        debugger
        let id: string = res.headers.get("location")
        id = id.substr(id.lastIndexOf('/') + 1)

        this.sendImage(id)
        this.sucesso(category)
      }, error => {})
    }
  }

  sendImage(id: string) {

    this.categoryService.sendImage(id, `0.png`, this.imageSelected).subscribe(res => {
      this.imageSelected = res
    }, error => {
      this.categoryService.setMessage(`Problemas ao gravar imagens: ${error.error.message}`)
    })
}

  private sucesso(category: Category) {
    this.router.navigate(['/category'])
      let text = category.id ? "alterada" : "incluida"
      console.log(this.notificationService) 
      this.notificationService.notify(`Categoria  ${category.name} ${text} com sucesso`)
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
