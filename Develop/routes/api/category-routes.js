const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint
//gets all categories 
router.get('/', async (req, res) => {
  try {
    var categoryData = await Category.findAll({
      include: [{ model: Product}]
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//gets categories by id
router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    var categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product}]
    });
    if (!categoryData) {
      res.status(404).json({message: "No category found matching that ID"});
      return;
    }
    res.status(200).json(categoryData);
  } catch (error) {
    res.status(500).json(error);
  }
});

//creates categories
router.post('/', async (req, res) => {
  try {
    var newCategory = await Category.create(req.body);
    res.status(200).json(newCategory);
  } catch (error) {
    res.status(500).json(error);
  }
});

//updates categories
router.put('/:id', async (req, res) => {
  try {
    var updatedCategory = await Category.update(req.body, {
      where: {
        id: req.params.id
      }
    });
    res.status(200).json(updatedCategory);
  } catch (error) {
    res.status(500).json(error);
  }
});
//deletes categories
router.delete('/:id', async (req, res) => {
  try {
    var deleteCategory = await Category.destroy({
      where: {id: req.params.id}
    });
    res.status(200).json(deleteCategory);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;