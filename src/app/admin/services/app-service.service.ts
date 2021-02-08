import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { HttpClient, HttpHeaders  } from "@angular/common/http";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth/auth.service';
import { VERSION, MatDialogRef, MatDialog, MatDatepicker, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';

import { Path } from './config/path';

@Injectable()
export class AppServiceService {
	
	private actionUrl: string;
    private path : Path;
  	private Server : string;// 'http://localhost:9090/api/';
	//public ApiUrl = 'user/isAdminLogin';
	// public ServerWithApiUrl = this.Server + this.ApiUrl;
	public isLoggedIn 	=	false;

    constructor(private http: Http,
        private _http: HttpClient,
                private router: Router,
                private _authServ: AuthService) {
        this.path       =   new Path();
        this.Server     =   this.path.API_PATH;
    }

    _openCalendar(picker: MatDatepicker<Date>) {
        picker.open();
        //setTimeout(() => this._input.nativeElement().focus()); //By focus if needed
      } 

    /******************************************
    *
    *   Admin CRUD Function
    *
    *
    *******************************************/  

    //Authenticate Headers
    getAuthHeaders(){
        let header = {
          headers: new HttpHeaders()
            .set('authorization',  `Bearer ${this._authServ.getLoginToken()}`)
        }
        return header;
      }


    adminProductList(pageNum: any, limitNum: any) {
        this.actionUrl      =   this.Server + 'product?limit='+limitNum+'&page='+pageNum;
        const getToken      =   this._authServ.getLoginToken();
         return this._http.get(this.actionUrl, this.getAuthHeaders());
    }

    adminGetProduct() {
        this.actionUrl      =   this.Server + 'product-search-by-date?srch';
        return this._http.get(this.actionUrl, this.getAuthHeaders());
    }

    //Dashboard Order query
    adminDashboardSummary(params: string) {
        // switch(params){
        //     case 'last_three_month':
                
        //     break;
        //     case 'top_sale':
        //         this.actionUrl  =   this.Server + 'order-sale?params='+params;
        //     break;
        //     case 'qty_sale':
        //         this.actionUrl  =   this.Server + 'order-sale?params='+params;
        //     break;

        //     default:
        //         return;
        //     break;
        // }
        this.actionUrl  =   this.Server + 'order-sale?params='+params;
        return this._http.get(this.actionUrl, this.getAuthHeaders());
    }
}

