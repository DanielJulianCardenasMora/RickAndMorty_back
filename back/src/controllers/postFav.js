const { Favorite } = require('../db')

const postFav = async (req, res) => {
    try {
        const { id, name, origin, status, image, species, gender } = req.body

        if(![id, name, origin, status, image, species, gender].every(Boolean)) return res.status(401).json({message: "Faltan datos"})

        await Favorite.findOrCreate({where:{
           id, name, origin, status, image, species, gender
        }})

        const allFavorites = await Favorite.findAll()

        // console.log(allFavorites);

        return res.status(200).json(allFavorites)

    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

module.exports = postFav