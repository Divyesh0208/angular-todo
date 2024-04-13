import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as todoActions from '../state/todo.action'
import { AppState, showTodos } from '../state/todo.reducer';

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.scss']
})
export class ViewTaskComponent implements OnInit{

  selectedTask!: string;
  originalTask!: string;
  selectedTaskId!: number;
  disableSave = true;

  constructor(private route: ActivatedRoute, private router:Router, private store: Store<AppState>){}

  ngOnInit(): void {
      console.log(this.route.snapshot.paramMap.get('id'));
      const id = this.route.snapshot.paramMap.get('id');

      if(id !== null){
        this.selectedTaskId = +id;
        this.store.select(showTodos).subscribe( todos => {
          console.log(todos);
          todos.forEach(todo => {
            if(todo.id == +id){
              this.selectedTask = todo.item;
              this.originalTask = todo.item;
            }
          })
        })
      }

      console.log ("selected Task: ",this.selectedTask);

  }

  validation(){
    if(this.selectedTask === this.originalTask){
      this.disableSave = true;
    } else if (this.selectedTask === ''){
      this.disableSave = true;
    } else {
      this.disableSave = false;
    }
  }

  save(){
    console.log("save funcction");
    
    this.store.dispatch(todoActions.editTodo({ id:this.selectedTaskId, newValue: this.selectedTask }));
    this.router.navigate(['..']);
  }

  delete(){
    const confirmDelete = confirm("Confirm Delete Task?");

    if(confirmDelete) {
      this.store.dispatch(todoActions.deleteTodo({ id: this.selectedTaskId }));
      this.router.navigate(['..']);
    }
  }


}
