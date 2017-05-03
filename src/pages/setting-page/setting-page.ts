import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';

import { AddressPage } from "../address-page/address-page";
import { StorageService } from "../../providers/storage-service";
import { Address } from "../../domain/Address";
import { Constants } from "../../domain/constants";
import { HttpService } from "../../providers/http-service";
@Component({
  selector: 'page-setting-page',
  templateUrl: 'setting-page.html',
})
export class SettingPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public storageService:StorageService,
    public httpService:HttpService
   ) {
  }
  public items:Array<{id:string,title:string,description?:string}>;

  ionViewDidEnter() {
    console.log("执行didload");
    this.loadItemData();
  }
  
  loadItemData(){
    let address = this.storageService.read<Address>(Constants.CURR_ADDRESS);
    this.items = [
      {id:'SHDZ',title:'收货地址',description:(address!=null?address.address:null)},
      {id:'GY',title:'关于'},
    ];
  }
  itemTapped(id:string){
    switch (id) {
      case 'SHDZ':
        this.navCtrl.push(AddressPage);
        break;
      case 'GY':
        this.httpService.alert('关于','湖州双翼信息技术有限公司版权所有');
        break;
      default:
        break;
    }
  }

  
}
