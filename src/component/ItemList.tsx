import { Item } from "./Item.type";
import "./ItemList.style.css";
import { Button } from "@mui/material";

type Props = {
  list: Item[];
  onDeleteClickHnd: (data: Item) => void;
  onEditClickHnd: (data: Item) => void;
};

const ItemList = (props: Props) => {
  const { list, onDeleteClickHnd, onEditClickHnd } = props;

  return (
    <div className="list-content">
      <h2 className="list-header">상품 목록</h2>
      <ul className="list-ul">
        {list.map((item, idx) => {
          return (
            <article className="list-item" key={idx}>
              <figure>
                <img src={item.imageUrl} alt="item-img" />
                <div className="list-item-intro">
                  <strong>{item.brand}</strong>
                  <p>{item.itemName}</p>
                  <p>{item.price}</p>
                </div>
              </figure>
              <div className="action-btn">
                <Button
                  variant="contained"
                  type="button"
                  onClick={() => onEditClickHnd(item)}
                >
                  상품 수정
                </Button>
                <Button
                  variant="contained"
                  type="button"
                  value="Delete"
                  onClick={() => onDeleteClickHnd(item)}
                >
                  상품 삭제
                </Button>
              </div>
            </article>
          );
        })}
      </ul>
    </div>
  );
};

export default ItemList;
