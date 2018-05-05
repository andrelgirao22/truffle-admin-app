import { Component, OnInit, Input, ContentChild } from '@angular/core';

@Component({
  selector: 'truffle-adm-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  @Input() callback: any
  @Input() formValid: boolean
  @Input() label: string
  @Input() idModal: any

  constructor() { }

  ngOnInit() {
  }

}
