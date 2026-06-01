import { CatModel } from '.././models/categories.model.js';

export const catServices = {
	create: async (cat) => {
		console.log(cat);
		try {
			const newCat = new CatModel(cat);
			await newCat.save();
			return newCat;
		} catch (error) {
			throw new Error(`Service Error: ${error.message}`);
		}
	},
	
	getAll: async () => {
		try {
			const categories = await CatModel.find().sort({ createdAt: -1 });
			return categories;
		} catch (error) {
			throw new Error(`Service Error: ${error.message}`);
		}
	},
	
	getById: async (id) => {
		try {
			const category = await CatModel.findById(id);
			if (!category) {
				throw new Error('Category not found');
			}
			return category;
		} catch (error) {
			throw new Error(`Service Error: ${error.message}`);
		}
	},
	
	update: async (id, updateData) => {
		try {
			const category = await CatModel.findByIdAndUpdate(
				id,
				updateData,
				{ new: true, runValidators: true }
			);
			if (!category) {
				throw new Error('Category not found');
			}
			return category;
		} catch (error) {
			throw new Error(`Service Error: ${error.message}`);
		}
	},
	
	delete: async (id) => {
		try {
			const category = await CatModel.findByIdAndDelete(id);
			if (!category) {
				throw new Error('Category not found');
			}
			return category;
		} catch (error) {
			throw new Error(`Service Error: ${error.message}`);
		}
	}
};