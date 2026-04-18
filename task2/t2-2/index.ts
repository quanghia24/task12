import dotenv from "dotenv";
import App from "./app.js";
import UsersController from "./controllers/users-controller.js";
import { UsersRepository } from "./database/users-repository.js";
import { connectToDatabase } from "./database/mongo-client.js";

dotenv.config();

async function main() {
  const db = await connectToDatabase();
  const usersRepository = new UsersRepository(db);

  const port = process.env.PORT || 3000;
  const app = new App([new UsersController(usersRepository)], port);

  app.listen();
}

main();
