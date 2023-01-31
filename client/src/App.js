import { Box, Button, Flex, Image } from "@chakra-ui/react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";

import { Home, CreatePost } from "./pages";
import { logo } from "./assets";
import "./App.css";

function App() {
	return (
		<BrowserRouter>
			<header>
				<Flex align="center" justify="space-between" px={{ base: "1", md: "3" }} py="2" bg="#a78b43">
					<Link to="/">
						<Image alt="logo" src={logo} w="80px" />
					</Link>
					<Link to="/create-post">
						<Button colorScheme="facebook" rounded="20px">
							Tạo ảnh
						</Button>
					</Link>
				</Flex>
			</header>
			<main>
				<Box w="full" bg="#030d22" px="4" pb="4" color="white">
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="create-post" element={<CreatePost />} />
					</Routes>
				</Box>
			</main>
		</BrowserRouter>
	);
}
export default App;
