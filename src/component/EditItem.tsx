import { useState } from "react";
import { Item } from "./Item.type";
import "./ItemForm.style.css";
import {
  InputLabel,
  MenuItem,
  TextField,
  FormControl,
  Button,
} from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";

type Props = {
  data: Item;
  onBackBtnClickHnd: () => void;
  onUpdateClickHnd: (data: Item) => void;
};

const EditItem = (props: Props) => {
  const { data, onBackBtnClickHnd, onUpdateClickHnd } = props;

  //dummy list
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

  //state
  const [itemData, setItemData] = useState({
    category: data.category,
    brand: data.brand,
    itemName: data.itemName,
    price: data.price.replace("원", ""),
    imageUrl: data.imageUrl,
  });
  const [itemNameMsg, setItemNameMsg] = useState("");
  const [priceMsg, setPriceMsg] = useState("");
  const [isItemName, setIsItemName] = useState(true);
  const [isPrice, setIsPrice] = useState(true);

  //handler
  const onCategoryChangeHnd = (e: SelectChangeEvent) => {
    setItemData({ ...itemData, category: e.target.value });
  };
  const onBrandChangeHnd = (e: SelectChangeEvent) => {
    setItemData({ ...itemData, brand: e.target.value });
  };
  const onItemNameChangeHnd = (e: any) => {
    setItemData({ ...itemData, itemName: e.target.value.trim() });
    if (e.target.value.length < 3 || e.target.value.length > 20) {
      setItemNameMsg("상품명은 3에서 20 글자 사이로 입력하세요.");
      setIsItemName(false);
    } else {
      setItemNameMsg("");
      setIsItemName(true);
    }
  };
  const onPriceChangeHnd = (e: any) => {
    const onlyNumber = e.target.value.replace(/[^0-9]/g, "");
    setItemData({ ...itemData, price: onlyNumber });
    if (e.target.value < 1000) {
      setPriceMsg("입력한 금액이 적습니다. 1000원 이상부터 입력하세요.");
      setIsPrice(false);
    } else {
      setPriceMsg("");
      setIsPrice(true);
    }
  };
  const onSubmitBtnClickHnd = (e: any) => {
    e.preventDefault();
    if (itemData.category === "") {
      alert("카테고리 선택하세요.");
    } else if (itemData.brand === "") {
      alert("브랜드를 선택하세요.");
    } else if (!isItemName) {
      alert("상품명을 입력하세요.");
    } else if (!isPrice) {
      alert("가격을 입력하세요");
    } else {
      const updatedData: Item = {
        id: data.id,
        category: itemData.category,
        brand: itemData.brand,
        itemName: itemData.itemName,
        price: `${itemData.price}원`,
        imageUrl: itemData.imageUrl,
      };
      onUpdateClickHnd(updatedData);
      onBackBtnClickHnd();
    }
  };

  return (
    <div className="form-container">
      <h2 className="list-header">상품 등록</h2>
      <form onSubmit={onSubmitBtnClickHnd}>
        <FormControl sx={{ m: 2, minWidth: 150 }}>
          <InputLabel id="demo-select-small">카테고리</InputLabel>
          <Select
            labelId="demo-select-small"
            id="demo-select-small"
            value={itemData.category}
            label="카테고리"
            name="category"
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
            value={itemData.brand}
            label="브랜드"
            name="brand"
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
          sx={{ m: 2, minWidth: 150 }}
          label="상품명"
          variant="outlined"
          value={itemData.itemName}
          name="itemName"
          autoComplete="off"
          placeholder="상품명을 입력하세요."
          onChange={onItemNameChangeHnd}
        />
        <span className="error-message">{itemNameMsg}</span>
        <TextField
          sx={{ m: 2, minWidth: 150 }}
          label="가격"
          variant="outlined"
          value={itemData.price}
          name="price"
          autoComplete="off"
          placeholder="가격을 입력하세요. 숫자만 가능합니다."
          onChange={onPriceChangeHnd}
        />
        <span className="error-message">{priceMsg}</span>
        <div className="item-image">
          <img src={itemData.imageUrl} alt="item-img" />
        </div>
        <div className="action-btn-back-submit">
          <Button
            variant="outlined"
            type="button"
            value="Back"
            onClick={onBackBtnClickHnd}
          >
            뒤로가기
          </Button>
          <Button variant="contained" type="submit">
            상품 수정
          </Button>
        </div>
      </form>
    </div>
  );
};
export default EditItem;
