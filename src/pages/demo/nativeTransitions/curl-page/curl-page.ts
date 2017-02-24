import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NativePageTransitions, NativeTransitionOptions } from 'ionic-native';


/*
  Generated class for the CurlPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-curl-page',
  templateUrl: 'curl-page.html'
})
export class CurlPage {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    let options: NativeTransitionOptions = {
        "direction"      : "up", // 'up|down', default 'up'
        "duration"       :  300, // in milliseconds (ms), default 400
        "iosdelay"       :   50  // ms to wait for the iOS webview to update before animation kicks in, default 60
      };

    NativePageTransitions.curl(options)
        .then( (msg) => console.log(msg) )
        .catch( (err) => console.log(err));
  }

  ionViewWillLeave() {
    let options: NativeTransitionOptions = {
        "direction"      : "down", // 'up|down', default 'up'
        "duration"       :  300, // in milliseconds (ms), default 400
        "iosdelay"       :   50  // ms to wait for the iOS webview to update before animation kicks in, default 60
      };

    NativePageTransitions.curl(options)
        .then( (msg) => console.log(msg) )
        .catch( (err) => console.log(err));
  }


  share(){
    var icon = 'https://github.com/zhaolin0801/cordova-sharesdk-demo/blob/master/www/img/Wechat-QRcode.jpeg?raw=true';
    var title = '这是网页的标题';
    var text = '这是网页的内容，android未签名只能分享单张图片到朋友圈';
    var url = 'http://carhot.cn/articles/1';
    var shareInfo = {icon:icon, title:title, text:text, url:url};

    sharesdk.share(ShareSDK.PlatformType.WechatSession, ShareSDK.ShareType.WebPage, shareInfo,
      function(success){},
      function(fail){});
  }


}
