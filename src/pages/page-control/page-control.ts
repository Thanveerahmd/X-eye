import { Component, ChangeDetectorRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BluetoothSerial } from "@ionic-native/bluetooth-serial";
import { AlertController, ToastController } from "ionic-angular";
import { TextEncoder, TextDecoder } from 'text-encoding';


@IonicPage()
@Component({
  selector: 'page-page-control',
  templateUrl: 'page-control.html',
})
export class PageControlPage {
  res: any;
  data: any;
  subs: any;


  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private bluetoothSerial: BluetoothSerial,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private refDetector: ChangeDetectorRef) {
    this.readData();
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
      // this.distace();
      // this.readData();
    }, error => {
      this.showError(error)
    });
  }

  Reset() {
    this.bluetoothSerial.write('2').then(success => {
      this.showToast(success);
      // this.distace();
      // this.readData();
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

  readData() {
    this.subs = this.bluetoothSerial.subscribeRawData().subscribe(
      res => {
        
        // this.data = res;
        // this.readSuccess(res);
        var arr = new Uint8Array(res);
        var data:string = this.Decodeuint8arr(arr); 
        console.log(this.Decodeuint8arr(arr));
        let num;
        if(data != " "){
          num = parseInt(data);
          this.data = num;
        }
        this.refDetector.detectChanges();
      },
      error => console.log(error)
    );
  }

  readSuccess(data) {
    var arr = new Uint8Array(data);
    var msg = '';
    for (var i = 0; i < arr.length; i++) {
      msg += arr[i] + ', ';
    }
    console.log('Received ' + arr + ' with vals ' + msg + 'and length ' + arr.length);
  }

  ionViewWillUnload() {
    if (this.subs)
      this.subs.unsubscribe();
  }

  Decodeuint8arr(uint8array){
    return new TextDecoder("utf-8").decode(uint8array);
}


}
