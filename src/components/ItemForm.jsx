import { useEffect, useState } from 'react';
import { X } from 'lucide-react';

const emptyForm = {
  name: '',
  quantity: 1,
  category: 'Grains',
  expirationDate: '',
};

function ItemForm({
  itemToEdit,
  onSave,
  onCancel,
}) {
  const [formData, setFormData] = useState(emptyForm);

  useEffect(() => {
    if (itemToEdit) {
      setFormData({
        name: itemToEdit.name,
        quantity: itemToEdit.quantity,
        category: itemToEdit.category,
        expirationDate: itemToEdit.expirationDate,
      });
    } else {
      setFormData(emptyForm);
    }
  }, [itemToEdit]);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,

      [name]:
        name === 'quantity'
          ? Number(value)
          : value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (
      !formData.name.trim() ||
      !formData.quantity ||
      !formData.expirationDate
    ) {
      alert('Please complete all required fields.');
      return;
    }

    onSave(formData);

    if (!itemToEdit) {
      setFormData(emptyForm);
    }
  }

  return (
    <div className="form-overlay">

      <div className="item-form-card">

        <div className="form-header">

          <div>
            <h2>
              {itemToEdit
                ? 'Edit Food Item'
                : 'Add Food Item'}
            </h2>

            <p>
              {itemToEdit
                ? 'Update the information for this food item.'
                : 'Add a new item to your food storage.'}
            </p>
          </div>

          <button
            className="close-button"
            type="button"
            onClick={onCancel}
            aria-label="Close form"
          >
            <X size={20} />
          </button>

        </div>

        <form
          className="item-form"
          onSubmit={handleSubmit}
        >

          <div className="form-group form-full">

            <label htmlFor="name">
              Item Name
            </label>

            <input
              id="name"
              name="name"
              type="text"
              placeholder="Example: Rice"
              value={formData.name}
              onChange={handleChange}
              required
            />

          </div>

          <div className="form-group">

            <label htmlFor="quantity">
              Quantity
            </label>

            <input
              id="quantity"
              name="quantity"
              type="number"
              min="1"
              value={formData.quantity}
              onChange={handleChange}
              required
            />

          </div>

          <div className="form-group">

            <label htmlFor="category">
              Category
            </label>

            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
            >

              <option value="Grains">
                Grains
              </option>

              <option value="Cereals">
                Cereals
              </option>

              <option value="Dairy">
                Dairy
              </option>

              <option value="Protein">
                Protein
              </option>

              <option value="Meat">
                Meat
              </option>

              <option value="Canned Goods">
                Canned Goods
              </option>

              <option value="Fruits & Vegetables">
                Fruits & Vegetables
              </option>

              <option value="Other">
                Other
              </option>

            </select>

          </div>

          <div className="form-group form-full">

            <label htmlFor="expirationDate">
              Expiration Date
            </label>

            <input
              id="expirationDate"
              name="expirationDate"
              type="date"
              value={formData.expirationDate}
              onChange={handleChange}
              required
            />

            <small className="form-help">
              Status will be calculated automatically
              from the expiration date.
            </small>

          </div>

          <div className="form-actions form-full">

            <button
              type="button"
              className="secondary-button"
              onClick={onCancel}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="primary-button"
            >
              {itemToEdit
                ? 'Save Changes'
                : 'Add Item'}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default ItemForm;