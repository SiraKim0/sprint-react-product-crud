import { useState } from 'react'
import { Item } from './Item.type';
import './ItemForm.style.css'
type Props = {
    onBackBtnClickHnd: () => void;
    onSubmitClickHnd: (data: Item) => void;
}
const AddItem = (props: Props) => {
    const [category, setCategory] = useState("");
    const [brand, setBrand] = useState("");
    const [itemName, setItemName] = useState("");
    const [price, setPrice] = useState("");

    const { onBackBtnClickHnd, onSubmitClickHnd } = props;

    const onCategoryChangeHnd = (e: any) => {
        setCategory(e.target.value)
    }
    const onBrandChangeHnd = (e: any) => {
        setBrand(e.target.value)
    }
    const onItemNameChangeHnd = (e: any) => {
        setItemName(e.target.value)
    }
    const onPriceChangeHnd = (e: any) => {
        setPrice(e.target.value)
    }
    const onSubmitBtnClickHnd = (e: any) => {
        e.preventDefault();
        const data: Item = {
            id: new Date().toJSON.toString(),
            category: category,
            brand: brand,
            itemName: itemName,
            price: price
        }
        onSubmitClickHnd(data)
        onBackBtnClickHnd();
    }
    return (
        <div className='form-container'>
            <div>
                <h3>Add Item Form</h3>
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
                    <input type="submit" value="Add Item" />
                </div>
            </form>
        </div>
    )
}
export default AddItem;