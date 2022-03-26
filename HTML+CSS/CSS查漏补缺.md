## 深度选择器/样式穿透

`>>>`、`/deep/`、`::v-deep`、`:v-deep()`
都是`深度选择器`，或者说`样式穿透`，用于组件内修改 UI 默认样式而不影响全局

区别在于`>>>`值作用域 CSS，在 Less/Sass 中无法识别，所以使用`deep`代替，在 Vue3.0 之前使用`/deep/`,在 vue3.0 之后使用`::v-deep`，目前最新使用`:v-deep()`

## Position

- `static`：正常文档流，无定位
- `relative`：正常文档流，相对自身定位
- `absolute`:脱离文档流，相对于父级元素中有**position 属性且不为 static 的元素**，若没有则相对于 body 定位
- `fixed`：脱离文档流，相对于浏览器窗口定位
- `sticky`：根据窗口滚动自动切换 relative 和 fixed，由 top 决定

## 几种隐藏的区别

- `visibility:hidden`：隐藏元素，元素会继续在文档流中占位，所以触发重绘，**隐藏后不能触发事件点击**

- `display:none`：隐藏元素，会在页面中删除与那苏，所以触发重拍和重绘

- `opacity:0`：透明，会继续在文档流中占位，所以触发重绘。作用在自身元素，所以**子元素会继承**，**可以触发点击事件**

- `rbga(0,0,0,0)`：透明，会继续在文档中占位，所以触发重绘。只作用于颜色和背景，所以**子元素不继承**，**可以触发点击事件**

注： `transition`过度不支持`display:none`，其他三个是支持的

## 重排和重绘

说到重排和重绘就要讲到浏览器渲染流程，说到浏览器渲染流程就说到一张图

![workflow](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/1/7/16f7ee2d9a5667b3~tplv-t2oaga2asx-zoom-in-crop-mark:1304:0:0:0.awebp)

分析一下这张图：

- 解析 HTML 文件，构建 DOM 树，同时解析 CSS 文件，生成样式树
- 讲 DOM 树和样式树结合，生成渲染树（RenderTree）
- Layout(回流/重排)：根据生成的渲染树，进行回流，得到节点的**几何信息（位置、大小）**
- Painting(重绘)：根据渲染树以及回流得到的几何信息，得到节点的**绝对像素**
- Display：将像素发送给 GPU，进行展示

每一步具体做了什么？

### 生成渲染树（RenderTree）

![生成渲染树](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2018/12/10/16798b8d839a7d6d~tplv-t2oaga2asx-zoom-in-crop-mark:1304:0:0:0.awebp)
为了构建渲染树，浏览器主要完成一下工作：

- 从根节点开始遍历每个可见节点
- 根据每个可见节点，找到样式树中对应的规则，并应用他们
- 根据每个可见节点以及对应的样式，组合生成渲染树

既然说到遍历可见节点，我们就得先知道**什么是不可见节点**

- 一些不会渲染输出的节点，比如`script、meta、link`等
- 一些通过 css 隐藏的节点。比如`display:none`。注意：注意，利用 visibility 和 opacity 隐藏的节点，还是会显示在渲染树上的。只有 display:none 的节点才不会显示在渲染树上。

**注意：渲染树只包含可见的节点**

### 回流（Layout）

前面我们通过构建渲染树，我们可将 DOM 节点以及它对应的样式结合起来，可是我们还需要**计算它们在设备视口内的确切大小，这个计算阶段就是回流**。在回流阶段，我们会根据视口具体的高度和宽度，计算出每个元素的实际像素值

### 重绘（Painting）

最终，我们通过了构建渲染树和回流阶段，我们知道了那些节点是可见的，以及可见节点的样式和具体几何信息（位置，大小），那么我们就可以**将渲染树的每个节点都转换为屏幕上的实际像素，这个过程就为重绘节点**

### 何时发生回流重绘

回流阶段： 主要计算节点的位置和几何信息，那么当页面布局和几何信息发生变化时，就会触发回流

- 添加、删除 DOM 元素
- 元素位置、尺寸（margin、padding、border、height、width 等）发生变化
- 内容发生变化，比如文本变或者图片被另一个不同尺寸的图片代替
- 页面开始渲染的时候（不可避免）
- 浏览器窗口尺寸变化（因为回流时根据视口的大小计算元素的位置和大小）
  **注意：回流一定会触发重绘，而重绘不一定会回流**

### 减少回流和重绘

