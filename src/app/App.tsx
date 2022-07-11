import React from 'react';
import Logo from './Logo';
//import './App.css'; // ==> ../index.html
import { useData } from './providers/HtmlTemplateDataProvider';

function App() {
  const { data } = useData<GoogleAppsScript.Events.DoGet>();
  const qs = (!data) ? '(data is unset)' : (!data.queryString) ? '(empty)' : data.queryString;
  return (
    <div className="App">
      <header className="App-header">
        <Logo className="App-logo" />
        <p>
          Edit <code>src/app/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <p>
          data.queryString = '<code>{qs}</code>'
        </p>
      </header>
    </div>
  );
}

export default App;
