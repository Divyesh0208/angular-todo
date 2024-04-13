import { createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store";
// import { AppState, todo } from "./app.state";
import * as todoActions from './todo.action';

export interface todo {
    id: number;
    item: string;
}

export interface AppState{
    todos: todo[];
}

const initialState: AppState = {
    todos:[]
};

const getTodoState = createFeatureSelector<AppState>('todos');

export const showTodos = createSelector(
  getTodoState,
  (state: AppState) => state.todos
);



export const todoReducer = createReducer<AppState>(
    initialState,
    on(todoActions.addTodo, (state, action): AppState => {
        console.log("action: ", action);
        console.log("state: ", state);
        console.log("action: ", [...state.todos, ...action.todo]);

        return {
            ...state,
            todos: [...state.todos, ...action.todo]
        };
    }),
    on(todoActions.editTodo, (state, action): AppState => {
        return {
            ...state,
            todos: state.todos.map(todo =>
                todo.id === action.id ? { ...todo, item: action.newValue } : todo
            )
        };
    }),
    on(todoActions.deleteTodo, (state, action): AppState => {
        return {
            ...state,
            todos: state.todos.filter(todo => todo.id !== action.id)
        };
    }),
    // on(todoActions.loadTodos, (state) => ({
    //     ...state,
    //     todos: state.todos
    //   }
    // )),
  );

 