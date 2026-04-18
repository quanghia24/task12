import { Db, ObjectId } from "mongodb";
import type { BulkWriteResult } from "mongodb";
import { BaseRepository } from "./abstractions/base-repository.js";
import type { User } from "../types/types.js";

/*
  UsersRepository handler database operation for users collection
*/
export class UsersRepository extends BaseRepository {
  private readonly COLLECTION = "users";

  constructor(db: Db) {
    super(db);
  }

  async getAll(): Promise<User[]> {
    return this.db
      .collection<User>(this.COLLECTION)
      .find({})
      .toArray();
  }

  async searchByQuery(query: string): Promise<User[]> {
    const regex = { $regex: query, $options: "i" };
    return this.db
      .collection<User>(this.COLLECTION)
      .find({ $or: [{ username: regex }, { email: regex }] })
      .toArray();
  }

  async updateInBatch(updates: Partial<User>[]): Promise<BulkWriteResult> {
    if (updates.length === 0) {
      throw new Error("Updates array must not be empty");
    }

    const operations = updates.map(({ _id, ...fields }) => ({
      updateOne: {
        filter: { _id: new ObjectId(_id) },
        update: { $set: fields },
        upsert: false,
      },
    }));

    return this.db
      .collection<User>(this.COLLECTION)
      .bulkWrite(operations, { ordered: false });
  }
}
