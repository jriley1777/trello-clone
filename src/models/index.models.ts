export interface Board {
  name: string;
  boardId: string;
  deleted?: boolean;
  bg: {
    media: any;
    color: string;
  };
}