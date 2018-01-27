"use strict";

module.exports = function (app) {

    app.get('/', (req, res) => {
        //console.log(req.hostname);
        res.render('pages/index');
    });
    app.get('/klocproject', function (req, res) {
        console.log('received get kloc project');
        var projects = [{ name: "COOPANS" }, { name: "4FLIGHT" }, { name: "NEOPTERYX" }];
        res.locals.projects = projects;
        res.render('pages/klocproject');

    });
    app.get('/about', function (req, res) {
        res.render('pages/about');
    });


    app.post('/form', function (req, res) {
        console.log('selected project is= ' + req.body.selectedProject);
        console.log('selected version is= ' + req.body.selectedVersion);
        res.send(req.body.selectedProject + ' - ' + req.body.selectedVersion);
    });

}