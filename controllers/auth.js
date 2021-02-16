const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const errorHandler = require('../utils/errorHandler')
const keys = require('../config/keys')
const User = require('../models/User')

module.exports.login = async function (req, res) {
    //
    // res.status(200).json({
    //     login: {
    //         email: req.body.email,
    //         password: req.body.password
    //     }
    // })


    const candidate = await User.findOne({email: req.body.email})
    if (candidate) {
        // проверяем пароль. пользователь существует

        const passwordResult = bcrypt.compareSync(req.body.password, candidate.password)
        if (passwordResult) {
            //Генерация токена. Пароль совпали
            const token = jwt.sign({
                email: candidate.email,
                userId: candidate._id
            }, keys.jwt, {expiresIn: 60 * 60})

            res.status(200).json({
                token: `Bearer ${token}`
            })
        } else {
            //пароль не правильный
            res.status(401).json({
                message: 'пароль не савпали. Попробуйте еще раз'
            })
        }
    } else {
        //пользователь не найден. ошибка
        res.status(404).json({
            message: 'пользователь не найден'
        })
    }

}

module.exports.register = async function (req, res) {
    // res.status(200).json({
    //     register: 'registration'
    // })
//проверка авторизации
    // const user = new User({
    //     email: req.body.email,
    //     password: req.body.password
    // })
    //
    // user.save().then(()=> console.log('User created.'))

    const candidate = await User.findOne({email: req.body.email})
    if (candidate) {
        //Пользователь существует, нужно отдать ошибку
        res.status(409).json({
            message: 'Такой емайл уже занят, попробуйте другой'
        })
    } else {
        //нужно создать пользователя
        const salt = bcrypt.genSaltSync(10)
        const password = req.body.password
        const user = new User({
            email: req.body.email,
            password: bcrypt.hashSync(password, salt)
        })
        try {
            await user.save()
            res.status(201).json(user)
        } catch (e) {
            //обработать ошибку
            errorHandler(res, e)
        }

    }


}