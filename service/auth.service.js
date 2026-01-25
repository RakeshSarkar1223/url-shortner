// const mongoose = require("mongoose");
const User = require("../model/user");
const { hashPassword, comparePassword } = require("../utils/password");
const {generateToken, verifyToken} = require("../utils/jwt");

const registerUser = async (data) => {
  const { username, email, password } = data;
  const isUserExist = await User.findOne({ username });
  if (isUserExist) {
    throw new Error("Username or email taken!!");
  }
  const isEmailExist = await User.findOne({ email });
  if (isEmailExist) {
    throw new Error("Username or email taken!!");
  }

  const hashPass =await hashPassword(password);

  const user = new User({
    username: username,
    email: email,
    password: hashPass,
  });

  await user.save();

  return user;
};


const loginUser = async (data) => {
    const { email, password } = data;
    const user = await User.findOne({email});
    if(!user){
        throw new Error("Invalid email or password");
    }

    const isPasswordCorrect =await comparePassword(password, user.password);
    if(!isPasswordCorrect){
        throw new Error("Invalid email or password");
    }

    const token = await generateToken(user._id, user.username, user.email);
    return {user, token};
}


module.exports = {registerUser, loginUser}