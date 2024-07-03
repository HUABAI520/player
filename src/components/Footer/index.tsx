import { Gitee_LOGO } from '@/constants';
import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';
import '@umijs/max';
import React from 'react';

const Footer: React.FC = () => {
  const defaultMessage = '402出品';
  const currentYear = new Date().getFullYear();

  function Gitee() {
    return <img src={Gitee_LOGO} width="14" height="14" />;
  }

  return (
    <DefaultFooter
      style={{
        background: 'none',
      }}
      copyright={`${currentYear} ${defaultMessage}`}
      links={[
        {
          key: 'github',
          title: <GithubOutlined />,
          href: 'https://github.com/ant-design/ant-design-pro',
          blankTarget: true,
        },
        {
          key: 'gitte',
          title: <Gitee />,
          href: 'https://gitee.com/',
          blankTarget: true,
        },
        {
          key: 'Computer Manager',
          title: 'Computer Manager',
          href: 'https://ant.design',
          blankTarget: true,
        },
      ]}
    />
  );
};
export default Footer;
