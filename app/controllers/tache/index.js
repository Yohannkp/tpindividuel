const userModel = require('../../models/tache')
const {hashPassword} = require("../../utils/bcrypt");

exports.getAll = async (req, res) => {
    return res.status(200).json({ msg: 'OK', taches: await userModel.findAll()})
}

exports.create = async (req, res) => {
    // get body content of request
    const { nom, description,todolistid,status } = req.body
    try {
        const user = await userModel.create({
            nom, description,status,todolistid
        })
        if (!user.id){
            res.status(400).json({ msg: 'BAD REQUEST'})
        }
        return res.status(200).json({ msg: 'OK', user: user.dataValues})
        // return user.id ? res.status(200).json({ msg: 'OK', user}) : res.status(400).json({ msg: 'BAD REQUEST'})
    } catch (e) {
        console.error(e.message)
        res.status(400).json({ msg: 'BAD REQUEST ' + e.message})
    }
}

exports.update = async (req, res) => {
    try {
        if (!req.params.uuid) return res.status(400).json({ msg: 'BAD REQUEST PARAMS IS REQUIRED'})
        if (!req.body) return res.status(400).json({ msg: 'BAD REQUEST BODY IS REQUIRED'})
        const { nom, description,status } = req.body
        const { uuid } = req.params
        const user = await userModel.update({
            nom, description,status
        }, {where: { id: uuid}})
        return res.status(200).json({ msg: 'OK', user: user})
        // return user.id ? res.status(200).json({ msg: 'OK', user}) : res.status(400).json({ msg: 'BAD REQUEST'})
    } catch (e) {
        console.error(e.message)
        res.status(400).json({ msg: 'BAD REQUEST' + e.message})
    }
}

exports.delete = async (req, res) => {
    if (!req.params.uuid) return res.status(400).json({ msg: 'BAD REQUEST PARAMS IS REQUIRED'})
    const { uuid } = req.params
    try {
        const user = await userModel.destroy( {where: { id: uuid}})
        console.log(user)
        if (!user){
            res.status(400).json({ msg: 'BAD REQUEST'})
        }
        return res.status(200).json({ msg: 'OK'})
        // return user.id ? res.status(200).json({ msg: 'OK', user}) : res.status(400).json({ msg: 'BAD REQUEST'})
    } catch (e) {
        console.error(e.message)
        res.status(400).json({ msg: 'BAD REQUEST' + e.message})
    }
}

exports.getById = async (req, res) => {
    if (!req.params.uuid) return res.status(400).json({ msg: 'BAD REQUEST PARAMS IS REQUIRED'})
    const { uuid } = req.params
    try {
        // const product = await productModel.findByPk(uuid)
        const product = await userModel.findOne({
            include: [
                {
                association: 'tache_belongsTo_todolist', // alias = as
                attributes: { exclude: [ 'createdAt', 'updatedAt', 'password' ] }
            }
            ],
            where: {id: uuid},
            attributes: {
                exclude: [
                    'createdAt'
                ]
            }
        })
        console.log(product.dataValues)
        if (!product){
            res.status(400).json({ msg: 'BAD REQUEST'})
        }
        return res.status(200).json({ msg: 'OK', product: product.dataValues})
        // return product.id ? res.status(200).json({ msg: 'OK', product}) : res.status(400).json({ msg: 'BAD REQUEST'})
    } catch (e) {
        console.error(e.message)
        res.status(400).json({ msg: 'BAD REQUEST' + e.message})
    }
}
