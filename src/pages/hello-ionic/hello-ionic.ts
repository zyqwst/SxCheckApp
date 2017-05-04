import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Events } from 'ionic-angular';

import { StorageService} from '../../providers/storage-service';
import { ItemDetailsPage } from '../item-details/item-details';
import { BarCode } from '../../domain/BarCode';
import { Constants } from '../../domain/constants';
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
              public events :Events) {}
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
    let barCode = new BarCode();
    barCode.approvalno="33444";
    barCode.qty=45.6;
    this.navCtrl.push(ItemDetailsPage,{data:barCode});
  }
  
  //调用插件扫描
  callMyPlugin(){
    cordova.plugins.MyPlugin.plus(2,3,result =>{
      alert(result);
    },error =>alert(error))
  }
  //跳转页面，展示扫描到的内容
  showScanContent(item) {
    this.navCtrl.push(ItemDetailsPage, {
      barCode: item
    });
  }

}
