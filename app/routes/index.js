module.exports = (app) => {
    require('./User')(app)
    require('./auth')(app)
    require('./tache')(app)
    require('./todolist')(app)
}