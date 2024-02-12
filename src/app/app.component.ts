import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ToDo';
  todoList:string[]=[];
  getData:any;
  showBox = false;

  constructor(){
    this.addToStorage();
  }

  add(todo:string){
    console.log(todo);
    this.todoList.push(todo);
    console.log("this.todoList: ", this.todoList);
    localStorage.setItem("toDo",JSON.stringify(this.todoList));
    this.addToStorage();
  }
  addToStorage(){
    if(localStorage.getItem("toDo")){
      this.showBox=true;
      this.getData =localStorage.getItem("toDo");
      this.getData = JSON.parse(this.getData);
      this.todoList = this.getData;
      console.log("this.getData : ",this.getData );
    }
  }
  delete(index:number){
    console.log("index: ", index);
    this.removeItem(index);
  }
  removeItem(index:number){
    let updatedData = this.getData.splice(index,1);
    updatedData = this.getData.filter((word:any) => word !== updatedData);
    localStorage.setItem("toDo",JSON.stringify(updatedData));
    console.log("updatedData : ", updatedData );
    console.log("hello ");
  }
  edit(value:string,id:number){
    this.getData[id]=value;
    localStorage.setItem("toDo",JSON.stringify(this.getData));
  }

}
