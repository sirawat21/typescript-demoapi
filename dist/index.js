"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const message_controller_1 = __importDefault(require("./controller/message.controller"));
/* -------------------- [*] API Config [*] -------------------- */
const api = (0, express_1.default)();
const port = 3030;
api.use(express_1.default.json());
/* -------------------- [*] API Router [*] -------------------- */
api.use('/api/message', message_controller_1.default);
/* -------------------- [*] API Listening [*] -------------------- */
api.listen(port, () => {
    console.log(`API listening on port ${port}`);
});
