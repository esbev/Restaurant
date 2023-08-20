const router = require('express').Router()
const { Order } = require('../../models')

router.post('/', async(req,res) =>{
    try {
        console.log("Putting in the order")
        console.log(req.body)
        const newOrder = await Order.create ({
            ...req.body,
            user_id: req.session.user_id
        })
        res.status(200).json(newOrder)
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
})

router.delete('/:id', async (req, res) => {
    try {
      const orderData = await Order.destroy({
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        },
      });
  
      if (!orderData) {
        res.status(404).json({ message: 'No order was found with this id!' });
        return;
      }
  
      res.status(200).json(orderData);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  router.get("/:id", async (req, res) => {
    try {
      const orderData = await Order.findByPk(req.params.id)
      return res.json(orderData)
    } catch (err) {
      console.log(err)
      res.status(500).json(err)
    }
  });

  router.get("/", async (req, res) => {
    try {
      const orderData = await Order.findAll()
      return res.json(orderData)
    } catch (err) {
      console.log(err)
      res.status(500).json(err)
    }
  });


  module.exports = router;