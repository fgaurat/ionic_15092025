import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton, IonModal, IonButtons, IonItem, IonInput } from '@ionic/angular/standalone';
import { Capacitor } from '@capacitor/core';
import { OverlayEventDetail } from '@ionic/core/components';

@Component({
  selector: 'app-perso-platform',
  templateUrl: './perso-platform.page.html',
  styleUrls: ['./perso-platform.page.scss'],
  standalone: true,
  imports: [IonInput, IonItem, IonButtons, IonModal, IonButton, IonCardContent, IonCardTitle, IonCardHeader, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonCard]
})
export class PersoPlatformPage implements OnInit {
  isIos = Capacitor.getPlatform() === "ios"
  isAndroid = Capacitor.getPlatform() === "android"
  isWeb = Capacitor.getPlatform() === "web"

  @ViewChild(IonModal)
  modal!:IonModal


  constructor() { }

  ngOnInit() {
  }

   cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.modal.dismiss(null, 'confirm');
  }

  onWillDismiss(event: CustomEvent<OverlayEventDetail>) {


  }

}
