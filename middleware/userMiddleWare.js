import jwt from 'jsonwebtoken';
import userModel from '../model/userModel.js';

const UserMiddleWare = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "Request is not authorized" });
  }

  const token = authorization.split(" ")[1];
console.log('token', token);

  try {
    const {id} = jwt.verify(token, process.env.SECRET); 
    req.user = await userModel.findOne({ _id: id }).select('_id');
    next();
  } catch (err) {
    console.log(`jwt error message is ${err.message}`);
    res.status(401).json({ error: "Request is not authorized" });
  }
};

export default UserMiddleWare;
