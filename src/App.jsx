import './App.css';
import SimpleNameComponent from './features/simple_name/pages/SimpleNameComponent';

function App() {

  return (
    <div className="App">
      <h1>Nomes Brasileiros (IBGE)</h1>
      <div className="card">
      <SimpleNameComponent/>
      </div>
    </div>
  )
}

export default App
