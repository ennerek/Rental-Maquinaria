import { Outlet } from 'react-router-dom';
import './App.css';
import Header from './Layouts/Header/Header';
import { Home } from './Pages/Home/Home';



function App() {
	return (
		<div className="App">
			<Header />
			<Outlet />
		</div>
	);
}

export default App;