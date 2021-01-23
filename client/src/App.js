import logo from './logo.svg';
import React, { useState } from "react";
import './App.css';
import { Redirect, BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/home/Home";
import { UserContext } from './UserContext';

function App() {

	const [user, setUser] = useState(null);

	return (
		<Router>
			<div className="App">
				<UserContext.Provider value={{ user, setUser }}>
					<Switch>
						<Route exact path="/" component={Home} />
					</Switch>
				</UserContext.Provider>
			</div>
		</Router>
	);
}

export default App;
