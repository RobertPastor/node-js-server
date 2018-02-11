"use strict";

const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })
//const upload = multer({ dest: '../uploads/' })


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

        console.log(' route is version Initial COnf file');
        upload(req, res, function (err) {
            if (err) {
                // An error occurred when uploading
                console.log("Error - an error occurs - err= " + String(err));
                res.render('pages/error');
            } else {
                console.log(req.files);
                if ((req.buffer) && (req.buffer.length > 0)) {
                    req.buffer.array.forEach(element => {
                        console.log(element)
                    });
                }
            }

            // Everything went fine

            //console.log(req);

            // var tmp_path = req.file.path;
            // console.log(tmp_path);
            // console.log(req.file);
            // console.log('version initial configuration file received');
            // /** The original name of the uploaded file stored in the variable "originalname". **/
            // var target_path = path.resolve('../uploads/', req.file.originalname);

            // /** A better way to copy the uploaded file. **/
            // var src = fs.createReadStream(tmp_path);
            // var dest = fs.createWriteStream(target_path);
            // src.pipe(dest);
            // src.on('end', function () { res.render('complete'); });
            // src.on('error', function (err) { res.render('error'); });

            // return res.status(200).send(req.file);
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