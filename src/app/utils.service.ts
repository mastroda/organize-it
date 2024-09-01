import { Injectable } from '@angular/core';
import { AlertController, AlertOptions, ModalController, ModalOptions, Platform, PopoverController, PopoverOptions, ToastController, ToastOptions } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(
    private toastController: ToastController,
    private alertController: AlertController,
    private modalController: ModalController,
    private popoverController: PopoverController,
  ) { }


  async apriToast(options: ToastOptions) {
    if (!options.duration) {
      options.duration = 4000;
    }
    const t = await this.toastController.create(options);
    await t.present();
  }

  async apriAlert(options: AlertOptions) {
    if (!options.buttons) {
      options.buttons = [{ text: 'Ok' }]
    }
    const a = await this.alertController.create(options);

    await a.present();

    return await a.onWillDismiss();
  }

  async apriPopover(options: PopoverOptions) {
    const a = await this.popoverController.create(options);
    await a.present();
    return await a.onWillDismiss();
  }

  async apriModal(options: ModalOptions) {
    const m = await this.modalController.create(options);
    await m.present();
    return await m.onWillDismiss();
  }


  getRandomString(length: number) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
}
