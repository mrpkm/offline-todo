import React, { useState, useEffect } from 'react';
import './style.scss';
import { BsCheckCircle } from 'react-icons/bs';
import { MdOutlineRadioButtonUnchecked } from 'react-icons/md';
import { MdDelete } from 'react-icons/md';

function Todo() {
    const [data, setData] = useState(() => {
        const savedData = localStorage.getItem('todoList');
        return savedData ? JSON.parse(savedData) : [];
    });
    const [todo, settodo] = useState('');

    useEffect(() => {
        localStorage.setItem('todoList', JSON.stringify(data));
    }, [data]);

    // Function to add a new todo item
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!todo) {
            alert('Please fill the task...');
            return;
        }
        const newItem = { title: todo, checked: false };
        const newData = [newItem, ...data];
        setData(newData);
        settodo('');
    };

    // Function to delete a todo item
    const handleDelete = (index) => {
        const newData = [...data];
        newData.splice(index, 1);
        setData(newData);
    };

    // Function to toggle the completion of a todo item
    const handleToggle = (index) => {
        const newData = [...data];
        newData[index].checked = !newData[index].checked;
        setData(newData);
    };

    return (
        <div className="todoPage">
            <form className="form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    id="todo"
                    value={todo}
                    placeholder="Write Your Task..."
                    onChange={(e) => settodo(e.target.value)}
                />
                <button type="submit">Add</button>
            </form>

            <div className="todoList">
                <ul>
                    {data.map((item, index) => (
                        <li key={index} className={item.checked ? 'checked' : ''}>
                            <div className="task">
                                <span> {item.title}</span>
                            </div>
                            <div className="btns">
                                {item.checked && (
                                    <span onClick={() => handleDelete(index)}>
                                        <MdDelete />
                                    </span>
                                )}
                                <span onClick={() => handleToggle(index)}>
                                    {item.checked ? <BsCheckCircle /> : <MdOutlineRadioButtonUnchecked />}
                                </span>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Todo;
