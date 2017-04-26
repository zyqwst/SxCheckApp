import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { BarCode } from '../../domain/BarCode';


@Component({
  selector: 'page-item-details',
  templateUrl: 'item-details.html'
})
export class ItemDetailsPage {
  selectedItem: BarCode;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public barCode : BarCode) {
    this.selectedItem = navParams.get('barCode');
  }
}
