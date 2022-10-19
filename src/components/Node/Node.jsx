import React, { Component } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faChessKing } from "@fortawesome/free-solid-svg-icons";
// import { faChessPawn } from "@fortawesome/free-solid-svg-icons";
// import { faWeightHanging } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { FaLocationArrow } from "@fortawesome/free-solid-svg-icons";
// import { FaBullseye } from "@fortawesome/free-solid-svg-icons";
// import { FaAngellist } from "react-icons/fa";
// import { FaAccessibleIcon } from "react-icons/fa";
import "../styles/Node.css";
import { ReactComponent as Nav } from "../Icons/nav.svg";
// import { ReactComponent as Gas } from "../Icons/gas.svg";
// import { ReactComponent as GasCan } from "../Icons/gasCan.svg";
// import { ReactComponent as Sign } from "../Icons/finishSign.svg";
import { ReactComponent as Stop } from "../Icons/stop.svg";

class Node extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		const {
			row,
			col,
			isStart,
			isFinish,
			isWall,
			// isWeight,
			isVisited,
			onMouseEnter,
			onMouseDown,
			onMouseUp,
			onMouseLeave,
			rows,
			cols,
			width,
			height,
		} = this.props;

		const extraClass = isStart
			? "node-start"
			: isFinish
			? "node-finish"
			: isWall
			? "node-wall"
			: isVisited
			? "node-visited"
			: "";

		let cellWidth = Math.floor((width - 15) / cols);
		let cellHeight;
		if (width > 1500) {
			cellHeight = Math.floor((height - 70) / rows);
		} else if (width > 1000) {
			cellHeight = Math.floor((height - 70) / rows);
		} else if (width > 500) {
			cellHeight = Math.floor((height - 60) / rows);
		} else if (width > 0) {
			cellHeight = Math.floor((height - 50) / rows);
		}

		const mountIcon = () => {
			if (isStart) return <Nav className="icon" />;
			// if (isFinish) return <GasCan className="icon" />;
			// if (isFinish) return <Sign className="icon" />;
			if (isFinish) return <Stop className="icon" />;

			// if (isFinish) return <Gas className="icon" />;
			// if (isStart) return <FaAngellist className="icon" />;
			// if (isFinish) return <FaAccessibleIcon className="icon" />;
		};

		return (
			<div
				id={`node-${row}-${col}`}
				className={`node ${extraClass}`}
				style={{
					"--width": `${cellWidth}px`,
					"--height": `${cellHeight}px`,
				}}
				onMouseEnter={() => onMouseEnter(row, col)}
				onMouseDown={() => onMouseDown(row, col)}
				onMouseLeave={() => onMouseLeave(row, col)}
				onMouseUp={() => onMouseUp(row, col)}
			>
				{mountIcon()}
			</div>
		);
	}
}

export default Node;
