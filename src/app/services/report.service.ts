import { Injectable } from "@angular/core";
import { TRUFFLE_API } from "../truffle.adm.api";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { LoginService } from "../login/login.service";
import { Observable } from "rxjs";

@Injectable()
export class ReportService {

    url:string = `${TRUFFLE_API.baseUrl}report`

    constructor(private http: HttpClient,) {}
    
    getReport(type: string, reportName: string, params: any): Observable<any> {
        let dtIni = params.dtIni
        let dtFim = params.dtFim
        let uri = `${this.url}?type=${type}&reportName=${reportName}&dt_ini=${dtIni}&dt_final=${dtFim}`

        let  headers= new HttpHeaders({
            'Content-Type':  'application/pdf',
            //responseType : 'zzz',
            Accept : 'application/pdf',
            observe : 'response'
        })

        return this.http.get(uri, { responseType: 'blob'})
    }

}