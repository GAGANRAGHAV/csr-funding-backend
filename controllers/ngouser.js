import Ngo from "../models/ngo.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


const JWT_SECRET = 'your_jwt_secret_key';

export const registerngo = async (req, res) => {
  const { name, email, password } = req.body;

  const existingUser = await Ngo.findOne({ name });

  if (existingUser) {
    return res.status(400).json({ msg: "Ngo name already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newNgo = new Ngo({
    name,
    email,
    password: hashedPassword,
  });
  await newNgo.save();
  const token = jwt.sign({ userId: newNgo._id }, JWT_SECRET, {
    expiresIn: "1h",
  });
  res.status(201).json({ token });
};

export const loginngo =  async (req, res) => {
  const { username, password } = req.body;
  const user = await Ngo.findOne({ username });

  if (!user) {
    return res.status(400).send("Invalid Credentials");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(400).send("Invalid Credentials");
  }

  const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "1h" });

  res.status(200).json({ token});
};