- 避免大量使用 style 属性，而是用 class
- 批量进行 DOM 操作

       - 使元素脱离文档流
       - 对其进行修改
       - 将元素重新带回文档中
       例如：隐藏元素-元素修改-重新显示

- 能用 css 属性不要用 js

        - transform
        - opacity
        - Will-change
        *filters

- 尽量不用 table 布局
- 减少 offsetWidth 等属性的获取

## maging 和 padding

margin 和 padding 对行内元素有影响，比如`span`,默认设置不了宽高，但是可以设置 padding 和 margin，**不过设置后的 margin 和 padding 都只有水平方向有效果，垂直方向是没有效果的**

两个 div 上下排列，都设置 margin 会怎样？

会发生编剧重叠，**margin 都大于 0 就取较大者，一正一负就相加，都负取较大的绝对值**

为什么会这样？ 说下 BFC

## BFC

BFC 就是**块级格式上下文**，相当于一个容器，里面的布局不会影响外部的元素。IFC 就是**内联元素格式上下文**

BFC 渲染规则：

- BFC 元素垂直方向的编剧会发生重叠，由 margin 决定
- BFC 的区域不会与浮动元素的区域重叠
- BFC 是一个独立的容器，子元素不会影响外部元素
- 计算 BFC 高度的时候，浮动元素也会参加

怎么创建 BFC 或者触发 BFC

- html 就是一个 BFC
- Float 值部位 none，就是说设置浮动
- position 的值部位 absolute 或者 fixed
- overflow 为 hidden 或者 auto
- display 值为 inline-block、table-cell、table-caption、flex、inline-flex

## 清除浮动

- 给父级元素设置`overflow:hidden`
- 给估计元素设置高度
- 父级元素设置成浮动
- 浮动元素下添加一个空 div，并设置 css 样式`{clear:both;;height:0;overflow:hidden }`
- 使用伪类，如下：

```css
.clearfix:after {
  visibility: hidden;
  display: block;
  font-size: 0;
  content: " ";
  clear: both;
  height: 0;
}
.clearfix {
  zoom: 1;
}
```

## 盒模型

- 标准盒模型： width/height = content + padding + border

- IE 盒模型：width/height = content

通过 CSS 的 box-sizing 属性切换模式，content-box 就是标准模式，border-box 就是 IE 模式

## flex 布局

### 容器属性

- flex-direction ： row(水平)/row-reverse/column（垂直）/column-reverse
- flex-warp ： nowrap(不换行)/warp(换行)/wrap-reverse(换行，第一行在下方)。
- flex-flow :flex-direction 属性和 flex-wrap 属性的简写形式，默认值 row nowrap

- justify-content：flex-start/flex-end/center/space-between/space-around; 项目在方向的对齐方式

- align-items：flex-start/flex-end/center/space-between/space-around;项目在副轴（交叉轴）的对齐方式

- align-content ：flex-start/flex-end/center/space-between/space-around;定义了多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用。

### 内部子元素（项目）属性

- order ：定义项目的排列顺序，数值越小，排列越靠前，默认为 0。
- flex-grow：属性定义项目的放大比例，默认为 0，即如果存在剩余空间，也不放大

- flex-shrink ：定义项目的缩小比例，默认为 1，即如果空间不足，该项目将缩小。

- flex-basis ：在分配多余空间之前，项目占据的主轴空间（main size）。浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为 auto，即项目的本来大小。

- flex：flex-grow, flex-shrink 和 flex-basis 的简写，默认值为 0 1 auto。

- align-self 属性允许单个项目有与其他项目不一样的对齐方式，可覆盖 align-items 属性

## 常见的样式兼容问题

- 不同浏览器默认的 margin 和 padding 不一样
- chrome 默认文字最小为 12px，可添加 css 属性`-webkit-text-size-adjust:none(新版浏览器已经弃用)`；或者用`transform:scale()缩小；或者在浏览器设置中修改字体大小最小限制
- 超链接访问过后 hover 和 active 样式就不出现了，解决方法就是调整 css 属性顺序 lvha（link-visited-hover-active
  ）
- Chrome 中 visibility 的值为 collapse 和 hidden 是一样的，在 Firefox,Opera 和 IE 中，值为 collapse 和 display:none 是一样的
- CSS3 属性添加针对不同浏览器的前缀

## :before 和::before 区别

- 单冒号，用于伪类，操作文档已有的元素，侧重于丰富选择器的选择能力
- 双冒号，伪元素，创建文档树之外的元素，侧重于表达或定义不在语法定义范围内的抽象元素

区别：伪类是在原有的 dom 树中存在的元素进行一些特定的元素设置，而伪元素则是新建了元素，但是这个元素在逻辑上存在，在实际的 dom 树中却找不到，所以我理解他们的一个很大的区别就是是否创建了新的元素

## 媒体查询

通过媒体查询可以为不同大小尺寸的设备使用不同的 css，达到自适应的目的。可以通过 html 和 css 设置

```
<meta name='viewport',content='width=device-width, initial-scale=1,maximum-scale=1,user-scale=no'>
<link ref='stylesheet' type='text/css' href='xxx.css' media='only screen and (max-device-width:480px)>
```

```
@media only srceen and (max-device-width:480px){...}
```

## link 和 @import

- `link`：是`html`引入方式；最大限度的支持并行下载；优先级高于`@import`；可以通过'rel="alternate stylesheet`指定候选样式
- `@import`：是`css`引入样式，必须写在样式之前，可以嵌套但过多嵌套会导致串行下载，出现文档样式暂失效；老浏览器不支持

