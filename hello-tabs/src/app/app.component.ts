import { Component, inject, OnInit } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { Network } from '@capacitor/network';
import { ToastController } from '@ionic/angular/standalone';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent implements OnInit{

  private toastController: ToastController = inject(ToastController)


  async ngOnInit(): Promise<void> {
    Network.addListener('networkStatusChange', async (status) => {

      const toast = await this.toastController.create({
          message: `Network status changed ${status.connected}`,
          duration: 1500,
          position: 'bottom',
        });

        await toast.present();

    });

    const logCurrentNetworkStatus = async () => {
      const status = await Network.getStatus();

      console.log('Network status:', status);
    };
  }


}
