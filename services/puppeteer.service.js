"use strict";
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
var puppeteer = require("puppeteer");
var PuppeteerService = /** @class */ (function () {
    function PuppeteerService() {
    }
    PuppeteerService.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, puppeteer.launch({
                                args: [
                                    '--no-sandbox',
                                    '--disable-setuid-sandbox',
                                    '--disable-infobars',
                                    '--window-position=0,0',
                                    '--ignore-certifcate-errors',
                                    '--ignore-certifcate-errors-spki-list',
                                    '--incognito',
                                    '--proxy-server=http=194.67.37.90:3128',
                                    // '--user-agent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3312.0 Safari/537.36"', //
                                ]
                            })];
                    case 1:
                        _a.browser = _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     *
     * @param {string} url
     */
    PuppeteerService.prototype.goToPage = function (url) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!!this.browser) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.init()];
                    case 1:
                        _b.sent();
                        _b.label = 2;
                    case 2:
                        _a = this;
                        return [4 /*yield*/, this.browser.newPage()];
                    case 3:
                        _a.page = _b.sent();
                        return [4 /*yield*/, this.page.setExtraHTTPHeaders({
                                'Accept-Language': 'en-US'
                            })];
                    case 4:
                        _b.sent();
                        return [4 /*yield*/, this.page.goto(url, {
                                waitUntil: "networkidle0"
                            })];
                    case 5:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    PuppeteerService.prototype.close = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.page.close()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.browser.close()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     *
     * @param {string} acc Account to crawl
     * @param {number} n Qty of image to fetch
     */
    PuppeteerService.prototype.getLatestInstagramPostsFromAccount = function (acc, n) {
        return __awaiter(this, void 0, void 0, function () {
            var page, previousHeight, nodes, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        page = "https://www.picuki.com/profile/" + acc;
                        return [4 /*yield*/, this.goToPage(page)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 7, , 8]);
                        return [4 /*yield*/, this.page.evaluate("document.body.scrollHeight")];
                    case 3:
                        previousHeight = _a.sent();
                        return [4 /*yield*/, this.page.evaluate("window.scrollTo(0, document.body.scrollHeight)")];
                    case 4:
                        _a.sent();
                        // 🔽 Doesn't seem to be needed
                        // await this.page.waitForFunction(`document.body.scrollHeight > ${previousHeight}`);
                        return [4 /*yield*/, this.page.waitFor(1000)];
                    case 5:
                        // 🔽 Doesn't seem to be needed
                        // await this.page.waitForFunction(`document.body.scrollHeight > ${previousHeight}`);
                        _a.sent();
                        return [4 /*yield*/, this.page.evaluate(function () {
                                var images = document.querySelectorAll(".post-image");
                                return [].map.call(images, function (img) {
                                    return img.src;
                                });
                            })];
                    case 6:
                        nodes = _a.sent();
                        return [2 /*return*/, nodes.slice(0, 3)];
                    case 7:
                        error_1 = _a.sent();
                        console.log('Error', error_1);
                        process.exit();
                        return [3 /*break*/, 8];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    return PuppeteerService;
}());
var puppeteerService = new PuppeteerService();
exports["default"] = puppeteerService;
