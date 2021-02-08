import { Component, OnInit } from '@angular/core';
import { Inject, Injectable, Optional } from '@angular/core';

import { Order} from '../models/order';
import {AppServiceService} from '../services/app-service.service';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatSelectModule,MatFormFieldControl, MatFormFieldModule} from '@angular/material';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
//
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-order-entry',
  templateUrl: './order-entry.component.html',
  styleUrls: ['./order-entry.component.css'],
  providers:[AppServiceService, FlashMessagesService]
})
export class OrderEntryComponent{

  orderModel: Order;
  getProductLists: any[] =[];
  loadProductLists: any[] =[];
  dropdownOptions: any = null;
  selectPrice: any;
  config: any = {};
  calcSalePrice: number;
  constructor(public _service: AppServiceService, public _flashMessage: FlashMessagesService, @Optional() @Inject(MAT_DATE_LOCALE) dateLocale: string) { }

  ngOnInit() {
    this.orderModel = new Order();
    console.log("@Model: ", this.orderModel);
    this.orderModel.prod_id = 0;
    this.config.height = '200px';
    this.loadProducts();
  }

  isValid(){
    if(this.orderModel.order_date == null || this.orderModel.prod_id == null ||
      this.orderModel.order_amount == null){
        return false;
    }    
    return true;
  }

  onSubmit(){
    
    if(this.isValid()){
      if(this.orderModel.order_amount != null && this.orderModel.order_amount <= this.calcSalePrice){
        this._flashMessage.show("Sale price should be 10.5% higher than the product price", {cssClass: 'alert-danger', timeout: 3500 });
        return false;
      }
      

    }else{      
      this._flashMessage.show("Please enter required fields", {cssClass: 'alert-danger', timeout: 3500 });
    }
  }

  updatePrice(){
    let findData: any = this.getProductLists.find(item => item.id == this.orderModel.prod_id);
    if(findData){
      this.selectPrice = findData.prod_price;
    }
  }

  updateSalePrice(){
    if(this.orderModel.order_amount != null && this.selectPrice != null){
      let calcPrice: any;
      let salePrice: any;
      salePrice = Math.ceil(this.selectPrice + (this.selectPrice * 10.5 /100));
      this.calcSalePrice = salePrice;
      console.log("@select price: ", salePrice);
      // if(this.orderModel.order_amount <= salePrice){
      //   //this._flashMessage.show("Sale price should be 10.5% higher than the product price", {cssClass: 'alert-danger', timeout: 3500 });
      //   //window.scrollTo(0,0);
      // }
    }
  }

  loadProducts = async () => { 

    let productData: any;
    productData = this._service.adminGetProduct();
    await productData.subscribe(record => {
        console.log("Get product: ", record);
        let result: any = record;
        this.loadProductLists = result.data;
        this.getProductLists = result.data;
    })
  }

  searchProduct(theEvt: any){    
    let query: string = '';
    if(theEvt){
      query = theEvt.target.value
    }
    let result: any = this.select(query);
    if(result){
      this.loadProductLists = result;
    }
  }
  select(query: string):any[]{
    let result: string[] = [];
    let countryData: any = this.getProductLists;
    console.log(">>>> country: ", countryData);
    var re = new RegExp(query,'gi');
    countryData.forEach(item => {
      if(re.exec(item.prod_name)){ 
        result.push(item); 
      }
    }) 
    return result;
  }

  ngOnDestroy(){

  }

}
