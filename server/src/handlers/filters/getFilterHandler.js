const getCategoriesController = require('../../controllers/categories/getCategoriesController');
const filterCategoryController = require('../../controllers/filters/filterCategoryController')
const orderingPriceController = require('../../controllers/filters/orderingPriceController')
const getProductsAllController = require('../../controllers/products/getProductsAllController');
const filterSubCategoryController = require('../../controllers/subcategories/filterSubCategoryController');
const getSubCategoriesController = require('../../controllers/subcategories/getSubCategoriesController');

const getFilterHandler = async (req, res) => {
  const {category, subcategory, price} = req.params;

  
  try {
    //+ CATEGORY
    const listOfCategories = await getCategoriesController()
    
    const availableCategories = listOfCategories.map(cat => cat.name);

    if (!availableCategories.includes(category) && category !== "default") {
      // Si la categoría no está disponible, envía un error
      return res.status(400).json({ 
        error: `La categoría solicitada ${category} no está disponible.` 
      });
    }
    let results = category !== "default" ? await filterCategoryController(category) : await getProductsAllController(); 

    //+ SUBCATEGORY
    const listOfSubCategories = await getSubCategoriesController();
    
    const availableSubCategories = listOfSubCategories.map(Scat => Scat.name);

    if (!availableSubCategories.includes(subcategory) && subcategory !== "default") {
      // Si la subcategoría no está disponible, envía un error
      return res.status(400).json({ 
        error: `La subcategoría solicitada ${subcategory} no está disponible.` 
      });
    }

    if (subcategory !== "default") {
      results = await filterSubCategoryController(results, subcategory);
    }

    //+ PRICE
    const availablePrices = ["asc", "desc"]

    if (!availablePrices.includes(price) && price !== "default") {
      // Si la subcategoría no está disponible, envía un error
      return res.status(400).json({ 
        error: `El ordenamiento solicitado ${price} no está disponible.` 
      });
    }
    // Aplicar el filtro de precio si se especifica y si hay resultados previos
    if (price !== "default" && results) {
      results = orderingPriceController(results, price);
    }
    // Responder con los resultados filtrados
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({error: error.message});
  }
}

module.exports = getFilterHandler;