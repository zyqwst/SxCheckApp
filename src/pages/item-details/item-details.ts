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
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public httpService : HttpService) {
    this.selectedItem = navParams.get('data');
    this.selectedItem.checkqty = this.selectedItem.qty;
  }

  save(){
    if(this.selectedItem.checkqty <0){
      this.httpService.alert('提示','验收数量不能小于0');
      return;
    }if(this.selectedItem.checkqty >this.selectedItem.qty){
      this.httpService.alert('提示','验收数量不可超过总数量');
      return;
    }
    let loader = this.httpService.loading();
    loader.present();
    this.httpService.httpGetWithAuth('common/check')
    .then(restEntity =>{
      loader.dismiss();
      if(restEntity.status==-1){
        this.httpService.alert('提示',restEntity.msg);
        return;
      }
      this.httpService.alert('恭喜',JSON.stringify(this.selectedItem));
    })
    .catch(err => {
      loader.dismiss();
    })
    
  }

}
