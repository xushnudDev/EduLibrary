import categoryModel from "./model/category.model.js";
import { isValidObjectId } from "mongoose"; 

class CategoryService {
    #_categoryModel;
    constructor() {
        this.#_categoryModel = categoryModel;
    };
    getAllCategories = async () => {
        const categories = await this.#_categoryModel.find().populate("books");
        if (!categories) {
            throw new Error("Categories not found");
        }
        return {
            message: "success",
            count: categories.length,
            data: categories,
        };
    };
    getCategoryById = async (id) => {
        if (!isValidObjectId(id)) {
            throw new Error("Invalid category id");
        }
        const category = await this.#_categoryModel.findById(id).populate("books");
        if (!category) {
            throw new Error("Category not found");
        }
        return {
            message: "success",
            data: category,
        };
    };
    createCategory = async ({ name }) => {
        const existingCategory = await this.#_categoryModel.findOne({ name });
        if (existingCategory) {
            throw new Error("Category already exists");
        }
        const newCategory = await this.#_categoryModel.create({
            name,
        });
        return {
            message: "success",
            data: newCategory,
        };
    };
    updateCategory = async (id, {name}) => {
        if (!isValidObjectId(id)) {
            throw new Error("Invalid category id");
        }
        const updatedCategory = await this.#_categoryModel.findByIdAndUpdate(
            id,
            {
                name,
            },
            { new: true }
        );
        if (!updatedCategory) {
            throw new Error("Category not found");
        }
        return {
            message: "success",
            data: updatedCategory,
        };
    };
    deleteCategory = async (id) => {
        if (!isValidObjectId(id)) {
            throw new Error("Invalid category id");
        }
        const category = await this.#_categoryModel.findById(id);
        if (!category) {
            throw new Error("Category not found");
        };
        await this.#_categoryModel.findByIdAndDelete(id);
        return {
            message: "success",
            data: category,
        };

    }
};

export default new CategoryService();