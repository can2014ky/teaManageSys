const userMap = {
  admin: {
    roles: ["admin"],
    token: "admin",
    introduction: "我是超级管理员",
    avatar: "",
    name: "Super Admin",
  },
  editor: {
    roles: ["editor"],
    token: "editor",
    introduction: "我是编辑",
    avatar: "",
    name: "Normal Editor",
  },
};

export default {
  loginByUsername: (config) => {
    const { username } = JSON.parse(config.body);
    return userMap[username];
  },
  logout: () => "success",
};
