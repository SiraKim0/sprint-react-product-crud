import { useState } from "react";
import { Item } from "./Item.type";
import "./ItemForm.style.css";
import { InputLabel, MenuItem, TextField, FormControl } from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";

type Props = {
  onBackBtnClickHnd: () => void;
  onSubmitClickHnd: (data: Item) => void;
};

const AddItem = (props: Props) => {
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [itemName, setItemName] = useState("");
  const [price, setPrice] = useState("");

  const categorySelect = [
    "반지",
    "목걸이",
    "귀걸이",
    "이어커프",
    "팔찌",
    "발찌",
  ];
  const brandSelect = [
    "위아몬즈",
    "a14",
    "마마카사르",
    "룬느",
    "프릿",
    "멕코이",
    "엠엠이",
    "스테이잼",
  ];

  const { onBackBtnClickHnd, onSubmitClickHnd } = props;

  const onCategoryChangeHnd = (e: SelectChangeEvent) => {
    setCategory(e.target.value);
  };
  const onBrandChangeHnd = (e: SelectChangeEvent) => {
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
    const data: Item = {
      id: new Date().toJSON.toString(),
      category: category,
      brand: brand,
      itemName: itemName,
      price: price,
    };
    onSubmitClickHnd(data);
    onBackBtnClickHnd();
  };

  return (
    <div className="form-container">
      <div>
        <h3>상품 등록</h3>
      </div>
      <form onSubmit={onSubmitBtnClickHnd}>
        <FormControl sx={{ m: 2, minWidth: 150 }}>
          <InputLabel id="demo-select-small">카테고리</InputLabel>
          <Select
            labelId="demo-select-small"
            id="demo-select-small"
            value={category}
            label="카테고리"
            onChange={onCategoryChangeHnd}
          >
            {categorySelect.map((item, idx) => {
              return (
                <MenuItem key={idx} value={item}>
                  {item}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <FormControl sx={{ m: 2, minWidth: 150 }}>
          <InputLabel id="demo-select-small">브랜드</InputLabel>
          <Select
            labelId="demo-select-small"
            id="demo-select-small"
            value={brand}
            label="브랜드"
            onChange={onBrandChangeHnd}
          >
            {brandSelect.map((item, idx) => {
              return (
                <MenuItem key={idx} value={item}>
                  {item}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <TextField
          label="상품명"
          variant="outlined"
          onChange={onItemNameChangeHnd}
        />
        <TextField
          label="가격"
          variant="outlined"
          onChange={onPriceChangeHnd}
        />
        <div>
          <input type="button" value="Back" onClick={onBackBtnClickHnd} />
          <input type="submit" value="Add Item" />
        </div>
      </form>
    </div>
  );
};
export default AddItem;
