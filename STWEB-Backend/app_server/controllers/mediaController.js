/*
 * mediaController.js
 * Controlador para los operaciones de creación de csv.
 */

var express = require('express');
var url = require('url');
const jsonexport = require('jsonexport');
var mediaController = {};

/*
 * Creación de un csv a partir de un JSON.
 */
mediaController.getCSV = function (req, res) {
    jsonexport(req.body,function (err,csv){
        if (err) {
            res.status(500);
            res.json({error: err.message});
        } else {
            res.setHeader('Content-type','text/csv');
            res.setHeader('Content-Disposition', 'attachment; filename= data.csv');
            res.status(200);
            res.send(csv);
        }
    });
}

module.exports = mediaController;