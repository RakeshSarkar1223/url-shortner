const AuthService = require("../service/auth.service");

const Register = async (req, res) => {
  try {
    const user = await AuthService.registerUser(req.body);
    res.status(201).json({
      status: "Registration Successful!",
      username: user.username,
      email: user.email,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const Login = async (req, res) => {
  try {
    // console.log(req.body);
    
    const { user, token } = await AuthService.loginUser(req.body);
    res.cookie("token", token, {
      httpOnly: true,
    //   secure: true,
      maxAge: 24*60*60 * 1000,
    });

    res.status(200).json({
      status: "Login Successful",
      username: user.username,
      email: user.email,
      token: token,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const Logout = async (req, res) => {
  try {
    const token = req.cookies?.token;
    if (!token) {
      throw new Error("Not LoggedIn!");
    }
    res.clearCookie("token", {
      httpOnly: true,
    //   secure: true,
    });

    res.status(200).json({"status":"Logout Successfully!"})
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


module.exports = {
    Register,
    Login,
    Logout
}