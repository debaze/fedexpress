const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const express = require("express");
const barRouter = require("./routers/barRouter");
const beerOrderRouter = require("./routers/beerOrderRouter");
const beerRouter = require("./routers/beerRouter");
const orderRouter = require("./routers/orderRouter");
require("./models/index");

dotenv.config();
dotenv.config({
	path: ".env.local",
	override: true,
});

const app = express();

app.listen(process.env.PORT, () => {
	console.log(`Server running on port ${process.env.PORT}`);
});

app.use(bodyParser.urlencoded({
	extended: false,
}));
app.use(bodyParser.json());
app.use("/bars", barRouter);
app.use("/", beerOrderRouter);
app.use("/", beerRouter);
app.use("/", orderRouter);