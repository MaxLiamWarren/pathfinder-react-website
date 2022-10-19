import React, { Component } from "react";
import {
	NavDropdown,
	Button,
	Nav,
	Container,
	Navbar,
	Modal,
} from "react-bootstrap";
// import NavImage1 from "../images/NavImage1.png";
// import NavImage3 from "../images/NavImage3.png";
import "../styles/NavMenuNew.css";
import Card1 from "../Tutorial/Card1";
import Card2 from "../Tutorial/Card2";
import Card3 from "../Tutorial/Card3";
import Card4 from "../Tutorial/Card4";
import Card5 from "../Tutorial/Card5";
import Card6 from "../Tutorial/Card6";
// import Background2 from "../images/backgroundTwo.jpg";
// import Background from "../images/background.jpg";

// import Background3 from "../images/backgroundThree.jpg";
import NavIcon from "../images/NavIcon.png";
// import NavIcon2 from "../images/NavIcon2.png";
// import NavIcon3 from "../images/NavIcon3.png";
// import Destination from "../images/des.png";

class NavMenuNew extends Component {
	state = {
		algorithm: "Visualize",
		maze: "Generate Maze",
		mazeState: false,
		pathState: false,
		showTutorial: false,
		card: 1,
	};

	handleShow() {
		const setShowTutorial = !this.state.showTutorial;
		if (this.props.handleVisualization || this.props.handleMaze) {
			return;
		} else this.setState({ showTutorial: setShowTutorial });
	}

	handleClose() {
		const setShowTutorial = !this.state.showTutorial;
		if (this.props.handleVisualization || this.props.handleMaze) {
			return;
		} else this.setState({ showTutorial: setShowTutorial });
	}

	handleNextCard = () => {
		if (this.state.card < 7) {
			let newCard = this.state.card + 1;
			this.setState({ card: newCard });
		} else {
			let newCard = 0;
			this.setState({ card: newCard });
		}
	};

	handlePrevCard = () => {
		if (this.state.card < 7) {
			let newCard = this.state.card - 1;
			this.setState({ card: newCard });
		} else {
			let newCard = 0;
			this.setState({ card: newCard });
		}
	};

	toggleAlgorithm(select) {
		if (this.props.handleVisualization) {
			return;
		}
		if (
			select === this.state.algorithm ||
			this.state.algorithm === "Visualize" ||
			this.state.algorithm === "Select an Algorithm!"
		) {
			this.setState({ algorithm: select });
		} else if (this.state.pathState) {
			this.clearPath();
			this.setState({ algorithm: select });
		} else {
			this.setState({ algorithm: select });
		}
	}

	toggleMaze(select) {
		if (this.props.handleVisualization || this.props.handleMaze) {
			return;
		}

		if (
			select === this.state.maze ||
			this.state.maze === "Generate Maze" ||
			this.state.maze === "Select a Maze!"
		) {
			this.setState({ maze: select });
		} else if (!this.state.mazeState) {
			this.setState({ maze: select });
		} else {
			this.clearGrid();
			this.setState({ maze: select });
		}
	}

	visualizeAlgorithm() {
		if (this.props.handleVisualization || this.props.handleMaze) {
			return;
		}
		if (this.state.pathState) {
			this.clearTemp();
			return;
		}
		if (
			this.state.algorithm === "Visualize" ||
			this.state.algorithm === "Select an Algorithm!"
		) {
			this.setState({ algorithm: "Select an Algorithm!" });
		} else {
			this.setState({ pathState: true });
			if (this.state.algorithm === "Visualize Dijkstra")
				this.props.handleDijkstra();
			else if (this.state.algorithm === "Visualize A-Star")
				this.props.handleAstar();
		}
	}

