import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState, showTodos, todo } from '../state/todo.reducer';
import * as todoActions from '../state/todo.action'
import { Observable } from 'rxjs';
import { BaseService } from '../service/base.service';

@Component({
  selector: 'app-show-todo',
  templateUrl: './show-todo.component.html',
  styleUrls: ['./show-todo.component.scss']
})
export class ShowTodoComponent implements OnInit {

  isEdit = false;
  getData$!: Observable<todo[]>;


  constructor(private store: Store<AppState>, private baseService: BaseService){}

  ngOnInit(): void {
    this.getData$ = this.store.select(showTodos);
    this.baseService.get().then( (res) => {
      console.log(res);
    })
  }

  selectItem(id: number){
    console.log(id);
  }

  onEdit(){
    this.isEdit = true;
  }

  onCancel(){
    this.isEdit = false;
  }

  // edit(value: string, id: number) {
  //   const itemIndex:any = this.todoList.findIndex((item: any) => item.id === id);
  //   if (itemIndex !== -1) {
  //     console.log(this.todoList[itemIndex]);
  //     this.todoList[itemIndex].item = value;
  //     localStorage.setItem("toDo", JSON.stringify(this.todoList));
  //   }
  //   this.isEdit = false;
  // }

  edit(newValue:string, id:number) {
    // Dispatch an action to edit a todo
    this.store.dispatch(todoActions.editTodo({ id:id, newValue }));
    this.isEdit = false;
  }

  

  // delete(id: number) {
  //   let i = 0 ;
  //   this.todoList = this.todoList.filter((item: any) => item.id !== id);
  //   this.todoList.forEach( (item:any) => {
  //     console.log(item.id);
  //     item.id = ++i;
  //   })
  //   localStorage.setItem("toDo", JSON.stringify(this.todoList));
  //   this.readFromStorage();
  // }

  delete(id: number) {
    this.store.dispatch(todoActions.deleteTodo({ id }));
  }

  // exportTodoList() {
  //   const json = JSON.stringify(this.todoList);
  //   const blob = new Blob([json], { type: 'application/json' });
  //   const url = window.URL.createObjectURL(blob);
  //   const a = document.createElement('a');
  //   a.href = url;
  //   a.download = 'todo-list.json';
  //   document.body.appendChild(a);
  //   a.click();
  //   document.body.removeChild(a);
  //   window.URL.revokeObjectURL(url);
  // }
}
