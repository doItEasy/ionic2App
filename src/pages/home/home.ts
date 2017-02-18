import { Component, ViewChild } from '@angular/core';

import { NavController, MenuController, Slides } from 'ionic-angular';
import { NativePageTransitions, NativeTransitionOptions} from 'ionic-native';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild('MainSlider') slider: Slides;
  currState = '0';
  slides = [
    {
      title: "Welcome to the Docs!",
      description: "The <b>Ionic Component Documentation</b> showcases a number of useful components that are included out of the box with Ionic."
    },
    {
      title: "What is Ionic?",
      description: "<b>Ionic Framework</b> is an open source SDK that enables developers to build high quality mobile apps with web technologies like HTML, CSS, and JavaScript."
    },
    {
      title: "What is Ionic Cloud?",
      description: "The <b>Ionic Cloud</b> is a cloud platform for managing and scaling Ionic apps with integrated services like push notifications, native builds, user auth, and live updating."
    }
  ];
  constructor(public navCtrl: NavController,
              public menuCtrl: MenuController) {


  }


  onTabUpdate(event){
    let newIndexAfterUpdate = event.activeIndex;
    this.currState = String(newIndexAfterUpdate);
  }

  onSegmentUpdate(event){
    this.currState = event.value;

    console.log(this.currState);

    console.log(this.slider);

    this.slider.slideTo( parseInt( this.currState));

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

  ionViewDidEnter(){
    this.menuCtrl.swipeEnable(true);
    console.log('viewDidEnter HomePage');
  }

  ionViewWillLeave() {
    console.log('ionViewWillLeave HomePage');
    this.menuCtrl.swipeEnable(false);
  }




}
