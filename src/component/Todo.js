import React, { useState, useEffect } from 'react';
import './style.scss';
import { BsCheckCircle } from 'react-icons/bs';
import { MdOutlineRadioButtonUnchecked } from 'react-icons/md';
import { MdDelete } from 'react-icons/md';

function Todo() {
    const [data, setData] = useState([]);
    const [todo, settodo] = useState('');

  // this is the use jsonplaceholder api 
    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/todos?_limit=10') // Fetch only 10 todos
            .then((response) => response.json())
            .then((todos) => {
                // set here to data
                setData(todos);
            });
    }, []);

    // this is for add the todo list
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
// this is a delete function
    const handleDelete = (index) => {
        const newData = [...data];
        newData.splice(index, 1);
        setData(newData);
    };
 // this is a toggle function 
    const handleToggle = (index) => {
        const newData = [...data];
        newData[index].checked = !newData[index].checked;
        setData(newData);
    };

    

    return (
        // input box and add button
        <div className="todoPage">
            <form className="form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    id="todo"
                    value={todo}
                    placeholder="Write Your Task..."
                    onChange={(e) => settodo(e.target.value)}
                />
                <button type="submit">Send</button>
            </form>

            {/* here is list of todo with map function and toggle and delete button */}
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
