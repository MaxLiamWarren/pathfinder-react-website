import React from "react";
// import CS from "../images/CS.png";
import Destination from "../images/des.png";

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

export default function Card3() {
	return (
		<div>
			<br></br>
			<p className="textBody">
				<small>
					<span className="bold">
						Dijkstra's Algorithm (weighted):
					</span>{" "}
					Is a path algorithm that gurantees the shortest path. The
					algorithm starts from the start node and picks an unvisited
					neighbor with the lowest distance score. It then calculates
					the distance through that node to each of its unvisited
					neighbors unitl the finish node is reached. Dijkstra's
					algorithm is a weighted algorithm that is often used to
					represent road networks since it accounts for weighted
					nodes.
				</small>
			</p>
			{/* <br></br> */}
			<p className="textBody">
				<small>
					<span className="bold">A-Star Algorithm (weighted):</span>
					This is arguably the best pathfinding algorithm. It uses
					heuristics to gurantee the shortest path. This is done by
					maintaining a "tree" of paths directed towards the finish
					node. Those paths are extended one at a time until a node is
					unable to explore unvisited nodes, or the finish node is
					reached. It is much faster then Dijkstra's algorithm.
				</small>
			</p>
			{/* <br></br> */}
			<br></br>
			<img src={Destination} alt="Computer" style={myStyle} />
		</div>
	);
}
