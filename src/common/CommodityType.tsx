export type ChAEn = {
  Chinese: string;
  English: string;
};
export type Type = {
  [key: string]:
    | {
        Chinese: string;
        English: string;
      }
    | undefined;
  Book: ChAEn;
  BookBorrow: ChAEn;
};

export const BookName: Type = {
  Book: {
    Chinese: '图书',
    English: 'Book',
  },
  BookBorrow: {
    Chinese: '借阅情况',
    English: 'BookBorrow',
  },
};
