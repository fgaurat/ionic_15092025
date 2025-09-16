import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton } from '@ionic/angular/standalone';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-preferences-theme',
  templateUrl: './preferences-theme.page.html',
  styleUrls: ['./preferences-theme.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton, RouterLink]
})
export class PreferencesThemePage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
