"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = require("./db");
const alias = __importStar(require("./Controllers/aliasController"));
const serve_favicon_1 = __importDefault(require("serve-favicon"));
const path_1 = __importDefault(require("path"));
(0, db_1.connectDB)();
const app = (0, express_1.default)();
// Our Express APP config
app.use(express_1.default.json());
app.set("port", process.env.PORT || 5500);
app.use((0, serve_favicon_1.default)(path_1.default.join(__dirname, '../public', 'images', 'favicon.ico')));
app.get('/', alias.GetUrl);
app.post('/', alias.PostUrl);
app.get('/:alias', alias.GetUrlALias);
app.put('/:alias', alias.PutUrlAlias);
app.delete('/:alias', alias.DeleteUrlAlias);
app.get('/test', (req, res) => res.send('Hello World'));
const PORT = app.get('port');
app.listen(PORT, () => {
    console.log(`App is running on port %d`, PORT);
});
