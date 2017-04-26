import { Component } from '@angular/core';
import { Dialogs } from '@ionic-native/dialogs';
import { AlertController,ModalController } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

import { StorageService} from '../../providers/storage-service';
import { Constants } from '../../providers/constants';
import { LoginPage } from '../../pages/login-page/login-page';
declare let cordova: any;
@Component({
  selector: 'page-hello-ionic',
  templateUrl: 'hello-ionic.html'
})
export class HelloIonicPage {
  showAlert:string = "";
  constructor(private dialogs: Dialogs,
              public alertCtrl: AlertController,
              public sqlite: SQLite,
              public storageService:StorageService,
              public modalCtrl: ModalController,
              public constants :Constants) {}
 
              

 
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

}
