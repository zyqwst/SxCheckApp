import { Component, ViewChild } from '@angular/core';

import { Platform, MenuController, Nav,ModalController,ToastController } from 'ionic-angular';
import { Events } from 'ionic-angular';

import { HelloIonicPage } from '../pages/hello-ionic/hello-ionic';
import { LoginPage} from '../pages/login-page/login-page';
import { StorageService} from '../providers/storage-service';
import { SettingPage} from '../pages/setting-page/setting-page';
import { Constants } from '../domain/constants';
import { User } from '../domain/User';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';



@Component({
  templateUrl: 'app.html',
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  // make HelloIonicPage the root (or first) page
  rootPage = HelloIonicPage;
  pages: Array<{title:string,component:any}>;
  curr_user:User;
  backButtonPressed: boolean = false; 
  constructor(
    public platform: Platform,
    public menu: MenuController,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public storageService:StorageService,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public events :Events
  ) {
    this.authentication();
    this.initializeApp();
    this.pages = [
      { title: '二维码扫描', component: HelloIonicPage },
    ];
    this.initEvent();
  }
  initEvent(){
    //set curr_user after login
    this.events.subscribe(Constants.CURR_USER,user => this.curr_user = user );
    //set swipe enabled
    this.events.subscribe(Constants.SWIPE_ENABLE,val => this.menu.swipeEnable(val));
  }
 
  initializeApp() {
    this.platform.ready().then(() => {

      this.statusBar.styleDefault();
      this.splashScreen.hide();


       //注册返回按键事件
      this.platform.registerBackButtonAction((): any => {
        let activeVC = this.nav.getActive();
        let page = activeVC.instance;
        if(this.menu.isOpen()){
          this.menu.close();
          return;
        }
        //当前页面非tab栏
        if (!this.nav.canGoBack() || page instanceof LoginPage) {
          return this.showExit();
        }
        return this.nav.pop();
      }, 101);
    });
  }

  openPage(page) {
    this.menu.close();
    this.nav.setRoot(page.component);
  }

  authentication(){
  //  if(!this.storageService.read(this.constants.HAS_LOGIN) || this.storageService.read(this.constants.HAS_LOGIN)==false){
      let modal = this.modalCtrl.create(LoginPage);
      modal.present();
  //  }
 }

  logout(){
      this.storageService.remove(Constants.HAS_LOGIN);
      this.storageService.remove(Constants.CURR_USER);
      let modal = this.modalCtrl.create(LoginPage);
      modal.present();
      this.menu.close();
  }
  setTapped(){
    this.menu.close();
    this.menu.swipeEnable(false);
    this.nav.push(SettingPage);
  }
  showExit() {
    if (this.backButtonPressed) this.platform.exitApp();  //当触发标志为true时，即2秒内双击返回按键则退出APP
    else {
      let toast = this.toastCtrl.create({
        message: '再按一次退出应用',
        duration: 2000,
        position: 'bottom'
      });
      toast.present();
      this.backButtonPressed = true;
      setTimeout(() => {
        this.backButtonPressed = false;
      }, 2000)
    }
  }
}
