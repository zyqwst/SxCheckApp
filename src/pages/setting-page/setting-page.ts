import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';

import { Constants } from '../../domain/constants';
@Component({
  selector: 'page-setting-page',
  templateUrl: 'setting-page.html',
})
export class SettingPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
   ) {
  }
  public items:Array<{id:string,title:string,icon?:string,color?:string}>;


  ionViewDidLoad() {
    this.loadItemData();
  }
  
  loadItemData(){
    this.items = [
      {id:'SDYQ',title:'设定院区',icon:'pin',color:'#0ca9ea'},
      {id:'GY',title:'关于',icon:'help-circle',color:'#0ca9ea'},
    ];
  }
  itemTapped(id:string){
    alert(id);
  }

  
}
