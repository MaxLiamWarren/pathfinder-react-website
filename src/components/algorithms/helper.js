export function getNodes(grid) {
	let nodes = [];
	for (let row of grid) {
		for (let node of row) {
			nodes.push(node);
		}
	}
	return nodes;
}

export function lowestDscoreNode(openSet) {
	let minNode = openSet[0];
	for (let node of openSet) {
		if (node.distance < minNode.distance) {
			minNode = node;
		}
	}
	return minNode;
}

export function euclideanDistance(node, goal) {
	let x = Math.abs(node.row - node.col);
	let y = Math.abs(goal.row - goal.col);
	let euclideanDistanceHeuristic = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
	return euclideanDistanceHeuristic;
}

export function manhattanDistance(node, goal) {
	let manhattanDistanceHeuristic =
		Math.abs(node.row - node.col) + Math.abs(goal.row - goal.col);
	return manhattanDistanceHeuristic;
}

export function getNeighbors(node, grid) {
	let neighbors = [];
	let { row, col } = node;

	if (row > 0) {
		neighbors.push(grid[row - 1][col]);
	}
	if (row < grid.length - 1) {
		neighbors.push(grid[row + 1][col]);
	}
	if (col > 0) {
		neighbors.push(grid[row][col - 1]);
	}
	if (col < grid[0].length - 1) {
		neighbors.push(grid[row][col + 1]);
	}
	return neighbors.filter(
		(neighbor) => !neighbor.isWall && !neighbor.isVisited
	);
}

export function getNeighborsCost(node, grid) {
	let distanceScore;
	const neighbors = getNeighbors(node, grid);
	for (let i = 0; i < neighbors.length; i++) {
		let neighbor = neighbors[i];
		if (!neighbor.isWall && node.isWeight) {
			distanceScore = node.distance + 3;
			if (distanceScore < neighbor.distance) {
				neighbor.distance = distanceScore;
				neighbor.previousNode = node;
			}
		} else if (!neighbor.isWall && !node.isWeight) {
			distanceScore = node.distance + 1;
			if (distanceScore < neighbor.distance) {
				neighbor.distance = distanceScore;
				neighbor.previousNode = node;
			}
		}
	}
}

export function getNodesInShortestPathOrder(finishNode) {
	const nodesInShortestPathOrder = [];
	let updateCurrentNode = finishNode;
	nodesInShortestPathOrder.push(updateCurrentNode);

	while (updateCurrentNode.previousNode) {
		nodesInShortestPathOrder.push(updateCurrentNode.previousNode);
		updateCurrentNode = updateCurrentNode.previousNode;
	}

	return nodesInShortestPathOrder;
}
