# 三木图书管理系统

# 简介

book-admin 系列是包含了完整的前端代码和后端代码。目前完成的技术栈是 前端有 react，后端有 express+mongodb。

目前这个仓库是前端部分，基于 **react、nextjs、antd** 技术栈实现的。

**通过这个项目你可以学习到：**

1. 如何使用 nextjs 开发一个真实项目
2. react 的基本语法以及 react hook 的使用
3. react 项目是如何请求数据
4. axios 的封装
5. react 的组件如何封装

如果你只关心学习 react 相关的知识，则下载这个仓库运行即可，它通过 apifox 实现了完整的 mock 数据，访问 [mock 服务](https://www.apifox.cn/apidoc/shared-e625f799-2c80-483c-beb7-eb6c9ef4a552)。你只需要启动项目，无需其他操作，即可使用完整的前端功能。

若你不想用我搭建好的 mock 数据，可以联系我要完整的 mock 数据导出包，导入到自己的 apifox 中使用。

### 搭配后端启动

若你想学习完整的前端后端的知识，可以访问 [book-admin-express](https://github.com/calmound/book-admin-express)。它是对应的服务端代码，基于 **express、mongoodb** 技术栈实现的。关于后端项目如何启动，详情查看服务端的仓库介绍。

### 规划

book-admin 系统前端实现了 **react** 版本，后端实现了 **express** 和 **mongodb** 版本。未来前端还会实现 **vue**，后端实现 **nestjs** 和 **mysql**。每个技术栈都独占一个仓库，方便感兴趣的同学自由搭配前后端项目的技术栈。

**如果对你有一些帮助，欢迎 star**！

# 功能介绍

## 功能流程图

![](https://raw.githubusercontent.com/calmound/book-admin-react/master/screenshot/1.png)

### 系统演示

![](https://raw.githubusercontent.com/calmound/book-admin-react/master/screenshot/3.gif)

# 启动

1. 下载代码，终端进入该项目目录下
2. 下载依赖包，执行

   ```shell
   npm install
   ```

3. 若连接启动 mock 服务，打开根目录下的 next.config.js 文件，确认以下代码不在注释中

   ```
   destination: `https://mock.apifox.cn/m1/2398938-0-default/api/:path*`,
   ```

4. 若期望连接 nodejs 的本地服务，打开根目录下的 next.config.js 文件，确认以下代码不在注释中

   ```javascript
   destination: `http://localhost:3001/api/:path*`,
   ```

5. 运行项目

   ```shell
   npm run dev
   ```

6. 访问 localhost:3000/login
7. 看到如下页面，表明启动成功
   ![](https://raw.githubusercontent.com/calmound/book-admin-react/master/screenshot/2.png)
8. 账号，管理员（账号：admin,密码：admin），用户（账号：user，密码：user）
