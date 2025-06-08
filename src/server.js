"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var dotenv_1 = require("dotenv");
var app = (0, express_1.default)();
app.use(express_1.default.json());
dotenv_1.default.config();
var PORT = process.env.PORT;
app.listen(PORT, function () {
    console.log("server's running on port ".concat(PORT));
});
