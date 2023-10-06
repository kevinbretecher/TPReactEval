import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'


function App() {
  const [count, setCount] = useState(0);
  const [taskName, setTaskName] = useState('');
  const [tasks, setTasks] = useState([]);

  const addTask = () => {
    if (taskName) {
      setTasks([...tasks, taskName]);
      setTaskName('');
      setCount(count + 1);
    }
  };

  const removeTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
    setCount(count - 1);
  };

  return (
    <div className='container'>
      <h3>
        <p>You have {count} Todos</p>
      </h3>
      

      {/* Affiche toutes les tâches */}
      {tasks.length > 0 && (
        <div >
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            {tasks.map((task, index) => (
              <li key={index} style={{ border: '1px solid black', padding: '10px', display: 'flex',
              justifyContent: 'space-between' }}>
                <span style={{ marginRight: '10px' }}>{task}</span>
                <button onClick={() => removeTask(index)}>X</button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <input
        type='text'
        placeholder='Enter task'
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        style={{  padding: '10px', justifyContent:'space-between'}}
      />
      <button style={{ marginLeft: '10px' }}onClick={addTask}>Submit</button>
    </div>
  );
}



/*
function App() {
  const [count, setCount] = useState(0);
  const [taskName, setTaskName] = useState('');
  const [tasks, setTasks] = useState([]);

  const addTask = () => {
    if (taskName) {
      setTasks([...tasks, taskName]); // Ajoute la tâche dans le tableau
      setTaskName(''); // Efface le champ de texte après ajout
      setCount(count + 1); // Met à jour le compteur
    }
  };

  return (
    <div className='container'>
      <p>You have {count} Todos</p>
      {tasks.length > 0 && (
              <div style={{ border: '1px solid black', padding: '10px', marginTop: '10px' }}>
                <h2>All Tasks:</h2>
                <ul>
                  {tasks.map((task, index) => (
                    <li key={index}>{task}</li>
                  ))}
                </ul>
              </div>
            )}
      <input
        type='text'
        placeholder='Enter task'
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
      />
      <button onClick={addTask}>Submit</button>

      
    </div>
  );
}
*/
export default App
