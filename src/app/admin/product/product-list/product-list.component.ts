

import { Component, ElementRef, OnInit, ViewContainerRef, Pipe, AfterViewInit,
            Input, Output, ViewChild, OnChanges, SimpleChanges } from '@angular/core';
import { UserServiceService } from '../../services/user/user-service.service';

import { PagerService } from '../../services/paging/pager.service';
import { Subject } from 'rxjs/Subject';
import { Router, ActivatedRoute } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Path } from '../../services/config/path';
import { User } from '../../models/user/user';

import { AlertService, AlertMessage } from '../../services/messages/alert.service';
import { NotificationsService } from 'angular2-notifications';
declare var $: any;   

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  providers: [UserServiceService, PagerService, AlertService, FlashMessagesService]
}) 
export class ProductListComponent {

  path: Path;
  objAlert: AlertMessage;
  userModel: User;
  public listData: any = [];
  public totalData: any;
  public adminLimit: number;
  public pageNum: number;
  public totalPages: number;
  public limitNum: number;
  public srchKey: any;
  public totalRec: any;
  public sortByField: string;
  public sortByDir: string;

  public sortKey: any = [];

  imagePath: string;

  public pagedItems: any;
  public pagedGItems: any;
  public messageShow: any;

  public customMesg: string;
  private respData: any;
  public messageStatus: boolean;

  public viewContainerRef: ViewContainerRef;
  thisMesg: any;
  public mode:string = '';



  constructor(private service: UserServiceService,
              private objPager: PagerService,
              private flashMessage: FlashMessagesService,
              private route: ActivatedRoute,
              private _router: Router,
              private elRef: ElementRef,
              viewContainerRef: ViewContainerRef,
              private alertService: AlertService,
              private _notificationservices: NotificationsService
              ) {
      this.userModel = new User();
      this.path   = new Path();
      this.imagePath  = this.path.API_IMAGE_PATH;
      this.pageNum = 1;
      this.limitNum = 2;

      this.sortKey = 'first_name';

      this.sortByField = 'first_name';
      this.sortByDir = 'asc';
      this.pagedItems   = [];
      this.pagedGItems = [];
      this.messageStatus = false;

      this.viewContainerRef = viewContainerRef;

      }


  ngOnInit() {
    this.getListData(this.pageNum, this.limitNum);
  }




    getUserInfo(userid : number){
      this.service.adminGetUserById(userid).subscribe(
        data => {
          this.respData = data.userData[0];
          this.userModel = this.respData;
            $("#myModal").modal('show');
        });
    }

    ngAfterViewInit() {        
    }

  listSort(sortField : string){
    this.sortKey    = sortField;
    this.sortByDir  = (this.sortByDir === 'asc') ? 'desc' : 'asc'; 
    this.getListData(this.pageNum, this.limitNum);
  }

  exportUser(){
    //this.expExcel.exportAsExcelFile('','');
  }


  createRange(number){
    var items: number[] = [];
    for(var i = 1; i <= number; i++){
       items.push(i);
    }
    return items;
  }

  createPages(totalPages){
    let items = [];
    for (var i = 1; i <= totalPages; i++) {
       this.pagedItems.push({val:i});
    }
  }


  onSearchChange(srchVal){
    this.getListData(1, this.limitNum);
  }

  getListData(pageNum:number=1, limitNum:number){
    //, sortByField:string='', sortByDir=''
    this.pageNum = pageNum;
    //this.sortByDir = (sortByDir == 'asc') ? 'desc' : 'asc';
    let thisDir = this.sortByDir;
    //this.listData = '';
    //alert(pageNum);
    this.service.adminProductList(pageNum, limitNum).subscribe(
        record => {
          let result: any = record;
          this.listData = result.data;
          this.totalPages = result.totalPage;
          console.log('#### Prodyuct list data #######');
          console.log(record);

        //Get Pager services
        let pagesItems    = this.objPager.getPagesArray(this.totalPages, 2, pageNum);
        //alert('###### page data....');
        this.pagedGItems   = pagesItems;
        });
  }

}

