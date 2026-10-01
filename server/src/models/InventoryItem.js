import mongoose from 'mongoose';

const inventoryItemSchema =
  new mongoose.Schema(
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true,
      },

      name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 150,
      },

      quantity: {
        type: Number,
        required: true,
        min: 1,
      },

      category: {
        type: String,
        required: true,
        enum: [
          'Grains',
          'Cereals',
          'Dairy',
          'Protein',
          'Meat',
          'Canned Goods',
          'Fruits & Vegetables',
          'Other',
        ],
      },

      expirationDate: {
        type: Date,
        required: true,
      },
    },
    {
      timestamps: true,
    }
  );

const InventoryItem =
  mongoose.model(
    'InventoryItem',
    inventoryItemSchema
  );

export default InventoryItem;