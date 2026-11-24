# Merch Finder

面向中国用户的欧美艺人官方周边导航网站。当前实现首页与艺人详情页，收录 20 位艺人的资料、肖像及官网/官方商店入口，支持分类、搜索、本机收藏和移动端触摸预览。

[在线体验](https://merch-finder-omega.vercel.app/) · [GitHub 源码](https://github.com/Liukeer-sys/merch-finder)

## 运行

在本目录执行：

```sh
npm install
npm run dev
```

打开 http://127.0.0.1:5180/ 查看 Merch Finder。若无法连接，在 VS Code 的项目终端运行 `npm.cmd run dev`，并在使用预览期间保留终端。停止服务按 Ctrl+C。
手机与电脑在同一局域网时，可访问终端的 Network 地址（需电脑防火墙允许该连接）。

```sh
npm run typecheck
npm run build
npm run preview
```

Node 检查结果为 v24.21.0，npm 为 11.19.0。依赖由 package-lock.json 锁定。
运行依赖只有 React 和 React DOM，开发依赖为 TypeScript、Vite 及 React 类型；没有路由、图标、手势或 UI 库。

## Vercel 部署

### 图片加载

网页使用 `public/images/optimized/` 中预先生成的 WebP：首页肖像最长边 600px，详情页肖像最长边 960px，官网/商店预览最长边 1280px。原始素材和原有图片映射保留，`src/imageUrl.ts` 在渲染时选择压缩版。首页前四张立即加载，其余按需加载。

替换原图后，在这台电脑执行 `D:/anaconda/python.exe scripts/optimize_images.py`，并将生成的图片及 `src/data/optimizedImages.ts` 一起提交。该脚本使用本机已有的 Pillow；Vercel 直接发布生成的文件，无需安装图片服务或额外构建依赖。

### GitHub 自动部署

Vercel 项目为 `leah-5835/merch-finder`，已连接 GitHub 仓库 `Liukeer-sys/merch-finder`，项目根目录使用仓库根目录。推送到 `main` 分支后，Vercel 自动构建并更新正式网站，线上地址保持不变。

在 VS Code 的 PowerShell 终端中，检查本次修改后提交并推送：

```powershell
git status
git diff
git add <本次需要发布的文件路径>
git commit -m "Describe the update"
git push origin main
```

将 `git add` 后的占位内容替换为实际文件路径。发布进度可在 Vercel 项目的 Deployments 页面查看；只有构建成功后，正式网站才会更新。需要手动从本机发布时，也可以运行 `npx.cmd vercel --prod`。

- Framework Preset 为 Vite。
- Build Command 为 `npm run build`，Output Directory 为 `dist`。
- `vercel.json` 配置艺人详情页的路由回退，支持直接打开或刷新 `/artists/:artistId`。
- `.vercelignore` 排除采集工作目录及开发参考文件，产品资源位于 `public/images`。
- `.vercel` 和本机环境变量文件由 `.gitignore` 排除。

## 第一阶段：工程与原型迁移

- `index.html`：中文语言、viewport 和 React 挂载点。
- `src/main.tsx`：加载统一样式并启动 React。
- `src/types/artist.ts`：Artist、Category 类型，以及分类定义。
- `src/data/artists.ts`：8 条独立演示数据，以 satisfies 检查类型。
- `public/images/artists/`：从用户提供的原型提取的本地 WebP；来源见同目录 SOURCE.md。
- `src/styles/tokens.css`：颜色、字体、常用间距、390px 页面宽度、20px 列错位和动效时间。
- `src/styles/global.css`：沿用原型的排版和状态样式。
- `Header`、`CategoryNav`、`ArtistCard`、`ArtistGrid`：可复用的展示组件。

浏览器验收：390px 宽度下页面没有横向溢出（分类栏可横向滚动），卡片为正方形、间距 8px、右列下移 20px。桌面保持居中且不超过 390px，没有底部导航。

## 第二阶段：首页交互

- `src/pages/HomePage.tsx`：管理分类、搜索展开状态和关键词（从原 App 提取）；搜索忽略大小写与首尾空格，和分类取交集。关闭搜索清空关键词。
- `SearchBar`：展开时聚焦原生 search 输入框。
- `ArtistGrid`：筛选结果按索引奇偶分到左右列，与原型顺序一致；照片墙和卡片使用稳定身份，不再用过滤条件作为照片墙 key。
- `src/hooks/useTouchPreview.ts`：通过 bindTouchPreview 统一绑定照片墙触摸事件。按住期间持续预览，移动和滚动都通过 elementFromPoint 更新卡片；8px 只用于判断是否滑动以拦截误点击，不再区分纵向滚动模式。抬手、取消、失焦或页面隐藏时清理。
- CSS 使用 touch-action: auto 和被动触摸监听器，touchstart/touchmove/scroll 不调用 preventDefault。保留原生滚动；系统若取消触摸会话，按 touchcancel 清理，不伪造仍在按住的状态。
- Hover 只在 hover:hover 且 pointer:fine 时启用，键盘 focus-visible 也可预览。
- `src/navigation.ts`：带类型的艺人详情与收藏目标。未来给 App 传入 onNavigate 即可接入路由，现在通过 App 接入 History API，详情路径为 /artists/:id。
- `NavigationNotice`：使用原生 dialog 提供导航占位反馈、模态焦点管理、Escape 关闭。

浏览器验收：选 POP 看到两张卡片；搜索 luna 剩 LUNA KAI；再选 R&B 应出现无结果提示；关闭搜索恢复 R&B 结果。点击卡片显示对应姓名的占位弹窗，收藏显示收藏弹窗，Escape/返回按钮均可关闭。

## 第三阶段：验证记录与真机清单

已通过 TypeScript 检查、Vite 生产构建，并在桌面浏览器检查了分类、组合搜索、空结果、关闭搜索、艺人入口、收藏入口和 Escape 关闭。检查并修正了 StrictMode Effect 重放导致弹窗关闭的问题。

还需真机验收（未自动验证）：

1. 手指按住卡片出现模糊与四项信息，抬手恢复。
2. 横向从左卡滑到右卡，只有当前命中的卡片保持预览；抬手不导航。
3. 从卡片区域纵向上滑，页面正常滚动，不误开详情。
4. 斜向滑动、多指缩放、系统中断手势后没有残留预览。
5. iOS Safari 与 Android Chrome 分别测试；桌面检查鼠标 Hover 与 Tab 焦点。
6. 在 320px、390px、430px 和桌面宽度检查布局与分类滚动。

建议阅读顺序：types → data → ArtistCard → ArtistGrid → App → useTouchPreview。
参考 HTML 保留不变；没有后端、数据库、账户、商品或支付系统。收藏已接入浏览器本地存储。


## 艺人详情页与共享设计系统

### 文件与核心逻辑

- `src/styles/tokens.css`：保留首页原有数值，新增语义颜色、40px Hero 标题、字重/行高、图标尺寸和点击区域、48px 描边按钮、8px 圆角、安全区相关布局变量。
- `src/styles/components.css`：共享图标按钮、描边外链、收藏状态与焦点规则。首页 Header 仍使用原 30×34px 图标区域，其余页面使用 44px 点击区域。
- `src/styles/artist-page.css`：详情页布局，移动端流式宽度、桌面最大 480px。首页仍保留原 390px 最大宽度；所有新组件引用统一 Tokens。
- `src/pages/HomePage.tsx`：原首页组合逻辑，外观与过滤/触摸交互不变。首页 Header 样式限定到 `.site-header`，避免污染详情页。
- `src/App.tsx`：History API 导航、页面切换、统一收藏状态；首页保持挂载，返回时保留查询与分类并恢复滚动位置。不存在的艺人显示明确提示。直接打开详情页时返回首页。
- `src/pages/ArtistPage.tsx`：组合 Hero、WEBSITE/MERCH Tabs 和官方链接内容。完全不渲染首页 Header。
- `ArtistHero`：本地肖像、返回、40px 姓名、紧凑 metadata、单个艺人收藏按钮；支持安全区域与图片加载失败提示。
- `SegmentedTabs`：支持点击、左右箭头、Home/End，维护 tab/tabpanel 的 ARIA 关联。
- `OfficialLinkPanel`：官网和商店共用预览、完整 URL、复制反馈与外链按钮；URL 不截断，长链接可换行。图片缺失或失败显示占位。
- `RegionStoreList`：按数据数组展示多个地区商店；ELIO MARKS 专门保留无商店示例。
- `src/hooks/useSavedArtists.ts`：统一收藏列表，localStorage 持久化并监听其他标签页变化。存储受限时保留当次会话状态并提示。
- `src/data/artistDetails.ts`：用 artistId 关联首页基础数据，不复制姓名等资料。官网和每个商店有独立 URL、预览图字段和 verified 状态。

### 演示数据与正式链接

当前全部是虚构艺人的演示资料，example.org 链接不是官方地址，可复制但不允许访问。没有抓取第三方截图。
接入正式资料时更新 artistDetails 中对应项：`url` 使用完整 HTTPS 地址、核验后设置 `verified: true`，`previewImage` 使用有权使用的本地图片地址，并提供 `previewAlt`。
只有 verified=true 且 HTTPS 地址有效时，按钮才生成带 target=_blank 和 rel=noopener noreferrer 的外链。未核验、缺失或协议不合法均禁用访问。
本次没有添加依赖，没有重新初始化项目。

### 浏览器验证步骤

1. 执行 `npm.cmd run dev`，首页点任一艺人卡，进入 `/artists/艺人ID`。检查 Hero 顶部只有返回按钮，资料旁只有一个收藏按钮。
2. 切换 WEBSITE/MERCH；LUNA KAI 有 US/UK 两个演示商店，各自有预览占位、完整 URL、复制和访问按钮。
3. 点击复制，出现“链接已复制”；模拟链接未核验，访问按钮应禁用。ELIO MARKS 的 MERCH 显示缺少店铺提示。
4. 收藏艺人，刷新后应仍是已收藏；返回首页打开顶部收藏入口，应看到该艺人，可再次进入其详情。收藏入口继续使用轻量弹窗，没有新增完整收藏页。
5. 首页选 POP 并搜索 luna，进入详情再返回，应仍保留 POP、luna 和匹配结果；从页面较低位置进入详情再返回，检查滚动位置恢复。
6. 在 360/375/390/430px 下检查详情的姓名、URL、按钮、Tab，不应有横向溢出；桌面详情保持受控宽度。
7. 直接访问 /artists/luna-kai 并刷新，详情应可加载；未知 ID 显示未找到艺人。部署到静态托管时需配置 SPA fallback 到 index.html。
8. 仍需 iOS/Android 真机检查安全区、触摸预览和滚动；非安全上下文（例如局域网 HTTP 地址）可能不支持 Clipboard API，此时会显示复制失败并允许手动选择 URL。

已在桌面浏览器验证：详情无全站 Header、四档宽度无横向溢出、Tab 切换与 Home 键、多商店、缺少商店、复制成功、收藏刷新持久化与首页同步、返回后搜索/分类保留、详情地址直接打开与刷新。


## Touch-follow Preview 修复与验收

### 原因和修复

旧代码在纵向位移超过 8px 后清空预览，并在每次 scroll 事件中结束整个触摸会话，因此手指还未离屏就会失去预览。
修复文件：

- `src/hooks/bindTouchPreview.ts`：可单独测试的原生事件绑定，照片墙统一监听 start/move，window 监听 end/cancel，跟踪同一 touch.identifier；不使用鼠标/指针事件覆盖触摸状态。
- `src/hooks/useTouchPreview.ts`：React 只管理 ref 与唯一 activeArtistId，并在卸载时移除监听。
- `src/components/ArtistGrid.tsx`：使用 activeArtistId 分配唯一激活卡片，保留原有卡片 key。
- `src/pages/HomePage.tsx`：移除随关键词/分类变化的照片墙 key。
- `src/styles/global.css`：仅调整交互属性 touch-action 为 auto，并关闭卡片的 iOS 原生长按图片菜单；没有修改布局、字体、颜色、间距和原有 Hover/渐显参数。
- `tests/touch-preview.test.mjs`：无额外测试依赖的事件回归测试。

触摸处理方式：

1. touchstart 立即命中卡片并记录 touch.identifier；新的会话不会继承旧的点击屏蔽状态。
2. touchmove 根据 clientX/clientY + elementFromPoint 命中当前卡片，不依赖最初的 event.target；经过间隙/离开照片墙时清空当前卡片，重新进入可继续跟随。
3. scroll 仅重新计算手指下方的卡片，不结束会话。滑动阈值仅用于区分点击，滑出再回到起点仍算滑动。
4. touchend/touchcancel 清除激活状态；没有延迟清理定时器，渐隐完全由原有 CSS 200ms 信息过渡与 260ms 图片过渡完成。
5. 滑动或系统取消后 500ms 内在 click 捕获阶段拦截误跳转；下一次新的正常触摸点击不受影响，键盘 detail=0 的激活仍正常。
6. touchstart/touchmove/scroll 均为 passive，不禁用全局滚动；只有误点击、触摸期间的原生 contextmenu 会阻止默认行为。系统 touchcancel/页面失焦/切换后台会结束会话。

### 已执行的验证

运行：`node --test tests/touch-preview.test.mjs`。
6 项事件级回归通过：保持 3 秒、连续 A/B/C/D、滚动不终止、滑动误点击与新点击区分、离开/重新进入/回到起点、取消/多指/隐藏/失焦及监听清理。
测试使用 Node EventTarget 与坐标命中夹具，不是 iOS/Android 浏览器模拟，不能证明真机原生手势一定通过。
桌面浏览器另外验证 Hover 信息 opacity=1、移开 opacity=0、卡片 touch-action=auto，以及点击进入详情。

### 手机手动验收（iOS Safari / Android Chrome 分别执行）

电脑运行 `npm.cmd run dev`；手机与电脑连接同一网络，使用 Vite 打印的 Network 地址打开首页。若访问不到，检查电脑网络/防火墙是否允许该服务。更新后先刷新页面，排除旧版本资源。

1. **按住**：触碰一张卡片不抬手，保持至少 3 秒；信息应持续显示。轻微上下移动仍在卡片内时也应持续。
2. **跟随**：同一根手指不抬起，跨左右卡片并继续经过下一行，累计至少 4 张；只显示当前命中的一张。经过间隙时可暂时恢复照片，进入下一张应立即显示。
3. **抬手**：松手后观察约 200–260ms 内柔和恢复，无突然重挂载或延迟再次激活。
4. **滚动**：从卡片区域正常上下滑动，页面应保持原生滚动且不跳转。卡片在手指下移动时命中应更新；若系统明确发出 touchcancel，则清理预览，重新触碰即可开始新的会话。
5. **点击**：快速点击打开对应详情；返回首页后，滑过卡片再抬手不应跳转；立即再快速点击应正常进入详情。
6. **中断**：多指缩放、切后台后返回、快速重复按住/松开，不应残留或闪现旧卡片。
7. **桌面回归**：鼠标 Hover/移开、点击、键盘 Tab/Enter、搜索与分类仍正常。

本次没有连接可操作的 iOS/Android 真机，上述手机验收尚未宣称完成。

## 首页真实艺人卡片（2026-11-08 更新）

首页现使用 `src/data/homepageArtists.ts` 的 20 位真实艺人，不再展示 8 位虚构演示艺人；演示文件保留用于旧详情与回归数据。
`src/data/artistCardImages.ts` 管理选定素材与临时占位映射。16 张用户已裁好的正方形图片从 staging/assets/artists/card 原样复制到 public/images/artists/cards；Coldplay、Eminem、Linkin Park、Oasis 尚非正方形，暂用旧黑白肖像占位。首页卡片与详情页顶部使用同一张图片，且均为 1:1。
预览身份、国家代码和全部已录入风格来自 research/artists.ts；乐队使用 Band。没有更改触摸事件、卡片 CSS 或详情样式。卡片图片新增 lazy loading 与异步解码。
详细的来源文件、尺寸、映射见 staging/verification/cards/report.md。当前首页可见 ALL、POP、R&B、HIP-HOP、ROCK、COUNTRY / FOLK；其余无对应艺人，按现有规则隐藏。
验证：npm.cmd run build，node --test tests/*.test.mjs（共9项通过）。测试覆盖 20 张卡片、4 个占位、完整预览资料、首页与详情使用同一张图，以及真实分类导航。
