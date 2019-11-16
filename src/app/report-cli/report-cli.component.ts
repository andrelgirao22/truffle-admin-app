import { Component, OnInit } from '@angular/core';
import { Moment } from 'moment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReportService } from '../services/report.service';

@Component({
  selector: 'truffle-adm-report-cli',
  templateUrl: './report-cli.component.html',
  styleUrls: ['./report-cli.component.css']
})
export class ReportCliComponent implements OnInit {

  dateSelected: {startDate: Moment, endDate: Moment}
  startDate: string
  endDate: string

  formSearch: FormGroup

  pdfSrc: any = ""

  constructor(
    private formBuilder: FormBuilder,
    private reportService: ReportService) { }

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

    this.reportService.getReport('portrait', 'clientes', {
      dtIni: this.startDate, dtFim: this.endDate
    }).subscribe(data => {
      
      console.log('data', data)
      let file = new Blob([data], {type: 'application/pdf'});
      let fileURL = URL.createObjectURL(file);
      console.log(fileURL)
      this.pdfSrc = fileURL
    })
  }

}
