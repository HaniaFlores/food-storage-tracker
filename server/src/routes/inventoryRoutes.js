import express from 'express';

import InventoryItem
  from '../models/InventoryItem.js';

import {
  requireAuth,
} from '../middleware/authMiddleware.js';

const router =
  express.Router();

router.use(requireAuth);

/* GET USER INVENTORY */

router.get(
  '/',
  async (req, res) => {
    try {
      const items =
        await InventoryItem
          .find({
            user:
              req.userId,
          })
          .sort({
            expirationDate: 1,
          });

      res.json({
        items,
      });
    } catch (error) {
      res.status(500).json({
        message:
          'Could not load inventory.',
      });
    }
  }
);

/* ADD ITEM */

router.post(
  '/',
  async (req, res) => {
    try {
      const {
        name,
        quantity,
        category,
        expirationDate,
      } = req.body;

      const item =
        await InventoryItem.create({
          user:
            req.userId,

          name,

          quantity,

          category,

          expirationDate,
        });

      res.status(201).json({
        item,
      });
    } catch (error) {
      console.error(error);

      res.status(400).json({
        message:
          'Could not create inventory item.',
      });
    }
  }
);

/* UPDATE ITEM */

router.put(
  '/:id',
  async (req, res) => {
    try {
      const {
        name,
        quantity,
        category,
        expirationDate,
      } = req.body;

      const item =
        await InventoryItem
          .findOneAndUpdate(
            {
              _id:
                req.params.id,

              user:
                req.userId,
            },
            {
              name,
              quantity,
              category,
              expirationDate,
            },
            {
              new: true,
              runValidators: true,
            }
          );

      if (!item) {
        return res
          .status(404)
          .json({
            message:
              'Item not found.',
          });
      }

      res.json({
        item,
      });
    } catch (error) {
      console.error(error);

      res.status(400).json({
        message:
          'Could not update item.',
      });
    }
  }
);

/* DELETE ITEM */

router.delete(
  '/:id',
  async (req, res) => {
    try {
      const item =
        await InventoryItem
          .findOneAndDelete({
            _id:
              req.params.id,

            user:
              req.userId,
          });

      if (!item) {
        return res
          .status(404)
          .json({
            message:
              'Item not found.',
          });
      }

      res.json({
        message:
          'Item removed.',
      });
    } catch (error) {
      res.status(500).json({
        message:
          'Could not remove item.',
      });
    }
  }
);

export default router;