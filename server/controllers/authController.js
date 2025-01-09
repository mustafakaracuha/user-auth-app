const User = require("../models/User");
const jwt = require("jsonwebtoken");

const generateToken = (user) => {
    return jwt.sign({ id: user._id, email: user.email, name: user.name, username: user.username }, process.env.JWT_SECRET, {
        expiresIn: "30d",
    });
};

// Kullanıcı kayıt işlemi
exports.registerUser = async (req, res) => {
    const { name, username, email, password } = req.body;
    const userExists = await User.findOne({ email });

    // Kullanıcının zaten var olup olmadığını kontrol eder
    if (userExists) {
        return res.status(400).json({ message: "User already exists" });
    }

    // Yeni kullanıcı oluşturur
    const user = await User.create({
        name,
        username,
        email,
        password,
    });

    // Kullanıcı başarıyla oluşturulursa, kullanıcı bilgilerini ve JWT token'ı döner
    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            username: user.username,
            email: user.email,
            message: "User created successfully",
            token: generateToken(user),
        });
    } else {
        res.status(400).json({ message: "Invalid user data" });
    }
};

// Kullanıcı kimlik doğrulama işlemi
exports.authUser = async (req, res) => {
    const { email, password } = req.body;

    // Kullanıcıyı email ile bulur
    const user = await User.findOne({ email });

    // Kullanıcı varsa ve şifre doğruysa, kullanıcı bilgilerini ve JWT token'ı döner
    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            username: user.username,
            email: user.email,
            message: "User logged in successfully, welcome back!",
            token: generateToken(user),
        });
    } else {
        res.status(401).json({ message: "Invalid email or password" });
    }
};

// Kullanıcı sayısını dönen fonksiyon
exports.getUserCount = async (req, res) => {
    try {
        const userCount = await User.countDocuments();
        res.json({ userCount });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// Tüm kullanıcıları çeken fonksiyon
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password");
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// Kullanıcının toplam süresini getiren fonksiyon
exports.getTotalTimeSpentUser = async (req, res) => {
    try {
        // Örnek olarak, tüm kullanıcıların toplam sürelerini hesaplayın
        const totalTimeSpent = await User.aggregate([
            { $group: { _id: null, totalTime: { $sum: "$timeSpent" } } }
        ]);
        res.status(200).json({ totalTimeSpent: totalTimeSpent[0].totalTime });
    } catch (error) {
        res.status(500).json({ message: "Toplam süre getirilemedi", error });
    }
};
