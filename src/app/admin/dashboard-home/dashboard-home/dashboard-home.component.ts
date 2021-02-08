import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {OrderEntryComponent} from '../../order-entry/order-entry.component'
import { Observable, Subscription, forkJoin } from 'rxjs';
import {AppServiceService} from '../../services/app-service.service';
//import {NgbModal, ModalDismissReasons, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import { SimpleModalService } from "ngx-simple-modal";

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.css'],
  providers: [AppServiceService]
})
export class DashboardHomeComponent implements OnInit {

  topSale: any[] =[];
  qtySale: any[] =[];
  lastThreeMonth: any[] =[];
  highSale: any[] =[];
  //modalOptions:NgbModalOptions;
  closeResult: string;
  constructor(public dialog: MatDialog,  public _service: AppServiceService, ) { }

  ngOnInit() {
    // this.modalOptions = {
    //   backdrop:'static',
    //   backdropClass:'customBackdrop',
    // }
    this.loadSummary();
  }

  getMonth(monthYear: string){
    let monthAr: any[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    let myear: any = (monthYear.toString().split('-'));
    if(typeof myear === 'object'){
        let mIndex: number  = myear[0] -1;
        let yrvalue: number = myear[1];
        let monthYear: string = monthAr[mIndex] + ' ' + yrvalue;
        return monthYear;
    }
  }

  loadSummary(){
    let promiseTopSale: any         = this._service.adminDashboardSummary('top_sale');
    let promiseQtySale: any         = this._service.adminDashboardSummary('qty_sale');
    let promiseLastThreeMonth: any  = this._service.adminDashboardSummary('last_three_month');
    let promiseHighSale: any        = this._service.adminDashboardSummary('high_sale');
    let promiseLowSale: any         = this._service.adminDashboardSummary('low_sale');

    forkJoin([promiseTopSale, promiseQtySale, promiseLastThreeMonth, promiseHighSale, promiseLowSale]).subscribe(results => {
      let getData: any = results;
      if(getData.length){
        this.topSale        = getData[0].data ;
        this.qtySale        = getData[1].data ;
        this.lastThreeMonth = getData[2].data ;
        let mergeData: any = [];
        let highSale: any[] =[];
        mergeData.push(getData[3].data[0]);
        mergeData.push(getData[3].data[0]);
        let totalAmount: number = 0;
        mergeData.forEach(item => {
             if(item.totalAmount){
              totalAmount+=item.totalAmount;
             }
        })
        highSale.push({
          totalSale: totalAmount, highSale:getData[3].data[0].prod_name, lowSale:getData[4].data[0].prod_name 
        })
        this.highSale = highSale;
      }
    });
  }
  openView(hh: any){
    

  }
  // openView(content, type?:string) {
  //   let pathData: any;
  //   ////////console.log(">>>pop up...", content);   

  //   ////////console.log(">>> open view", this.pathPDF, " -- ",  this.pathPDF);

  //   this.modalService.open(content, this.modalOptions).result.then((result) => {
  //     this.closeResult = `Closed with: ${result}`;
  //     //////////console.log("Closed: ", this.closeResult);
  //     //this.courseViewData['courseDuration'] = '';
  //     //this.courseViewData['courseFees'] = '';
  //   }, (reason) => {
  //     this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  //   });
  // }
  // private getDismissReason(reason: any): string {
  //   if (reason === ModalDismissReasons.ESC) {
  //     //////////console.log("Closed with ESC ");
      
  //     return 'by pressing ESC';
  //   } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
  //     //////////console.log("Closed with CLOSE ICON ");
     
  //     return 'by clicking on a backdrop';
  //   } else {
  //     //////////console.log("Closed ",`with: ${reason}`);
      
  //     return  `with: ${reason}`;
  //   }
  // }

  openDialog() {
    console.log("@opening dialog....");
    const dialogRef = this.dialog.open(OrderEntryComponent,{
     
      disableClose: false
    });
    
    // const dialogRef = this.dialog.open(OrderEntryComponent,{
    //   data:{
    //     message: 'Are you sure want to delete?',
    //     buttonText: {
    //       ok: 'Save',
    //       cancel: 'No'
    //     }
    //   }
    // });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
