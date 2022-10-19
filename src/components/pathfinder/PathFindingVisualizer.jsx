import React, { Component } from "react";
import "../styles/PathFindingVisualizer.css";
import Node from "../Node/Node";
// import NavMenu from "../Menu/NavMenu";
import { recursiveDivisionMaze } from "../Maze/recursiveDivisionMaze";
import { randomMaze } from "../Maze/randomMaze";
import { Dijkstra } from "../algorithms/Dijkstra";
import { Astar } from "../algorithms/Astar";
import { getNodesInShortestPathOrder } from "../algorithms/helper";
import Legend from "../Menu/Legend";
// import TutorialScreen from "../Menu/TutorialScreen";
// import CardTutorial from "../Tutorial/CardTutorial";
import NavMenuNew from "../Menu/NavMenuNew";

const startGridDimensions = getStartGridDimensions(
	window.innerWidth,
	window.innerHeight
);

const startNumberOfRows = startGridDimensions[0];
const startNumberOfCols = startGridDimensions[1];

const START_NODE_ROW = 0;
const START_NODE_COL = 0;
// const FINISH_NODE_ROW = startNumberOfRows - 6;
const FINISH_NODE_ROW = startNumberOfRows - 5;
const FINISH_NODE_COL = startNumberOfCols - 1;

class PathFindingVisualizer extends Component {
	state = {
		grid: [],
		visualizationInProgress: false,
		mazeInProgress: false,
		mouseIsPressed: false,
		pathNotFound: false,
		startNodeIsPressed: false,
		finishedNodeIsPressed: false,
		initialStartNode: [START_NODE_ROW, START_NODE_COL],
		initialFinishNode: [FINISH_NODE_ROW, FINISH_NODE_COL],
		width: window.innerWidth,
		height: window.innerHeight,
		rows: startNumberOfRows,
		cols: startNumberOfCols,
		// show: false,
		// drawWall: true,
		// isWall: false,
		// isWeight: false,
	};

	updateDimensions = () => {
		this.setState({
			width: window.innerWidth,
			height: window.innerHeight,
		});
	};

	componentDidMount() {
		window.addEventListener("resize", this.updateDimensions);
		const grid = createInitialGridState(
			this.state.initialStartNode,
			this.state.initialFinishNode,
			this.state.rows,
			this.state.cols
		);
		this.setState({ grid });
	}

	/*-------------------------------------------------------------mouse events--------------------------------------------------------------- */

	handleMouseDown(row, col) {
		if (this.state.visualizationInProgress || this.state.mazeInProgress)
			return;

		if (this.state.grid[row][col].isStart) {
			this.handleMouseDownInitStartNode(row, col);
			return;
		} else if (this.state.grid[row][col].isFinish) {
			this.handleMouseDownInitFinishNode(row, col);
			return;
		} else {
			const newGrid = handleWallToggle(this.state.grid, row, col);
			this.setState({ grid: newGrid, mouseIsPressed: true });
		}
	}
	// } else {
	// 	const newGrid = this.toggleWall(
	// 		row,
	// 		col,
	// 		!this.state.isWall,
	// 		!this.state.isWeight
	// 	);
	// 	this.setState({
	// 		grid: newGrid,
	// 		mouseIsPressed: true,
	// 		isWall: !this.state.isWall,
	// 		isWeight: !this.state.isWeight,
	// 	});
	// }

	handleMouseDownInitStartNode(row, col) {
		this.setState({ startNodeIsPressed: true });
	}

	handleMouseDownInitFinishNode(row, col) {
		this.setState({ finishedNodeIsPressed: true });
	}

	handleMouseEnter(row, col) {
		if (this.state.visualizationInProgress || this.state.mazeInProgress)
			return;
		const { mouseIsPressed, startNodeIsPressed, finishedNodeIsPressed } =
			this.state;

		if (!mouseIsPressed && !startNodeIsPressed && !finishedNodeIsPressed)
			return;

		if (startNodeIsPressed) {
			this.handleMouseEnterInitStartNode(row, col);
			return;
		} else if (finishedNodeIsPressed) {
			this.handleMouseEnterInitFinishNode(row, col);
			return;
		} else {
			const newGrid = handleWallToggle(this.state.grid, row, col);
			this.setState({ grid: newGrid });
		}
	}
	// } else if (
	// 	mouseIsPressed &&
	// 	!startNodeIsPressed &&
	// 	!finishedNodeIsPressed
	// ) {
	// 	const newGrid = this.toggleWall(
	// 		row,
	// 		col,
	// 		!this.state.isWall,
	// 		!this.state.isWeight
	// 	);
	// 	this.setState({ grid: newGrid });
	// }

