import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState, showTodos, todo } from '../state/todo.reducer';
import * as todoActions from '../state/todo.action'
import { Observable } from 'rxjs';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit{
  title = 'ToDo';
  
  isToggleImport = false;
  isSusscessImport = false;
  isWarningImport = false;
  isDangerImport = false;  

  todoList: any[] = [];
  // getData: any;
  showBox = false;
  addTodo!: string;
  isEdit = false;
  isDisable = true;

  isUnidentifiedItems = false;
  isNotItems = false;
  isImportedItems = false;
  getData$!: Observable<todo[]>;

  constructor(private store:Store<AppState>){
    // this.readFromStorage();
  }

  ngOnInit(): void {
    // this.store.dispatch(todoActions.loadTodos());

    // this.store.select(showTodos).subscribe( todo => {
    //   console.log("todo: ", todo);
    //   this.getData.push(...todo);
    // })

    this.getData$ = this.store.select(showTodos);
  }

  toggleImport(){
    this.isToggleImport = !this.isToggleImport;
  }
  
  validation(){
    console.log(this.addTodo);
    if(this.addTodo === undefined || this.addTodo === '' ){
      this.isDisable = true;
    } else {
      this.isDisable = false;
    }
  }

  // add(){
  //   const newItem = {
  //     id: this.todoList.length + 1,
  //     item: this.addTodo
  //   };
  //   console.log(this.addTodo);
  //   this.todoList.push(newItem);
  //   console.log("this.todoList: ", this.todoList);
  //   console.log(this.todoList.length);
  //   localStorage.setItem("toDo",JSON.stringify(this.todoList));
  //   this.readFromStorage();
  //   this.addTodo = '';
  //   this.isDisable = true;
  // }

  add() {
    const newItem = [{
      id: new Date().getTime(),
      item: this.addTodo
    }];
    this.store.dispatch(todoActions.addTodo({ todo: newItem }));
    this.addTodo = '';
    this.isDisable = true;
  }

  // readFromStorage(){
  //   if(localStorage.getItem("toDo")){
  //     this.showBox=true;
  //     this.getData =localStorage.getItem("toDo");
  //     this.getData = JSON.parse(this.getData);
  //     if(this.getData.length === 0 ){
  //       this.showBox = false;
  //     }
  //     this.todoList = this.getData;
  //     console.log("this.getData : ",this.getData );
  //   }
  // }

  importTodoList(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.readFile(file).then(jsonData => {
        console.log(jsonData);

        let data = jsonData;
        for(let i = 0; i <= data.length ; i++){
          setTimeout(() => {
          // for( let j = i ; j < 50 + i ; j++){
            jsonData[i].id= this.todoList.length + 1;
            this.todoList.push(jsonData[i])
            
          }, 50);
        }

        let undefinedItems: any[] = [];
        let id = this.todoList.length + 1;

        if(undefinedItems.length === data.length){
          data = data.filter( (value : any) => !undefinedItems.includes(value) );
          this.isDangerImport = true;
          setTimeout( () => {
            // event.target.value = '';
            this.isDangerImport = false;
          }, 3000);
        }
        else if(undefinedItems.length > 0){
          data = data.filter( (value : any) => !undefinedItems.includes(value) );
          this.isWarningImport = true;
          setTimeout( () => {
            // event.target.value = '';
            this.isWarningImport = false;
          }, 3000);
        }
                

        // this.todoList.push(...data);
        // localStorage.setItem("toDo", JSON.stringify(this.todoList));
        // this.readFromStorage();

        // Do something with the JSON data
      }).catch( (error) => console.error("Error reading file",error));
    }
  }

  readFile(file: File): Promise<any> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        try {
          const jsonData = JSON.parse(e.target.result);
          resolve(jsonData);
        } catch (error) {
          reject(error);
        }
      };

      reader.onerror = (e) => {
        reject(e);
      };

      reader.readAsText(file);
    });
  }

  tryParseJSON(data: string, resolve: (value?: any) => void, reject: (reason?: any) => void) {
    try {
      console.log("data: ", data);
      const jsonData = JSON.parse(data);
      resolve(jsonData);
    } catch (error) {
      console.error ("error on try parse Json fun: ",error)
      // JSON parsing failed, possibly incomplete data, do nothing, continue reading
    }
  }

  onEdit(id:number){
    // console.log("data",this.getData$)
    // this.getData$.forEach(item => {
    //   if(item[0].id === id){
        
    //   }
    //   console.log( "item: ", item[0].id );
    // })
    this.isEdit = true;
  }

  isEdit1(id: number): boolean{
    console.log("ad;fa;df",this.getData$.forEach(item => {
      if(item[0].id === id){
        return true;
      } else {
        return false;
      }
    }));
    return true;
  }

  onCancel(){
    let saveTask = this.addTodo;
    console.log("saveTask: ", saveTask);
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

  exportTodoList() {
    const json = JSON.stringify(this.todoList);
    const blob = new Blob([json], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'todo-list.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }
}
