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
        let token:string = restEntity.object;

        this.storageService.write(Constants.HEADER_TOKEN,token);
        if(token){
          let json = JSON.parse(decodeURIComponent(window.atob(token.split('.')[1])));
          let username = json.sub;
          let id = json.ud;
          let user:User = new User(id,username,'');
          this.storageService.write(Constants.HAS_LOGIN,true);
          this.storageService.write(Constants.CURR_USER,user);
          this.events.publish(Constants.CURR_USER,user);
          this.viewCtrl.dismiss();
        }
      }else{
        this.httpService.alert(restEntity.msg,"登录失败");
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
