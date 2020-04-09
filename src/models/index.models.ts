export interface User {
  id: string,
  email: string,
  name: string,
  photoURL: string,
}

export interface Board {
  lastAccessTime?: number;
  createdAt: number;
  lastUpdated: number;
  createdBy: User["id"];
  id: string;
  name: string;
  deleted: boolean;
  bg: {
    media: any;
    color: string;
  };
  lists: List['id'][];
}

export interface List {
  createdAt: number;
  lastUpdated: number;
  createdBy: User["id"];
  board: Board["id"];
  name: string;
  id: string;
  cards: Card['id'][];
}

export interface Card {
  lastAccessTime?: number;
  createdAt: number;
  lastUpdated: number;
  createdBy: User["id"];
  board: Board["id"];
  list: List["id"];
  id: string;
  name: string;
  description: string;
  cardItems: CardItem['id'][];
}


export interface CardItem {
  lastAccessTime?: number;
  createdAt: number;
  lastUpdated: number;
  createdBy: User["id"];
  id: string;
  value: string;
  isComplete: boolean;
}