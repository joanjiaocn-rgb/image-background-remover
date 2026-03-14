# Image Background Remover

一个免费的在线图片去背景工具，基于 AI 自动去除图片背景。

## 技术栈

- 前端：React 18 + Vite + Tailwind CSS
- 后端：Python FastAPI + rembg (U2Net)

## 快速开始

### 后端

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

后端启动后访问 http://localhost:8000

### 前端

```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

前端启动后访问 http://localhost:5173

## 部署

- 前端：推荐 [Vercel](https://vercel.com)（免费）
- 后端：推荐 [Railway](https://railway.app) 或 [Render](https://render.com)（有免费额度）

部署后端后，将前端 `.env` 中的 `VITE_API_URL` 改为后端地址。

## API

### POST /remove-bg

上传图片，返回去背景后的 PNG。

**请求：** `multipart/form-data`，字段名 `file`  
**响应：** `image/png` 二进制流
