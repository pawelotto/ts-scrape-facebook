"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const url = require("url");
const moment = require("moment");
const request = require("request-promise");
const fs = require("fs-extra-promise");
const path = require("path");
/** Get to the fb resource */
function get(accessToken, daysBack = 10, apiVersion = 'v2.10') {
    let baseUrl = url.parse('https://graph.facebook.com/');
    baseUrl.pathname += apiVersion;
    baseUrl.query = { access_token: accessToken, since: formatDate(daysBack), until: formatDate() };
    return {
        page: function (page) {
            return __awaiter(this, void 0, void 0, function* () {
                Object.assign(baseUrl.query, { fields: 'message,link,created_time,type,name,id,comments.limit(0).summary(true),shares,reactions.limit(0).summary(true)' });
                baseUrl.pathname += `/${page}/posts/`;
                try {
                    return yield download(url.format(baseUrl));
                }
                catch (err) {
                    return Promise.reject(err);
                }
            });
        }
    };
}
exports.get = get;
/** Generate access fb token */
function prepAccessToken(appId, appSecret) {
    return `${appId}|${appSecret}`.toString();
}
exports.prepAccessToken = prepAccessToken;
/** Check if file is already there */
function alreadyDownloaded(rootDir) {
    return __awaiter(this, void 0, void 0, function* () {
        const docs = yield fs.readdirAsync(rootDir);
        function check(postId) {
            docs.forEach((doc) => __awaiter(this, void 0, void 0, function* () {
                const docContent = yield fs.readJSONAsync(doc);
            }));
        }
    });
}
exports.alreadyDownloaded = alreadyDownloaded;
/** Check if file is not already downloaded and save them */
function notAlreadyThere(rootDir, page) {
    const files = fs.readdirSync(rootDir);
    const idsFromFiles = files.map(file => fs.readJSONSync(path.join(rootDir, file)).id);
    return function (docs) {
        docs = docs.map(doc => Object.assign(doc, { filename: path.join(rootDir, page + "_" + doc['id'] + ".json") }));
        return docs.filter(doc => idsFromFiles.indexOf(doc['id']) === -1);
    };
}
exports.notAlreadyThere = notAlreadyThere;
/** Simple request wrapper */
function download(href) {
    return __awaiter(this, void 0, void 0, function* () {
        return request({
            uri: href,
            method: 'GET',
            json: true
        });
    });
}
function formatDate(daysBack) {
    const format = 'YYYY-MM-DD';
    return daysBack ? moment().subtract(daysBack, 'days').format(format) : moment().format(format);
}
//# sourceMappingURL=functions.js.map