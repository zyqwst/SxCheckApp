import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { BarCode } from '../../domain/BarCode';
import { HttpService } from '../../providers/http-service';
import { MatchGoods } from "../../domain/MatchGoods";

@Component({
  selector: 'page-item-details',
  templateUrl: 'item-details.html'
})
export class ItemDetailsPage {
  selectedItem: BarCode;
  matchs:Array<MatchGoods>;
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public httpService : HttpService) {
    
  }
  ngOnInit(){
    this.selectedItem = this.navParams.get('data');
    if(this.selectedItem!=null){
      this.selectedItem.checkQty = this.selectedItem.tender_qty;
    }
    this.valbarcode();
  }
  valbarcode(){
    let loader = this.httpService.loading();
    loader.present();
    this.httpService.httpPostWithAuth('business/barcodeval',this.selectedItem)
    .then(restEntity => {
      if(restEntity.status==-1){
        this.httpService.alert(restEntity.msg,'验证失败');
        return;
      }
      this.matchs = restEntity.object;
      if(this.matchs.length==1){
        this.selectedItem.matchId = this.matchs[0].matchId;
      }
    })
    .catch(err => {
      loader.dismiss();
    })
  }

  save(){
    if(this.selectedItem.checkQty <0){
      this.httpService.alert('验收数量不能小于0');
      return;
    }if(this.selectedItem.checkQty >this.selectedItem.qty){
      this.httpService.alert('验收数量不可超过总数量');
      return;
    }if(this.selectedItem.matchId==null || this.selectedItem.matchId==0){
       this.httpService.alert('请选择订单对应医院商品');
       return;
    }
    let loader = this.httpService.loading();
    loader.present();
    this.httpService.httpPostWithAuth('business/check',this.selectedItem)
    .then(restEntity =>{
      loader.dismiss();
      if(restEntity.status==-1){
        this.httpService.alert(restEntity.msg,'保存失败');
        return;
      }
      this.httpService.alert(JSON.stringify(this.selectedItem),'恭喜');
      this.navCtrl.pop();
    })
    .catch(err => {
      loader.dismiss();
    })
    
  }

}
