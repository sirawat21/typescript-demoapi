"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
let messages = [];
/* ------------------ [*] Controller [*] ------------------ */
// [GET] - Get all messages
router.get('/', (req, res) => {
    const resource = messages;
    res.status(200).send(resource);
});
// [GET] - Get a message by id
router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const message = messages.filter(message => message.id === id);
    res.status(200).send(message);
});
// [POST] - Creat a new message
router.post('/', (req, res) => {
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
// [PUT] - Modify a message by id
router.put('/:id', (req, res) => {
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
// [DELETE] - Delete a new message by id
router.delete('/:id', (req, res) => {
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
exports.default = router;
