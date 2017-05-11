import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Headers, RequestOptions } from '@angular/http';
import { LoadingController, Loading, AlertController, ToastController } from 'ionic-angular';
import { StorageService} from './storage-service';
import { Constants } from '../domain/constants';
import { User } from '../domain/User';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/timeout';
import {Md5} from "ts-md5/dist/md5";
import { Dialogs } from '@ionic-native/dialogs';
import { RestEntity } from '../domain/RestEntity';

@Injectable()
export class HttpService {
    hostUrl:string = "http://192.168.1.106:8080/zyhis/rest";
    TIME_OUT:number = 30000;
    constructor(
        private http: Http,
        public loadingCtrl: LoadingController,
        public alertCtrl: AlertController,
        public storageService:StorageService,
        public dialogs: Dialogs,
        public toastCtrl: ToastController
        ) {
            
        }
    /**带身份验证的get请求 */
    public httpGetWithAuth(url: string):Promise<RestEntity> {
        url = `${this.hostUrl}/${url}`;
        let token = this.getToken();
        if(token==null) {
            this.alert('异常','Token获取错误');
            return;
        }
        var headers = new Headers();
        headers.append(Constants.HEADER_TOKEN,   token);
        headers.append(Constants.HEADER_USER,this.getCurrUser().id.toString());
        let options = new RequestOptions({ headers: headers });
        
        return this.http.get(url,options).timeout(this.TIME_OUT).toPromise()
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
        return this.http.get(url, options).timeout(this.TIME_OUT).toPromise()
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
        return this.http.post(url, body,options).timeout(this.TIME_OUT).toPromise()
            .then(res => res.json())
            .catch(err => {
                this.handleError(err);
            });
    }
    public httpPostWithAuth(url: string, body: any) :Promise<RestEntity>{
        url = `${this.hostUrl}/${url}`;
        let token = this.getToken();
        if(token==null) {
            this.alert('异常','Token获取错误');
            return;
        }
        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        headers.append(Constants.HEADER_TOKEN,   token);
        headers.append(Constants.HEADER_USER,this.getCurrUser().id.toString());
        let options = new RequestOptions({ headers: headers });
        return this.http.post(url, body,options).timeout(this.TIME_OUT).toPromise()
            .then(res => res.json())
            .catch(err => {
                this.handleError(err);
            });
    }

    private handleError(error:any) {
        this.alert('请求错误',error);
        return Observable.throw(error || 'Server Error');
    }

    public loading():Loading{
       let loader = this.loadingCtrl.create({
				dismissOnPageChange:true, // 是否在切换页面之后关闭loading框 
				showBackdrop:false //是否显示遮罩层
			});
        return loader;
    }

    public alert(msg:string,title?:string) {
        if(title==null) title="提示";
        let buttonNames:string = '确定';
        this.dialogs.alert(msg,title,buttonNames);
    }
    public toast(msg:string,time?:number) {
        if(!time) time = 3000;
        let toast = this.toastCtrl.create({
            message: msg,
            duration: time
        });
        toast.present();
    }
    /**当前登录用户 */
    public getCurrUser():User{
       return this.storageService.read<User>(Constants.CURR_USER);
    }
   
    public getToken():string{
        return this.storageService.read<string>(Constants.HEADER_TOKEN);
    }

    public generateToken(user:User):string{
        let token = Md5.hashStr(user.id+user.code+user.name);
        return token.toString().toUpperCase();
    }
}