import { createAction, props } from "@ngrx/store";
import { todo } from "./todo.reducer";

// export const loadTodos = createAction(
//     '[Todos] Load Todos'
//     );

export const addTodo = createAction(
    '[Todos] Add Todo',
    props<{todo: todo[]}>()
)

export const editTodo = createAction(
    '[Todos] Edit Todo',
    props<{id: number, newValue: string}>()
)

export const deleteTodo = createAction(
    '[Todos] Delete Todo',  
    props<{id: number}>()
)