## 如何利用标签提升渲染速度

### link 标签

通过`rel`属性进行`预加载`，如

```
<link rel="dns-prefetch" href="//xx.baidu.com">
```

`rel`属性：

- `dns-prefetch`：浏览器会对`href`中的域名进行 DNS 解析并缓存，当再次请求该域名时就能省去 IP 查询的过程，从而较少时间损耗
- `prefetch/preload`：都是预先下载并缓存某个资源，不同的时 prefetch 可能会在浏览器忙时被忽略，而 preload 则一定会下载
- `preconnect`：正式发送 http 请求前预先执行 DNS 解析、TCP 握手、TLS 协商。通过消除往返延迟来节省时间
- `prerender`：浏览器不仅会加载资源，还会解析执行页面，并进行渲染

### script 标签

由于浏览器底层运行机制，**渲染引擎在解析 HTML 时遇到`script`标签引用文件时会暂停解析过程**，同时通过网络线程加载文件，文件加载后切换至 js 引擎执行响应代码，代码执行后在切换渲染引擎继续渲染页面

可是首先渲染可能并不依赖这些 js 文件，这就延长了页面渲染时间，所以为了减少这些时间损耗，可以通过 script 标签的三个属性来实现：

- `async` ：立即请求文件，但不会阻塞渲染引擎，而是在文件加载完成后在阻塞渲染进程并执行 js 文件。而且如果存在多个 `async` 的时候，它们之间的执行顺序也不确定，完全依赖于网络传输结果，谁先到执行谁。
- `defer`：立即请求文件，但不阻塞渲染进程，等解析玩 HTML 在执行 js。如果存在多个 `defer`标签，浏览器（IE9 及以下除外）会保证它们按照在 `HTML` 中出现的顺序执行，不会破坏 `JS` 脚本之间的依赖关系。
- `H5`标准的`type="module"`：让浏览器按照 ES6 标准将文件解析，默认阻塞与`defer`一样，也可以配合`async`在请求完成后立即执行

## href 和 src 的区别

**`href`是引用，`src`是引入**

### href

- href 引入的 css 会阻塞页面渲染，css 加载完成后才会进行渲染，所以渲染出来的是带样式的
- 不会阻塞 js 加载，但会阻塞 js 的执行，因为 js 执行可能会操作 DOM，所以 css 加载完成之前执行 js 可能会出现问题

### src

- src 引入的 js 会阻塞页面的渲染（没有 defer 和 async 的情况下），因为 js 可能会操作 dom 修改

* 多个脚本时不会阻塞后续资源的加载，但是会阻塞后续 js 逻辑的执行，按顺序执行

## SEO 和语义化

`SEO`就是搜索引擎优化，利用搜索引擎的搜索规则来提高网站的自然排名，比如网站的标题、关键字、描述精心设置，比如网站的结构布局设计和网页代码优化

`语义化`就根据内容结构化选择合适的标签和特有的属性格式化文档内容，在没有 css 情况下呈现出很好的内容结构和代码结构，便于开发者阅读和维护，同时也利于 SEO

## alt 和 title 作用及区别

共同点时利于 SEO

不同点时 alt 是图片不能正常显示时出现的提示信息；title 时鼠标移动到元素上显示的提示信息，而且大多数标签都支持 title 属性，**优先级低于 alt**；

## HTML 自动刷新或者跳转

```html
<!-- 5秒后自动跳转到page2.html -->
<meta http-equiv="Refresh" content="5; URL=page2.html" />

<!-- 30秒后自动刷新当前页面 -->
<meta http-equiv="Refresh" content="30" />
```

