const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
    let token;

    // Authorization header'ında "Bearer" ile başlayan bir token olup olmadığını kontrol eder
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            // Token'ı "Bearer" kelimesinden ayırarak alır
            token = req.headers.authorization.split(" ")[1];

            // Token'ı çözerek (decode) kullanıcı kimliğini alır
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Kullanıcıyı veritabanında bulur ve şifre alanı hariç diğer bilgileri req.user'a ekler
            req.user = await User.findById(decoded.id).select("-password");

            // Ek bilgileri req.user'a ekler
            req.user.email = decoded.email;
            req.user.name = decoded.name;
            req.user.username = decoded.username;

            // Middleware zincirinde bir sonraki fonksiyona geçer
            next();
        } catch (error) {
            console.error(error);
            res.status(401).json({ message: "Not authorized, token failed" });
        }
    }

    // Eğer token yoksa, yetkisiz erişim hatası döner
    if (!token) {
        res.status(401).json({ message: "Not authorized, no token" });
    }
};

module.exports = { protect };
