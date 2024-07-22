// 用户信息数据
function createUserList() {
    return [
      {
        userId: 1,
        userName: "admin",
        password: "123456",
        desc: "平台管理员",
        roles: ["平台管理员"],
        buttons: ["cuser.detail"], // 按钮权限标识
        routes: ["home"], // 路由权限标识
        token: "Admin Token",
        avatar:'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
      },
      {
        userId: 2,
        userName: "system",
        password: "123456",
        desc: "系统管理员",
        roles: ["系统管理员"],
        buttons: ["cuser.detail", "cuser.user"],
        routes: ["home"],
        token: "System Token",
      }
    ];
  }
  
  // 对外暴露一个数组：数组里面包含两个接口
  // 1. 登录接口  2. 获取用户信息接口
  export default [
    // 用户登录接口
    {
      url: "/api/user/login", // 请求地址
      method: "post", // 请求方式
      response: ({ body }) => {
        // 获取请求体携带过来的用户名与密码
        const { userName, password } = body;
        // 调用获取用户信息函数，用于判断是否有此用户
        const checkUser = createUserList().find(
          (item) => item.userName === userName && item.password === password
        );
        // 没有用户返回失败信息
        if (!checkUser) {
          return { code: 201, data: { message: "账号或者密码不正确" } };
        }
        // 如果有返回成功信息
        const { token } = checkUser;
        return { code: 200, data: { token } };
      }
    },
    // 获取用户信息
    {
      url: "/api/user/info",
      method: "get",
      response: (request) => {
        // 获取请求头携带token
        const token = request.headers.token;
        // 查看用户信息是否包含有次token用户
        const checkUser = createUserList().find((item) => item.token === token);
        // 没有返回失败信息
        if (!checkUser) {
          return { code: 201, data: { message: "获取用户信息失败" } };
        }
        // 如果有返回成功信息
        return { code: 200, data: { checkUser } };
      }
    }
  ];