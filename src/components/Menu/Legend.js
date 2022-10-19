import React from "react";
import "../styles/Legend.css";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faSquare } from "@fortawesome/free-regular-svg-icons";

export default function Legend() {
	return (
		<section className="Legend">
			<section className="legend-item">
				<section className="legend-unvisited"></section>
				<p>Unvisited</p>
			</section>

			<section className="legend-item">
				<section className="legend-visited"></section>
				<p>Visited</p>
			</section>

			<section className="legend-item">
				<section className="legend-shortest-path"></section>
				<p>Shortest Path</p>
			</section>

			<section className="legend-item">
				<section className="node-wall legend-wall"></section>
				{/* <FontAwesomeIcon icon={faSquare} /> */}
				<p>Wall</p>
			</section>
		</section>
	);
}
