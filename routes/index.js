"use strict";

const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })
//const upload = multer({ dest: '../uploads/' })

function uploadFile(initialFinalFileType, req) {

    console.log("=================================================");
    console.log(" uploading = " + initialFinalFileType);
    let results = []
    //console.log(req.files);
    req.files.forEach(file => {
        console.log("original file name= " + file.originalname);
        console.log("original file mime type = " + file.mimetype);
        let result = {};
        result.originalFileName = file.originalname;
        if (file.mimetype === 'text/plain') {
            let stringContent = String(file.buffer);
            //console.log(stringContent);
            result.lines = [];
            stringContent.split(/\r?\n/).forEach(line => {
                console.log(line);

                if (String(line).trim().startsWith("#") == false) {
                    if (String(line).trim().length > 0) {
                        let spacesArray = String(line).trim().split(' ');
                        let tabArray = String(line).trim().split('\t');

                        let lineElement = {};

                        lineElement.repository = spacesArray[0];
                        lineElement.tag = spacesArray[1];
                        result.lines.push(lineElement);
                    }
                }
            });
            results.push(result);
        }
    });
    return results;
}

module.exports = function (app) {

    app.get('/', (req, res) => {
        //console.log(req.hostname);
        res.render('pages/index');
    });

    app.get('/klocproject', function (req, res) {
        //console.log('received get kloc project');
        var projects = [
            {
                name: "COOPANS", versions: [{ version: "COOP-001" }, { version: "COOP-002" }, { version: "COOP-003" }]
            }, {
                name: "4FLIGHT", versions: [{ version: "4F-001" }, { version: "4F-002" }, { version: "4F-IBB3" }]
            }, {
                name: "NEOPTERYX", versions: [{ version: "NEO-IBB3" }, { version: "NEO-IBB3" }, { version: "NEO-IBB7" }]
            }
        ];
        res.locals.projects = projects;
        res.locals.myProjects = JSON.stringify(projects);
        res.render('pages/klocproject');

    });
    app.get('/about', function (req, res) {
        res.render('pages/about');
    });

    var upload = multer().any();

    app.post('/versionInitialConfFile/', function (req, res) {

        console.log(' route is version Initial Conf file');
        upload(req, res, function (err) {
            if (err) {
                // An error occurred when uploading
                console.log("Error - an error occurs - err= " + String(err));
                res.render('pages/error');
                res.end;
            } else {

                res.json({ results: uploadFile("InitialConfFile", req) });
            }
        });
    });

    app.post('/versionFinalConfFile/', function (req, res) {

        console.log(' route is version Final Conf file');
        upload(req, res, function (err) {
            if (err) {
                // An error occurred when uploading
                console.log("Error - an error occurs - err= " + String(err));
                res.render('pages/error');
                res.end;
            } else {
                res.json({ results: uploadFile("InitialConfFile", req) });
            }
        });
    });


    app.post('/form', function (req, res) {
        console.log('selected project is= ' + req.body.selectedProject);
        console.log('number of version is= ' + req.body.versionNumber);
        console.log('selected version Init is= ' + req.body.selectedVersionInit);
        if (String(req.body.versionNumber) == "2") {
            console.log('selected version Final is= ' + req.body.selectedVersionFinal);
            res.send(req.body.selectedProject + ' - ' + req.body.selectedVersionInit + ' - ' + req.body.selectedVersionFinal);

        } else {
            res.send(req.body.selectedProject + ' - ' + req.body.selectedVersionInit);
        }
    });

}