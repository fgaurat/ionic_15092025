import { Injectable } from '@angular/core';
import {
  CapacitorSQLite,
  SQLiteConnection,
  SQLiteDBConnection,
} from '@capacitor-community/sqlite';
import { BehaviorSubject } from 'rxjs';
import { Todos } from '../models/todo';
import { Capacitor } from '@capacitor/core';


type TodoRow = {
  id: number;
  title: string;
  completed: number;
  created_at: number;
};
type TodoRows = TodoRow[]


@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private readonly database = 'todo_db';

  private readonly table = `CREATE TABLE IF NOT EXISTS todos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    completed INTEGER NOT NULL DEFAULT 0,
    created_at INTEGER NOT NULL
  );`;

  private sqliteConnection = new SQLiteConnection(CapacitorSQLite);
  private db: SQLiteDBConnection | null = null;
  private initialized = false;

  private readonly ready$ = new BehaviorSubject(false);
  private readonly todos$ = new BehaviorSubject<Todos>([]);

  async init(): Promise<void> {
    if (this.initialized) {
      return;
    }


    await this.initializePlugin();
    console.log('initializePlugin')
    await this.openConnection();
    await this.setupSchema();
    await this.loadTodos();

    this.initialized = true;
    this.ready$.next(true);
  }

  get isReady$() {
    return this.ready$.asObservable();
  }

  get todosObservable$() {
    return this.todos$.asObservable();
  }

  private async openConnection(): Promise<void> {
    await this.sqliteConnection.checkConnectionsConsistency();
    const connectionExists = (
      await this.sqliteConnection.isConnection(this.database, false)
    ).result;

    if (connectionExists) {
      this.db = await this.sqliteConnection.retrieveConnection(
        this.database,
        false
      );
    } else {
      this.db = await this.sqliteConnection.createConnection(
        this.database,
        false,
        'no-encryption',
        1,
        false
      );
    }

    await this.db.open();
  }

  private async initializePlugin(): Promise<void> {
    if (Capacitor.getPlatform() === 'web') {
      if (!document.querySelector('jeep-sqlite')) {
        // Ensure the jeep-sqlite element exists on the document when running on web
        const jeep = document.createElement('jeep-sqlite');
        document.body.appendChild(jeep);
      }
      await CapacitorSQLite.initWebStore();
    }
  }
  private async ensureDb(): Promise<void> {
    if (!this.db) {
      throw new Error('Database connection is not initialized');
    }
  }

  private async setupSchema(): Promise<void> {
    await this.ensureDb();
    await this.db!.execute(this.table);
  }

  private async loadTodos(): Promise<void> {
    await this.ensureDb();
    const result = await this.db!.query('SELECT * FROM todos ORDER BY created_at DESC');
    const values = (result.values ?? []) as TodoRows;

    const todos: Todos = values.map(({ id, title, completed, created_at }) => ({
      id,
      title,
      completed: completed === 1,
      createdAt: created_at,
    }));

    this.todos$.next(todos);
  }

  async addTodo(title: string): Promise<void> {
    if (!title.trim()) {
      return;
    }

    await this.ensureDb();
    await this.db!.run(
      'INSERT INTO todos (title, completed, created_at) VALUES (?, ?, ?)',
      [title.trim(), 0, Date.now()]
    );

    await this.loadTodos();
  }
}
