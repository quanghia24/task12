import HttpException from "./http-exception.js";

class UserNotFoundException extends HttpException {
  constructor(_id: string) {
    super(404, `User with id ${_id} not found`);
  }
}

export default UserNotFoundException;
