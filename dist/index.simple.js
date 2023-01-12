"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
/* -------------------- [*] API Config [*] -------------------- */
const api = (0, express_1.default)();
const port = 3030;
api.use(express_1.default.json());
let messages = [];
/* -------------------- [*] Route [*] -------------------- */
/* [GET] - Get all messages */
api.get('/api/', (req, res) => {
    const resource = messages;
    res.status(200).send(resource);
});
/* [GET] - Get a message by id */
api.get('/api/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const message = messages.filter(message => message.id === id);
    res.status(200).send(message);
});
/* [POST] - Creat a new message */
api.post('/api', (req, res) => {
    let { id, user, text } = req.body;
    const timeNow = new Date();
    // Creating model
    const message = {
        id: (messages.length > 0) ? messages.slice(-1)[0].id + 1 : 1,
        user: user || 'Anonymous',
        text: text || '',
        created: timeNow,
        modified: timeNow
    };
    messages.push(message);
    // Set response
    const responseMessage = { status: 'successed' };
    res.status(201).send(JSON.stringify(responseMessage));
});
/* [PUT] - Modify a message by id */
api.put("/api/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const timeNow = new Date();
    const modifiliedMessage = [];
    // Use the union type to destructure                                   
    let { user, text } = req.body;
    // Modifly message from matched id 
    messages = messages.map(message => {
        if (message.id === id) {
            message.text = text;
            message.user = user;
            message.modified = timeNow;
            modifiliedMessage.push(message);
        }
        return message;
    });
    // Set response
    let responseMessage = { status: 'unsuccessed', modifilied: {} };
    if (modifiliedMessage.length > 0) {
        responseMessage = { status: 'successed', modifilied: modifiliedMessage };
    }
    res.status(200).send(JSON.stringify(responseMessage));
});
/* [DELETE] - Delete a new message by id */
api.delete('/api/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const deletedItem = [];
    // Searching a unmatch id message
    messages = messages.filter(message => {
        if (message.id === id)
            deletedItem.push(message);
        return message.id !== id;
    });
    // Set response
    let responseMessage = { status: 'unsuccessed', deletedMessage: {} };
    if (deletedItem.length > 0) {
        responseMessage = { status: 'successed', deletedMessage: deletedItem };
    }
    res.status(200).send(JSON.stringify(responseMessage));
});
/* -------------------- [*] API Listening [*] -------------------- */
api.listen(port, () => {
    console.log(`API listening on port ${port}`);
});
