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
const assert = require("assert");
const config = require("config");
const fs = require("fs-extra-promise");
const fb = require("./functions");
const pages = config.get('pages');
const daysBack = config.get('daysBack');
const appId = config.get('appId');
const appSecret = config.get('appSecret');
const rootDir = config.get('rootDir');
assert.ok(pages.length && daysBack, "Please provide Facebook page(s) name and days back");
assert.ok(appId && appSecret && !appId.startsWith('YOUR') && !appSecret.startsWith('YOUR'), "Facebook appId and appSecret must be specified");
main();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const fbGet = fb.get(fb.prepAccessToken(appId, appSecret), daysBack);
        pages.forEach((page) => __awaiter(this, void 0, void 0, function* () {
            const doc = yield fbGet.page(page).catch(err => console.error(err));
            if (doc && doc.data && doc.data.length) {
                yield fs.ensureDirAsync(rootDir);
                const uniqDocs = fb.notAlreadyThere(rootDir, page)(doc.data);
                uniqDocs.forEach((uniqDoc) => __awaiter(this, void 0, void 0, function* () { return yield fs.writeJSONAsync(uniqDoc['filename'], uniqDoc); }));
            }
        }));
    });
}
//# sourceMappingURL=index.js.map