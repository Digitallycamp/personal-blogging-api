import { CatModel } from '.././models/categories.model.js';
export const catServices = {
	create: async (cat) => {
		console.log(cat);
		try {
			const newCat = new CatModel(cat);
			await newCat.save();

			return newCat;
		} catch (error) {
			throw new Error(`Service Error`, error.message);
		}
	},
};
