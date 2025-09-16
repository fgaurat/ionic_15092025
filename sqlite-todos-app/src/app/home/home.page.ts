import { Component, inject, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent,IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/angular/standalone';

import { TodoService } from '../services/todo-service';
import { AsyncPipe, JsonPipe } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent,AsyncPipe, JsonPipe,IonCard,IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle],
})
export class HomePage implements OnInit{
  private todoService:TodoService = inject(TodoService)

  readonly todos$ = this.todoService.todosObservable$
  readonly isReady$ = this.todoService.isReady$

  async ngOnInit(): Promise<void> {
    await this.todoService.init()

    await this.todoService.addTodo("Todo 01")
    await this.todoService.addTodo("Todo 02")
    await this.todoService.addTodo("Todo 03")
    await this.todoService.addTodo("Todo 04")
    await this.todoService.addTodo("Todo 05")
    await this.todoService.addTodo("Todo 06")
    await this.todoService.addTodo("Todo 07")
    await this.todoService.addTodo("Todo 08")
    await this.todoService.addTodo("Todo 09")
    await this.todoService.addTodo("Todo 10")
  }




}
