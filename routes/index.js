"use strict";

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