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
      const {user,accessToken,refreshToken} = await userService.loginUser(req.body);
      res.cookie("accessToken",accessToken,{
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 1000 * 60 * 60,
      });
      res.cookie("refreshToken",refreshToken,{
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 1000 * 60 * 60 * 24 * 1,
      });
      res.status(200).send({
        message: "success",
        data: user,
      });
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
