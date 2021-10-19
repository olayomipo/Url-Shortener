"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.stripTags = exports.truncate = exports.formatDate = void 0;
// const moment = require("moment");
const moment_1 = __importDefault(require("moment"));
function formatDate(date, format) {
    return (0, moment_1.default)(date).format(format);
}
exports.formatDate = formatDate;
function truncate(str, len) {
    if (str.length > len && str.length > 0) {
        let new_str = str + ' ';
        new_str = str.substr(0, len);
        new_str = str.substr(0, new_str.lastIndexOf(''));
        new_str = new_str.length > 0 ? new_str : str.substr(0, len);
        return new_str + '...';
    }
    return str;
}
exports.truncate = truncate;
function stripTags(input) {
    return input.replace(/<(?:.|\n)*?>/gm, '');
}
exports.stripTags = stripTags;
//  export function editIcon (storyUser, loggedUser, storyId, floating = true) {
//     if(storyUser._id.toString() == loggedUser._id.toString()) {
//         if (floating) {
//             return `<a href="/stories/edit/${storyId}" class = "btn-floating halfway-fab blue"> <i class = "fas fa-edit fa-small"> </i> </a>`
//         } else{
//             return `<a href="/stories/edit/${storyId}"> <i class = "fas fa-edit"></i></a>`
//         }
//     } else {
//         return ''
//     }
// }
//  export function select (selected: any, options: any) {
//     return options
//      .fn(this: any)
//      .replace(
//          new RegExp(' value="' + selected + '"'),
//          '$& selected= "selected"'
//      )
//      .replace(
//         new RegExp('>' + selected + '</option>'),
//         'selected= "selected"$&'
//     )
// }
