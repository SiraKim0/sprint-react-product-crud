export interface Item {
  id: string;
  category: string;
  brand: string;
  itemName: string;
  price: string;
}
//dummy data
// export const dummyItemList: Item[] = [
//   {
//     id: new Date().toJSON().toString(),
//     category: "반지",
//     brand: "a14",
//     itemName: "14K 네츄럴 페블 레이어드 반지",
//     price: "254000",
//   },
//   {
//     id: new Date().toJSON().toString(),
//     category: "목걸이",
//     brand: "위아몬즈",
//     itemName: "14K 미니 러프DIA 위아몬즈 목걸이",
//     price: "16900",
//   },
// ];

export enum PageEnum {
  list,
  add,
  edit,
}
