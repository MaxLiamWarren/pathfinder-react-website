import React from "react";
// import CardSix from "../images/Card2Image.png";
import Done from "../images/done.png";

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

export default function Card6() {
	return (
		<div>
			<br></br>
			<p className="textBody">
				<large>
					Use the navbar to visualize the algorithm's. You can also
					clear the board and access various mazes. If you want to
					access the tutorial again simply click on the 'tutorial'
					button.
				</large>
			</p>
			{/* <br></br> */}
			<br></br>
			<img src={Done} alt="Path" style={myStyle} />
		</div>
	);
}
