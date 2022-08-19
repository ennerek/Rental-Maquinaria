const User = require('../models/user');
const Machinery = require('../models/machinery');
const RentalCart = require('../models/RentalCart');
const { convertDate } = require('../helpers/calculateDate');
const { sendEmail } = require('../utils/sendEmailTemplate');
const { factura } = require('../templates/factura')


const getRentedMachineries = (req,res) => {
    try {

        const { id } = req.user;
        User.findById(id).then( user => {
            RentalCart.find({ user: user._id }).populate('machinery').then( rentals => {
                res.status(200).json({
                    ok: true,
                    rentals
                })
            })
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            err: error
        })
    }
} 

const deleteRentalMachinery = (req, res) => {
    try {
        
        const { id } = req.user;


        const rentalCartCast = user.rentalCart.map( rental => rental.toString());
        if(rentalCartCast.includes(machinery._id.toString())) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Machinery is already in the cart'
                })
        } else {
                if(machinery.isRented  === true) {
                    res.status(400).json({
                        ok: false,
                        msg: 'Machinery is already rented'
                    })
                } else {
                    user.rentalCart.push(machinery._id)
                    user.save().then(() => {
                        machinery.isRented = true
                        machinery.save().then(() => {
                            RentalCartObject = {
                                user: user._id,
                                machinery: machinery.id,
                                days: days,
                                total: days * machinery.price
                            }
                            RentalCart.create(RentalCartObject).then(() => {
                                res.status(200).json({
                                    ok: true,
                                    msg: 'Machinery Rented'
                                })   
                            })
                        })
                        
                    })
                } 
            
        }
    } catch (error) {
        
    }
}

const rentalMachinery = (req, res) => {
    
    try {
        const { id } = req.user;
        const { machineryID } = req.params;
        const { dateValue } = req.body;

        
        
        const days = convertDate(dateValue);

       

        Machinery.findById(machineryID).then( machinery => {
            User.findById(id).then( user => {

                const rentalCartCast = user.rentalCart.map( rental => rental.toString());
                if(rentalCartCast.includes(machinery._id.toString())) {
                        return res.status(400).json({
                            ok: false,
                            msg: 'Machinery is already in the cart'
                        })
                } else {
                        if(machinery.isRented  === true) {
                            res.status(400).json({
                                ok: false,
                                msg: 'Machinery is already rented'
                            })
                        } else {
                            console.log(machinery)
                            user.rentalCart.push(machinery._id)
                            user.save().then(() => {
                                RentalCartObject = {
                                    user: user._id,
                                    machinery: machinery.id,
                                    days: days,
                                    total: days * machinery.price
                                }
                                RentalCart.create(RentalCartObject).then(() => {
                                    res.status(200).json({
                                        ok: true,
                                        msg: 'Machinery Rented'
                                    })   
                                })
                               
                                
                            })
                        } 
                    
                }
            })
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            err: error
        })
    }
}

const makePayment = async (req, res) => {
    try {
        const { id } = req.user;
        const { machineries, total } = req.body;

        const userDB = await User.findById(id);

        
        await User.findById(id).then( user => {
            user.rentalCart = [];
            user.save().then(() => {
                machineries.forEach((rentedMachinery) => {
                    Machinery.findById(rentedMachinery.machinery._id).then( machinery => {
                        machinery.isRented = true;
                        machinery.save().then(() => {
                            console.log('Machinery rented');
                            RentalCart.findOneAndDelete({machinery: machinery.id})
                        })
                    })
                })

                })
                
                RentalCart.find({user: user._id}).then( rentals => {
                    rentals.forEach(rental => {
                        RentalCart.findByIdAndDelete(rental._id).then(() => {
                            console.log('Rental deleted');
                        }).catch(err => {
                            console.log(err);
                        }).finally(() => {
                            console.log('Rental deleted');
                        })
                    })
                })

                const html = factura(machineries,total);
                console.log(html)
                sendEmail(user, 'Factura', html);
                res.status(200).json({
                    ok: true,
                    msg: 'Machinery returned'
                })
            })
    } catch (error) {
        res.status(500).json({
            ok: false,
            err: error
        })
    }
}


module.exports = { rentalMachinery, getRentedMachineries, makePayment }