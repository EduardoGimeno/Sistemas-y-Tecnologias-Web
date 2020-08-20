/*
 * userScheduled.js
 * Operaciones en segundo plano de los usuarios.
 */

var express = require('express');
var schedule = require('node-schedule');
var User = require('../models/usuario');
var userScheduled = {};

/*
 * Actualizar los usuarios baneados.
 */
function bannedUsers() {
    schedule.scheduleJob('00 00 22 * * *', async function() {
        const users = await User.find({baneado: true});
        var today = new Date();
        today.setHours(2,0,0,0);
        var i;
        for (i = 0; i < users.length; i++) {
            if (users[i].finBan <= today) {
                const filter = { email: users[i].email };
                await User.findOneAndUpdate(filter, { baneado: false });
            }
        }
    });

}

module.exports = {
    bannedUsers
};
