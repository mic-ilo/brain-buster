class UserModel {
  constructor(player) {
    this.player = player;
  }

  async addUser(user) {
    try {
      const response = await fetch("http://localhost:8888/user", {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json",
          // "Authorization": localStorage.getItem("token"),
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(user), // body data type must match "Content-Type" header
      });

      if (response.status === 401) {
        localStorage.removeItem("token");
        throw new Error("Unauthorized access");
      } else if (!response.ok) {
        throw new Error("Failed to add user"); // Change this error message
      }

      const data = await response.json();
      return data;
    } catch (err) {
      console.error(err);
      throw err; // Rethrow the error
    }
  }

  async login(username, password) {
    try {
      const user = {
        username: username,
        password: password,
      };
      const response = await fetch("http://localhost:8888/auth/login", {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(user), // body data type must match "Content-Type" header
      });

      if (response.ok) {
        const data = await response.text();
        return data;
      } else {
        throw new Error("Login failed");
      }
      // const data = await response.text();
      // return data;
    } catch (err) {
      throw new Error("Failed to login", err);
    }
  }

  async getUser(username) {
    try {
      const response = await fetch(
        `http://localhost:8888/user?username=${username}`,
        {
          method: "GET", // *GET, POST, PUT, DELETE, etc.
          mode: "cors", // no-cors, *cors, same-origin
          cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
          credentials: "same-origin", // include, *same-origin, omit
          headers: {
            "Content-Type": "application/json",
            // "Authorization": localStorage.getItem("token"),
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          redirect: "follow", // manual, *follow, error
          referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        }
      );

      if (!response.ok) {
        if (response.status === 404) {
          // User not found, return null
          return null;
        } else {
          // Handle other non-successful HTTP responses
          throw new Error(`Failed to fetch user: ${response.statusText}`);
        }
      }

      const contentType = response.headers.get("content-type");

      if (contentType && contentType.includes("application/json")) {
        const data = await response.json();
        return data;
      } else {
        throw new Error("Response does not contain JSON data");
      }
    } catch (err) {
      console.error("Error in getUser:", err);
      throw err;
    }
  }

  async updateUser(username, password, player) {
    try {
      const user = {
        username: username,
        password: password,
      };

      const response = await fetch(`http://localhost:8888/user/${player}`, {
        method: "PUT", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json",
          // "Authorization": localStorage.getItem("token"),
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(user), // body data type must match "Content-Type" header
      });
      if (response.ok) {
        const data = await response.text();
        return data;
      } else {
        throw new Error("failed to update user");
      }
    } catch (err) {
      throw new Error("failed to update user", err);
    }
  }

  async deleteUser(isActive, player) {
    try {
      const user = {
        isActive: isActive,
      };

      const response = await fetch(
        `http://localhost:8888/user/delete/${player}`,
        {
          method: "PUT", // *GET, POST, PUT, DELETE, etc.
          mode: "cors", // no-cors, *cors, same-origin
          cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
          credentials: "same-origin", // include, *same-origin, omit
          headers: {
            "Content-Type": "application/json",
            // "Authorization": localStorage.getItem("token"),
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          redirect: "follow", // manual, *follow, error
          referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
          body: JSON.stringify(user), // body data type must match "Content-Type" header
        }
      );
      if (response.ok) {
        const data = await response.text();
        return data;
      } else {
        throw new Error("failed to delete user");
      }
    } catch (err) {
      throw new Error("failed to delete user", err);
    }
  }
}

const model = new UserModel();
export default model;
