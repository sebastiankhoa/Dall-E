import React, { useState, useEffect } from "react";
import { BarLoader, MoonLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";

import { preview } from "../assets";
import { getRandomPrompt } from "../utils";

import { Box, Button, Center, Container, Flex, Image, Input, Text } from "@chakra-ui/react";

const CreatePost = () => {
	const navigate = useNavigate();

	//all state
	const [form, setForm] = useState({
		name: "",
		prompt: "",
		photo: "",
	});
	const [generatingImg, setGeneratingImg] = useState(false);
	const [loading, setLoading] = useState(false);

	console.log({ form });
	//======================================

	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleSurpriseMe = () => {
		const randomPrompt = getRandomPrompt(form.prompt);
		setForm({ ...form, prompt: randomPrompt });
	};

	//generated image

	const generatedImage = async () => {
		if (form.prompt) {
			try {
				setGeneratingImg(true);
				const response = await fetch("http://localhost:8080/api/v1/dalle", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ prompt: form.prompt }),
				});
				const data = await response.json();

				setForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}` });
			} catch (error) {
				console.log(error);
				alert(error);
			} finally {
				setGeneratingImg(false);
			}
		} else {
			alert("Please enter a prompt");
		}
	};

	//Share with friend

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (form.prompt && form.photo) {
			setLoading(true);

			try {
				const res = await fetch("http://localhost:8080/api/v1/post", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(form),
				});

				await res.json();
				navigate("/");
			} catch (error) {
				alert(error);
			} finally {
				setLoading(false);
			}
		} else {
			alert("Please enter a prompt and generating");
		}
	};

	//============================================================================================//

	return (
		<Container maxW="container.md">
			<Box>
				<Text fontWeight="900" fontSize="3xl">
					Tạo ảnh
				</Text>
				<Text fontWeight="600">
					Tạo hình ảnh giàu trí tưởng tượng và trực quan tuyệt đẹp bằng AI và chia sẻ chúng với mọi người.
				</Text>
			</Box>
			<form onSubmit={handleSubmit}>
				<Flex direction="column" mt="10">
					<Flex align={{ base: "unset", md: "center" }} direction={{ base: "column", md: "row" }} gap="2">
						<Text fontWeight="600" mb="2">
							Vui lòng nhập tên người tạo
						</Text>
						<Input
							w={{ base: "100%", md: "58%", lg: "61%" }}
							type="text"
							placeholder="Nguyễn Văn Tèo"
							required
							name="name"
							value={form.name}
							onChange={handleChange}
						/>
					</Flex>
					<Box my="30px">
						<Flex align="center" gap="5" mb="2">
							<Text fontWeight="600">Nhập gợi ý cho A.I ở ô bên dưới hoặc chọn random ==></Text>
							<Button colorScheme="orange" rounded="20px" onClick={handleSurpriseMe}>
								Random
							</Button>
						</Flex>
						<Input
							type="text"
							required
							placeholder="An Impressionist oil painting of sunflowers in a purple vase…"
							w={{ base: "100%", md: "70%" }}
							name="prompt"
							value={form.prompt}
							onChange={handleChange}
						/>
					</Box>
					<Flex align="center" justify="center" border="1px solid" w={64} h={64} bg="#0e0952" pos="relative">
						{form.photo ? (
							<Image alt={form.prompt} src={form.photo} objectFit="contain" />
						) : (
							<Image alt="preview" src={preview} objectFit="contain" />
						)}
						{generatingImg && (
							<Center pos="absolute">
								<MoonLoader color="white" size={140} />
							</Center>
						)}
					</Flex>
				</Flex>
				<Flex mt="10" w="full" justify="center">
					<Button rounded="15px" colorScheme="green" w="80%" onClick={generatedImage}>
						{generatingImg ? "A.I Đang tạo ảnh" : "Tiến hành tạo ảnh"}
					</Button>
				</Flex>
				<Flex mt="10" w="full" direction="column" align="center">
					<Text fontFamily="cursive" color="gray">
						One you have created the image you want, you can share it with others in the community
					</Text>
					<Button type="submit" colorScheme="pink" mt="5" rounded="20px">
						{loading ? <BarLoader color="#36d7b7" /> : "Chia sẻ với mọi người"}
					</Button>
				</Flex>
			</form>
		</Container>
	);
};

export default CreatePost;
