import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
      // Редукторы будут определены здесь
      //Добавляет новое задание в список. 
      //Он генерирует уникальный id на основе текущего времени (Date.now()) 
      //Устанавливает текст задания (text) из action.payload
      //Изначально помечает задание как незавершенное (completed: false)
      addTodo: (state, action) => {
        const newTodo = {
          id: Date.now(),
          text: action.payload.text,
          completed: false,
          date: new Date(), // Добавили дату
        };
        state.push(newTodo);
      },
      //Этот редуктор переключает статус завершения задания
      //Он находит задание по id, переданному в action.payload, и меняет значение completed на противоположное
      toggleComplete: (state, action) => {
        const todo = state.find((todo) => todo.id === action.payload);
        if (todo) {
          todo.completed = !todo.completed;
        }
      },
      //Этот редуктор удаляет задание из списка
      //Он находит индекс задания по id, переданному в action.payload, и удаляет его из состояния
      deleteTodo: (state, action) => {
        return state.filter(todo => todo.id !== action.payload);
      },
    },
  });
export const { addTodo, toggleComplete, deleteTodo } = todoSlice.actions;
export default todoSlice.reducer;
