import React, { Component } from "react";
import PathFindingVisualizer from "./components/pathfinder/PathFindingVisualizer";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/js/dist/dropdown";

class App extends Component {
	render() {
		return <PathFindingVisualizer />;
	}
}

export default App;
