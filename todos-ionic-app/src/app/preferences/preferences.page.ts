import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton } from '@ionic/angular/standalone';
import {  Theme, ThemeService } from '../services/theme';

@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.page.html',
  styleUrls: ['./preferences.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton]
})
export class PreferencesPage implements OnInit {


  theme: ThemeService = inject(ThemeService)
  current = signal<Theme>('light')


  constructor() { }

  async ngOnInit() {
    await this.theme.init()
    this.current.set(this.theme.currentTheme)

  }


  async toggleTheme(){
    const t = await this.theme.toggle()
    this.current.set(t)
  }
}
