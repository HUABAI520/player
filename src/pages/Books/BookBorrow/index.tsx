import { BookName } from '@/common/CommodityType';
import FormGeneric from '@/common/formGeneric';
import { BorrowTableColumns } from '@/common/tableConfig';
import { queryBorrowUsingPost } from '@/services/swagger/bookController';

export default () => {
  return (
    <FormGeneric
      dynamicColumns={BorrowTableColumns}
      search={queryBorrowUsingPost}
      testTitle={BookName.BookBorrow!}
    />
  );
};
