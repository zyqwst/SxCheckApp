import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Events } from 'ionic-angular';

import { StorageService} from '../../providers/storage-service';
import { ItemDetailsPage } from '../item-details/item-details';
import { BarCode } from '../../domain/BarCode';
import { Constants } from '../../domain/constants';
import { HttpService } from "../../providers/http-service";
import { Address } from "../../domain/Address";
declare let cordova: any;
@Component({
  selector: 'page-hello-ionic',
  templateUrl: 'hello-ionic.html'
})
export class HelloIonicPage {
  showAlert:string = "";
  constructor(
              public storageService:StorageService,
              public navCtrl: NavController, 
              public navParams: NavParams,
              public events :Events,
              public httpService:HttpService,
              ) {}
 ionViewLoaded(){
   console.log('ionViewLoaded');
 }          
 ionViewDidEnter(){
   console.log('ionViewDidEnter');
    this.events.publish(Constants.SWIPE_ENABLE,true);
  }
  ionViewDidLeave(){
    console.log('ionViewDidLeave');
    this.events.publish(Constants.SWIPE_ENABLE,false);
  }
  ionViewDidUnload(){
    console.log('ionViewDidUnload');
  }
  
  scan(){
    let b ='{"uuid": "453645ggdgfdgdfgd","orderdtlId": "170503162013639136815252","distributetime": "2017-05-06","orderno": "199999999","goodsId": "100003","formulations": "颗粒冲剂","unit": "盒","qty": 100,"tender_qty": 10,"tender_unit": "盒","pack": 10,"batchno": "20170506","valid": "2019-08-08","prodDate": "2017-04-04","price": 15,"approvalno": "浙准字ZJ589846258","supplierno": "12312","suppliername": "绍兴震元医药有限公司"}';
    if(!this.valBefore()) return;
    let barCode = JSON.parse(b);
    if(!this.valBarcode(barCode)) return;
    this.navCtrl.push(ItemDetailsPage,{data:barCode});
  }
  
  //调用插件扫描
  callMyPlugin(){
    cordova.plugins.MyPlugin.plus(2,3,result =>{
      alert(result);
    },error =>alert(error))
  }
  //判断扫描的二维码信息是否准确完整
  valBarcode(barcode:BarCode):boolean{
    if(barcode==null){
      this.httpService.alert('扫描内容为空');
      return false;
    }
    return true;
  }
  valBefore():boolean{
    let add:Address  =this.storageService.read<Address>(Constants.CURR_ADDRESS);
    if(add==null) {
      this.httpService.alert('请先设置收货地址');
      return false;
    }
    return true;
  }
}
