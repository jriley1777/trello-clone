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
  isStarred: boolean;
  bg: {
    media: any;
    color: string;
  };
}

export interface List {
    createdAt: number;
    lastUpdated: number;
    createdBy: User["id"];
    board: Board["id"];
    name: string;
    id: string;
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
}