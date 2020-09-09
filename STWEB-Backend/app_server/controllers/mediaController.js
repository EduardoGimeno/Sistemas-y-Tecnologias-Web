/*
 * mediaController.js
 * Controlador para los operaciones de creación de csv.
 */

var express = require('express');
var url = require('url');
const jsonexport = require('jsonexport');
var pdf = require("pdf-creator-node");
var fs = require('fs');
const { options } = require('../../app');
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

/*
 * Creación de un pdf a partir de un JSON.
 */
mediaController.getPDF = function (req, res) {
    var html = fs.readFileSync('app_server/templates/template.html', 'utf8');
    var element= req.body;
    var document = {
        html: html,
        data: {
            element
        },
        path: "./data.pdf"
    };
    pdf.create(document)
    .then(file => {
        res.setHeader('Content-type','application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename= data.pdf');
        res.status(200);
        res.send(fs.readFileSync('data.pdf', 'utf8'));
    })
    .catch(err => {
        res.status(500);
        res.json({error: err.message});
    });
}

module.exports = mediaController;