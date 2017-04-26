import { Component, ViewChild } from '@angular/core';

import { Platform, MenuController, Nav,ModalController } from 'ionic-angular';

import { HelloIonicPage } from '../pages/hello-ionic/hello-ionic';
import { ListPage } from '../pages/list/list';
import { LoginPage} from '../pages/login-page/login-page';
import { StorageService} from '../providers/storage-service';
import { Constants } from '../providers/constants';
import { User } from '../domain/User';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';



@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  // make HelloIonicPage the root (or first) page
  rootPage = HelloIonicPage;
  pages: Array<{title: string, component: any}>;
  curr_user:User;
  constructor(
    public platform: Platform,
    public menu: MenuController,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public storageService:StorageService,
    public constants :Constants,
    public modalCtrl: ModalController,
  ) {
    this.initializeApp();

    // set our app's pages
    this.pages = [
      { title: '二维码扫描', component: HelloIonicPage },
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.authentication();
    });
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }

  authentication(){
   if(!this.storageService.read(this.constants.HAS_LOGIN) || this.storageService.read(this.constants.HAS_LOGIN)==false){
      let modal = this.modalCtrl.create(LoginPage);
      modal.present();
   }
   this.curr_user = this.storageService.read<User>(this.constants.CURR_USER);
   console.log(this.curr_user);
 }

  logout(){
      this.storageService.remove(this.constants.HAS_LOGIN);
      this.storageService.remove(this.constants.CURR_USER);
      let modal = this.modalCtrl.create(LoginPage);
      modal.present();
  }
}
