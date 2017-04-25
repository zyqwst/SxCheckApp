import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';
import {Validators, FormBuilder,FormGroup } from '@angular/forms';

import { StorageService} from '../../providers/storage-service';
import { Constants } from '../../providers/constants';
import { HttpService } from '../../providers/http-service';


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
            code:[''],
            pwd: ['', Validators.required]
        });
    }
  login(){
    let loader = this.httpService.loading();
    loader.present();

    this.httpService.httpPostNoAuth("common/login",JSON.stringify(this.loginForm.value))
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
