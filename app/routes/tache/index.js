const tacheroute = require('express').Router(),
    tachecontroller = require('../../controllers/tache');
const {checkIsAuth,} = require("../../config/jwtConfig");


module.exports = (app) => {
    tacheroute.get('/taches', checkIsAuth,tachecontroller.getAll)
    tacheroute.post('/tache', checkIsAuth,tachecontroller.create)
    tacheroute.put('/tache/:uuid',checkIsAuth, tachecontroller.update)
    tacheroute.delete('/tache/:uuid',checkIsAuth, tachecontroller.delete)
    tacheroute.get('/tache/:uuid', checkIsAuth,tachecontroller.getById)
    app.use('/api/v1', tacheroute)
}