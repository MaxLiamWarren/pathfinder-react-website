import {
	getNeighbors,
	lowestDscoreNode,
	getNodes,
	// getNeighborsCost,
} from "./helper";

export function Dijkstra(grid, startNode, finishNode) {
	let openSet = []; //unvisitedNodes
	let closedSet = []; //visitedNodesInOrder
	startNode.distance = 0;

	openSet = getNodes(grid);
	while (openSet.length > 0) {
		let currentNode = lowestDscoreNode(openSet);

		if (currentNode === finishNode) return closedSet;
		if (currentNode.distance === Infinity) return closedSet;
		currentNode.isVisited = true;
		const removeIndex = openSet
			.map(function (item) {
				return item;
			})
			.indexOf(currentNode);
		openSet.splice(removeIndex, 1);
		closedSet.push(currentNode);

		// getNeighborsCost(currentNode, grid);

		const neighbors = getNeighbors(currentNode, grid);

		for (let i = 0; i < neighbors.length; i++) {
			let neighbor = neighbors[i];
			if (!neighbor.isWall) {
				let distanceScore = currentNode.distance + 1;
				if (distanceScore < neighbor.distance) {
					neighbor.distance = distanceScore;
					neighbor.previousNode = currentNode;
				}
			}
		}
	}
}
