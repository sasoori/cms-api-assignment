const mongoose  = require('mongoose');
var authMiddleware = require('../../middlewares/auth');

module.exports = function(server) {

    // GET PROJECTS
    server.get('/projects', authMiddleware, function(req, res) {
        const Project = mongoose.model('Project');
        Project.find(function(err, docs) {
            if(err) {
                res.status(400).send(err);
            } else {
                res.send(docs);
            }
        });
    });
    //CREATE PROJECT
    server.post('/project', authMiddleware,  function(req, res) {
        const data = req.body;
        const Project = mongoose.model('Project');
        const newProject = new Project(data);
        newProject.save(function() {
           res.send(newProject)
        });
    });
    // EDIT PROJECT
    server.put('/project/:id', authMiddleware, function(req, res) {
        const Project = mongoose.model('Project');
        Project.findByIdAndUpdate(req.params.id, req.body, function(err, doc) {
            if (err) {
                res.status(400).send(err);
            } else {
                res.send(doc);
            }
        })
    });
    // GET PROJECT
    server.get('/project/:id', authMiddleware, function(req, res) {
        const Project = mongoose.model('Project');
        Project.findById(req.params.id, function(err, doc) {
            if (err) {
                res.status(400).send(err);
            } else {
                res.send(doc);
            }
        })
    });
};