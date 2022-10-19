import React from "react";
// import map from "../images/map.png";
// import Location from "../images/location.png";
// import Location from "../images/loc.png";
import Search from "../images/searchbar.png";

const myStyle = {
	border: "5px solid whitesmoke",
	borderRadius: "4px",
	padding: "5px",
	width: "50%",
	marginRight: "auto",
	marginLeft: "auto",
	display: "block",
};
// const textStyle = {
// 	color: "FEFBF3",
// 	color: "F7F6F2",
// };
// style={textStyle}

export default function Card1() {
	return (
		<div>
			<br></br>
			<p className="textBody">
				Pathfinder allows you to visualize a variety of algorithms. To
				select and algorithm simply click on the "Algorithms" dropdown
				menu in the navbar. To view the rest of the tutorial press
				"Next".{" "}
			</p>

			<br></br>
			<img src={Search} alt="Search" style={myStyle} />
		</div>
	);
}
