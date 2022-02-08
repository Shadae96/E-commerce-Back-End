const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try{
    const tagData = await Tag.findALL({
      include: [{model:Product}]
    });
    res.status(200).json(tagData);
  } catch(err){
    res.status(500).json(err)
  }

});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try{
    const tagData = await Tag.findByPk(req.params.id,{
      include: [{model: Product }],
    });
    if (!tagData) {
      res.status(404).json({ message: 'No id found'});
      return
    }
      res.status(200).json(tagData);
    } catch(err){
      res.status(500).json(err);
    }
  });

router.post('/', (req, res) => {
  // create a new tag
  try{
    const tagData = await Tag.create(req.body);
    res.status(200).json(tagData);
} catch (err){
  res.status(400).json(err);
}
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  try{
    const tagData = await Category.update(req.body, {
      where:{ id:req.params.id,
      }
    });
    if(!tagData){
      res.status(404).json({message: 'Cannot find a tag with this id'});
    }
    res.status(200).json (tagData);
  } catch(err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  try {const tagData = await Tag.destroy({
    where:{
      id: req.params.id
    }
  });

  if (!tagData){
    res.status(404).json({ message: 'No  id found!' });
    return;
  }
  res.status(200).json(tagData);

} 
catch (err) {
  res.status(500).json(err);
}

});

module.exports = router;
