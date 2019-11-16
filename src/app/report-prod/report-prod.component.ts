import { Component, OnInit } from '@angular/core';
import { Moment } from 'moment';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ReportService } from '../services/report.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'truffle-adm-report-prod',
  templateUrl: './report-prod.component.html',
  styleUrls: ['./report-prod.component.css']
})
export class ReportProdComponent implements OnInit {

  dateSelected: {startDate: Moment, endDate: Moment}
  startDate: string
  endDate: string

  formSearch: FormGroup

  pdfSrc: any = ""

  constructor(
    private formBuilder: FormBuilder,
    private reportService: ReportService,
    private sanitizer: DomSanitizer,) { }

  ngOnInit() {
    this.formSearch = this.formBuilder.group({
      dates: ['',[Validators.required]]
    })
  }

  changeDate(event: any) {
    this.startDate = this.dateSelected.startDate.format('DD/MM/YYYY')
    this.endDate = this.dateSelected.endDate.format('DD/MM/YYYY')
  }

  callReport() {

    this.reportService.getReport('portrait', 'produtos', {
      dtIni: this.startDate, dtFim: this.endDate
    }).subscribe(data => {
      
      console.log('data', data)
      let file = new Blob([data], {type: 'application/pdf'});
      let fileURL = URL.createObjectURL(file);
      console.log(fileURL)
      this.pdfSrc = fileURL
      //console.log(reader)
      //this.pdfSrc = report
    })
  }
}
