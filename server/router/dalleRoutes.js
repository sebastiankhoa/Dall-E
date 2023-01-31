import express from "express";
import * as dotenv from "dotenv";
import { Configuration, OpenAIApi } from "openai";

dotenv.config();

const router = express.Router();

const config = new Configuration({
	apiKey: process.env.OPEN_API_KEY,
});

const openai = new OpenAIApi(config);

//get
router.route("/").get((req, res) => {
	res.send("Hello from Dall-E");
});

// post
router.route("/").post(async (req, res) => {
	try {
		const { prompt } = req.body;

		const aiResponse = await openai.createImage({
			prompt,
			n: 1,
			size: "1024x1024",
			response_format: "b64_json",
		});

		const image = aiResponse.data.data[0].b64_json;
		res.status(200).json({ photo: image });
	} catch (err) {
		console.log(err);
		res.status(500).send(err?.response.data.error.message);
	}
});

export default router;

// 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
