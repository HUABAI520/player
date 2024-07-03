/**
 * request 网络请求工具
 * 更详细的 api 文档: https://github.com/umijs/umi-request
 */
import { message, notification } from 'antd';
// import NodeRSA from 'node-rsa';
import { loginPath } from '@/common/GlobalKey';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { history } from '@umijs/max';
import { extend } from 'umi-request';

/**
 * 配置request请求时的默认参数
 */
const request = extend({
  credentials: 'include', // 默认请求是否带上cookie
  prefix:
    process.env.NODE_ENV === 'production'
      ? 'http://8.137.78.53:8888/api-computer'
      : // ? 'https://l2.ac.cn/api-computer'
        'http://localhost:8081/api-tushu',
  // requestType: 'Form',
});

/**
 * 所有请求拦截器
 */
request.interceptors.request.use((url, options): any => {
  // 设置超时提示
  console.log(url, options);
  return {
    url,
    options: {
      ...options,
      headers: {},
    },
  };
});
// 构建一个map key:string value:string
const map = new Map<string, string>();
const openNotification = (msg: string) => {
  // 查看 map中是否有msg
  if (map.has(msg)) {
    return;
  }
  // 添加到map中
  map.set(msg, msg);
  const msgs = msg.replace(':', '：').split('：');
  const msg0 = msgs[0]; //
  const msg1 = msgs[1];
  const msg1s = msg1.replace(',', '，').split('，');
  const msg2 = msg1s[0]; // *
  const msg3 = msg1s[1]; //
  notification.open({
    message: (
      <p style={{ color: 'red', fontSize: '16px' }}>
        <ExclamationCircleOutlined /> 警告：权限问题通知
      </p>
    ),
    description: (
      <span>
        {msg0}：<span style={{ color: 'red' }}>{msg2}</span>，{msg3}
      </span>
    ),
    duration: 0,
    onClick: () => {
      console.log('Notification Clicked!');
    },
    onClose: () => {
      // 删除map中的msg
      map.delete(msg);
    },
  });
};
/**
 * 所有响应拦截器
 */
request.interceptors.response.use(async (response, options): Promise<any> => {
  const contentType = response.headers.get('Content-Type');
  console.log(options);
  // const rsaKey = localStorage.getItem(rsa);
  if (contentType && contentType.includes('application/json')) {
    const res = await response.clone().json();
    if (res.code === 0) {
      // 后端返回的是加密的字符串数据，需要解密
      // 使用 rsaKey 公钥 解密rsa加密数据
      // 处理 base64 加密的数据, -生产环境生效-
      // todo 暂时不使用，因为数据一多，加密和解密时间过长
      // if (process.env.NODE_ENV === 'production') {
      //   const data = decryptData(res.data, rsaKey!);
      //   if (!data) {
      //     message.error('登录失效!请刷新浏览器！');
      //     // 删除公钥
      //     localStorage.removeItem(rsa);
      //     return;
      //   }
      //   // 将解密后的数据转为对象
      //   res.data = JSON.parse(data!);
      // }
      return res.data;
    }
    if (res.code === 1) {
      // 获取公钥，不需要解密
      return res.data;
    }
    if (res.code === 40101) {
      openNotification(res.message);
      return;
    }
    if (res.code === 51111) {
      return (res.data = '错误-' + res.message);
    }
    if (res.code === 40100) {
      const { location } = history;
      if (location.pathname !== loginPath) {
        history.push(loginPath);
      }
      return;
    }
    message.error(res.message);
    return res.data;
  } else if (
    contentType &&
    contentType.includes('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
  ) {
    // 处理二进制数据，例如 xlsx 文件
    const blob = await response.clone().blob();
    // 在这里可以根据需要处理 blob 数据
    console.log(blob);

    // 返回处理后的数据，或者直接返回 blob
    return blob;
  }

  // 如果不是以上两种类型，则直接返回响应对象
  return response;
});

export default request;
