import express from "express";
import Handler from "./handler.js";


const port = 8080;
const app = express();


app.use("/", express.static("web-app/static"));

app.use("/", express.json());

app.post("/", function (req, res) {


    var request_object = req.body;

    Handler[request_object.type](request_object).then(
        (response_object) => res.json(response_object));


    console.log("Recieved Info");


});

app.listen(port, function () {
    console.log(`Listening on port ${port} – http://localhost:${port}`);
});
