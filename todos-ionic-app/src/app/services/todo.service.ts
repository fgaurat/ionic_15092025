import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  inject,
  Injectable,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import { catchError, Observable, of, take, tap } from 'rxjs';
import { Todo, Todos } from '../models/todo';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  private http: HttpClient = inject(HttpClient);
  todoList: WritableSignal<Todo[]> = signal([]);

  // getTodos(): Observable<Todos> {
  //   return this.http.get<Todos>(environment.URL_TODOS);
  // }

  // save(todo: Todo): Observable<Todo> {
  //   return this.http.post<Todo>(environment.URL_TODOS, todo, this.httpOptions);
  // }

  getTodos(): void {
    this.http
      .get<Todo[]>(environment.URL_TODOS)
      .pipe(
        take(1),
        tap((response) => this.todoList.set(response))
      )
      .subscribe();
  }

  save(todo: Todo): void {
    this.http
      .post<Todo[]>(environment.URL_TODOS, todo, this.httpOptions)
      .pipe(
        take(1),
        tap(() => this.getTodos())
      )
      .subscribe();
  }

  toggleCompleted(todo: Todo): Observable<Todo> {
    const url = `${environment.URL_TODOS}/${todo.id}`;
    return this.http.patch<Todo>(url, { completed: !todo.completed }).pipe(
      take(1),
      tap(() => this.getTodos())
    );
  }

  getTodoById(id: number): Todo | undefined {
    return this.todoList().find((todo) => todo.id === id);
  }

  deleteTodo(id: number): void {
    const url = `${environment.URL_TODOS}/${id}`;
    const previousList = this.todoList();
    const newTodos = this.todoList().filter((t) => t.id !== id)
    this.todoList.set(newTodos)

    this.http
      .delete<void>(url)
      .pipe(
        catchError(()=>{
          this.todoList.set(previousList)
          return of(false)
        })
      )
      .subscribe();
  }
}
