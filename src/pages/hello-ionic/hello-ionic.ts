import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';


import { StorageService} from '../../providers/storage-service';
import { Constants } from '../../providers/constants';
import { ItemDetailsPage } from '../item-details/item-details';
import { BarCode } from '../../domain/BarCode';
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
  scan(){
    let barCode = new BarCode( '1001', '通心络胶囊', '0.26g*30s', '石家庄以岭药业股份有限公司',  '盒',  '20170420', 130, 
    '2018-08-08', '2017-04-04',  '2', '0',  16.8);
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
