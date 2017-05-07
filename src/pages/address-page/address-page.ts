import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Address } from '../../domain/Address';
import { HttpService } from "../../providers/http-service";
import { StorageService } from "../../providers/storage-service";
import { Constants } from "../../domain/constants";
import { Observable } from "rxjs/Observable";
/**
 * 设置医院收货地址
 */
@Component({
  selector: 'page-address-page',
  templateUrl: 'address-page.html',
})
export class AddressPage {
  public addresses:Array<Address>;
  public curr_address:Address;
  constructor(public navCtrl: NavController, public navParams: NavParams,
              public httpService:HttpService,
              public storageService:StorageService
  ) {}

  ionViewDidLoad() {
    this.initAddress();
    this.loadAddressDataByHttp();
  }
  
  initAddress(){
    this.curr_address = this.storageService.read<Address>(Constants.CURR_ADDRESS);
  }

  loadAddressDataByHttp(){
    let loader = this.httpService.loading();
    loader.present();
    this.httpService.httpGetWithAuth('common/address')
    .then(restEntity =>{
      loader.dismiss();
      if(restEntity.status==-1){
        this.httpService.alert(restEntity.msg);
        return;
      }
      this.addresses = restEntity.object;
    })
    .catch(error =>{
      loader.dismiss();
    })
  }

  chooseAddress(address){
    this.curr_address = address;
    this.storageService.write(Constants.CURR_ADDRESS,this.curr_address);
  }
}
