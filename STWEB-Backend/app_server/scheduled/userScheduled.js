/*
 * userScheduled.js
 * Operaciones en segundo plano de los usuarios.
 */

var express = require('express');
var schedule = require('node-schedule');
var User = require('../models/usuario');

/*
 * Actualizar los usuarios baneados.
 */
function bannedUsers() {
    schedule.scheduleJob('0 10 13 * * *', async function() {
        const users = await User.find({baneado: true});
        var today = new Date();
        var i;
        console.log("XXXX");
        for (i = 0; i < users.length; i++) {
            if (users[i].finBan == today) {
                const filter = { email: users[i].email };
                await User.findOneAndUpdate(filter, { baneado: false });
            }
        }
    });
}

module.exports = {
    bannedUsers
};