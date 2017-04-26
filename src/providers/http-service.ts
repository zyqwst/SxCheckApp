import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Headers, RequestOptions } from '@angular/http';
import { LoadingController,Loading,AlertController } from 'ionic-angular';
import { StorageService} from './storage-service';
import { Constants } from './constants';
import { User } from '../domain/User';
import 'rxjs/add/operator/toPromise';

import { RestEntity } from '../domain/RestEntity';

@Injectable()
export class HttpService {
    hostUrl:string = "http://192.168.1.100:8080/zyhis/rest";
    constructor(
        private http: Http,
        public loadingCtrl: LoadingController,
        public alertCtrl: AlertController,
        public storageService:StorageService,
        public constants :Constants,
        ) {}
    /**带身份验证的get请求 */
    public httpGetWithAuth(url: string):Promise<RestEntity> {
        url = `${this.hostUrl}/${url}`;
        var headers = new Headers();
        headers.append('Authorization',   this.storageService.read<User>(this.constants.CURR_USER).id.toString());
        let options = new RequestOptions({ headers: headers });
        
        return this.http.get(url,options).toPromise()
            .then(res => res.json() as RestEntity)
            .catch(err => {
                this.handleError(err);
            });
    } 
    /**不需身份验证的get请求 */
    public httpGetNoAuth(url: string) {
        url = `${this.hostUrl}/${url}`;
        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        let options = new RequestOptions({ headers: headers });
        return this.http.get(url, options).toPromise()
            .then(res => res.json())
            .catch(err => {
                this.handleError(err);
            });
    }
     /**不带身份验证的post请求 */
    public httpPostNoAuth(url: string, body: any) :Promise<RestEntity>{
        url = `${this.hostUrl}/${url}`;
        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        let options = new RequestOptions({ headers: headers });
        return this.http.post(url, body,options).toPromise()
            .then(res => res.json())
            .catch(err => {
                this.handleError(err);
            });
    }
    public httpPostWithAuth(url: string, body: any) :Promise<RestEntity>{
        url = `${this.hostUrl}/${url}`;
        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        headers.append('Authorization',   this.storageService.read<User>(this.constants.CURR_USER).id.toString());
        let options = new RequestOptions({ headers: headers });
        return this.http.post(url, body,options).toPromise()
            .then(res => res.json())
            .catch(err => {
                this.handleError(err);
            });
    }

    private handleError(error: Response) {
        console.log("请求错误"+error);
        return Observable.throw(error.json().error || 'Server Error');
    }

    public loading():Loading{
       let loader = this.loadingCtrl.create({
				spinner:"dots",
				content:"loading...",
				dismissOnPageChange:true, // 是否在切换页面之后关闭loading框 
				showBackdrop:false //是否显示遮罩层
			});
        return loader;
    }

    public alert(title:string,msg:string) {
      let alert = this.alertCtrl.create({
        title: title,
        subTitle: msg,
        buttons: ['确定']
      });
      alert.present();
    }
}