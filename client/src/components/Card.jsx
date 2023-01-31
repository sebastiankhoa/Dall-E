import { Box, Flex, Image, Text } from "@chakra-ui/react";
import React from "react";
import { useState } from "react";
import { FaDownload } from "react-icons/fa";

import { downloadImage } from "../utils";

const Card = ({ _id, name, prompt, photo }) => {
	const [showInfo, setShowInfo] = useState(false);

	return (
		<Box
			rounded="15px"
			overflow="hidden"
			pos="relative"
			transition="0.5s"
			onMouseEnter={() => setShowInfo(true)}
			onMouseLeave={() => setShowInfo(false)}
		>
			<Image
				alt="image"
				src={photo}
				objectFit="cover"
				w={{ base: "300px", lg: "400px", xl: "500px", "2xl": "550px" }}
				h={{ base: "300px", lg: "400px", xl: "500px", "2xl": "550px" }}
			/>
			<Box
				pos="absolute"
				top="10px"
				right="10px"
				cursor="pointer"
				fontSize="18pt"
				_hover={{ fontSize: "20pt" }}
				transition="0.3s "
				onClick={() => downloadImage(_id, photo)}
			>
				<FaDownload />
			</Box>
			<Box w="full" h="100px" pos="absolute" bottom="0" p="2" bg="blackAlpha.600" display={showInfo ? "block" : "none"}>
				<Text fontSize="10pt" fontWeight="600">
					{prompt}
				</Text>
				<Flex align="center" gap="2" mt="2">
					<Box bg="green" rounded="full" w="25px" h="25px">
						<Text textAlign="center" fontWeight="700" fontSize="sm" textTransform="capitalize">
							{name[0]}
						</Text>
					</Box>
					<Text>{name}</Text>
				</Flex>
			</Box>
		</Box>
	);
};

export default Card;
