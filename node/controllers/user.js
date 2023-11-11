const generator = require('generate-password');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const configToken = require('../conf/token');
const transporter = require('../conf/nodemailer')
const env = require('../env')

const usersForgotPassword = []

module.exports = {
  register: async (req, res, next) => {
    //kiểm tra xem username cótonf tại hay chưa
    const exist = await User.findOne({ email: req.query.email });
    if (exist) return res.status(422).json({ message: 'Email is exist' });
    const hashPassword = await bcrypt.hash(req.query.password, 12);

    const user = new User({
      ...req.query,
      hashPassword,
      role: 'client'
    });

    try {
      await user.save();
      res.status(200).json({ message: 'oke' });
    } catch (err) {
      res.status(400).json(err);
    }

  },
  allUsers: async (req, res, next) => {
    try {
      const users = await User.find({})
      res.status(200).json(users)
    } catch (err) {
      res.status(404).json(err)
    }
  },
  collectUsers: async (req, res, next) => {
    try {
      const users = await User.find({})
      res.status(200).json(users)
    } catch (err) {
      res.status(404).json(err)
    }
  },
  // tao them
  signin: async (req, res, next) => {
    console.log(req.query);
    try {
      const user = await User.findOne({ email: req.query.email });
      if (!user) return res.status(422).json({ message: 'Email or Password is not correct' });

      const checkPassword = await bcrypt.compare(req.query.password, user.hashPassword);

      if (!checkPassword) return res.status(422).json({ message: 'Email or Password is not correct' });

      const token = jwt.sign({ _id: user._id, name: user.fullname, role: user.role }, configToken.secret, { expiresIn: 60 * 60 * 24 });

      res.status(200).json({ token, id: user._id, fullname: user.fullname });
    } catch (err) {
      res.status(404).json({ message: err.message })
    }
  },
  signinAdmin: async (req, res, next) => {

    try {
      const user = await User.findOne({ email: req.query.email });
      if (!user) return res.status(422).json({ message: 'Email or Password is not correct' });
      if (user.role === 'client') {
        return res.status(403).json({ message: 'Email or Password is not correct' })
      }
      const checkPassword = await bcrypt.compare(req.query.password, user.hashPassword);

      if (!checkPassword) return res.status(422).json({ message: 'Email or Password is not correct' });

      const token = jwt.sign({ _id: user._id, name: user.fullname, role: user.role }, configToken.secret, { expiresIn: 60 * 60 * 24 });

      res.status(200).json({ token, id: user._id, fullname: user.fullname, role: user.role });
    } catch (err) {
      res.status(404).json({ message: err.message })
    }
  },


  editUser: async (req, res, next) => {

    try {
      const user = await User.findOne({ email: req.query.email });
      if (!user) return res.status(422).json({ message: 'Email or Password is not correct' });
      if (user.role === 'client') {
        return res.status(403).json({ message: 'Email or Password is not correct' })
      }
      const checkPassword = await bcrypt.compare(req.query.password, user.hashPassword);

      if (!checkPassword) return res.status(422).json({ message: 'Email or Password is not correct' });

      const token = jwt.sign({ _id: user._id, name: user.fullname, role: user.role }, configToken.secret, { expiresIn: 60 * 60 * 24 });

      res.status(200).json({ token, id: user._id, fullname: user.fullname });
    } catch (err) {
      res.status(404).json({ message: err.message })
    }
  },
  detailUser: async (req, res, next) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) return res.status(422).json({ message: 'Has not User' });

      res.status(200).json(user);
    } catch (err) {
      res.status(404).json({ message: err.message })
    }
  },
  changePassword: async (req, res, next) => {
    try {
      const { idUser, currentPassword, newPassWord } = req.query

      const user = await User.findById(idUser);
      if (!user) return res.status(422).json({ message: 'This user does not exist' });

      const checkPassword = await bcrypt.compare(currentPassword, user.hashPassword);

      if (!checkPassword) return res.status(422).json({ message: 'Password incorrect' });

      if (newPassWord.length < 8) {
        return res.status(422).json({ message: 'Please enter your new password atleast 8 degit' });
      }
      const hashPassword = await bcrypt.hash(newPassWord, 12);
      user.password = newPassWord
      user.hashPassword = hashPassword
      await user.save()
      res.status(200).json({ status: 'oke' });
    } catch (err) {
      res.status(404).json({ message: err.message })
    }
  },
  forgotPassword: async (req, res, next) => {
    try {
      if (!validateEmail(req.query.email)) {
        return res.status(400).json({ message: 'Please enter your email' });
      }

      const user = await User.findOne({ email: req.query.email })
      if (!user) {
        return res.status(400).json({ message: 'Can\'t found any account from this email' });
      }

      usersForgotPassword.push(user._id.toString())

      const mainOptions = {
        to: req.query.email,
        from: env.USER_NODEMAILER,
        subject: 'Confirm change password',
        html: `
        <p> Click reset password to get new password </p>
        <a href=https://nodejs-assign3.onrender.com/users/reset-password/${user._id}>Reset password</a>
      ` 
      }
      transporter.sendMail(mainOptions, async function (err) {
        if (err) {
          throw new Error(err)
        }
      })
      res.status(200).json({ status: 'oke' });

      setTimeout(() => {
        const i = usersForgotPassword.findIndex(id => id === user._id.toString())
        if (i !== -1) {
          usersForgotPassword.splice(i, 1)
        }
      }, 300000)

    } catch (err) {
      res.status(404).json({ message: err.message })
    }
  },
  resetPassword: async (req, res, next) => {
    try {
      const { id } = req.params
      const user = await User.findById(id)

      const check = usersForgotPassword.includes(id)
      if (!check) {
        throw new Error()
      }

      const newpassword = generator.generate({
        length: 10,
        numbers: true
      });

      const mainOptions = {
        to: user.email,
        from: env.USER_NODEMAILER,
        subject: 'New password',
        html: `
        <p>New password is: <b>${newpassword}</b> </p>
      `
      }

      transporter.sendMail(mainOptions, async function (err) {
        if (err) {
          throw new Error(err)
        } else {
          const hashPassword = await bcrypt.hash(newpassword, 12);
          user.password = newpassword
          user.hashPassword = hashPassword
          await user.save()

          const i = usersForgotPassword.findIndex(id1 => id1 === id)
          if (i !== -1) {
            usersForgotPassword.splice(i, 1)
          }
          res.status(200).send('Check new password in your email')
        }
      })

    } catch (err) {
      next(err)
    }
  },
}

function validateEmail(email) {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