	// toggleWall(row, col, isWall, isWeight) {
	// 	if (
	// 		!this.state.visualizationInProgress &&
	// 		!this.state.mazeInProgress &&
	// 		this.state.drawWall
	// 	) {
	// 		const newNode = {
	// 			...this.state.grid[row][col],
	// 			isWall,
	// 			isWeight: false,
	// 		};
	// 		const newRow = [...this.state.grid[row]];
	// 		newRow[col] = newNode;

	// 		const newGrid = [...this.state.grid];
	// 		newGrid[row] = newRow;

	// 		return newGrid;
	// 		// this.setState({ grid: newGrid });
	// 	} else if (
	// 		!this.state.visualizationInProgress &&
	// 		!this.state.mazeInProgress &&
	// 		!this.state.drawWall
	// 	) {
	// 		const newNode = {
	// 			...this.state.grid[row][col],
	// 			isWeight,
	// 			isWall: false,
	// 		};
	// 		const newRow = [...this.state.grid[row]];
	// 		newRow[col] = newNode;

	// 		const newGrid = [...this.state.grid];
	// 		newGrid[row] = newRow;

	// 		return newGrid;
	// 		// this.setState({ grid: newGrid });
	// 	}
	// }

	// toggleWeight() {
	// 	if (this.state.visualizationInProgress || this.state.mazeInProgress)
	// 		return;
	// 	const drawWall = !this.state.drawWall;
	// 	this.setState({ drawWall });
	// }

	handleMouseEnterInitStartNode(row, col) {
		if (!this.state.startNodeIsPressed) return;
		const newGrid = handleToggleInitStartNode(this.state.grid, row, col);
		this.setState({ grid: newGrid });
	}

	handleMouseEnterInitFinishNode(row, col) {
		if (!this.state.finishedNodeIsPressed) return;
		const newGrid = handleToggleInitFinishNode(this.state.grid, row, col);
		this.setState({ grid: newGrid });
	}

	handleMouseUp(row, col) {
		if (this.state.visualizationInProgress || this.state.mazeInProgress)
			return;
		this.setState({ mouseIsPressed: false });
		this.setState({ finishedNodeIsPressed: false });
		this.setState({ startNodeIsPressed: false });
		// this.setState({ isWall: false });
		// this.setState({ isWeight: false });
	}

	handleMouseLeave(row, col) {
		const { grid, startNodeIsPressed, finishedNodeIsPressed } = this.state;

		if (!startNodeIsPressed && !finishedNodeIsPressed) return;
		let newGrid;

		if (startNodeIsPressed) {
			newGrid = handleToggleInitStartNode(grid, row, col);
		} else if (finishedNodeIsPressed) {
			newGrid = handleToggleInitFinishNode(grid, row, col);
		}
		this.setState({ grid: newGrid });
	}

	/*---------------------------------------------------------- initialStartNode && initialFinishNode helper functions---------------------------------------------------------*/

	getCurrentStartNode() {
		const { grid, initialStartNode } = this.state;
		const startNodeRow = initialStartNode[0];
		const startNodeCol = initialStartNode[1];
		let startNode = grid[startNodeRow][startNodeCol];
		grid.forEach(function (row) {
			for (let i = 0; i < row.length; i++) {
				let node = row[i];
				if (node.isStart) {
					startNode = node;
				}
			}
		});
		return startNode;
	}

	getCurrentFinishNode() {
		const { grid, initialFinishNode } = this.state;
		const finishNodeRow = initialFinishNode[0];
		const finishNodeCol = initialFinishNode[1];
		let finishNode = grid[finishNodeRow][finishNodeCol];
		grid.forEach(function (row) {
			for (let i = 0; i < row.length; i++) {
				let node = row[i];
				if (node.isFinish) {
					finishNode = node;
				}
			}
		});
		return finishNode;
	}

	/*----------------------------------------------------------clear helper functions---------------------------------------------------------*/

