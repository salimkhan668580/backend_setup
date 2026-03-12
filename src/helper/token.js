import jwt from "jsonwebtoken";
export const generateToken=(data)=>{
  return jwt.sign({
    exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 7),
    data: data
  }, process.env.JWT_SECRET);
}


export const verifyToken=(token)=>{
  return jwt.verify(token, process.env.JWT_SECRET);
}
