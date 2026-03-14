# Image Background Remover

一个基于 AI 的图片背景去除工具，支持一键上传、自动去背景、下载透明 PNG。

## 技术栈

- **前端**: React + Vite + Tailwind CSS
- **后端**: Python FastAPI + rembg (U2Net AI 模型)

## 项目结构

```
image-background-remover/
├── frontend/          # React 前端
│   ├── src/
│   │   ├── App.jsx
│   │   └── index.css
│   └── package.json
├── backend/           # Python FastAPI 后端
│   ├── main.py
│   └── requirements.txt
└── README.md
```

## 快速启动

### 后端

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

### 前端

```bash
cd frontend
npm install
npm run dev
```

前端访问：http://localhost:5173  
后端 API：http://localhost:8000

## 部署

- 前端：推荐 Vercel / Netlify
- 后端：推荐 Railway / Render

## 环境变量

前端 `.env` 文件：
```
VITE_API_URL=https://your-backend-url.com
```
