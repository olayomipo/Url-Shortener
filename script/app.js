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
const express_handlebars_1 = __importDefault(require("express-handlebars"));
const method_override_1 = __importDefault(require("method-override"));
const db_1 = require("./db");
const alias = __importStar(require("./Controllers/aliasController"));
const serve_favicon_1 = __importDefault(require("serve-favicon"));
const path_1 = __importDefault(require("path"));
(0, db_1.connectDB)();
const app = (0, express_1.default)();
// Our Express APP config
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.set("port", process.env.PORT || 5500);
app.use((0, serve_favicon_1.default)(path_1.default.join(__dirname, '../public', 'images', 'favicon.ico')));
//  Method override
app.use((0, method_override_1.default)(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        // look in urlencoded POST bodies and delete it
        let method = req.body._method;
        delete req.body._method;
        return method;
    }
}));
// Hamdlebars helpers
const hbs_1 = require("./helpers/hbs");
//Handlebars 
app.engine('.hbs', (0, express_handlebars_1.default)({
    helpers: {
        formatDate: hbs_1.formatDate,
        truncate: hbs_1.truncate,
        stripTags: hbs_1.stripTags
    }, defaultLayout: 'main', extname: '.hbs'
}));
app.set('view engine', '.hbs');
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
