const Client = require("ssh2").Client;
const fs = require("fs");
const path = require("path");

class SSHService {
  constructor() {
    this.conn = new Client();
  }
  writeConfig(environment, data) {
    try {
      const configFilePath = path.join(__dirname, "../config.json");

      // Read existing config file
      let configData;
      try {
        configData = fs.readFileSync(configFilePath, "utf8");
      } catch (readError) {
        if (readError.code === "ENOENT") {
          // File doesn't exist, create an empty object
          configData = "{}";
        } else {
          throw readError;
        }
      }

      let config;
      try {
        // Parse existing config data
        config = JSON.parse(configData);
      } catch (parseError) {
        // Handle JSON parse error (e.g., unexpected end of JSON input)
        console.error(
          `Error parsing existing config data: ${parseError.message}`
        );
        console.log("Creating a new config object.");
        config = {};
      }

      // Add or overwrite the configuration for the specified environment
      config[environment] = data;

      // Write the updated config back to the file
      fs.writeFileSync(configFilePath, JSON.stringify(config, null, 2), "utf8");

      console.log("Config written successfully");
    } catch (error) {
      console.error("Error writing config:", error.message);
      throw error;
    }
  }

  getServerConfig(environment) {
    // Read configuration from file
    const configFilePath = path.join(__dirname, "../config.json");
    const configData = fs.readFileSync(configFilePath, "utf8");
    const config = JSON.parse(configData);

    // Return the corresponding configuration based on the environment
    return config[environment];
  }

  connect(config) {
    return new Promise((resolve, reject) => {
      this.conn.on("ready", () => {
        console.log("Connected to the remote server via SSH");
        resolve();
      });

      this.conn.on("error", (err) => {
        reject(err);
      });

      this.conn.connect(config);
    });
  }

  executeCommand(command) {
    return new Promise((resolve, reject) => {
      this.conn.exec(command, (err, stream) => {
        if (err) {
          reject(err);
          return;
        }

        let result = "";
        stream.on("data", (data) => {
          result += data.toString();
        });

        stream.on("end", () => {
          resolve(result);
        });

        stream.on("close", (code) => {
          if (code !== 0) {
            reject(`Command exited with code ${code}`);
          }
        });
      });
    });
  }

  parseCommandOutput(output) {
    const lines = output.split("\n");
    const parsedData = [];

    for (const line of lines) {
      const trimmedLine = line.trim();
      if (trimmedLine) {
        parsedData.push(trimmedLine.split(/\s+/));
      }
    }

    return parsedData;
  }
  generateCommand(comm, commobj, formData) {
    const commandParts = [];

    for (const key in formData) {
      if (key in commobj && formData[key] !== "") {
        const value = formData[key];
        const formattedValue = typeof value === "string" ? `"${value}"` : value;
        commandParts.push(`${commobj[key]} ${formattedValue}`);
      }
    }

    const command = `${comm} ${commandParts.join(" ")}`;
    return command;
  }

  closeConnection() {
    this.conn.end();
  }
}

module.exports = SSHService;