	clearGrid() {
		if (this.state.visualizationInProgress || this.state.mazeInProgress)
			return;
		this.setState({
			visualizationInProgress: false,
			mazeInProgress: false,
		});
		const { initialStartNode, initialFinishNode, rows, cols } = this.state;
		const grid = createInitialGridState(
			initialStartNode,
			initialFinishNode,
			rows,
			cols
		);
		this.setState({ grid });
		// this.setState({ grid, drawWall: true, isWall: false, isWeight: false });

		const startNodeRow = initialStartNode[0];
		const startNodeCol = initialStartNode[1];
		const finishNodeRow = initialFinishNode[0];
		const finishNodeCol = initialFinishNode[1];

		for (let row = 0; row < grid.length; row++) {
			for (let col = 0; col < grid[0].length; col++) {
				if (
					!(
						(row === startNodeRow && col === startNodeCol) ||
						(row === finishNodeRow && col === finishNodeCol)
					)
				) {
					document.getElementById(`node-${row}-${col}`).className =
						"node";
				}
			}
		}
	}

	clearPath() {
		if (this.state.visualizationInProgress || this.state.mazeInProgress)
			return;

		for (let row = 0; row < this.state.grid.length; row++) {
			for (let col = 0; col < this.state.grid[0].length; col++) {
				if (
					document.getElementById(`node-${row}-${col}`).className ===
					"node node-shortest-path"
				) {
					document.getElementById(`node-${row}-${col}`).className =
						"node";
				}
			}
		}

		const newGrid = getGridWithoutAlgorithmPath(this.state.grid);
		this.setState({
			grid: newGrid,
			visualizationInProgress: false,
			mazeInProgress: false,
		});
	}

	/*----------------------------------------------------------algorithm helper functions---------------------------------------------------------*/

	animateShortestPath(nodesInShortestPathOrder) {
		for (let i = 1; i < nodesInShortestPathOrder.length - 1; i++) {
			setTimeout(() => {
				const node = nodesInShortestPathOrder[i];
				document.getElementById(
					`node-${node.row}-${node.col}`
				).className = "node node-shortest-path";
			}, 50 * i);
		}
		this.setState({ visualizationInProgress: false });
	}

	animateAlgorithm(
		visitedNodesInOrder,
		nodesInShortestPathOrder,
		startNode,
		finishNode
	) {
		let newGrid = this.state.grid.slice();
		for (let row of newGrid) {
			for (let node of row) {
				let newNode = {
					...node,
					isVisited: false,
				};
				newGrid[node.row][node.col] = newNode;
			}
		}
		this.setState({ grid: newGrid });
		for (let i = 0; i <= visitedNodesInOrder.length; i++) {
			let node = visitedNodesInOrder[i];
			if (i === visitedNodesInOrder.length) {
				setTimeout(() => {
					this.animateShortestPath(nodesInShortestPathOrder);
				}, 10 * i);
				return;
			}

			setTimeout(() => {
				if (node !== startNode && node !== finishNode)
					document.getElementById(
						`node-${node.row}-${node.col}`
					).className = "node node-visited";
			}, 10 * i);
		}
	}

	visualizeDijkstra() {
		if (this.state.visualizationInProgress || this.state.mazeInProgress) {
			return;
		}

		const { grid } = this.state;
		const startNode = this.getCurrentStartNode();
		const finishNode = this.getCurrentFinishNode();
		const visitedNodesInOrder = Dijkstra(grid, startNode, finishNode);
		const nodesInShortestPathOrder =
			getNodesInShortestPathOrder(finishNode);
		this.animateAlgorithm(
			visitedNodesInOrder,
			nodesInShortestPathOrder,
			startNode,
			finishNode
		);
		this.setState({ visualizationInProgress: true });
	}

	visualizeAstar() {
		if (this.state.visualizationInProgress || this.state.mazeInProgress) {
			return;
		}

		const { grid } = this.state;
		const startNode = this.getCurrentStartNode();
		const finishNode = this.getCurrentFinishNode();

		const visitedNodesInOrder = Astar(grid, startNode, finishNode);
		const nodesInShortestPathOrder =
			getNodesInShortestPathOrder(finishNode);

		this.animateAlgorithm(
			visitedNodesInOrder,
			nodesInShortestPathOrder,
			startNode,
			finishNode
		);
		this.setState({ visualizationInProgress: true });
	}

	/*----------------------------------------------------------Maze animation helper functions---------------------------------------------------------*/

