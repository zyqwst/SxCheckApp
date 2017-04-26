import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { BarCode } from '../../domain/BarCode';
import { HttpService } from '../../providers/http-service';

@Component({
  selector: 'page-item-details',
  templateUrl: 'item-details.html'
})
export class ItemDetailsPage {
  selectedItem: BarCode;
  checkQty:number;
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public httpService : HttpService) {
    this.selectedItem = navParams.get('data');
    this.checkQty = this.selectedItem.qty;
  }

  save(){
    if(this.checkQty<0){
      this.httpService.alert('提示','验收数量不能小于0');
      return;
    }if(this.checkQty>this.selectedItem.qty){
      this.httpService.alert('提示','验收数量不可超过总数量');
      return;
    }
    this.httpService.alert('恭喜',this.checkQty.toString());
  }

}
