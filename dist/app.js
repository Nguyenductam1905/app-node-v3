"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const path_1 = __importDefault(require("path"));
const web_1 = require("./routes/web");
const app = (0, express_1.default)();
//Call env
const port = process.env.PORT;
//set engine cho ejs
app.set("view engine", `ejs`);
app.set("views", `${path_1.default.resolve()}/src/views`);
//set public file
app.use(express_1.default.static('public'));
// req.body execute JSON code
app.use(express_1.default.json()); // for parsing application/json
app.use(express_1.default.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
console.log(path_1.default.resolve());
//Route..
(0, web_1.webRoutes)(app);
app.listen(port, () => {
    if (port)
        console.log(`This port running on ${port}`);
    else
        console.log("Undefined PORT");
});
//# sourceMappingURL=app.js.map