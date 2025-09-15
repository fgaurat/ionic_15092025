import { Component, inject, OnInit, WritableSignal } from '@angular/core';
import {
  RefresherCustomEvent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonRefresher,
  IonRefresherContent,
  IonList,
  IonItem,
  IonLabel,
  IonCheckbox,
  IonInput,
  IonButton,
} from '@ionic/angular/standalone';
import { TodoService } from '../services/todo.service';
import { Todo, Todos } from '../models/todo';
import { RouterLink } from '@angular/router';
import { catchError, of, tap } from 'rxjs';
import { FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    IonButton,
    IonInput,
    IonCheckbox,
    IonItem,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonRefresher,
    IonRefresherContent,
    IonList,
    IonLabel,
    RouterLink,
    ReactiveFormsModule
],
})
export class HomePage implements OnInit {
  private todoService = inject(TodoService);
  public todosList: WritableSignal<Todos> = this.todoService.todoList;
  form: FormBuilder = inject(FormBuilder);

  todoForm = this.form.group({
    title: ['', Validators.required],
  });

  ngOnInit(): void {
    this.todoService.getTodos();
  }

  submitTodo() {
    // console.log(this.todoForm.value)
    // this.todo.save(this.todoForm.value as Todo).subscribe()
    this.todoService.save(this.todoForm.value as Todo);
  }

  constructor() {}

  refresh(ev: any) {
    setTimeout(() => {
      (ev as RefresherCustomEvent).detail.complete();
    }, 3000);
  }

  toggle(todo: Todo) {
    const previous = todo.completed;
    this.todoService
      .toggleCompleted(todo)
      .pipe(
        tap(() => console.log('ok')),
        catchError(() => {
          todo.completed = previous;
          return of(false);
        })
      )
      .subscribe();
  }


  delete(todo:Todo){
    

    this.todoService.deleteTodo()





  }
}
