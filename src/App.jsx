import { useState, useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [todo, settodo] = useState("");
  const [todos, settodos] = useState([]);
  const [showFinished, setshowFinished] = useState(true);

  useEffect(() => {
    const todoString = localStorage.getItem("todos");
    if (todoString) settodos(JSON.parse(todoString));
  }, []);

  const saveToLS = (todosArray) => {
    localStorage.setItem("todos", JSON.stringify(todosArray));
  };

  const toggleFinished = () => setshowFinished(!showFinished);

  const handleEdit = (e, id) => {
    const t = todos.filter((i) => i.id === id);
    settodo(t[0].todo);
    const newTodos = todos.filter((item) => item.id !== id);
    settodos(newTodos);
    saveToLS(newTodos);
  };

  const handleDelete = (e, id) => {
    const newTodos = todos.filter((item) => item.id !== id);
    settodos(newTodos);
    saveToLS(newTodos);
  };

  const handleAdd = () => {
    const newTodos = [...todos, { id: uuidv4(), todo: todo, isCompleted: false }];
    settodos(newTodos);
    settodo("");
    saveToLS(newTodos);
  };

  const handleChange = (e) => settodo(e.target.value);

  const handleCheckBox = (e) => {
    const id = e.target.name;
    const index = todos.findIndex((item) => item.id === id);
    const newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    settodos(newTodos);
    saveToLS(newTodos);
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto my-10 rounded-xl bg-violet-50 shadow-lg min-h-[80vh] w-3/4 p-6">
        {/* Add Todo Section */}
        <div className="addTodo mb-6">
<h2 className="text-2xl font-bold mb-4 text-violet-900">
  i-Task: Add all Todos at one place
</h2>
          <h2 className="text-2xl font-bold mb-3 text-violet-900">Add a Todo</h2>
          <div className="flex gap-3">
            <input
              onChange={handleChange}
              value={todo}
              type="text"
              className="flex-grow p-2 rounded border border-violet-300 focus:outline-none focus:ring-2 focus:ring-violet-400"
              placeholder="Enter your todo..."
            />
            <button
              onClick={handleAdd}
              disabled={todo.length < 3}
              className="bg-violet-800 hover:bg-violet-950 text-white font-semibold px-4 py-2 rounded disabled:opacity-50"
            >
              Save
            </button>
          </div>
        </div>

        {/* Show Finished Toggle */}
        <div className="flex items-center mb-4 gap-2">
          <input
            type="checkbox"
            checked={showFinished}
            onChange={toggleFinished}
            id="showFinished"
            className="w-4 h-4 accent-violet-600"
          />
          <label htmlFor="showFinished" className="text-violet-700 font-medium">
            Show Finished Todos
          </label>
        </div>

        {/* Todo List */}
        <h1 className="text-xl font-bold mb-4 text-violet-900">Your Todos</h1>
        {todos.length === 0 && <div className="text-gray-500">No todos added yet</div>}

        <div className="flex flex-col gap-3">
          {todos.map(
            (item) =>
              (showFinished || !item.isCompleted) && (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 bg-white rounded shadow-sm hover:shadow-md transition gap-2"
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <input
                      name={item.id}
                      onChange={handleCheckBox}
                      type="checkbox"
                      checked={item.isCompleted}
                      className="w-5 h-5 accent-violet-600 flex-shrink-0"
                    />
                    <span
                      className={`text-violet-900 font-medium break-words truncate ${item.isCompleted ? "line-through text-gray-400" : ""}`}
                    >
                      {item.todo}
                    </span>
                  </div>
                  <div className="flex gap-2 mt-2 sm:mt-0">
                    <button
                      onClick={(e) => handleEdit(e, item.id)}
                      className="bg-violet-700 hover:bg-violet-900 text-white text-sm font-medium px-3 py-1 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={(e) => handleDelete(e, item.id)}
                      className="bg-red-600 hover:bg-red-800 text-white text-sm font-medium px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )
          )}
        </div>
      </div>
    </>
  );
}

export default App;
