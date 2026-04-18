import { Db } from "mongodb";

export abstract class BaseRepository {
  protected readonly db: Db;

  constructor(db: Db) {
    this.db = db;
  }
}