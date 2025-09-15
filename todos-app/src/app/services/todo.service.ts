import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { Observable,take, tap } from 'rxjs';
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
    this.http.get<Todo[]>(environment.URL_TODOS).pipe(
      take(1),
      tap(response => this.todoList.set(response)
      )
    ).subscribe();
  }

  save(todo: Todo): void {
    this.http.post<Todo[]>(environment.URL_TODOS, todo, this.httpOptions).pipe(
      take(1),
      tap(() => this.getTodos())
    ).subscribe();
  }
}