	animateMazeWalls = (walls) => {
		for (let i = 0; i <= walls.length; i++) {
			if (i === walls.length) {
				setTimeout(() => {
					let newGrid = getGridWithMaze(this.state.grid, walls);
					this.setState({
						grid: newGrid,
						mazeInProgress: false,
					});
				}, 20 * i);
				return;
			}

			let wall = walls[i];
			let node = this.state.grid[wall[0]][wall[1]];
			setTimeout(() => {
				document.getElementById(
					`node-${node.row}-${node.col}`
				).className = "node node-wall-animated";
			}, 20 * i);
		}
	};

	animateRecursiveDivisionMaze = () => {
		if (this.state.visualizationInProgress || this.state.mazeInProgress) {
			return;
		}
		this.setState({ mazeInProgress: true });

		const { grid } = this.state;
		const startNode = this.getCurrentStartNode();
		const finishNode = this.getCurrentFinishNode();
		const walls = recursiveDivisionMaze(grid, startNode, finishNode);
		this.animateMazeWalls(walls);
	};

	animateRandomMaze = () => {
		if (this.state.visualizationInProgress || this.state.mazeInProgress) {
			return;
		}
		this.setState({ mazeInProgress: true });

		const { grid } = this.state;
		const startNode = this.getCurrentStartNode();
		const finishNode = this.getCurrentFinishNode();
		const walls = randomMaze(grid, startNode, finishNode);
		this.animateMazeWalls(walls);
	};

	/*----------------------------------------------------------Tutorial---------------------------------------------------------*/
	// handleShow() {
	// 	const setShow = !this.state.show;
	// 	if (this.state.visualizationInProgress || this.state.mazeInProgress) {
	// 		return;
	// 	} else this.setState({ show: setShow });
	// }

	// handleClose() {
	// 	const setShow = !this.state.show;
	// 	if (this.state.visualizationInProgress || this.state.mazeInProgress) {
	// 		return;
	// 	} else this.setState({ show: setShow });
	// }

	/*----------------------------------------------------------Render Algorithms---------------------------------------------------------*/

	render() {
		const {
			grid,
			mouseIsPressed,
			startNodeIsPressed,
			finishedNodeIsPressed,
		} = this.state;

		return (
			<React.Fragment>
				<div>
					<NavMenuNew
						handleVisualization={this.state.visualizationInProgress}
						handleMaze={this.state.mazeInProgress}
						handleDijkstra={this.visualizeDijkstra.bind(this)}
						handleAstar={this.visualizeAstar.bind(this)}
						handleClearGrid={this.clearGrid.bind(this)}
						handleClearPath={this.clearPath}
						handleRecursiveDivisionMaze={this.animateRecursiveDivisionMaze.bind(
							this
						)}
						handleRandomMaze={this.animateRandomMaze.bind(this)}
					/>
				</div>

				{/* <Legend /> */}

				<div
					className={
						this.state.visualizationInProgress ||
						this.state.mazeInProgress
							? "grid-visualizing"
							: "grid"
					}
				>
					{grid.map((row, rowId) => {
						return (
							<div className="grid-wrapper" key={rowId}>
								{row.map((node, nodeId) => {
									const {
										row,
										col,
										isStart,
										isFinish,
										isVisited,
										isWall,
									} = node;
									return (
										<Node
											key={nodeId}
											row={row}
											col={col}
											isStart={isStart}
											isFinish={isFinish}
											isVisited={isVisited}
											isWall={isWall}
											//isWeight={isWeight}
											mouseIsPressed={mouseIsPressed}
											startNodeIsPressed={
												startNodeIsPressed
											}
											finishedNodeIsPressed={
												finishedNodeIsPressed
											}
											onMouseDown={(row, col) =>
												this.handleMouseDown(row, col)
											}
											onMouseEnter={(row, col) =>
												this.handleMouseEnter(row, col)
											}
											// onMouseUp={(row, col) =>
											// 	this.handleMouseUp(row, col)
											// }
											onMouseUp={() =>
												this.handleMouseUp(row, col)
											}
											onMouseLeave={(row, col) =>
												this.handleMouseLeave(row, col)
											}
											width={this.state.width}
											height={this.state.height}
											rows={this.state.rows}
											cols={this.state.cols}
										></Node>
									);
								})}
							</div>
						);
					})}
				</div>
				<Legend />
			</React.Fragment>
		);
	}
}

export default PathFindingVisualizer;

/*------------------------------------------------------------helper functions----------------------------------------------------------------*/

