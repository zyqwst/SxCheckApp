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
 
              

 database :SQLiteObject;
  ngOnInit(){
    this.initDB();
  }
 
  initDB(){
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
    .then((db: SQLiteObject) => {
    db.executeSql('create table t_log(name VARCHAR(32))', {})//建表
      .then(() => console.log('Executed SQL'))
      .catch(e => console.log(e));

    this.database = db;
    db.executeSql("insert into t_log values('123')",{});

    let results = db.executeSql("select * from t_log",{});
    })
    .catch(e => console.log(e));

  }

  alertNative(){
    this.showAlert = this.showAlert+"H";
    this.dialogs.confirm('这是本地化提示')
  .then(() => {this.show("成功")})
  .catch(e => {this.show("失败",e)});
}
//sqlite
show(str:string,str2?:string) {
  let results = this.database.executeSql("select * from t_log",{});
  results.then(data =>{
    let alert = this.alertCtrl.create({
      title: data.rows.length,
      subTitle: data.rows.item(0).name||'ttt',
      buttons: ['OK']
    });
    alert.present();
  })
    
}
//调用自定义插件
callMyPlugin(){
  cordova.plugins.MyPlugin.plus(2,3,result =>{
    alert(result);
  },error =>alert(error))
}

callJsonPlugin(){
  let val = {name:"albert",age:24,level:4};
  cordova.plugins.MyPlugin.json(val,result =>{
    alert(result);
  },error =>alert(error))
}

}
