import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
    const token = req.cookies[process.env.JWT_NAME];
    if (!token) return res.sendStatus(401);
    const user = jwt.verify(token, process.env.JWT_SECRET);

    if (!user) {
        res.clearCookie(process.env.JWT_NAME);
        return res.sendStatus(401);
    }

    const {username, id} = user;

    req.user = {
        username,
        id,
    };
    next();
}

export default authMiddleware;