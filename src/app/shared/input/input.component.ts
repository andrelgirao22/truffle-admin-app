import { Component, OnInit, Input, ContentChild, AfterContentInit } from '@angular/core';
import { NgModel, FormControlName, FormGroupName } from '@angular/forms';

@Component({
  selector: 'truffle-adm-input',
  templateUrl: './input.component.html'
})
export class InputComponent implements OnInit, AfterContentInit {

  @Input() label: string
  @Input() errorMessage: string
  @Input() noHelpBlock: boolean
  input: any

  @ContentChild(NgModel) model: NgModel
  @ContentChild(FormControlName) control: FormControlName
  @ContentChild(FormGroupName) group: FormGroupName

  constructor() { }

  ngOnInit() {
  }

  ngAfterContentInit() {
    this.input = this.model || this.control || this.group
    if(this.input === undefined) {
      throw new Error("Este componente precisa ser usado com uma diretiva NgModel ou FormControlName ou FormGroupName")
    }
  }

  hasSuccess(): boolean {
    return this.noHelpBlock && this.input.valid && 
          (this.input.dirty || this.input.touched)
  }

  hasError() {
    return !this.input.valid && (this.input.dirty || this.input.touched)
  }

}
