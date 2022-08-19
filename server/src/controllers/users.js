const User = require('../models/user');
const bcrypt = require('bcrypt');



const getUsers = async (req, res) => {

    

    const query = { status: 'active'};

    const users = await User.find(query);

    res.status(201).json(users);
}


const getUser = async (req, res) => {

    try {

        const user = req.user;
       

        const userDB = await User.findById(user.id);
      
        if( !userDB ) {
            return res.status(404).json({ msg: 'User not found' });
        }

    
        res.status(201).json({
            ok: true,
            userDB
        });

    } catch (error) {
        res.status(400).json({
            ok: false,
            error
        });
    }
    
}



const postUser = async (req, res) => {

    try {
        
        const { name, lastName, email,  password, phone } = req.body;


        const userDB = await User.findOne({ email });

        if( userDB ) {
            return res.status(400).json({
                ok: false,
                msg: 'User already exists'
            });
        }

        const user = new User({ name, lastName, email, password, phone });


        const salt = bcrypt.genSaltSync(10);
        user.password = bcrypt.hashSync(password, salt);

        await user.save();

        res.status(201).json({
            ok: true,
            user
        });

    } catch (error) {
        res.status(400).json({
            ok: false,
            error
        });
    }
}




const putUser = async (req, res) => {

    try {

        const { id } = req.params;
        
        const { name, lastName, email, password, phone } = req.body;

        const userDB = await User.findById(id);

        if( !userDB ) {
            return res.status(404).json({ msg: 'User not found' });
        }

        const user = await User.findByIdAndUpdate(id, { name, lastName, email, password, phone }, { new: true });

        await user.save();

        res.status(201).json({
            ok: true,
            user
        });


    } catch (error) {
        res.status(400).json({
            ok: false,
            error
        });
    }

}

// const patchUser = async (req,res) => {
//     try {

//         const user = req.user;

//         const { machinery } = req.body;

    
//         const userDB = await User.findById(user.id);
     

//         if( !userDB ) {
//             return res.status(404).json({ msg: 'User not found' });
//         }

//         userDB.shoppingCart.push(machinery._id);

//         await userDB.save();

//     } catch (error) {
//         res.status(400).json({
//             ok: false,
//             error
//         });
//     }
        
// }



const deleteUser = async (req, res) => {

    try {
        
        const { id } = req.params;

        const userDB = await User.findById(id);

        if( !userDB ) {
            return res.status(404).json({ msg: 'User not found' });
        }

        await User.findByIdAndUpdate(id, { status: false });
        
        res.status(201).json({
            ok: true,
            msj: 'User deleted'
        });


    } catch (error) {
        res.status(400).json({
            ok: false,
            error
        });
    }
        
}


const patchUser = async (req, res) => {

    try {
        const { id } = req.user;
        
        const userDB = await User.findById(id);

        if( !userDB ) {

            return res.status(404).json({ msg: 'User not found' });
        }

        const user = await User.findByIdAndUpdate(id, { role: "subscribed" }, { new: true });

        await user.save();

        res.status(201).json({
            ok: true,
            msg: 'User updated'
        })
    } catch (error) {
        res.status(400).json({
            ok: false,
            error
        });
    }
}





module.exports = {
    getUsers,
    getUser,
    postUser,
    putUser,
    deleteUser,
    patchUser
}