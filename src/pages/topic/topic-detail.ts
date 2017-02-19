import { Component, ViewChild, NgZone, ElementRef } from '@angular/core';
import { NavController, Content, NavParams } from 'ionic-angular';
import { CnodeAPI } from '../../providers/cnodeAPI';
import {NativePageTransitions, NativeTransitionOptions} from 'ionic-native';


@Component({
  selector: 'page-topic-detail',
  templateUrl: 'topic-detail.html'
})
export class TopicDetailPage {

  @ViewChild('content') content: Content;
  @ViewChild('reply') reply: ElementRef;

  topic: any = this.navParams.get('topic');
  spinner: boolean = false;

  constructor(
    private navCtrl: NavController,
    private request: CnodeAPI,
    private ngZone: NgZone,
    private navParams: NavParams
  ) {}

  ionViewDidLoad() {
    let options: NativeTransitionOptions = {
      "direction"        : "left", // 'left|right|up|down', default 'left' (which is like 'next')
      "duration"         :  300, // in milliseconds (ms), default 400
      "slowdownfactor"   :    -1, // overlap views (higher number is more) or no overlap (1). -1 doesn't slide at all. Default 4
      "slidePixels"      :   -1, // optional, works nice with slowdownfactor -1 to create a 'material design'-like effect. Default not set so it slides the entire page.
      "iosdelay"         :  100, // ms to wait for the iOS webview to update before animation kicks in, default 60
      "androiddelay"     :  150, // same as above but for Android, default 70
      "winphonedelay"    :  250, // same as above but for Windows Phone, default 200,
      "fixedPixelsTop"   :    0, // the number of pixels of your fixed header, default 0 (iOS and Android)
      "fixedPixelsBottom":   0  // the number of pixels of your fixed footer (f.i. a tab bar), default 0 (iOS and Android)
    };

    NativePageTransitions.slide(options)
      .then( (msg) => console.log(msg) )
      .catch( (err) => console.log(err));
    this.fetchTopic();
  }
  ionViewWillLeave() {
    let options: NativeTransitionOptions = {
      "direction"        : "right", // 'left|right|up|down', default 'left' (which is like 'next')
      "duration"         :  300, // in milliseconds (ms), default 400
      "slowdownfactor"   :    -1, // overlap views (higher number is more) or no overlap (1). -1 doesn't slide at all. Default 4
      "slidePixels"      :   -1, // optional, works nice with slowdownfactor -1 to create a 'material design'-like effect. Default not set so it slides the entire page.
      "iosdelay"         :  100, // ms to wait for the iOS webview to update before animation kicks in, default 60
      "androiddelay"     :  150, // same as above but for Android, default 70
      "winphonedelay"    :  250, // same as above but for Windows Phone, default 200,
      "fixedPixelsTop"   :    0, // the number of pixels of your fixed header, default 0 (iOS and Android)
      "fixedPixelsBottom":   0  // the number of pixels of your fixed footer (f.i. a tab bar), default 0 (iOS and Android)
    };

    NativePageTransitions.slide(options)
      .then( (msg) => console.log(msg) )
      .catch( (err) => console.log(err));
  }
  scrollToTop(): Promise<any> {
    return this.content.scrollToTop();
  }

  scrollToReply(): Promise<any>  {
    let yOffSet = this.reply.nativeElement.offsetTop;
    return this.content.scrollTo(0, yOffSet, 300);
  }

  fetchTopic() {
    this.spinner = true;
    this.request.get(`/topic/${this.topic.id}`)
      .then(res => {
        this.ngZone.run(() => Object.assign(this.topic, res));
      })
      .finally(() => this.spinner = false);
  }

}
