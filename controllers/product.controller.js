const Products = require("../Models/Products");

// add data
module.exports.addProducts = async (req, res) => {
    try {
        const { name, description, price, quantity, category } = req.body;

        const products = new Products({
            name, description, price, quantity, category
        });
        const savedProducts = await products.save();
        let message = "Products saved successfully";
        res.json({savedProducts,message});
        console.log(message);
    } catch (error) {
        
        res.status(500).send("internal server error");
    }
}
// update data
module.exports.updateProducts = async (req, res) => {
    const { name, description, price, quantity, category } = req.body;
    try {
        const newProducts = {};
        if (name) {
            newProducts.name = name;
        }

        if (description) {
            newProducts.description = description;
        }

        if (price) {
            newProducts.price = price;
        }
        if (quantity) {
            newProducts.quantity = quantity;
        }
        if (category) {
            newProducts.category = category;
        }
        //    find note by id
        let Result = await Products.findOne(req.id);
        // console.log(note);
        if (!Result) {
            return res.status(404).send("not found data");
        }

        Result = await Products.findOneAndUpdate(req.id, { $set: newProducts }, { new: true });
        let message = "Products update successfully";
        res.json({ Result,message });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("internal server error");
    }

};
// read data
module.exports.fetchSingleProduct = async (req, res) => {
    try {
        const products = await Products.findOne(req.id);
        let message = "Product found with requested id";
        res.json({products,message});
    } catch (error) {
        console.error(error.message);
        res.status(500).send("internal server error occurred");
    }
}
// get all the notes and find product by name
module.exports.findRequestparams = async (req, res) => {

    const { name } = req.query;
    if (name) {

        try {
            const products = await Products.find({ name: { $regex: name } });
            let message = "Product found with requested params";
            res.json({products,message});
        } catch (error) {
            // console.error(error.message);
            res.status(500).send("internal server error occurred");
        }
    } else {
        const result = await Products.find()
        res.json(result);
    }

}
// // delete data
module.exports.deleteSingleProduct = async (req, res) => {
   
    try {


        let Result = await Products.deleteOne(req.id);
        let message = "Product Deleted successfully";
        res.json({ Result,message });
       
    } catch (error) {
        console.error(error.message);
        res.status(500).send("internal server error");
    }

};
// // delete all data
module.exports.deleteAllProducts = async (req, res) => {

    try {

        const Result = await Products.deleteMany();
        // res.json(notes);
        res.json({ message: "All Products deleted successfully",Result })

    } catch (error) {
        console.error(error.message);
        res.status(500).send("internal server error");
    }

};




