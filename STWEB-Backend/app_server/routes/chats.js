/*
 * chats.js
 * Rutas para las operaciones del tipo de entrada apartamento.
 */

var express = require('express');
var chatController = require('../controllers/chatController');
var router = express.Router();

router.get('/getChats', chatController.getChatsUser);
router.get('/getChat', chatController.getChat);
router.post('/add', chatController.addChat);
router.put('/updateEntry', chatController.updateChatEntry);
router.put('/updateUser', chatController.updateChatUser);

module.exports = router;