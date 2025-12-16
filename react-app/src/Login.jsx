import { useState } from "react";

function Login() {
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [color, setColor] = useState("");

  function checkPassword(value) {
    setPassword(value);

    if (value.length < 6) {
      setMessage("Too Short");
      setColor("red");
    } else if (!/[0-9]/.test(value)) {
      setMessage("Add a number");
      setColor("orange");
    } else {
      setMessage("Strong Password");
      setColor("green");
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.box}>
        <h2>Login</h2>

        <input type="email" placeholder="Email" style={styles.input} />

        <input
          type="password"
          placeholder="Password"
          style={styles.input}
          value={password}
          onChange={(e) => checkPassword(e.target.value)}
        />

        <p style={{ color }}>{message}</p>

        <button style={styles.button}>Login</button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    background: "#0f172a",
    width: "100vw" ,
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

  },
  box: {
    boxsizing: "border-box",
    background: "#1e293b",
    padding: "30px",
    borderRadius: "10px",
    height: "500px",
    width: "400px",
    color: "white",
    textAlign: "center",
  },
   h2: {
    marginbottom: "200px",
    padding: "20px",
    textdecoration: "solid",
  },
  input: {
    width: "100%",
    padding: "20px",
    margin: "10px 0",
    borderRadius: "5px",
    border: "none",
  },
  button: {
    width: "100%",
    padding: "20px",
    background: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    textdecoration: "solid",
  },
};

export default Login;