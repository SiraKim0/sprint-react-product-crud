import { useState } from 'react';
import { Item, dummyItemList, PageEnum } from './Item.type';
import ItemList from './ItemList';
import AddItem from './AddItem';
import './Home.style.css'

const Home = () => {
    const [itemList, setItemList] = useState(
        dummyItemList as Item[]
    );
    const [shownPage, setShownPage] = useState(PageEnum.list);
    const onAddItemClickHnd = () => {
        setShownPage(PageEnum.add)
    }
    const showListPage = () => {
        setShownPage(PageEnum.list)
    }
    const addItem = (data: Item) => {
        setItemList([...itemList, data]);
    }
    const deleteItem = (data: Item) => {
        const indexToDelete = itemList.indexOf(data);
        const tempList = [...itemList];
        tempList.splice(indexToDelete, 1);
        setItemList(tempList);
    }
    return (
        <>
            <article className='article-header'>
                <header>
                    <h1>React(TS) CRUD</h1>
                </header>
            </article>
            <section className='section-content'>
                {shownPage === PageEnum.list &&
                    (
                        <>
                            <input type='button' value='Add Item' onClick={onAddItemClickHnd} className='add-item-btn' />
                            <ItemList list={itemList} onDeleteClickHnd={deleteItem} />
                        </>
                    )
                }
                {shownPage === PageEnum.add && (
                    <AddItem onBackBtnClickHnd={showListPage} onSubmitClickHnd={addItem} />
                )}
            </section>
        </>
    )
}

export default Home;