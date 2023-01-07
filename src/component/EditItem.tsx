import { useState } from "react";
import { Item } from "./Item.type";
import "./ItemForm.style.css";

type Props = {
  data: Item;
  onBackBtnClickHnd: () => void;
  onUpdateClickHnd: (data: Item) => void;
};

const EditItem = (props: Props) => {
  const { data, onBackBtnClickHnd, onUpdateClickHnd } = props;

  const [category, setCategory] = useState(data.category);
  const [brand, setBrand] = useState(data.brand);
  const [itemName, setItemName] = useState(data.itemName);
  const [price, setPrice] = useState(data.price);

  const onCategoryChangeHnd = (e: any) => {
    setCategory(e.target.value);
  };
  const onBrandChangeHnd = (e: any) => {
    setBrand(e.target.value);
  };
  const onItemNameChangeHnd = (e: any) => {
    setItemName(e.target.value);
  };
  const onPriceChangeHnd = (e: any) => {
    setPrice(e.target.value);
  };

  const onSubmitBtnClickHnd = (e: any) => {
    e.preventDefault();
    const updatedData: Item = {
      id: data.id,
      category: category,
      brand: brand,
      itemName: itemName,
      price: price,
    };
    onUpdateClickHnd(updatedData);
    onBackBtnClickHnd();
  };

  return (
    <div className="form-container">
      <div>
        <h3>Edit Item Form</h3>
      </div>
      <form onSubmit={onSubmitBtnClickHnd}>
        <div>
          <label>분류: </label>
          <input type="text" value={category} onChange={onCategoryChangeHnd} />
        </div>
        <div>
          <label>브랜드: </label>
          <input type="text" value={brand} onChange={onBrandChangeHnd} />
        </div>
        <div>
          <label>상품명: </label>
          <input type="text" value={itemName} onChange={onItemNameChangeHnd} />
        </div>
        <div>
          <label>상품가격: </label>
          <input type="text" value={price} onChange={onPriceChangeHnd} />
        </div>
        <div>
          <input type="button" value="Back" onClick={onBackBtnClickHnd} />
          <input type="submit" value="Update Item" />
        </div>
      </form>
    </div>
  );
};
export default EditItem;
