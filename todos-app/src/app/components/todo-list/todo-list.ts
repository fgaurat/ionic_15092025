import { Component, inject, OnInit, WritableSignal } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { EMPTY, Observable } from 'rxjs';
import { Todos } from '../../models/todo';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-todo-list',
  // imports: [AsyncPipe],
  templateUrl: './todo-list.html',
  styleUrl: './todo-list.css'
})
export class TodoList implements OnInit{


  todoService:TodoService = inject(TodoService)
  public todosList:WritableSignal<Todos> = this.todoService.todoList;

  // todos$:Observable<Todos> = EMPTY

  ngOnInit(): void {
    // this.todos$ = this.todo.getTodos()
    this.todoService.getTodos();

  }

}
