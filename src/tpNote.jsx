import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import './index.css'
import { createRoot } from 'react-dom/client';
import axios from 'axios';


function App() {
    const [taskName, setTaskName] = useState('');
    const [city, setCity] = useState('');
    const [apiData, setApiData] = useState(null);

    const addTask = () => {
        if (taskName) {
          setTasks([...tasks, taskName]);
          setTaskName('');
        }
      };

      const handleSearch = async () => {
        try {
          const response = await axios.get(`https://jb03dcnv74.execute-api.eu-west-1.amazonaws.com/Prod/weather/${city}`);
          const data = Object.entries(response.data).map(([key, value]) => ({ key, value }));
          setApiData(data);
        } catch (error) {
          console.error('Erreur lors de la recherche dans l\'API :', error);
          setApiData(null);
        }
      };

      const getInformation = (condition) => {
        if (condition == 'sunny') {
            return 'Hydrate yourself'
        }
        else if (condition == 'cloudy'){
            return 'Today it will be covered'
        }
        else if (condition == 'windy'){
            return 'Cover yourself'
        }
        else if (condition == 'rainy'){
            return 'Take an umbrella'
        }
        else {
            return 'Stay careful'
        }
      }

      const getIcon = (condition) => {
        if (condition == 'sunny') {
            const sunny = <svg
            viewBox="0 0 512 512"
            fill="currentColor"
            height="1em"
            width="1em"
          >
            <path
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeMiterlimit={10}
              strokeWidth={32}
              d="M256 48v48M256 416v48M403.08 108.92l-33.94 33.94M142.86 369.14l-33.94 33.94M464 256h-48M96 256H48M403.08 403.08l-33.94-33.94M142.86 142.86l-33.94-33.94"
            />
            <path
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeMiterlimit={10}
              strokeWidth={32}
              d="M336 256 A80 80 0 0 1 256 336 A80 80 0 0 1 176 256 A80 80 0 0 1 336 256 z"
            />
          </svg>
          return sunny; 
        } 
        else if (condition == 'cloudy'){
            const cloudy = <svg
            fill="currentColor"
            viewBox="0 0 16 16"
            height="1em"
            width="1em"
          >
            <path d="M13.405 8.527a5.001 5.001 0 00-9.499-1.004A3.5 3.5 0 103.5 14.5H13a3 3 0 00.405-5.973zM8.5 5.5a4 4 0 013.976 3.555.5.5 0 00.5.445H13a2 2 0 01-.001 4H3.5a2.5 2.5 0 11.605-4.926.5.5 0 00.596-.329A4.002 4.002 0 018.5 5.5z" />
          </svg>
          return cloudy; 
        }
        else if (condition == 'windy'){
            const windy = <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            height="1em"
            width="1em"
          >
            <path d="M6 6l.69.06A5.499 5.499 0 0112 2a5.5 5.5 0 015.5 5.5l-.08.95c.46-.29 1-.45 1.58-.45a3 3 0 013 3 3 3 0 01-3 3H6a4 4 0 01-4-4 4 4 0 014-4m0 2a2 2 0 00-2 2 2 2 0 002 2h13a1 1 0 001-1 1 1 0 00-1-1h-3.5V7.5A3.5 3.5 0 0012 4a3.5 3.5 0 00-3.5 3.5V8H6m12 10H4a1 1 0 01-1-1 1 1 0 011-1h14a3 3 0 013 3 3 3 0 01-3 3c-.83 0-1.58-.34-2.12-.88-.38-.39-.38-1.02 0-1.41a.996.996 0 011.41 0c.18.18.43.29.71.29a1 1 0 001-1 1 1 0 00-1-1z" />
          </svg>
          return windy;
        }
        else if (condition == 'rainy'){
            const rainy = <svg
            viewBox="0 0 512 512"
            fill="currentColor"
            height="1em"
            width="1em"
          >
            <path
              fill="none"
              stroke="currentColor"
              strokeLinejoin="round"
              strokeWidth={32}
              d="M114.61 162.85A16.07 16.07 0 00128 149.6C140.09 76.17 193.63 32 256 32c57.93 0 96.62 37.75 112.2 77.74a15.84 15.84 0 0012.2 9.87c50 8.15 91.6 41.54 91.6 99.59 0 59.4-48.6 100.8-108 100.8H130c-49.5 0-90-24.7-90-79.2 0-48.47 38.67-72.22 74.61-77.95z"
            />
            <path
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={32}
              d="M144 384l-32 48M224 384l-64 96M304 384l-32 48M384 384l-64 96"
            />
          </svg>
          return rainy; 
        }
        else {
            const stormy = <svg
            baseProfile="tiny"
            viewBox="0 0 24 24"
            fill="currentColor"
            height="1em"
            width="1em"
          >
            <path d="M17 18a1 1 0 110-2c1.654 0 3-1.346 3-3s-1.346-3-3-3c-.238 0-.496.042-.813.131l-1.071.301-.186-1.098A3.98 3.98 0 0011 6a4.005 4.005 0 00-3.918 4.806l.26 1.24-1.436-.052C4.896 12 4 12.897 4 14s.896 2 2 2a1 1 0 110 2c-2.205 0-4-1.794-4-4a4.007 4.007 0 013.002-3.874L5 10c0-3.309 2.691-6 6-6a5.967 5.967 0 015.649 4.015C19.574 7.774 22 10.127 22 13c0 2.757-2.243 5-5 5zm-4.361-4l-4.5 4.051 3 1.449-1.5 3.5 4.5-4.05-3-1.45z" />
          </svg>
          return stormy; 
        };
        }
    
    return (
        <div style={{ alignItems: 'center', border: '5px solid black', padding: '20px' }}>
        <button onClick={handleSearch}>
            <svg fill="none" viewBox="0 0 24 24" height="1em" width="1em">
                <path
                    fill="currentColor"
                    fillRule="evenodd"
                    d="M18.319 14.433A8.001 8.001 0 006.343 3.868a8 8 0 0010.564 11.976l.043.045 4.242 4.243a1 1 0 101.415-1.415l-4.243-4.242a1.116 1.116 0 00-.045-.042zm-2.076-9.15a6 6 0 11-8.485 8.485 6 6 0 018.485-8.485z"
                    clipRule="evenodd"
                />
            </svg>
        </button>

        <input
            type='text'
            placeholder='Search'
            value={city}
            onChange={(e) => setCity(e.target.value)}
            style={{ padding: '10px', marginRight: '10px' }}
        />

        {/* Afficher les données récupérées de l'API */}
        {apiData && (
            <div style={{ marginTop: '20px', padding: '10px' }}>
                <div>
                    <ul style={{ listStyleType: 'none', padding: 0 }}>
                    {apiData.map(({ key, value }, index) => (
                        <li 
                        key={key} 
                        style={{ 
                            borderBottom: index === 0 ? '1px solid #ccc' : 'none', 
                            paddingBottom: index >= 1 ? '0px' : '10px',
                            marginBottom: index >= 1 ? '0px' : '10px',
                            textAlign: 'justify',
                            textTransform: index <= 1 ? 'uppercase' : 'none',
                            fontWeight: index <= 1 ? 'bold' : 'normal',
                            fontSize: index === 1 ? '2.5em' : '1em',
                            display: 'flex',
                            justifyContent:'space-between'
                            }}>
                            {index === 1 ? `${value}°C` : `${value}`}
                            {index === 1 && (<span style={{ marginRight: '10px' }}>{getIcon(apiData[2].value)}</span>)}
                            </li>
                    ))}
                    </ul>
                    <ul style={{ listStyleType: 'none', padding: 0 }}>
                        <li style={{textAlign: 'justify', borderTop: '1px solid #ccc', paddingTop: '5px'}}>
                        <span style={{ marginRight: '10px' }}>{getInformation(apiData[2].value)}</span>
                        </li>
                    </ul>
                </div>
            </div>
        )}
    </div>
    );
  }

createRoot(document.getElementById("root")).render(<App />);

