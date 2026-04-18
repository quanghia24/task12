import express from "express";
import { BaseController } from "./abstractions/base-controller.js";
import { UsersRepository } from "../database/users-repository.js";
import type { User } from "../types/types.js";
import HttpException from "../exceptions/http-exception.js";

/*
  UsersController handle http request comming to /users

  GET  /users: get users account base on query parameter name
  POST /users: update users account base on User objects
*/
export default class UsersController extends BaseController {
  public path = "/users";
  private usersRepository: UsersRepository;

  constructor(usersRepository: UsersRepository) {
    super();
    this.usersRepository = usersRepository;
    this.initializeRoutes();
  }

  public initializeRoutes() {
    this.router.get(this.path, this.getUsers);
    this.router.post(this.path, this.updateUsers);
  }

  getUsers = async (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const { name } = request.query;

      const users =
        typeof name === "string" && name.trim() !== ""
          ? await this.usersRepository.searchByQuery(name.trim())
          : await this.usersRepository.getAll();

      response.status(200).json(users);
    } catch (err) {
      next(new HttpException(500, err as string));
    }
  };

  updateUsers = async (
    request: express.Request,
    response: express.Response
  ) => {
    try {
      const body: Partial<User>[]= request.body;

      if (!Array.isArray(body) || body.length === 0) {
        response
          .status(400)
          .json({ message: "Body must be a non-empty array of user updates." });
        return;
      }

      // TODO: validate each item in the array if record exist?
      // if not exist, return error

      const result = await this.usersRepository.updateInBatch(body);
      response.status(200).json(result);
    } catch (error) {
      console.error("updateUsers error:", error);
      response.status(500).json({ message: "Internal server error" });
    }
  };
}
