const{User} = require ("../service/schemas/user.js")
const {
    createUser
  } = require("../service/index");
const createError = require('http-errors')

const register = async (req, res, next) => {
try {
          const {email, password, subscription} = req.body
  const user = await User.findOne({email});
  if (user ){
    const err = createError(409, "Email in use")
    throw err
  }
await createUser({email, password, subscription} )
res.json({
    status: "success",
    code: 201,
    user: {email, subscription} ,
  });
} catch (error) {
    next(error)
    
}



}