const todolistroute = require('express').Router(),
    todolistecontroller = require('../../controllers/todolist');
const {checkIsAuth} = require("../../config/jwtConfig");


module.exports = (app) => {
    todolistroute.get('/todolistes', checkIsAuth,todolistecontroller.getAll)
    todolistroute.post('/todoliste', checkIsAuth,todolistecontroller.create)
    todolistroute.put('/todoliste/:uuid', checkIsAuth,todolistecontroller.update)
    todolistroute.delete('/todoliste/:uuid', checkIsAuth,todolistecontroller.delete)
    todolistroute.get('/todoliste/:uuid', checkIsAuth,todolistecontroller.getById)
    app.use('/api/v1', todolistroute)
}


