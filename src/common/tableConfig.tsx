import { borrowBookUsingPost, returnBookUsingPost } from '@/services/swagger/bookController';
import { ProColumns } from '@ant-design/pro-table';
import { ProCoreActionType } from '@ant-design/pro-utils/es/typing';
import { Button, message, Modal } from 'antd';
import React from 'react';

const Borrow: React.FC<{ book: API.BooksVO; action: ProCoreActionType | undefined }> = ({
  book,
  action,
}) => {
  const getBook = () => {
    Modal.confirm({
      title: '确认借阅',
      content: '确认要借阅：' + book.bookName + ' 这本书吗？',
      onOk: async () => {
        const res = await borrowBookUsingPost({
          bookId: book.id,
        });
        if (res) {
          message.success('借阅' + book.bookName + '成功！');
          action?.reload();
        }
      },
      onCancel: () => {
        // 用户取消删除操作
      },
    });
  };
  return (
    <>
      <Button type={'link'} onClick={getBook}>
        借阅
      </Button>
    </>
  );
};

const Return: React.FC<{ borrow: API.BookBorrowVO; action: ProCoreActionType | undefined }> = ({
  borrow,
  action,
}) => {
  const getBook = () => {
    Modal.confirm({
      title: '确认归还',
      content: '确认要归还：' + borrow.bookName + ' 这本书吗？',
      onOk: async () => {
        const res = await returnBookUsingPost({
          id: borrow.id,
        });
        if (res) {
          message.success('归还' + borrow.bookName + '成功！!');
          action?.reload();
        }
      },
      onCancel: () => {
        // 用户取消删除操作
      },
    });
  };
  return (
    <>
      <Button type={'link'} onClick={getBook}>
        归还
      </Button>
    </>
  );
};
export const BooksTableColumns: ProColumns<API.BooksVO>[] = [
  {
    valueType: 'indexBorder',
    width: 48,
    editable: false,
  },
  {
    title: '序列号',
    dataIndex: 'id',
    editable: false,
    render: (dom, entity) => {
      return (
        <a
          onClick={() => {
            console.log(JSON.stringify(entity.id));
            // alert(JSON.stringify(entity.id));
          }}
        >
          {dom}
        </a>
      );
    },
  },
  {
    title: '图书名',
    dataIndex: 'bookName',
  },
  {
    title: '作者',
    dataIndex: 'bookAuthor',
  },
  {
    title: '类型',
    dataIndex: 'bookType',
  },
  {
    title: 'ISBN',
    dataIndex: 'isbn',
  },
  {
    title: '数量',
    dataIndex: 'count',
  },
  {
    title: '价格',
    dataIndex: 'bookPrice',
    render: (_, entity) => {
      return (
        <span>
          {(entity?.bookPrice || 0) / 100}
          {' ￥'}
        </span>
      );
    },
  },
  {
    title: '描述',
    dataIndex: 'bookDesc',
    valueType: 'textarea',
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    valueType: 'dateTime',
    sorter: true,
    defaultSortOrder: 'descend',
    editable: false,
    hideInSearch: true,
  },
  {
    title: '更新时间',
    dataIndex: 'updateTime',
    valueType: 'dateTime',
    sorter: true,
    editable: false,
    hideInSearch: true,
  },
  {
    title: '操作',
    valueType: 'option',
    key: 'operation',
    width: 100,
    fixed: 'right',
    render: (dom, entity, _, action) => <Borrow book={entity} action={action} />,
  },
];

export const BorrowTableColumns: ProColumns<API.BookBorrowVO>[] = [
  {
    valueType: 'indexBorder',
    width: 48,
    editable: false,
  },
  {
    title: '借阅号',
    dataIndex: 'id',
    editable: false,
    render: (dom, entity) => {
      return (
        <a
          onClick={() => {
            console.log(JSON.stringify(entity.id));
            // alert(JSON.stringify(entity.id));
          }}
        >
          {dom}
        </a>
      );
    },
  },
  {
    title: '借阅时间',
    dataIndex: 'createTime',
    valueType: 'dateTime',
    sorter: true,
    defaultSortOrder: 'descend',
    editable: false,
    hideInSearch: true,
  },
  {
    title: '是否归还',
    dataIndex: 'isReturn',
    valueEnum: {
      1: {
        text: '已还',
        status: 'success',
      },
      0: {
        text: '未还',
        status: 'error',
      },
    },
  },
  {
    title: '归还时间',
    dataIndex: 'returnTime',
    valueType: 'dateTime',
    sorter: true,
    editable: false,
    hideInSearch: true,
  },
  {
    title: '图书名',
    dataIndex: 'bookName',
  },
  {
    title: '作者',
    dataIndex: 'bookAuthor',
  },
  {
    title: '类型',
    dataIndex: 'bookType',
  },
  {
    title: 'ISBN',
    dataIndex: 'isbn',
  },
  {
    title: '价格',
    dataIndex: 'bookPrice',
    render: (_, entity) => {
      return (
        <span>
          {(entity?.bookPrice || 0) / 100}
          {' ￥'}
        </span>
      );
    },
  },
  {
    title: '描述',
    dataIndex: 'bookDesc',
    valueType: 'textarea',
  },

  {
    title: '操作',
    valueType: 'option',
    key: 'operation',
    width: 100,
    fixed: 'right',
    render: (dom, entity, _, action) => {
      if (entity.isReturn === 1) {
        return (
          <Button type={'text'} style={{ color: 'green' }}>
            已还
          </Button>
        );
      }
      return <Return borrow={entity} action={action} />;
    },
  },
];
