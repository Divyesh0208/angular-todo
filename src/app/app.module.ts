import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { TodoComponent } from './todo/todo.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { todoReducer } from './state/todo.reducer';
import { ViewTaskComponent } from './view-task/view-task.component';
import { ShowTodoComponent } from './show-todo/show-todo.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';

// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    TodoComponent,
    ViewTaskComponent,
    ShowTodoComponent,
  
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path: 'todos', component: ShowTodoComponent},
      {path: '', redirectTo: 'todos', pathMatch:'full'},
      {path: 'todos/:id', component: ViewTaskComponent}
    ]),
    StoreModule.forRoot({ todos: todoReducer }),
    StoreDevtoolsModule.instrument({
      name: "Todo App",
      maxAge: 25,
    }),
    EffectsModule.forRoot([])
    // NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
