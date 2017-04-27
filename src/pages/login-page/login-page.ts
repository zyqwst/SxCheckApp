import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';
import {Validators, FormBuilder,FormGroup } from '@angular/forms';
import { Events } from 'ionic-angular';

import { StorageService} from '../../providers/storage-service';
import { Constants } from '../../domain/constants';
import { HttpService } from '../../providers/http-service';
import { User } from '../../domain/User';
import {Md5} from "ts-md5/dist/md5";

@Component({
  selector: 'page-login-page',
  templateUrl: 'login-page.html',
})
export class LoginPage {
  loginForm:FormGroup;
  constructor(public viewCtrl: ViewController,
              public storageService:StorageService,
              public httpService :HttpService,
              private formBuilder: FormBuilder,
              public events:Events) {
                this.initForm();
  }
   initForm() {
        let user = this.storageService.read<User>(Constants.CURR_USER);
        console.log("代码："+user);
        this.loginForm = this.formBuilder.group({
            code:[user==null?'':user.code,Validators.required], 
            pwd: ['', Validators.required]
        });
    }
  login(){
    let loader = this.httpService.loading();
    loader.present();
    let pwd = this.loginForm.controls['pwd'].value;
    this.loginForm.controls['pwd'].setValue(Md5.hashStr(this.loginForm.controls['pwd'].value).toString());

    this.httpService.httpPostNoAuth("common/login",this.loginForm.value)
    .then(restEntity =>{
      loader.dismiss();
      this.loginForm.controls['pwd'].setValue(pwd);
      if(restEntity.status == 1){
        let user:User = restEntity.object;

        this.storageService.write(Constants.CURR_USER,user);
        this.storageService.write(Constants.HAS_LOGIN,true);

        this.events.publish(Constants.CURR_USER,user);
        this.viewCtrl.dismiss();
      }else{
        this.httpService.alert("登录失败",restEntity.msg);
      }
      
    })
    .catch(
      error => {
        loader.dismiss();
        this.loginForm.controls['pwd'].setValue(pwd);
      }
    );   
  }
  


}
