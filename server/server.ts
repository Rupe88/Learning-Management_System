import { app } from "./app";
import connectionDB from "./utils/connection";
require("dotenv").config();


app.listen(process.env.PORT, () => {
  console.log(`server is rinning on http://localhost:${process.env.PORT}`);
  connectionDB();
});
