# Suna AI Frontend

Suna AI Frontend - 开源 AI Agent 平台的前端应用。这是一个现代化的 Next.js 应用，提供直观的用户界面来与 AI Agent 交互。

## 功能特性

- **现代化 UI**: 基于 Next.js 15 和 React 19 的响应式界面
- **实时流式响应**: WebSocket 支持的实时消息流
- **多语言支持**: 内置中英文等多语言支持
- **Markdown 渲染**: 支持代码高亮、数学公式、Mermaid 图表
- **文件管理**: 上传、预览和编辑多种文件格式
- **沙箱桌面**: 虚拟桌面环境，支持文件操作和终端
- **深色/浅色主题**: 自适应系统主题

## 技术栈

- **Next.js 15** - React 框架 (App Router)
- **React 19** - UI 库
- **TypeScript** - 类型安全
- **Tailwind CSS** - 样式
- **Shadcn/ui** - 组件库
- **Supabase** - 认证和实时数据
- **TanStack Query** - 数据获取

## 快速开始

### 1. 环境要求

- Node.js 18+
- pnpm (推荐) 或 npm
- Supabase 项目
- 运行中的后端服务

### 2. 安装依赖

```bash
# 安装 pnpm
npm install -g pnpm

# 安装依赖
pnpm install
```

### 3. 环境配置

复制环境变量模板：

```bash
cp .env.example .env.local
```

编辑 `.env.local` 文件：

```bash
# Supabase 配置
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# 后端 API 地址
NEXT_PUBLIC_BACKEND_URL=http://localhost:8000/v1

# 应用 URL
NEXT_PUBLIC_URL=http://localhost:3000

# 环境模式
NEXT_PUBLIC_ENV_MODE=local
```

### 4. 启动开发服务器

```bash
pnpm dev
```

应用将在 `http://localhost:3000` 启动。

## 主要页面

- `/` - 首页/着陆页
- `/dashboard` - 仪表板
- `/agents` - Agent 管理
- `/agents/[threadId]` - Agent 对话
- `/knowledge` - 知识库
- `/settings` - 用户设置
- `/pricing` - 定价页面

## 项目结构

```
suna-frontend/
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── (dashboard)/     # 登录后页面
│   │   ├── (home)/          # 公共页面
│   │   ├── auth/            # 认证相关
│   │   └── api/             # API 路由
│   ├── components/          # React 组件
│   │   ├── ui/              # 基础 UI 组件
│   │   ├── thread/          # 对话相关组件
│   │   ├── agents/          # Agent 管理组件
│   │   ├── sidebar/         # 侧边栏组件
│   │   └── billing/         # 计费相关
│   ├── hooks/               # 自定义 Hooks
│   ├── lib/                 # 工具函数
│   ├── stores/              # 状态管理
│   └── i18n/                # 国际化
├── public/                  # 静态资源
├── translations/            # 翻译文件
└── package.json
```

## 环境变量说明

| 变量名 | 必需 | 说明 |
|--------|------|------|
| `NEXT_PUBLIC_SUPABASE_URL` | ✅ | Supabase 项目 URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | ✅ | Supabase 匿名密钥 |
| `NEXT_PUBLIC_BACKEND_URL` | ✅ | 后端 API 地址 |
| `NEXT_PUBLIC_URL` | ✅ | 应用 URL |
| `NEXT_PUBLIC_ENV_MODE` | ⚪ | 环境模式 (local/production) |

## 主要组件

### ThreadComponent
核心对话组件，支持：
- 消息流式渲染
- 工具调用展示
- 文件附件处理
- 语音输入

### KortixComputer
虚拟桌面环境，提供：
- 文件浏览器
- 终端访问
- 代码编辑器
- 电子表格应用

### AgentSelector
Agent 选择和管理组件：
- 创建新 Agent
- 切换当前 Agent
- 配置 Agent 设置

## 开发指南

### 运行测试

```bash
pnpm test
```

### 代码检查

```bash
pnpm lint
```

### 构建生产版本

```bash
pnpm build
```

### 类型检查

```bash
pnpm type-check
```

## 国际化

支持的语言：
- 英语 (en)
- 中文 (zh)
- 日语 (ja)
- 韩语 (ko)
- 法语 (fr)
- 德语 (de)
- 西班牙语 (es)
- 意大利语 (it)
- 葡萄牙语 (pt)

添加新语言：
1. 在 `translations/` 目录创建 `{lang}.json`
2. 在 `src/i18n/config.ts` 添加语言配置

## Docker 部署

```bash
# 构建镜像
docker build -t suna-frontend .

# 运行容器
docker run -p 3000:3000 --env-file .env.local suna-frontend
```

## Vercel 部署

```bash
# 安装 Vercel CLI
npm install -g vercel

# 部署
vercel --prod
```

## 许可证

MIT License

## 相关链接

- [Suna AI 官网](https://suna.ai)
- [Kortix](https://kortix.ai)
- [GitHub 仓库](https://github.com/kortix-ai/suna)
