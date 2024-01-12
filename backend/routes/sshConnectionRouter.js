const express = require("express");
const router = express.Router();
const SSHService = require("../services/SSHService");
const service = new SSHService();

router.post("/config", async (req, res) => {
  const { env, host, port, username, password } = req.body;
  const config = { host, port, username, password };
  console.log(config);

  try {
    console.log("Received request:", req.body);

    service.writeConfig(env, config);

    console.log("Config added successfully");
    res.status(200).json({ message: "Config added successfully" });
  } catch (error) {
    console.error("Error writing config:", error.message);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
