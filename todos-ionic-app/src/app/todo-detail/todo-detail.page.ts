import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonLabel, IonButtons, IonBackButton } from '@ionic/angular/standalone';
import { ActivatedRoute } from '@angular/router';
import { TodoService } from '../services/todo.service';
import { Todo } from '../models/todo';

@Component({
  selector: 'app-todo-detail',
  templateUrl: './todo-detail.page.html',
  styleUrls: ['./todo-detail.page.scss'],
  standalone: true,
  imports: [IonBackButton, IonButtons, IonLabel, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class TodoDetailPage implements OnInit {

  private route:ActivatedRoute = inject(ActivatedRoute)
  private todoService:TodoService = inject(TodoService)
  todo?:Todo

  constructor() { }

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'))
    if(id){
      this.todo = this.todoService.getTodoById(id)
    }

  }

}
