import { Item } from "./Item.type";
import './ItemList.style.css'

type Props = {
    list: Item[];
    onDeleteClickHnd: (data: Item) => void
}

const ItemList = (props: Props) => {
    const { list, onDeleteClickHnd } = props;
    return (
        <div>
            <h2 className="list-header">상품 목록</h2>
            <table>
                <tr>
                    <th>상품분류</th>
                    <th>브랜드</th>
                    <th>상품명</th>
                    <th>가격</th>
                </tr>


                {list.map((item) => {
                    return (
                        <tr key={item.id}>
                            <td>{`${item.category}`}</td>
                            <td>{`${item.brand}`}</td>
                            <td>{`${item.itemName}`}</td>
                            <td>{`${item.price}`}</td>
                            <td>
                                <div>
                                    <input type="button" value="Edit" />
                                    <input type="button" value="Delete" onClick={() => onDeleteClickHnd(item)} />
                                </div>
                            </td>
                        </tr>
                    )
                })}
            </table>
        </div>
    )
}

export default ItemList;