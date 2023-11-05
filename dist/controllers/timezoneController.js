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
Object.defineProperty(exports, "__esModule", { value: true });
exports.setTimeZone = exports.getTimeZone = void 0;
const setTimeZone = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { timezone } = req.body;
        if (timezone == undefined)
            return res.status(400).json({ message: "Please select a timezone" });
        // Set the 'timezone' cookie with the selected timezone
        res.cookie("timezone", timezone, { maxAge: 30 * 24 * 60 * 60 * 1000 });
        res.status(200).json({ message: "Timezone set successfully" });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error });
    }
});
exports.setTimeZone = setTimeZone;
const getTimezoneFromCookie = (req) => {
    return req.cookies.timezone;
};
const getTimeZone = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const timezone = getTimezoneFromCookie(req);
    if (timezone == undefined)
        return res.status(400).json({ message: "Please select a timezone" });
    res.status(200).json({ timezone });
});
exports.getTimeZone = getTimeZone;
//# sourceMappingURL=timezoneController.js.map