import { QuestionCircleOutlined } from '@ant-design/icons';
import '@umijs/max';

export type SiderTheme = 'light' | 'dark';
export const SelectLang = () => {
  return (
    // @ts-ignore
    // eslint-disable-next-line react/jsx-no-undef
    <UmiSelectLang
      style={{
        padding: 4,
      }}
    />
  );
};

const pro = process.env.NODE_ENV !== 'production';
type SelectLangProps = {
  value?: number;
  label?: string;
};

export const Question = () => {
  // 读取  routes配置 查看是否layout 为false 没有则是默认值true
  // const route = useRouteProps();
  // if (!route.meta?.layout) {
  //   route.meta = {
  //     ...route.meta,
  //     layout: true,
  //   };
  // }
  //
  // const layout = route.meta?.layout;
  // alert(layout);

  return (
    <>
      {pro && (
        <div
          style={{
            display: 'flex',
            height: 26,
          }}
          onClick={() => {
            window.open('https://pro.ant.design/docs/getting-started');
          }}
        >
          <QuestionCircleOutlined />
        </div>
      )}
    </>
  );
};
