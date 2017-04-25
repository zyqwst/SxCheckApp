import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';
import {Validators, FormBuilder,FormGroup } from '@angular/forms';

import { StorageService} from '../../providers/storage-service';
import { Constants } from '../../providers/constants';
import { HttpService } from '../../providers/http-service';

import {Md5} from "ts-md5/dist/md5";

@Component({
  selector: 'page-login-page',
  templateUrl: 'login-page.html',
})
export class LoginPage {
  loginForm:FormGroup;
  constructor(public viewCtrl: ViewController,
              public storageService:StorageService,
              public constants :Constants,
              public httpService :HttpService,
              private formBuilder: FormBuilder,) {
                this.initForm();
  }
   initForm() {
        this.loginForm = this.formBuilder.group({
            code:['',Validators.required], 
            pwd: ['', Validators.required]
        });
    }
  login(){
    let loader = this.httpService.loading();
    loader.present();

    this.loginForm.controls['pwd'].setValue(Md5.hashStr(this.loginForm.controls['pwd'].value).toString());

    this.httpService.httpPostNoAuth("common/login",this.loginForm.value)
    .then(restEntity =>{
      loader.dismiss();
      if(restEntity.status == 1){
        this.storageService.write(this.constants.HAS_LOGIN,true);
        this.viewCtrl.dismiss();
      }else{
        this.httpService.alert("登录失败",restEntity.msg);
      }
      
    })
    .catch(
      error => loader.dismiss()
    );

    
  }
  
}
