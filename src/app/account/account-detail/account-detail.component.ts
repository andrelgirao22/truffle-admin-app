import { Component, OnInit } from '@angular/core';
import { Account } from '../account.model';
import { AccountService } from '../account.service';
import { NotificationService } from '../../shared/messages/notification.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'truffle-adm-account-detail',
  templateUrl: './account-detail.component.html',
  styleUrls: ['./account-detail.component.css']
})
export class AccountDetailComponent implements OnInit {

  selectedFile: File
  obj: Account = new Account()

  constructor(
    private service: AccountService,
    private notificationService: NotificationService,
    private activatedRouter: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    let id: string = this.activatedRouter.snapshot.params['id']
    if(id) {
      this.service.getById(id).subscribe(res => {

       this.obj.id = res.id
       this.obj.name = res.name
      })
    }
  }

  save(form: any) {

    let obj = new Account()
    obj.name = form.name
    obj.id = this.obj.id

    let id: string = this.activatedRouter.snapshot.params['id']
    if(id) {
      this.service.update(obj).subscribe(res => {
        this.sucesso(obj)
      }, error => {})
    } else {
      this.service.add(obj).subscribe(res => {
        
        debugger
        let id: string = res.headers.get("location")
        id = id.substr(id.lastIndexOf('/') + 1)

        this.sucesso(obj)
      }, error => {})
    }
  }

  sucesso(obj: Account) {
    this.router.navigate(['/obj'])
      let text = obj.id ? "alterada" : "incluida"
      console.log(this.notificationService) 
      this.notificationService.notify(`Categoria  ${obj.name} ${text} com sucesso`)
  }

}
