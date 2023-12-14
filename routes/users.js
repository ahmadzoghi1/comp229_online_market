var express = require('express');
var router = express.Router();
const { findRequestparams, addProducts, updateProducts, fetchSingleProduct, deleteAllProducts, deleteSingleProduct } = require('../controllers/product.controller');

/* GET users listing. */
router.route("/").get(findRequestparams);

// will add products 
router.route("/").post(addProducts);
/* UPDATE update listing. */

router.route("/:id").put(updateProducts);


// fetch single products
router.route("/:id").get(fetchSingleProduct);
// delete all products
router.route("/").delete(deleteAllProducts);
// delete single products
router.route("/:id").delete(deleteSingleProduct);

module.exports = router;
