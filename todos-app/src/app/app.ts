import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TodoList } from './components/todo-list/todo-list';
import { TodoForm } from "./components/todo-form/todo-form";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TodoList, TodoForm],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('todos-app');
}
