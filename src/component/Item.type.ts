export interface Item {
    id: string;
    category: string;
    brand: string;
    itemName: string;
    price: string;
}

export const dummyItemList: Item[] = [
    {
        id: new Date().toJSON().toString(),
        category: "반지",
        brand: "a14",
        itemName: "14K 네츄럴 페블 레이어드 반지",
        price: "254000"
    },
];

export enum PageEnum {
    list,
    add,
}