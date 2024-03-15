const productModel = require('../../models/todolist')


const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();







exports.getAll = async (req, res) => {
    return res.status(200).json({ msg: 'OK', products: await productModel.findAll()})
}

exports.create = async (req, res) => {
    let authHeader = req.headers['authorization'];
    let token = authHeader && authHeader.split(' ')[1]; // Extraction du token à partir du header d'autorisation

    if (token) {
        req.token = token;
        console.log(token) // Ajout du token à l'objet req pour le rendre disponible dans les routes suivantes
    }
    
      // Vérifier et décoder le token

      
      if (token) {
          jwt.verify(token, process.env.SECRET_PASS,async (err, decoded) => {
              if (err) {
                  res.status(401).json({ error: 'Token invalide' });
              } else {
                  // Le token est valide, vous pouvez accéder aux informations décryptées dans l'objet 'decoded'
                  console.log(decoded.id)
                  // get body content of request
            const { nom, price,todolistid, quantity,contenu} = req.body
            try {
                const product = await productModel.create({
                    nom,
                    contenu,
                    todolistid,
                    dateCreation:Date.now(),
                    price: parseFloat(price),
                    quantity: parseInt(quantity),
                    idUser:decoded.id
                })
                if (!product.id){
                    res.status(400).json({ msg: 'BAD REQUEST'})
                }
                return res.status(200).json({ msg: 'OK', product: product.dataValues})
                // return product.id ? res.status(200).json({ msg: 'OK', product}) : res.status(400).json({ msg: 'BAD REQUEST'})
            } catch (e) {
                console.error(e.message)
                res.status(400).json({ msg: 'BAD REQUEST ' + e.message})
            }
                    }
          });
      } else {
          res.status(401).json({ error: 'Token manquant dans le header d\'autorisation' });
      }
    
}

exports.update = async (req, res) => {
    try {
        if (!req.params.uuid) return res.status(400).json({ msg: 'BAD REQUEST PARAMS IS REQUIRED'})
        if (!req.body) return res.status(400).json({ msg: 'BAD REQUEST BODY IS REQUIRED'})
        const { nom, price, quantity, userId } = req.body
        const { uuid } = req.params
        const product = await productModel.update({
            nom,
            price: parseFloat(price),
            quantity: parseInt(quantity),
            userId
        }, {where: { id: uuid}})
        return res.status(200).json({ msg: 'OK', product})
        // return product.id ? res.status(200).json({ msg: 'OK', product}) : res.status(400).json({ msg: 'BAD REQUEST'})
    } catch (e) {
        console.error(e.message)
        res.status(400).json({ msg: 'BAD REQUEST' + e.message})
    }
}

exports.delete = async (req, res) => {
    if (!req.params.uuid) return res.status(400).json({ msg: 'BAD REQUEST PARAMS IS REQUIRED'})
    const { uuid } = req.params
    try {
        const product = await productModel.destroy( {where: { id: uuid}})
        console.log(product)
        if (!product){
            res.status(400).json({ msg: 'BAD REQUEST'})
        }
        return res.status(200).json({ msg: 'OK'})
        // return product.id ? res.status(200).json({ msg: 'OK', product}) : res.status(400).json({ msg: 'BAD REQUEST'})
    } catch (e) {
        console.error(e.message)
        res.status(400).json({ msg: 'BAD REQUEST' + e.message})
    }
}

exports.getById = async (req, res) => {
    if (!req.params.uuid) return res.status(400).json({ msg: 'BAD REQUEST PARAMS IS REQUIRED'})
    const { uuid } = req.params
    try {
        const user = await productModel.findByPk(uuid)
        // const user = await userModel.findOne({where: {id: uuid}})
        console.log(user.dataValues)
        if (!user){
            res.status(400).json({ msg: 'BAD REQUEST'})
        }
        return res.status(200).json({ msg: 'OK', user: user.dataValues})
        // return user.id ? res.status(200).json({ msg: 'OK', user}) : res.status(400).json({ msg: 'BAD REQUEST'})
    } catch (e) {
        console.error(e.message)
        res.status(400).json({ msg: 'BAD REQUEST' + e.message})
    }
}
