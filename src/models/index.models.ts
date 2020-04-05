export interface Board {
  name: string;
  boardId: string;
  deleted?: boolean;
  lastAccessTime?: any;
  bg: {
    media: any;
    color: string;
  };
}