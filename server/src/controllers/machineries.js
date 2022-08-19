const { default: mongoose } = require('mongoose');
const Machinery = require('../models/machinery');
const User = require('../models/user');

// const getMachinery = async(req,res) => {
    
//         try {
            
//             const { id } = req.params;
//             const response = await Machinery.findById(id);
//             return response;

        
        
//         } catch (error) {
//             throw new Error(error);
//         }
// }


const getMachineries = async(req,res=response) => {
    
        try {
        
            const machineries = await Machinery.find({ status: true });
            

            res.status(200).json({
                ok: true,
                machineries
            });
        } catch (error) {
            throw new Error(error);
        }
}


const searchMachineries = async(req,res= response) => {
    
    const { term } = req.params
    
    const regex = new RegExp( term, 'i' )

    const machineries = await Machinery.find( { name: regex, status: true } )

    res.json({
        result: (machineries) ? [machineries] : []
    })

}





const postMachinery = async (req,res) => {
    
    try {

        const { id } = req.user;
            
        const data = {
            brand: req.body.marca,
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            user: id,
            img: req.body.img
        }

     

        const machinery = new Machinery(data);

        await machinery.save().then(() => {
            User.findById(id).then( user => {
                user.machineries.push(machinery._id)
                user.save()
            })
        });

        res.status(201).json({
            ok: true,
            machinery
        });
    
        
    } catch (error) {
        throw new Error(error);
    }
}

const deleteMachinery = async (req, res) => {
    try {
        
        const { id } = req.user
        const { machineryID } = req.params
        
     
        
        await Machinery.findByIdAndUpdate(machineryID, { status: false }).then( machinery => {
            User.findById(id).then( user => {
                
                var updatedMachineries = user.machineries.filter( userMachineryId => 
                    userMachineryId.toString() !== machineryID
                )
                user.machineries = updatedMachineries
                user.save()
                res.json({
                    msg:'Maquinaria eliminada'
                })
            })
        })
        
    } catch (error) {
        res.status(500).json({
            ok: false,
            err: error
        });
    }
}






module.exports = {
    getMachineries,
    postMachinery,
    searchMachineries,
    deleteMachinery
}