const router = require("express").Router();
const jwt = require("../Middleware/jwt");
const sessionDB = require("../Database/active-user");
const logout = (req, res, next) => {
  let authToken = req.header("auth-token");
  console.log("token: ", authToken);
  let openjwt = jwt.Verify(authToken, process.env.AUTHTOKEN);
  console.log("Opened JWT: ", openjwt);
  res.locals.sessionDoc = { IP: openjwt.IP, auth_token: authToken };
  next();
};
const deleteSession = async (req, res, next) => {
  try {
    await sessionDB.DeleteSession(
      res.locals.sessionDoc.auth_token,
      res.locals.sessionDoc.IP
    );
    console.log("Delete Session query performed");
    res.status(200).json({ response: "Session terminated" });
  } catch (e) {
    console.error(
      "Delete session query could not be performed!",
      "m\n error: ",
      e
    );
    res.status(500).json({ response: "Session could not be terminated" });
  }
};
router.delete("/", logout, deleteSession);

module.exports = router;
