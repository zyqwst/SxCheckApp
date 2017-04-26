import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';


import { StorageService} from '../../providers/storage-service';
import { Constants } from '../../providers/constants';
import { ItemDetailsPage } from '../item-details/item-details';
declare let cordova: any;
@Component({
  selector: 'page-hello-ionic',
  templateUrl: 'hello-ionic.html'
})
export class HelloIonicPage {
  showAlert:string = "";
  constructor(
              public storageService:StorageService,
              public constants :Constants,
              public navCtrl: NavController, 
              public navParams: NavParams) {}
 
  ngOnInit(){
    
  }
  //相机扫描
  scanByCamera(){
   
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
