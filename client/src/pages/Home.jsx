import { Box, Center, Container, Flex, Input, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { useEffect } from "react";
import { RingLoader } from "react-spinners";

import { FormField, Card } from "../components";

//Main Component
const Home = () => {
	const [loading, setLoading] = useState(false);
	const [allPost, setAllPost] = useState(null);
	const [searchText, setSearchText] = useState("");
	const [searchResult, setSearchResult] = useState(null);

	//GET ALL POST
	const fetchAllPosts = async () => {
		setLoading(true);
		try {
			const res = await fetch("https://dall-2.onrender.com/api/v1/post", {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			});

			if (res.ok) {
				const result = await res.json();
				setAllPost(result.data.reverse());
			}
		} catch (error) {
			alert(error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchAllPosts();
	}, []);

	const handleSearchChange = (e) => {
		setSearchText(e.target.value);

		setTimeout(() => {
			const searchResult = allPost.filter(
				(item) =>
					item.name.toLowerCase().includes(searchText.toLowerCase()) ||
					item.prompt.toLowerCase().includes(searchText.toLowerCase())
			);
			setSearchResult(searchResult);
		}, 500);
	};

	return (
		<>
			<Container maxW="container.lg">
				<Box>
					<Text fontWeight="900" fontSize="3xl">
						The Community Showcase
					</Text>
					<Text fontWeight="600">
						Duyệt qua bộ sưu tập các hình ảnh giàu trí tưởng tượng và trực quan tuyệt đẹp do AI tạo ra.
					</Text>
				</Box>
				<Box mt="10">
					<Input
						type="text"
						placeholder="Nhập tên ảnh hoặc tên tác giả bạn cần tìm kiếm..."
						value={searchText}
						onChange={handleSearchChange}
					/>
				</Box>
			</Container>
			<Flex direction="column" w="full">
				<Box mt="10">
					{loading ? (
						<Center>
							<RingLoader color="#ff2cf1" size={100} />
						</Center>
					) : (
						<>
							{searchText && (
								<Text mb="3" fontSize="xl" color="green.200">
									Bạn đang tìm kiếm : <span style={{ color: "yellow", fontWeight: "bold" }}>{searchText}</span>
								</Text>
							)}
							<Flex align="center" justify={{ base: "center", xl: "unset" }} flexWrap="wrap" gap="5">
								{searchText ? (
									<RenderCards data={searchResult} title="no search result" />
								) : (
									<RenderCards data={allPost} title="no post found" />
								)}
							</Flex>
						</>
					)}
				</Box>
			</Flex>
		</>
	);
};

export default Home;

//RenderCards component
const RenderCards = ({ data, title }) => {
	if (data?.length > 0) {
		return data.map((post) => <Card key={post._id} {...post} />);
	}

	return (
		<Text fontWeight="700" fontSize="xl" mt="5" textTransform="uppercase">
			{title}
		</Text>
	);
};
