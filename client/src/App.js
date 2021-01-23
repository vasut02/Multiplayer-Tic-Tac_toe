/*IMPORTS*/
import React, { useState } from "react";
import './App.css';
import { Redirect , BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/home/Home";
import Play from "./components/play/Play";
import NavBar from "./components/navBar/NavBar";
import { UserContext } from './UserContext';
function App() {

	const [user, setUser] = useState(null);

	return (
		<Router>
			<div className="App">
				<UserContext.Provider value={{ user, setUser }}>
					<NavBar/>
					<Switch>
						<Route exact path="/" component={Home} />
						<Route exact path="/Play/:room_id" component={Play} />
						<Redirect from="*" to="/" />
					</Switch>
				</UserContext.Provider>
			</div>
		</Router>
	);
}

export default App;
