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
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storageService } from "../firebase";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";

type Props = {
  onBackBtnClickHnd: () => void;
  onSubmitClickHnd: (data: Item) => void;
};

const AddItem = (props: Props) => {
  const { onBackBtnClickHnd, onSubmitClickHnd } = props;

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
    category: "",
    brand: "",
    itemName: "",
    price: "",
  });
  const [itemNameMsg, setItemNameMsg] = useState("");
  const [priceMsg, setPriceMsg] = useState("");
  const [isItemName, setIsItemName] = useState(false);
  const [isPrice, setIsPrice] = useState(false);

  //image state
  const [imageFile, setImageFile] = useState<File>();
  const [imgName, setImgName] = useState("");
  const [downloadURL, setDownloadURL] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  //handler
  const onCategoryChangeHnd = (e: SelectChangeEvent) => {
    setItemData({ ...itemData, category: e.target.value });
  };
  const onBrandChangeHnd = (e: SelectChangeEvent) => {
    setItemData({ ...itemData, brand: e.target.value });
  };
  const onItemNameChangeHnd = (e: any) => {
    setItemData({ ...itemData, itemName: e.target.value });
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
      const data: Item = {
        id: new Date().toJSON().toString(),
        category: itemData.category,
        brand: itemData.brand,
        itemName: itemData.itemName,
        price: `${itemData.price}원`,
        imageUrl: downloadURL,
      };
      onSubmitClickHnd(data);
      onBackBtnClickHnd();
    }
  };

  //image handler
  const selectFileHnd = (files: any) => {
    if (files && files[0].size < 10000000) {
      setImageFile(files[0]);
      console.log(files[0]);
      setImgName(files[0].name);
    } else {
      alert("파일이 너무 큽니다.");
    }
  };
  const imageUploadHnd = () => {
    if (imageFile) {
      const name = imageFile.name;
      const storageRef = ref(storageService, `images/${name}`);
      const uploadTask = uploadBytesResumable(storageRef, imageFile);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(progress);
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          alert(error.message);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            setDownloadURL(url);
            setIsUploading(true);
          });
        }
      );
    } else {
      alert("파일을 찾을 수 없습니다.");
    }
  };
  const imageRemoveHnd = () => {
    setImageFile(undefined);
    setImgName("");
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
        <div className="select-image">
          <input
            type="text"
            className="input-image-file"
            value={imgName}
            placeholder="사진첨부: gif, jpg, jpeg, png"
          />
          <label htmlFor="file">파일찾기</label>
          <input
            type="file"
            id="file"
            accept=".gif, .jpg, .jpeg, .png"
            onChange={(files) => selectFileHnd(files.target.files)}
          />
        </div>

        {imageFile && (
          <div className="image-box">
            <h4>사진 미리보기</h4>
            <div className="action-btn-image">
              <Button variant="outlined" onClick={imageRemoveHnd}>
                사진 삭제
              </Button>
              <Button variant="contained" onClick={imageUploadHnd}>
                사진 업로드
              </Button>
              {isUploading ? (
                <span>사진 업로드 완료</span>
              ) : (
                <Stack spacing={2} direction="row">
                  <CircularProgress variant="determinate" value={progress} />
                </Stack>
              )}
            </div>
            {downloadURL && (
              <div className="item-image">
                <img src={downloadURL} alt={downloadURL} />
              </div>
            )}
          </div>
        )}

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
            상품 등록
          </Button>
        </div>
      </form>
    </div>
  );
};
export default AddItem;
