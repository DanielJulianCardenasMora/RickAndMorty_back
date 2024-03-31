const { User } = require('../db')

async function login(req, res){
    try {
        const { email, password } = req.query

        if(!email || !password) return res.status(400).json({message:"Faltan datos"})

        const logUser = await User.findOne({
            where:{
                email
            }
        })

        if(!logUser) return res.status(404).json({message: "Usuario no encontrado"})

        // console.log(logUser);

        return logUser.password === password ? res.status(202).json({access:true}) : res.status(403).json({message: "Contraseña incorrecta"})

    } catch (error) {
        res.status(500).json({error:error.message})
    }
}

module.exports = login