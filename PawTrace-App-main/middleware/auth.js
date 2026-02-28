const jwt = require("jsonwebtoken")

module.exports = function (req, res, next) {
  const token = req.header("Authorization")

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" })
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET)
    // Normalize token payload to always expose `req.user.id`
    req.user = {
      id: verified.userId || verified.id || (verified.user && verified.user.id)
    }
    next()
  } catch (err) {
    res.status(400).json({ message: "Invalid token" })
  }
}