const createInitialGridState = (startNode, finishNode, rows, cols) => {
	const grid = [];
	// for (let row = 0; row < rows - 5; row++) {
	for (let row = 0; row < rows - 4; row++) {
		const currentRow = [];
		for (let col = 0; col < cols; col++) {
			currentRow.push(createNode(row, col, startNode, finishNode));
		}
		grid.push(currentRow);
	}
	return grid;
};

const createNode = (row, col, startNode, finishNode) => {
	let startNodeRow = startNode[0];
	let startNodeCol = startNode[1];
	let finishNodeRow = finishNode[0];
	let finishNodeCol = finishNode[1];
	const node = {
		row,
		col,
		isStart: row === startNodeRow && col === startNodeCol,
		isFinish: row === finishNodeRow && col === finishNodeCol,
		isWall: false,
		// isWeight: false,
		previousNode: undefined,
		distance: Infinity,
		// distanceToStart: 0,
		isVisited: false,
		// heuristic: 0,
		// cost: Infinity,
		f: Infinity,
		g: Infinity,
		h: Infinity,
	};

	return node;

	// f: 0 => represents our current best guess as to
	// how short a path from start to finish can be if it goes through n.

	// g: 0 => The cost of the path from the start node to n (which is the next node in the path).

	// h: 0 => heuristic function that estimates the cost of the cheapeast path
	// from n (which is the next node in the path) to the goal node.
};

function getStartGridDimensions(width, height) {
	let numberOfCols;
	if (width > 1500) {
		numberOfCols = Math.floor(width / 30);
	} else if (width > 1250) {
		numberOfCols = Math.floor(width / 27.5);
	} else if (width > 1000) {
		numberOfCols = Math.floor(width / 25);
	} else if (width > 750) {
		numberOfCols = Math.floor(width / 22.5);
	} else if (width > 500) {
		numberOfCols = Math.floor(width / 20);
	} else if (width > 250) {
		numberOfCols = Math.floor(width / 17.5);
	} else if (width > 0) {
		numberOfCols = Math.floor(width / 15);
	}
	// if (width > 1500) {
	// 	numberOfCols = Math.floor(width / 25);
	// } else if (width > 1250) {
	// 	numberOfCols = Math.floor(width / 22.5);
	// } else if (width > 1000) {
	// 	numberOfCols = Math.floor(width / 20);
	// } else if (width > 750) {
	// 	numberOfCols = Math.floor(width / 17.5);
	// } else if (width > 500) {
	// 	numberOfCols = Math.floor(width / 15);
	// } else if (width > 250) {
	// 	numberOfCols = Math.floor(width / 12.5);
	// } else if (width > 0) {
	// 	numberOfCols = Math.floor(width / 10);
	// }

	let nodeWidth = Math.floor(width / numberOfCols);
	let numberOfRows = Math.floor(height / nodeWidth);

	return [numberOfRows, numberOfCols];
}

const getGridWithoutAlgorithmPath = (grid) => {
	let newGrid = grid.slice();
	for (let row of grid) {
		for (let node of row) {
			let newNode = {
				...node,
				distance: Infinity,
				isVisited: false,
				previousNode: null,
			};
			newGrid[node.row][node.col] = newNode;
		}
	}
	return newGrid;
};

const getGridWithMaze = (grid, walls) => {
	let newGrid = grid.slice();
	for (let wall of walls) {
		let node = grid[wall[0]][wall[1]];
		let newNode = {
			...node,
			isWall: true,
		};
		newGrid[wall[0]][wall[1]] = newNode;
	}
	return newGrid;
};

const handleWallToggle = (grid, row, col) => {
	const newGrid = grid.slice();
	const node = newGrid[row][col];
	const newNode = {
		...node,
		isWall: !node.isWall,
	};
	newGrid[row][col] = newNode;
	return newGrid;
};

const handleToggleInitStartNode = (grid, row, col) => {
	const newGrid = grid.slice();
	const node = newGrid[row][col];
	const newNode = {
		...node,
		isStart: !node.isStart,
	};
	newGrid[row][col] = newNode;
	return newGrid;
};

const handleToggleInitFinishNode = (grid, row, col) => {
	const newGrid = grid.slice();
	const node = newGrid[row][col];
	const newNode = {
		...node,
		isFinish: !node.isFinish,
	};
	newGrid[row][col] = newNode;
	return newGrid;
};
