const { googleVerify } = require('../helpers/google-verify');
const generateJWT  = require('../helpers/generateJWT');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const { sendEmail } = require('../utils/sendEmail');


const login = async (req, res) => {
  try {
    const { email, password } = req.body;

 
    const user = await User.findOne({ email });
    
    if (!user) {
        return res.status(400).json({
            msg: 'User not found'
        });
    }
       
    const validPassword = bcrypt.compareSync(password, user.password);

    if (!validPassword) {
        res.status(400).json({
            msg: 'Password is incorrect'
        });
    }


    const token = await generateJWT( user._id );
    
    res.json({
        ok: true,
        token,
    });

  } catch (error) {
    res.status(400).json({
      ok: false,
      error,
    });
  }
};

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log(req.body)

    const userDB = await User.findOne({ email });

    if (userDB) {
      return res.status(400).json({
        ok: false,
        msg: 'User already exists',
      });
    }

    const user = new User({name, email, password});

    const salt = bcrypt.genSaltSync(10);
    user.password = bcrypt.hashSync(password, salt);
    user.status = false;

    const code = Math.floor(Math.random() * 899999 + 100000);
 
  
    user.verificationCode = code
    await user.save();

    
    

    

    const link = `http://localhost:3000/auth/verifyAccount/${user._id}`;

    await sendEmail(user, 'Confirm your account', `Your code is ${code}`, link);

    const token = await generateJWT( user._id );

    

    res.status(201).json({
      ok: true,
      token,
      user
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      error,
    });
  }
};

const googleSignIn = async (req, res = response) => {
  const {id_token}  = req.body;
  
 
  try {
    const { email, name, picture } = await googleVerify(id_token);

    console.log(email)
    // Verificar el usuario
    const userDB = await User.findOne({ email });


    

    if (userDB) {

      const token = await generateJWT( userDB._id );

      return res.json({
        ok: true,
        token,
        user: userDB,
      });

    }

    // Si no existe crear un usuario


    const user = new User({
        name, email, password: 'asdfghj', picture, google: true
    });


    await user.save();

    const token = await generateJWT( user._id );

    console.log(token)
    res.status(200).json({
      ok: true,
      user,
      token
    });
  } catch (error) {
    res.status(400).json({
      msg: 'Token de google no es valido',
    });
  }
};


const verifyAccount = async (req, res) => {


  try {
    const { userId } = req.params;
    const { code } = req.body;

    
  
    const user = await User.findById(userId);

 
    if (!user) {
      return res.status(400).json({
        msg: 'User not found',
      });
    }
 
    if(user.verificationCode !== code.toString()) {
      return res.status(400).json({
        msg: 'Code is incorrect',
      });
    }
   
    user.status = true;

    user.verificationCode = undefined;
    await user.save();
    

    const token = await generateJWT( user._id );

    res.status(201).json({
      ok: true,
      token,
    });

  } catch (error) {

    res.status(400).json({
      msg: 'Something went wrong',
    });
  }
    
}



module.exports = {
  login,
  register,
  googleSignIn,
  verifyAccount
};
