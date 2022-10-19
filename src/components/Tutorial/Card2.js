import React from "react";
// import { Card } from "react-bootstrap";
// import Ed from "../images/Ed.png";
import Route from "../images/two.png";

const myStyle = {
	border: "5px solid whitesmoke",
	borderRadius: "4px",
	padding: "5px",
	width: "50%",
	marginRight: "auto",
	marginLeft: "auto",
	display: "block",
	// width: "250px",
	// height: "250px",
	// display: "flex",
	// flexDirection: "column",
	// alignItems: "center",
};

export default function Card2() {
	return (
		<div>
			<br></br>
			<p className="textBody">
				At its core, a pathfinding algorithm searches a graph by
				starting at one vertex and exploring adjacent nodes until the
				destination node is reached, generally with the intent of
				finding the cheapest route. In layman's terms a pathfinding
				algorithm seeks to find the shortest path between two points.
			</p>
			{/* <br></br> */}
			<p className="textBody">
				This application visualizes various pathfinding algorithms.
				Theses algorithms are adapted for a 2D grid, where movements
				from a one node to another have a "cost" 1.
			</p>
			{/* <br></br> */}
			{/* <br></br> */}
			<img src={Route} alt="Education" style={myStyle} />
		</div>
	);
}
