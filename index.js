"use strict";
/*
 * Thanks!
 * https://github.com/thmsgbrt/thmsgbrt
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var Mustache = require("mustache");
// import fetch from 'node-fetch';
var fs = require("fs");
var puppeteer_service_1 = require("./services/puppeteer.service");
// mustache のテンプレートファイル
var MUSTACHE_MAIN_DIR = "./main.mustache";
// mustache のリテラルに渡すデータ
var DATA = {
    img1: "",
    img2: "",
    img3: ""
};
// instagram のポストを取得する
function setInstagramPosts(count) {
    return __awaiter(this, void 0, void 0, function () {
        var instagramImages;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, puppeteer_service_1["default"].getLatestInstagramPostsFromAccount("hisasann", count)];
                case 1:
                    instagramImages = _a.sent();
                    DATA.img1 = instagramImages[0];
                    DATA.img2 = instagramImages[1];
                    DATA.img3 = instagramImages[2];
                    return [2 /*return*/];
            }
        });
    });
}
// README をジェネレートする
function generateReadMe() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, new Promise(function (resolve) {
                        fs.readFile(MUSTACHE_MAIN_DIR, function (err, data) {
                            if (err)
                                throw err;
                            var output = Mustache.render(data.toString(), DATA);
                            fs.writeFileSync("README.md", output);
                            resolve();
                        });
                    })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function action() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: 
                /**
                 * Get pictures
                 */
                //await setInstagramPosts(3);
                /**
                 * Generate README
                 */
                return [4 /*yield*/, generateReadMe()];
                case 1:
                    /**
                     * Get pictures
                     */
                    //await setInstagramPosts(3);
                    /**
                     * Generate README
                     */
                    _a.sent();
                    /**
                     * Fermeture de la boutique 👋
                     */
                    return [4 /*yield*/, puppeteer_service_1["default"].close()];
                case 2:
                    /**
                     * Fermeture de la boutique 👋
                     */
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
action();
