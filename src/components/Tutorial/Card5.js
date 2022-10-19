import React from "react";

// import MazeImage from "../images/MazeImage.png";
import MazeImage2 from "../images/Maze2.png";
// import MazeImage3 from "../images/Maze3.png";

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

export default function Card5() {
	return (
		<div>
			<br></br>
			<p className="textBody">
				<large>
					Click on the grid to add a wall. In order to find the
					shortest path the algorithm will move around these barriers.
					You can generate mazes from the "Maze" drop-down menu. Note
					that a path CANNOT cross through a wall.
				</large>
			</p>
			{/* <br></br> */}
			<br></br>
			<img src={MazeImage2} alt="Maze" style={myStyle} />
		</div>
	);
}
