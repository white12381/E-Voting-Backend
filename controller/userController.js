import userModel from "../model/userModel.js";
import jwt from "jsonwebtoken"
const CreateToken = (id) => {
    return jwt.sign({ id }, process.env.SECRET, { expiresIn: '3days' });
}

export const register = async (req, res) => {
    const data = req.body;
    try {
        const user = await userModel.registerAccount(data);
        let
            token = CreateToken(user._id);
        res.status(200).json({ user, token });
    } catch (error) {
        res.status(400).json({ error: error.message });
        console.log(error.message);
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await userModel.login(email, password);
        let token = CreateToken(user._id);

        res.status(200).json({ user, token });
    } catch (error) {
        res.status(400).json({ error: error.message });
        console.log(error.message)
    }
}



export const getUser = async (req, res) => {
    const id = req.params.id;
    console.log('id', id)
    try {
        const user = await userModel.getUser(id);
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
        console.log(error.message)
    }
}

export const deleteUserAccount = async (req, res) => {
    const id = req.params.id;
    try {
        const deleteAccount = await userModel.deleteUserAccount(id);
        res.status(200).json({ deletedUser: deleteAccount, "message": "User account deleted" });
    } catch (error) {
        res.status(400).json({ error: error.message });
        console.log(error.message);
    }
}

export const changePassword = async (req, res) => {
    const datas = req.body;
    const token = req.query.token;
    const id = req.params.id;
    try {
        const user = await userModel.changePassword(datas, id, token);
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
        console.log(error.message);
    }
}

export const getUserByEmail = async (req, res) => {
    const email = req.params.email; 
    try {
        const user = await userModel.getUserByEmail(email);
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
        console.log(error.message)
    }
}
export const forgotPassword = async (req, res) => {
    const email = req.body.email;
    const url = req.body.url;
    try {
        const user = await userModel.forgotPassword(email, url);
        res.status(200).json({ response: `Please check your mail to continue` });
    } catch (error) {
        if (error.message === 'Error: getaddrinfo ENOTFOUND api.nodemailer.com') {
            error.message = 'Network error/unavailable';
        }
        res.status(400).json({ error: error.message });
        console.log(error.message);
    }
}