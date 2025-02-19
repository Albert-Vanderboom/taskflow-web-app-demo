# 简单的 CRUD Web 应用

这是一个使用 Vue 3 (TypeScript) + FastAPI + SQLite 构建的简单 CRUD 应用。

## 项目结构 

## 前后端交互流程

1. 数据流向
   - 前端 (Vue.js) 通过 Axios 发送 HTTP 请求到后端 API
   - 后端 (FastAPI) 接收请求，进行处理并返回响应
   - 数据库 (SQLite) 存储持久化数据

2. 具体流程
   ```
   前端 (Vue.js)                    后端 (FastAPI)                数据库 (SQLite)
   +-----------+                    +------------+                +-----------+
   |           |  HTTP 请求         |            |  SQL 查询      |           |
   | 用户界面   | ----------------> | REST API   | -------------> |  数据表    |
   |           | <---------------- |            | <------------- |           |
   +-----------+  JSON 响应         +------------+  查询结果      +-----------+
   ```

3. 交互示例
   - 创建项目：
     1. 用户在前端表单输入数据
     2. Vue 组件调用 API 服务发送 POST 请求
     3. FastAPI 接收请求，验证数据
     4. 数据写入 SQLite 数据库
     5. 返回成功响应给前端
     6. 前端更新状态并显示新数据

4. 数据验证
   - 前端：使用 TypeScript 类型检查
   - 后端：使用 Pydantic 模型验证
   - 数据库：使用 SQLAlchemy 模型定义

5. 错误处理
   - 前端显示友好的错误提示
   - 后端返回标准的错误响应
   - 统一的错误处理机制

6. 状态管理
   - 前端使用 Pinia 管理状态
   - 后端维护数据库连接状态
   - 使用 JWT 管理用户会话（可选）

7. 跨域处理
   - 后端配置 CORS 中间件
   - 允许前端域名访问 API
   ```python
   # backend/app/main.py
   from fastapi.middleware.cors import CORSMiddleware
   
   app.add_middleware(
       CORSMiddleware,
       allow_origins=["http://localhost:5173"],  # Vue 开发服务器
       allow_credentials=True,
       allow_methods=["*"],
       allow_headers=["*"],
   )
   ``` 

### 后端

1. 安装依赖
   ```bash
   # 使用 conda 创建和激活环境
   conda env create -f environment.yml
   conda activate crud-app
   ```

2. 运行项目
   ```bash
   # 确保在 backend 目录下
   cd backend
   
   # 运行服务器
   python -m uvicorn app.main:app --reload
   ```

服务器将在 http://localhost:8000 运行
可以访问 http://localhost:8000/docs 查看 API 文档

### 前端

   ```bash
   cd frontend
   npm install
   npm run format
   npm run dev
   ```

1. 安装依赖
   ```bash
   # 使用 npm
   npm create vue@latest

   # 选择以下选项：
   # ✔ Project name: frontend
   # ✔ Add TypeScript? Yes
   # ✔ Add JSX Support? No
   # ✔ Add Vue Router for Single Page Application development? Yes
   # ✔ Add Pinia for state management? Yes
   # ✔ Add Vitest for Unit Testing? No
   # ✔ Add an End-to-End Testing Solution? No
   # ✔ Add ESLint for code quality? Yes
   # ✔ Add Prettier for code formatting? Yes
   ```
