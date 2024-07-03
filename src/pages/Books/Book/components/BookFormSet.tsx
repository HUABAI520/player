import { ProFormMoney, ProFormText } from '@ant-design/pro-components';

import { ProFormDigit, ProFormTextArea } from '@ant-design/pro-form';
import React from 'react';

interface BookFormSetProps {
  onResultChange?: (result: any) => void; // 在这里使用明确的类型
  isEdit?: boolean;
  currentRow?: API.BookAddReq;
}

export const BookFormSet: React.FC<BookFormSetProps> = ({ onResultChange, currentRow }) => {
  // type BookAddReq = {

  //     bookDesc?: string;
  //     bookImg?: string;

  //     bookPrice: number;
  //   };

  return (
    <div>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div style={{ flex: 1 }}>
          <ProFormText
            label="图书名"
            name="bookName"
            placeholder="请输入图书名"
            rules={[
              {
                required: true,
                message: '请输入图书名',
              },
            ]}
          />
        </div>
        <div style={{ flex: 1, marginLeft: '16px' }}>
          <ProFormText
            label="图书作者"
            name="bookAuthor"
            placeholder="请输入作者"
            rules={[
              {
                required: true,
                message: '请输入作者',
              },
            ]}
          />
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div style={{ flex: 1 }}>
          <ProFormText
            label="图书类型"
            name="bookType"
            placeholder="请输入类型"
            rules={[
              {
                required: true,
                message: '请输入类型',
              },
            ]}
          />
        </div>
        <div style={{ flex: 1, marginLeft: '16px' }}>
          <ProFormText
            label="ISBN"
            name="isbn"
            placeholder="请输入ISBN"
            rules={[
              {
                required: true,
                message: '请输入ISBN',
              },
            ]}
          />
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div style={{ flex: 1 }}>
          <ProFormDigit
            label="数量"
            name="count"
            width="md"
            placeholder="请输入数量"
            initialValue={1}
            rules={[
              {
                required: true,
                message: '请输入数量',
              },
            ]}
          />
        </div>
        <div style={{ flex: 1, marginLeft: '16px' }}>
          <ProFormMoney
            label="价格"
            name="bookPrice"
            width="md"
            placeholder="请输入价格"
            rules={[
              {
                required: true,
                message: '请输入价格',
              },
            ]}
          />
        </div>
      </div>
      <ProFormTextArea
        name="bookDesc"
        width="md"
        label="备注"
        placeholder="请输入备注"
        rules={[
          {
            required: false,
            message: '请输入备注',
          },
        ]}
      />
    </div>
  );
};
