import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTodo, toggleComplete, deleteTodo } from './todoSlice';
import 'bootstrap/dist/css/bootstrap.min.css';

const Todo = () => {
    const [text, setText] = useState("");
    const todos = useSelector((state) => state.todos);
    const dispatch = useDispatch();

    // Добавляем состояние для фильтра
    const [filter, setFilter] = useState('all');

    // Функция для изменения фильтра
    const handleFilterChange = (newFilter) => {
        setFilter(newFilter);
    };

    const handleInputChange = (e) => {
        setText(e.target.value);
    };

    const handleAddTodo = () => {
        if (text) {
            dispatch(addTodo({ text }));
            setText("");
        }
    };

    const handleToggleComplete = (id) => {
        dispatch(toggleComplete(id));
    };

    const handleDeleteTodo = (id) => {
        dispatch(deleteTodo(id));
    };

    // Группируем задания по датам
    const groupedTodos = {};
    todos.forEach(todo => {
        const dateString = todo.date.toLocaleDateString(); // Форматируем дату
        if (!groupedTodos[dateString]) {
            groupedTodos[dateString] = [];
        }
        groupedTodos[dateString].push(todo);
    });

    // Применяем фильтр к заданиям
    let filteredGroupedTodos = Object.entries(groupedTodos);
    
    if (filter === 'completed') {
        // Оставляем только завершенные задания
        filteredGroupedTodos = filteredGroupedTodos.map(([date, todos]) => [
            date,
            todos.filter(todo => todo.completed),
        ]);
    } else if (filter === 'active') {
        // Оставляем только активные задания
        filteredGroupedTodos = filteredGroupedTodos.map(([date, todos]) => [
            date,
            todos.filter(todo => !todo.completed),
        ]);
    }

    return (
        <div
        className='justify-content-center'
        style={{
          maxHeight: '100vh',
          maxWidth:'100vh',
          transform: 'translate(550px)'
        }}>
            <input style={{borderRadius:'5px',width:'100%',marginBottom:'20px'}} type="text" value={text} onChange={handleInputChange} />
            <br/>
            <button style={{backgroundColor:'#FF4500',borderRadius:'10px',width:'100%'}} onClick={handleAddTodo}>Add Todo</button>
            <br/>
            <button style={{backgroundColor:'#39a9ff',borderRadius:'10px'}} onClick={() => handleFilterChange('all')}>Все</button>
            <button style={{backgroundColor:'#40E0D0',borderRadius:'10px'}} onClick={() => handleFilterChange('completed')}>Завершенные</button>
            <button style={{backgroundColor:'#B0C4DE',borderRadius:'10px'}} onClick={() => handleFilterChange('active')}>Активные</button>
            <ul style={{listStyleType:'none'}}>
                {filteredGroupedTodos.map(([date, todos], index) => (
                    <React.Fragment key={`${date}-${index}`}>
                        <h5 className='mt-3'>{date}</h5> {/* Заголовок с датой */}
                        {todos.length > 0 && todos.map(todo => (
                            <li 
                                key={todo.id}
                                style={{ 
                                    textDecoration: todo.completed ? 'line-through' : 'none'
                                    }}
                            >
                                {' '}
                                {/* Используем галочку или крестик */}
                                <button
                                    onClick={() => handleToggleComplete(todo.id)}
                                    className='btn pt-1' 
                                >
                                    {todo.completed ? '✓': '✍ '}
                                </button>
                                {todo.text}
                                {' '}
                                <button onClick={() => handleDeleteTodo(todo.id)} className='btn btn-danger mt-2'>Удалить</button>
                            </li>
                        ))}
                    </React.Fragment>
                ))}
            </ul>
        </div>
    );
};

export default Todo;