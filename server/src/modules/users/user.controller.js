import userService from "./user.service.js";

class UserController {
  getAllUsers = async (req, res, next) => {
    try {
      const data = await userService.getAllUsers();
      res.status(200).send(data);
    } catch (error) {
      next(error);
    }
  };
  getUserById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const data = await userService.getUserById(id);
      res.status(200).send(data);
    } catch (error) {
      next(error);
    }
  };

  registerUser = async (req, res, next) => {
    try {
      const data = await userService.registerUser(req.body);
      res.status(201).send(data);
    } catch (error) {
      next(error);
    }
  };
  loginUser = async (req, res, next) => {
    try {
      const data = await userService.loginUser(req.body);
      res.status(200).send(data);
    } catch (error) {
      next(error);
    }
  };
  updateUser = async (req, res, next) => {
    try {
      const { id } = req.params;
      const data = await userService.updateUser(id, req.body);
      res.status(200).send(data);
    } catch (error) {
      next(error);
    }
  };
  deleteUser = async (req, res, next) => {
    try {
      const { id } = req.params;
      await userService.deleteUser(id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  };
}
export default new UserController();
