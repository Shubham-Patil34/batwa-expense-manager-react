import logo from './logo.svg';
import './App.css';
import Nav from './components/common/Nav';
import Welcome from './components/Welcome';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div>
      <Nav />
      <Welcome />
    </div>
  );
}

export default App;
