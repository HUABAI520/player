import { BookName } from '@/common/CommodityType';
import { EasyFormSet } from '@/common/Easy';
import FormGeneric from '@/common/formGeneric';
import { BooksTableColumns } from '@/common/tableConfig';
import { BookFormSet } from '@/pages/Books/Book/components/BookFormSet';
import { addBookUsingPost, queryBookUsingPost } from '@/services/swagger/bookController';

export default () => {
  return (
    <div>
      <FormGeneric
        dynamicColumns={BooksTableColumns}
        search={queryBookUsingPost}
        testTitle={BookName.Book!}
        addCommodity={addBookUsingPost}
        dynamicComponent={<BookFormSet />}
        easyComponent={<EasyFormSet />}
      />
    </div>
  );
};