	generateMaze() {
		const { handleVisualization, handleMaze } = this.props;
		if (handleVisualization || handleMaze) return;
		if (this.state.mazeState || this.state.pathState) {
			this.clearTemp();
		}
		if (
			this.state.maze === "Generate Maze" ||
			this.state.maze === "Select a Maze!"
		) {
			this.setState({ maze: "Select a Maze!" });
		} else {
			this.setState({ mazeState: true });
			if (this.state.maze === "Generate Random Maze") {
				this.props.handleRandomMaze();
			} else if (this.state.maze === "Generate Recursive Maze") {
				this.props.handleRecursiveDivisionMaze();
			}
		}
	}

	clearGrid() {
		if (this.props.handleVisualization || this.props.handleMaze) {
			return;
		}
		this.props.handleClearGrid();
		this.setState({
			algorithm: "Visualize",
			maze: "Generate Maze",
			pathState: false,
			mazeState: false,
		});
	}

	clearPath() {
		if (this.props.handleVisualization || this.props.handleMaze) {
			return;
		}
		this.props.handleClearPath();
		this.setState({
			pathState: false,
			mazeState: false,
		});
	}

	clearTemp() {
		if (this.props.handleVisualization || this.props.handleMaze) {
			return;
		}
		this.props.handleClearGrid();
		this.setState({
			pathState: false,
			mazeState: false,
		});
	}
	// bg="dark"
	render() {
		// const btn = {
		// 	marginRight: "35px",
		// 	padding: "5px 5px",
		// };

		// const dropdown = {
		// 	marginRight: "35px",
		// };

		const sectionStyle = {
			color: "whitesmoke",
			fontWeight: "bold",
		};
		const myStyle = {
			fontSize: "23px",
			color: "whitesmoke",
			fontFamily: "Lato",
			// color: "#eceae2",
			fontWeight: "900",
			// backGroundColor: "#5bc0de",
		};
		let title;

		if (this.state.card === 1 && <Card1 />) {
			title = "Enjoy my Pathfinding Visualizer!!!";
		} else if (this.state.card === 2 && <Card2 />) {
			title = "What is a pathfinding algorithm?";
		} else if (this.state.card === 3 && <Card3 />) {
			title = "What are the algorithms you will be visualizing?";
		} else if (this.state.card === 4 && <Card4 />) {
			title = "Nodes";
		} else if (this.state.card === 5 && <Card5 />) {
			title = "Adding Walls";
		} else if (this.state.card === 6 && <Card6 />) {
			title = "Visualize the Algorithm's";
		}

		return (
			<Navbar
				className="color-nav"
				collapseOnSelect
				expand="lg"
				variant="dark"
			>
				{/* <Container> */}
				<Navbar.Brand className="navbar-brand nav-font" href="/">
					<img
						alt=""
						src={NavIcon}
						width="30"
						height="30"
						className="d-inline-block align-top image-nav"
					/>{" "}
					{/* {<span className="nav-font">PATHFINDER</span>} */}
					PATHFINDER
				</Navbar.Brand>
				<span className="divider">&nbsp;</span>

				<Navbar.Toggle aria-controls="responsive-navbar-nav" />

				<Navbar.Collapse
					className="navbar-collapse"
					id="responsive-navbar-nav"
				>
					<Container>
						<Nav className="me-auto">
							<NavDropdown
								className="nav-dropdown-btn"
								title={<span className="text">Algorithms</span>}
								id="collasible-nav-dropdown nav-dropdown"
							>
								<NavDropdown.Item
									as="button"
									onClick={() =>
										this.toggleAlgorithm(
											"Visualize Dijkstra"
										)
									}
								>
									Dijkstra's Algorithm
								</NavDropdown.Item>
								<NavDropdown.Divider />
								<NavDropdown.Item
									as="button"
									onClick={() =>
										this.toggleAlgorithm("Visualize A-Star")
									}
								>
									A-Star Algorithm
								</NavDropdown.Item>
							</NavDropdown>
							<Nav.Item>
								<Button
									// className="btn-visualize"
									// className="nav-btn"
									className="btn-style"
									onClick={() => this.visualizeAlgorithm()}
									variant="info"
									// size="sm"
								>
									{this.state.algorithm}
								</Button>
							</Nav.Item>{" "}
							<NavDropdown
								className="nav-dropdown-btn"
								title={<span className="text">Mazes</span>}
								id="collasible-nav-dropdown"
								// size="sm"
							>
								<NavDropdown.Item
									as="button"
									onClick={() =>
										this.toggleMaze("Generate Random Maze")
									}
								>
									Random Maze
								</NavDropdown.Item>
								<NavDropdown.Divider />
								<NavDropdown.Item
									as="button"
									onClick={() =>
										this.toggleMaze(
											"Generate Recursive Maze"
										)
									}
								>
									Recursive Division Maze
								</NavDropdown.Item>
							</NavDropdown>{" "}
							<Nav.Item>
								<Button
									// className="btn btn-generate-maze"
									// className="nav-btn"
									className="btn-style"
									onClick={() => this.generateMaze()}
									variant="info"
									// size="sm"
								>
									{this.state.maze}
								</Button>{" "}
							</Nav.Item>
							<Nav.Item>
								<Button
									// className="btn-clear"
									className="btn-style"
									onClick={() => this.clearGrid()}
									variant="danger"
									// size="sm"
								>
									Clear
								</Button>
							</Nav.Item>
							<Nav>
								<Nav.Item>
									<Button
										// className="nav-btn"
										className="btn-style"
										// size="sm"
										variant="outline-info"
										onClick={this.handleShow.bind(this)}
									>
										Tutorial
									</Button>

									<Modal
										show={this.state.showTutorial}
										onHide={this.handleClose.bind(this)}
										animation={false}
										// style={imageStyle}
									>
										<Modal.Header closeButton>
											<Modal.Title
												style={myStyle}
												id="contained-modal-title-vcenter"
											>
												{title}
											</Modal.Title>
										</Modal.Header>

										<div className="modalBody">
											{/* <Modal.Footer> */}
											{this.state.card === 1 && <Card1 />}
											{this.state.card === 2 && <Card2 />}
											{this.state.card === 3 && <Card3 />}
											{this.state.card === 4 && <Card4 />}
											{this.state.card === 5 && <Card5 />}
											{this.state.card === 6 && <Card6 />}

											{this.state.card === 1 && (
												<div className="modalBody-btn">
													<Button
														disabled
														variant="info"
														onClick={this.handlePrevCard.bind(
															this
														)}
													>
														Prev
													</Button>
													<section
														style={sectionStyle}
													>
														{this.state.card}
														/6
													</section>
													<Button
														variant="info"
														onClick={this.handleNextCard.bind(
															this
														)}
														active
													>
														Next
													</Button>
												</div>
											)}

											{this.state.card < 6 &&
												this.state.card > 1 && (
													<div className="modalBody-btn">
														<Button
															variant="info"
															onClick={this.handlePrevCard.bind(
																this
															)}
															active
														>
															Prev
														</Button>
														<section
															style={sectionStyle}
														>
															{this.state.card}
															/6
														</section>
														<Button
															variant="info"
															onClick={this.handleNextCard.bind(
																this
															)}
															active
														>
															Next
														</Button>
													</div>
												)}

											{this.state.card === 6 && (
												<div className="modalBody-btn">
													<Button
														variant="info"
														onClick={this.handlePrevCard.bind(
															this
														)}
														active
													>
														Prev
													</Button>
													<section
														style={sectionStyle}
													>
														{this.state.card}
														/6
													</section>
													<Button
														variant="info"
														onClick={this.handleClose.bind(
															this
														)}
														active
													>
														DONE!
													</Button>
												</div>
											)}
										</div>
									</Modal>
								</Nav.Item>
							</Nav>
						</Nav>
					</Container>
				</Navbar.Collapse>
				{/* </Container> */}
			</Navbar>
		);
	}
}

export default NavMenuNew;
