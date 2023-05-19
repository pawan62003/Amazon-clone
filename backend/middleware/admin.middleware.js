const jwt = require("jsonwebtoken");

const admin_middleware = (req, res, next) => {
  const url = req.url;
  const {token} = req.headers
  if (url.includes("admin")) {
    if (!token) {
      return res.status(401).send({ error: "token is missing" });
    }
    try {
      const decoded = jwt.verify(token, "solo_project");
      if (!decoded) {
        return res.status(401).send({ error: "Unauthorized" });
      }
      if(decoded){
        req.body.adminID = decoded.adminID;
      }
      //relationship form here

      next();
    } catch (error) {
      res.status(401).send({ error: "Unauthorized" });
    }
  }
  else{
    next();
  }
};

module.exports = { admin_middleware };
