import "dotenv/config";
import "reflect-metadata";

import "./database";
import app from "./app";

app.listen(process.env.PORT || 3001, () => {
  console.log(`🚀 Server ready at port ${process.env.PORT || 3001}`);
});