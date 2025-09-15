import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TodoService } from '../../services/todo.service';
import { Todo } from '../../models/todo';

@Component({
  selector: 'app-todo-form',
  imports: [ReactiveFormsModule],
  templateUrl: './todo-form.html',
  styleUrl: './todo-form.css'
})
export class TodoForm {

  form:FormBuilder= inject(FormBuilder)
  todo:TodoService = inject(TodoService)

  todoForm = this.form.group({
    title:['',Validators.required],
    completed:[false]
  });


  submitTodo(){
    // console.log(this.todoForm.value)
    // this.todo.save(this.todoForm.value as Todo).subscribe()
    this.todo.save(this.todoForm.value as Todo)
  }

}
