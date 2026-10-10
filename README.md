# GitHub AI Shortcuts

轻量 Chrome Manifest V3 扩展，使用工具栏弹窗访问 GitHub 仓库的 AI 阅读工具。独立实现，并非 GitRepoTools 官方更新版。

从当前 GitHub 仓库地址获取 owner/repo，通过浏览器工具栏弹窗分别打开 Gitingest、GitDiagram、DeepWiki，也支持一次在后台新开三个标签页。原 GitHub 页面保持打开。

不向 GitHub 页面注入按钮，不依赖 GitHub DOM 或 CSS。文件、目录、Issues、PR、Release 等仓库子页面统一打开仓库根地址。扩展只负责打开网站；文档是否已生成、服务的额度、登录及私有仓库权限取决于各网站。

## Windows / Chrome 安装

1. 在仓库首页点击 Code → Download ZIP，解压并把文件夹放在固定位置。
2. 打开 chrome://extensions/，开启右上角“开发者模式”。
3. 点击“加载已解压的扩展程序”，选择包含 manifest.json 的 github-ai-shortcuts 文件夹。
4. 点击 Chrome 右上角拼图图标，固定 GitHub AI Shortcuts。
5. 打开任意公开 GitHub 仓库，点击工具栏扩展图标，再选择一个服务或“全部打开”。

安装后请保留解压后的文件夹。可禁用原 GitRepoTools，以免混淆。

## 权限和数据

只申请 activeTab：点击扩展时读取当前页面 URL。无需 API Key，不发送代码、GitHub Cookie 或 GitHub Token，不后台扫描浏览记录。点击服务按钮后，对应服务会收到目标仓库地址。

## 验证范围

已使用本地模拟 Chrome API 验证 URL 提取、无效页面过滤、三个标签页创建及原页面保持激活。尚未在用户本机 Chrome 中加载验证。

## 许可证

MIT，见 LICENSE。
