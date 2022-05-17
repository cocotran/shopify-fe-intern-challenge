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
var _this = this;
// ============= Constants, helpers =================
var BASE_URL = "https://api.openai.com/v1/engines";
function htmlToElement(htmlString) {
    var template = document.createElement("template");
    htmlString = htmlString.trim(); // Never return a text node of whitespace as the result
    template.innerHTML = htmlString;
    return template.content.firstChild;
}
var getFullUrl = function (engine) {
    return BASE_URL + "/" + engine + "/completions";
};
var sendRequest = function (engine, data) { return __awaiter(_this, void 0, void 0, function () {
    var res;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fetch(getFullUrl(engine), {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer ".concat(process.env.OPENAI_SECRET)
                    },
                    body: JSON.stringify(data)
                })];
            case 1:
                res = _a.sent();
                return [2 /*return*/, res.json()];
        }
    });
}); };
var getResponseText = function (choices) {
    var response = "";
    choices.forEach(function (element) {
        response += element.text;
    });
    return response;
};
var getAllAvailableEngines = function () { return __awaiter(_this, void 0, void 0, function () {
    var res;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fetch(BASE_URL, {
                    headers: {
                        Authorization: "Bearer ".concat(process.env.OPENAI_SECRET)
                    }
                })];
            case 1:
                res = _a.sent();
                return [2 /*return*/, res.json()];
        }
    });
}); };
// ============= Application state =================
var results = [];
// ============= State functions =================
var saveResult = function (prompt, response) {
    if (typeof Storage !== "undefined") {
        var results_1 = JSON.parse(localStorage.getItem("results") || "[]");
        console.log(results_1);
        results_1 === null || results_1 === void 0 ? void 0 : results_1.push({ prompt: prompt, response: response });
        localStorage.setItem("results", JSON.stringify(results_1));
    }
};
var getAllResults = function () {
    return JSON.parse(localStorage.getItem("results"));
};
// ============= DOM node references =================
var responseContainer = document.getElementById("responseContainer");
var submitBtn = document.getElementById("submitBtn");
var maxTokens = document.getElementById("maxTokens");
var temperature = document.getElementById("temperature");
var top_p = document.getElementById("top_p");
var promptInput = document.getElementById("promptInput");
var engineSelected = (document.getElementById("engineSelected"));
// ============= DOM update functions =================
var displayNewResult = function (prompt, response) {
    var newResult = "\n        <div style=\"border: 1px solid blue\">\n            <h5>".concat(prompt, "</h5>\n            <p>\n                ").concat(response, "\n            </p>\n        </div>\n    ");
    if (htmlToElement(newResult))
        responseContainer === null || responseContainer === void 0 ? void 0 : responseContainer.insertBefore(htmlToElement(newResult), responseContainer.firstChild);
};
var displayAllResults = function () {
    var allResults = getAllResults();
    allResults === null || allResults === void 0 ? void 0 : allResults.forEach(function (result) {
        displayNewResult(result.prompt, result.response);
    });
};
var displayAvailableEngines = function (engine) {
    var newEngine = "<option value=\"".concat(engine.id, "\">").concat(engine.id, "</option>");
    if (htmlToElement(newEngine))
        engineSelected.appendChild(htmlToElement(newEngine));
};
var displayAllAvailableEngines = function () { return __awaiter(_this, void 0, void 0, function () {
    var res;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, getAllAvailableEngines()];
            case 1:
                res = _b.sent();
                (_a = res === null || res === void 0 ? void 0 : res.data) === null || _a === void 0 ? void 0 : _a.forEach(function (engine) {
                    displayAvailableEngines(engine);
                });
                return [2 /*return*/];
        }
    });
}); };
// ============= Event handlers =================
var onSubmitBtn = function () { return __awaiter(_this, void 0, void 0, function () {
    var data, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                data = {
                    prompt: promptInput === null || promptInput === void 0 ? void 0 : promptInput.value,
                    max_tokens: parseInt(maxTokens === null || maxTokens === void 0 ? void 0 : maxTokens.value),
                    temperature: parseInt(temperature === null || temperature === void 0 ? void 0 : temperature.value),
                    top_p: parseInt(top_p === null || top_p === void 0 ? void 0 : top_p.value)
                };
                return [4 /*yield*/, sendRequest(engineSelected === null || engineSelected === void 0 ? void 0 : engineSelected.value, data)];
            case 1:
                result = _a.sent();
                displayNewResult(promptInput === null || promptInput === void 0 ? void 0 : promptInput.value, getResponseText(result.choices));
                saveResult(promptInput === null || promptInput === void 0 ? void 0 : promptInput.value, getResponseText(result.choices));
                return [2 /*return*/];
        }
    });
}); };
// ============= Event handler bindings =================
submitBtn === null || submitBtn === void 0 ? void 0 : submitBtn.addEventListener("click", onSubmitBtn);
window.addEventListener("load", function () { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        displayAllResults();
        displayAllAvailableEngines();
        return [2 /*return*/];
    });
}); });
// ============= Initial setup =================
