import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BluetoothSerial } from "@ionic-native/bluetooth-serial";
import { AlertController, ToastController } from "ionic-angular";


@IonicPage()
@Component({
  selector: 'page-page-control',
  templateUrl: 'page-control.html',
})
export class PageControlPage {
  res: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private bluetoothSerial: BluetoothSerial,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PageControlPage');
  }

  navigateToHomePage() {
    this.navCtrl.pop();
  }

  sendData() {
    this.bluetoothSerial.write('1').then(success => {
      this.showToast(success);
      this.distace();
    }, error => {
      this.showError(error)
    });
  }

  Reset() {
    this.bluetoothSerial.write('2').then(success => {
      this.showToast(success);
      this.distace();
    }, error => {
      this.showError(error)
    });
  }

  distace() {
    this.bluetoothSerial.read().then(res => {
      this.res = res;
    },
      error => {
        this.showError(error)
      });
  }

  showError(error) {
    let alert = this.alertCtrl.create({
      title: 'Error',
      subTitle: error,
      buttons: ['Dismiss']
    });
    alert.present();
  }

  showToast(msj) {
    const toast = this.toastCtrl.create({
      message: msj,
      duration: 1000
    });
    toast.present();

  }

  deviceDisconnected() {
    // Unsubscribe from data receiving
    this.bluetoothSerial.disconnect();
    this.showToast("Device Disconnected");
    this.navigateToHomePage();
  }
}
