import app from "./app.js";
import { config } from "dotenv";

config()

const pwd = process.env.PASSWORD
const port = process.env.PORT
const usr = process.env.USERNAMEDB

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });

console.log({
    USER: usr,
    PASSWORD: pwd,
    PORT: pwd
})