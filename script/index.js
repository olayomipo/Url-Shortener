"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = (0, tslib_1.__importDefault)(require("express"));
const db_1 = require("./db");
const aliasController_1 = require("./Controllers/aliasController");
(0, db_1.connectDB)();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.get('/', aliasController_1.GetUrl);
app.post('/', aliasController_1.PostUrl);
app.get('/:alias', aliasController_1.GetUrlALias);
const PORT = process.env.PORT || 5500;
app.listen(PORT, () => {
    console.log(`App is running on port %d`, PORT);
});
