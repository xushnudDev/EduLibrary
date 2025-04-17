import categoryService from "./category.service.js";
import { isValidObjectId } from "mongoose";

class CategoryController {
  getAllCategories = async (req, res,next) => {
    try {
      const categories = await categoryService.getAllCategories();
      res.status(200).send({
        message: "success",
        data: categories,
      });
    } catch (error) {
        next(error);
    }
  };
  getCategoryById = async (req, res,next) => {
    try {
      const {id} = req.params;
      if (!isValidObjectId(id)) {
        throw new Error("Invalid category id");
      }
      const category = await categoryService.getCategoryById(id);
      res.status(200).send({
        message: "success",
        data: category,
      });
    } catch (error) {
        next(error);
    }
  };
  createCategory = async (req, res,next) => {
    try {
      const category = await categoryService.createCategory(req.body);
      res.status(201).send({
        message: "success",
        data: category,
      });
    } catch (error) {
        next(error);
    }
  };
  updateCategory = async (req, res,next) => {
    try {
      const { id } = req.params;  
      if (!isValidObjectId(id)) {
        throw new Error("Invalid category id");
      }
      const category = await categoryService.updateCategory(id, req.body);
      res.status(200).json(category);
    } catch (error) {
        next(error);
    }
  };
  deleteCategory = async (req, res,next) => {
    try {
      const { id } = req.params;
      if (!isValidObjectId(id)) {
        throw new Error("Invalid category id");
      }
      await categoryService.deleteCategory(id);
      res.status(204).send();
    } catch (error) {
        next(error);
    }
  };
};

export default new CategoryController();