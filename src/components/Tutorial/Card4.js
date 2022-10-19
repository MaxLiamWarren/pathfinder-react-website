import React from "react";

// import StartImage from "../images/StartImage.png";
import StartPoint from "../images/startPoint.png";

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

export default function Card4() {
	return (
		<div>
			<br></br>
			<p className="textBody">
				<large>
					The algorithm you select will attempt to find the optimal
					path from the start node (left) to the finish node (right).
					You can move these nodes by clicking on them and dragging
					them across the grid.
				</large>
			</p>
			<br></br>

			{/* <br></br> */}
			<img src={StartPoint} alt="Start" style={myStyle} />
		</div>
	);
}
