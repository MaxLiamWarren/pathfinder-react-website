import {
	getNeighbors,
	// heuristic,
	euclideanDistance,
	manhattanDistance,
} from "./helper";

export function Astar(grid, startNode, finishNode) {
	let openSet = []; //unvisitedNodes
	let closedSet = []; //visitedNodesInOrder
	// startNode.distanceToStart = 0;
	// startNode.cost = heuristic(startNode, finishNode);

	openSet.push(startNode);

	while (openSet.length > 0) {
		let lowestScoreF = 0;
		for (let i = 0; i < openSet.length; i++) {
			if (openSet[i].f < openSet[lowestScoreF].f) {
				lowestScoreF = i;
			}
		}
		let currentNode = openSet[lowestScoreF];

		if (currentNode === finishNode) return closedSet;
		currentNode.isVisited = true;
		const removeIndex = openSet
			.map(function (item) {
				return item;
			})
			.indexOf(currentNode);
		openSet.splice(removeIndex, 1);
		closedSet.push(currentNode);

		let neighbors = getNeighbors(currentNode, grid);

		// f: 0 => represents our current best guess as to
		// how short a path from start to finish can be if it goes through n.

		// g: 0 => The cost of the path from the start node to n (which is the next node in the path).

		// h: 0 => heuristic function that estimates the cost of the cheapeast path
		// from n (which is the next node in the path) to the goal node.
		for (let i = 0; i < neighbors.length; i++) {
			let neighbor = neighbors[i];
			if (!closedSet.includes(neighbor) && !neighbor.isWall) {
				const gScore =
					currentNode.g + euclideanDistance(neighbor, currentNode);

				// if (neighbor.isWeight) {
				// 	neighbor.g += 2;
				// }

				// if (currentNode.isWeight && neighbor.isWeight) {
				// 	neighbor.g *= 1.5;
				// }

				let betterScore = false;
				if (openSet.includes(neighbor)) {
					if (gScore < neighbor.g) {
						neighbor.g = gScore;
						betterScore = true;
					}
				} else {
					neighbor.g = gScore;
					betterScore = true;
					openSet.push(neighbor);
				}
				if (betterScore) {
					neighbor.h = manhattanDistance(neighbor, finishNode);
					neighbor.f = neighbor.g + neighbor.h;
					neighbor.previousNode = currentNode;
				}
			}
		}
	}
	return closedSet;
}
