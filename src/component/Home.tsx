import { useEffect, useState } from "react";
import { Item, PageEnum } from "./Item.type";
import ItemList from "./ItemList";
import AddItem from "./AddItem";
import EditItem from "./EditItem";
import "./Home.style.css";
import { Button } from "@mui/material";

const Home = () => {
  const [itemList, setItemList] = useState([] as Item[]);
  const [itemEdit, setItemEdit] = useState({} as Item);
  const [page, setPage] = useState(PageEnum.list);

  useEffect(() => {
    const localData = window.localStorage.getItem("ItemList");
    if (localData) {
      setLocalItemList(JSON.parse(localData));
    }
  }, []);

  const onAddItemClickHnd = () => {
    setPage(PageEnum.add);
  };
  const showListPage = () => {
    setPage(PageEnum.list);
  };
  const setLocalItemList = (list: Item[]) => {
    setItemList(list);
    window.localStorage.setItem("ItemList", JSON.stringify(list));
  };

  const addItem = (data: Item) => {
    setLocalItemList([...itemList, data]);
  };
  const deleteItem = (data: Item) => {
    const indexToDelete = itemList.indexOf(data);
    const tempList = [...itemList];
    tempList.splice(indexToDelete, 1);
    setLocalItemList(tempList);
  };
  const editItem = (data: Item) => {
    setPage(PageEnum.edit);
    setItemEdit(data);
  };

  const updateData = (data: Item) => {
    const filterData = itemList.filter((item) => item.id === data.id)[0];
    const indexOfData = itemList.indexOf(filterData);
    const tempData = [...itemList];
    tempData[indexOfData] = data;
    setLocalItemList(tempData);
  };

  return (
    <>
      <article className="article-header">
        <header>
          <h1>React(TS) CRUD</h1>
        </header>
      </article>
      <section className="section-content">
        {page === PageEnum.list && (
          <>
            <Button
              variant="contained"
              type="button"
              onClick={onAddItemClickHnd}
              className="add-item-btn"
            >
              상품 등록
            </Button>
            <ItemList
              list={itemList}
              onDeleteClickHnd={deleteItem}
              onEditClickHnd={editItem}
            />
          </>
        )}
        {page === PageEnum.add && (
          <AddItem
            onBackBtnClickHnd={showListPage}
            onSubmitClickHnd={addItem}
          />
        )}
        {page === PageEnum.edit && (
          <EditItem
            data={itemEdit}
            onBackBtnClickHnd={showListPage}
            onUpdateClickHnd={updateData}
          />
        )}
      </section>
    </>
  );
};

export default Home;
