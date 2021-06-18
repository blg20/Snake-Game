
import fc from "fast-check";
import snk from "../static/functions.js";
import property from "./property.js";


const input_name = fc.string();

describe("Snake add sss", function () {

    property(
        "New string has 3 more characters",
        [input_name],
        function (input_name) {

            const new_string = snk.alter(input_name);

            if (input_name.length + 3 === new_string.length) {
                return true;
            } else {
                return false;
            }
        }
    )




    property(
        "Last character is an s",
        [input_name],
        function (input_name) {

            const new_string = snk.alter(input_name);
            const last_char = new_string.split("")[new_string.length - 1];

            if (last_char === "s") {
                return true;
            } else {
                return false;
            }
        }
    );


    it("If name doesnt change, throw error", function () {
        if (snk.alter("").length === "".length) {
            throw "Server has not sssssnakified the name";
        }
    });
});

