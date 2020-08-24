// eslint-disable-next-line import/no-extraneous-dependencies
import Mock from 'mockjs';
import remoteSearchAPI from './remoteSearch';

// Mock.setup({
//   timeout: '6000'
// })

// 登录相关

// 搜索相关
Mock.mock(/\/search\/user/, 'post', remoteSearchAPI.loginByUsername);

export default Mock;
