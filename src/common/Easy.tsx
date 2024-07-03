import { ProFormDigit } from '@ant-design/pro-form';

export const EasyFormSet = () => {
  return (
    <div>
      <ProFormDigit
        name="count"
        width="md"
        label="添加数量"
        fieldProps={{
          min: 1,
        }}
        placeholder="请输入数量"
        rules={[
          { required: true, message: '请输入数量' },
          {
            pattern: /^(1[0-9]|20|[1-9])$/, // 匹配1到19、20或者单独的1到9
            message: '请输入有效的数字，范围为1到20',
          },
        ]}
      />
    </div>
  );
};
