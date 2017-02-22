import { Component } from '@angular/core';
import { NavController, NavParams} from 'ionic-angular';
import { CurlPage} from './curl-page/curl-page';
import { DrawerPage} from './drawer-page/drawer-page';
import { FlipPage} from './flip-page/flip-page';
import { FadePage} from './fade-page/fade-page';
import { SlidePage} from './slide-page/slide-page';


@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  items = [
    'slide',
    'fade',
    'flip',
    'drawer',
    'curl'
  ];
  constructor(public navCtrl:NavController) {

  }


  itemSelected(item: string) {
    switch (item){
      case "slide":this.navCtrl.push(SlidePage); break;
      case "fade":this.navCtrl.push(FadePage); break;
      case "flip":this.navCtrl.push(FlipPage); break;
      case "drawer":this.navCtrl.push(DrawerPage); break;
      case "curl":this.navCtrl.push(CurlPage); break;
      default:this.navCtrl.push(FadePage); break;

    }

    console.log("Selected Item", item);
  }
}
