import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

const THEME_KEY = "user_theme"

export type Theme = "light"|"dark"

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private current:Theme = "light"


  get currentTheme():Theme{
    return this.current
  }

  async init():Promise<void>{
        const {value} = await Preferences.get({key:THEME_KEY})
        const theme = value as Theme || 'light'
      // From Cédric
      // if(value){
      //   this.applyThemes(value as Theme);
      // }
      this.applyTheme(theme)
  }

  async toggle(){
    const next: Theme = this.current === 'dark'?'light':'dark'
    this.setTheme(next)
    return next
  }

  async setTheme(theme:Theme){
    await Preferences.set({key:THEME_KEY,value:theme})
    this.applyTheme(theme)
  }

  applyTheme(theme:Theme){
    this.current = theme
    const root  = document.documentElement
    root.classList.toggle('ion-palette-dark', theme === 'dark');

  }



}
