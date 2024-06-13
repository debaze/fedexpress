const express = require("express");
const dotenv = require("dotenv");

dotenv.config();
dotenv.config({
	path: ".env.local",
	override: true,
});

const app = express();

app.listen(process.env.PORT, () => {
	console.log(`Server running on port ${process.env.PORT}`);
});