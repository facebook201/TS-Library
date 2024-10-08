---
title: 0、WebGL基础知识总结
date: '2021-06-13'
type: 技术
tags: WebGL
note: WebGL基础知识总结
---
## 1、什么是GLSL？

`GLSL` 的中文意思是 `OpenGL` 着色语言，英文全称是 `OpenGL Shading Language`，它是用来在 `OpenGL` 编写 **着色器程序** 的语言。

#### 1、着色器程序

着色器程序是在显卡（GPU）上运行的简短程序，代替 **`GPU`固定渲染管线** 的一部分，使 GPU 渲染过程中的某些部分允许开发者通过编程进行控制。**着色器程序允许我们通过编程来控制 `GPU` 的渲染。**


## 2、内置变量
|  内置变量   | 含义  | 值数据类型
|  ----  | ----  | ----
| gl_PointSize  | 点渲染模式，正方形点区域渲染像素大小,**只有在绘制图元是点的时候才会生效** | float
| gl_Position  | 顶点位置坐标,顶点的裁剪坐标系坐标，包含 X, Y, Z，W 四个坐标分量，顶点着色器接收到这个坐标之后，对它进行透视除法，即将各个分量同时除以 W，转换成 NDC 坐标，NDC 坐标每个分量的取值范围都在【-1, 1】之间 | vec4
| gl_FragColor  | 片元颜色值,片元（像素）颜色，包含 R, G, B, A 四个颜色分量，且每个分量的取值范围在【0,1】之间。不同于我们常规颜色的【0，255】取值范围，所以当我们给 gl_FragColor 赋值时，也需要对其进行转换。平常我们所采用的颜色值（R, G, B, A），对应的转换公式为： (R值/255，G值/255，B值/255，A值/1） | vec4
| gl_FragCoord  | 片元坐标，单位像素 | vec2
| gl_PointCoord  | 点渲染模式对应点像素坐标 | vec2
### 1、gl_PointSize
内置变量 `gl_PointSize` 主要是用来设置顶点渲染出来的方形点像素大小。值是一般是在绘制函数 `gl.drawArrays()` 绘制模式是点模式 `gl.POINTS` 的时候使用。
```js
void main() {
  //给内置变量gl_PointSize赋值像素大小，注意值是浮点数
  gl_PointSize=10.0;
}

//绘制函数绘制模式：点gl.POINTS
/*
gl.POINTS表示绘制类型，0表示从第1个数据开始绘制，4表示绘制4个点
*/
gl.drawArrays(gl.POINTS,0,4);
```
### 2、gl_Position
`gl_Position` 内置变量表示最终传入片元着色器片元化要使用的顶点位置坐标。如果有多个顶点，每个顶点都要执行一遍顶点着色器主函数`main` 中的程序。
```js
attribute a_posotion;
void main(){
    //逐顶点处理数据
    gl_Position = apos;
}
```
**顶点传递数据**
```js
const aposLocation = gl.getAttribLocation(program,'a_posotion');
//类型数组构造函数Float32Array创建顶点数组
const data=new Float32Array([0.5,0.5,-0.5,0.5,-0.5,-0.5,0.5,-0.5]);
//创建缓冲区对象
const buffer=gl.createBuffer();
//绑定缓冲区对象,激活buffer
gl.bindBuffer(gl.ARRAY_BUFFER,buffer);
//顶点数组data数据传入缓冲区
gl.bufferData(gl.ARRAY_BUFFER,data,gl.STATIC_DRAW);
//缓冲区中的数据按照一定的规律传递给位置变量apos
gl.vertexAttribPointer(aposLocation,2,gl.FLOAT,false,0,0);
//允许数据传递(这句代码放在能获取到aposLocation的任意位置都可以)
gl.enableVertexAttribArray(aposLocation);
```
### 3、gl_FragColor
`gl_FragColor` 内置变量主要用来设置片元像素的颜色，出现的位置是片元着色器语言的 `main` 函数中。包含 4 个分量 `(R, G, B, A)`，各个颜色分量的取值范围是`【0，1】`，也不同于我们常规颜色的`【0，255】`取值范围，所以当我们给 `gl_FragColor` 赋值时，也需要对其进行转换。平常我们所采用的颜色值`（R, G, B, A）`，对应的转换公式为： `(R值/255，G值/255，B值/255，A值/1）`。
```js
  void main() {
    // 设置片元颜色为红色
    gl_FragColor = vec4(1.0,1.0,0.0,1.0);
  }
```
**纹理采样**
```js
// 接收插值后的纹理坐标
varying vec2 v_TexCoord;
// 纹理图片像素数据
uniform sampler2D u_Sampler;
void main() {
  // 采集纹素，逐片元赋值像素值
  gl_FragColor = texture2D(u_Sampler,v_TexCoord);
}
```
### 4、gl_PointCoord
渲染点片元坐标。一个顶点渲染为一个正方形区域，每个正方形区域以正方向区域的左上角建立一个直角坐标系，然后使用内置变量`gl_PointCoord` 描述正方形区域中像素或者说片元的坐标，比如正方形区域的左上角坐标是 `(0.0,0.0`),正方形区域几何中心坐标是 `(0.5,0.5)`，右下角坐标是`(1.0,1.0)`。 图片来源于网络

<img src="../..//images/webgl/PointCoord.png" />

**`gl_PointCoord` 在片元着色器中的应用** 
```js
precision lowp float;
void main(){
    float r = distance(gl_PointCoord, vec2(0.5, 0.5));
    //根据距离设置片元
    if(r < 0.5){
        // 正方形区域片元距离几何中心半径小于0.5，像素颜色设置红色
        gl_FragColor = vec4(1.0,0.0,0.0,1.0);
    }else {
        // 正方形区域距离几何中心半径不小于0.5的片元剪裁舍弃掉：
        discard;
    }
}
```
下面是使用 `gl_pointCoord`裁剪成 **圆形** 的图片和没有被裁减的 **正方形** 的图片对比情况。
<div style='text-align:center'>
<img src="../../images/webgl/PointCoord-圆形.png" width='300' />  <img src="../../images/webgl/PointCoord-正方形.png" width='300' />
</div>

### 5、gl_FragCoord
内置变量 `gl_FragCoord` 表示 `WebGL` 在 `canvas` 画布上渲染的所有片元或者说像素的坐标。坐标原点是 `canvas` 画布的左上角，水平向右方向是 `x` 轴正向，竖直向下方向为 `y` 轴正方向。，`gl_FragCoord` 坐标的单位是像素，`gl_FragCoord` 的数据类型是`vec2`, 通过 `gl_FragCoord.x`、`gl_FragCoord.y` 可以分别访问片元坐标的纵横坐标。

**`gl_FragCoord` 在片元着色器中的应用** 
```js
void main(){
    // 根据片元的x坐标，来设置片元的像素值
    if(gl_FragCoord.x < 200.0){
        //默认为 canvas原来的颜色
    }
    else if (gl_FragCoord.x < 250.0) {
        // canvas画布上[0,300)之间片元像素值设置
        gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
    } else if (gl_FragCoord.x <= 300.0) {

        // canvas画布上(300,400]之间片元像素值设置 绿色
        gl_FragColor = vec4(0.0, 1.0, 0.0, 1.0);
    } else {
        // canvas画布上(400,500]之间片元像素值设置 蓝色
        gl_FragColor = vec4(0.0, 0.0, 1.0, 1.0);
    }
}
```
结果如下图所示：

<img src="../../images/webgl/gl_FragCoord.png" width='400' />

## 3、attribute和uniform以及varying的区别
`attribute` 和 `uniform` 关键字的目的主要是为了 `javascript` 语言可以通过相关的WebGL API把一些数据传递给着色器。而`varying` 主要是将顶点着色器中的数据传递给片元着色器。
| 变量类型 | 数据传递方向 | 作用
| ---- | ---- | ----
| attribute  | 从js脚本中传递到顶点着色器 | 在顶点着色器中声明跟**顶点相关的数据**
| uniform  | 从js脚本中传递到顶点、片元着色器 | 在着色器中声明**非顶点数据**(如光源位置数据、方向数据、矩阵数据)，既可以在顶点着色器中定义，也可以在片元着色器中定义。
| varying  | 从顶点着色器传递到片元着色器 | 在顶点着色器中声明**需要差值计算**的顶点数据

`varying`数据，需要同时在顶点着色器和片元着色器中声明。`varying` 类型变量主要是为了完成顶点着色器和片元着色器之间的**数据传递和插值计算**
**在顶点着色器**
```js
attribute vec4 a_color;// attribute声明顶点颜色变量
varying vec4 v_color;//varying声明顶点颜色插值后变量
void main() {
  //顶点颜色插值计算
  v_color = a_color;
}
```
**片元着色器**
```js
// 接收顶点着色器中v_color数据
varying vec4 v_color;
void main() {
  // 插值后颜色数据赋值给对应的片元
  gl_FragColor = v_color;
}
```

## 4、深度测试和α融合
`GPU`的渲染管线有各种功能单元,通过执行`gl.enable`函数可以开启。`gl.enable`可以传入不同的值来开启相应的功能。常用的一些值如下所示：
[`gl.enable`官方文档地址](https://developer.mozilla.org/zh-CN/docs/Web/API/WebGLRenderingContext/enable)
```js
gl.DEPTH_TEST：启用深度测试,激活深度比较，并且更新深度缓冲区,根据坐标的远近自动隐藏被遮住的图形。
gl.CULL_FACE：激活多边形正反面剔除。
gl.BLEND：激活片元的颜色融合计算
gl.POLYGON_OFFSET_FILL：多边形偏移，解决深度冲突
...
```
可以通过调用`gl.isEnabled()`,来检测可用性。
```js
gl.isEnabled(gl.DITHER);
// true
```

#### 1、α融合
`α`融合本质上就是颜色相互叠加融合。**先绘制的物体的颜色是目标颜色，后绘制的物体的颜色是源颜色。**
```js
//开启GPU渲染管线的α融合功能
gl.enable(gl.BLEND);
//源颜色和目标颜色融合的计算方法
gl.blendFunc(gl.SRC_ALPHA,gl.ONE_MINUS_SRC_ALPHA);
```
`gl.enable(gl.blend)`表示开启渲染管线的`α`融合,
`gl.blendFunc()`的第一个参数是源颜色的系数，第二个参数是目标颜色的系数，两组像素值乘以各自系数后然后相加得到融合后的像素值，覆盖原来的像素值。

`gl.blendFunc(gl.SRC_ALPHA,gl.ONE_MINUS_SRC_ALPHA)`,中的第一个参数`gl.SRC_ALPHA`表示的是源颜色像素值透明度分量`A1`的值，第二个参数`gl.ONE_MINUS_SRC_ALPHA`表示`1-A1`。

比如源颜色像素值是 `(R1,G1,B1,A1)`,目标颜色像素值是 `(R2,G2,B2,A2)`融合后的像素值计算方法如下：
```js
R3 = R1 x A1 + R2 x (1 - A1)
R3 = G1 x A1 + G2 x (1 - A1)
R3 = B1 x A1 + B2 x (1 - A1)
```
如果后绘制的面不透明，相当于 `A1`等于1，代入上面的公式 `1 - A1` 就表示0，也就是说先绘制面的像素值被完全覆盖；如果后绘制的面完全透明，`A1` 是0，那么 `R1 x A1` 结果就是0， 也就是说绘制的面无论它是什么颜色，融合后的像素值就是后面物体的像素，也就是说后绘制的三角面你看不到它的存在。

开始  `α融合` 后的效果

<img src='../../images/webgl/webgl-α融合.png' alt='暂无图片' width='300'>

不开启的效果

<img src='../../images/webgl/webgl-未开启α融合.png' width='300'>

#### 2、深度测试

深度测试跟片元的深度值`z`有关。片元的深度值`Z`反应的是一个片元距离观察位置的远近。
+ **开启渲染管线的深度测试单元**(`gl.enable(gl.DEPTH_TEST)`)，所有的片元会经过该功能单元的逐片元测试，通过比较片元深度值`Z`，`WebGL`图形系统默认沿着Z轴正方向观察， 同一个屏幕坐标位置的所有片元离观察点远的会被舍弃，只保留一个离眼睛近的片元。前面的立方体中都开启了深度测试单元。<br>
<img src='../../images/webgl/立方体-开始深度测试.png' alt='暂无图片' width='300' /><br>
+ 如果**渲染管线没有开启深度测试单元**， 深度缓冲区中的片元深度数据(`z`值)不会起到什么作用。对于相同屏幕坐标的片元，`WebGL`会按照片元的绘制顺序覆盖替换，后绘制片元的像素值覆盖颜色缓冲区中已经绘制片元的像素值。立方体每个面的片元绘制顺序是由该面的顶点在类型数据中的顺序决定的。<br>
<img src='../../images/webgl/立方体-未开启深度测试.png' alt='暂无图片' width='300' /><br>
+ 如果立方体开启深度测试的同时还开启了α融合的话，如果想要α融合起作用的话，需要关闭深度测试(调用`gl.blendFunc()`)， α融合会在深度测试之后进行。 **深度测试单元是比较先后绘制两个片元的深度值决定取舍，α融合单元是把先后绘制的两个片元RGB值分别乘以一个系数得到新的`RGB`值**，覆盖替换原来颜色缓冲区中同屏幕坐标的RGB值。<br>
<img src='../../images/webgl/立方体-开始深度测试和α融合.png' alt='暂无图片' width='300'><br>

## 5、WebGL坐标系
`WebGL` 采用右手坐标系，`X`轴向右为正，`Y` 轴向上为正，`Z` 轴沿着屏幕往往为正。

`WebGL`坐标系分为如下几类：
模型坐标系——>世界坐标系——>观察坐标系(又称相机坐标系、视图坐标系)——>裁剪坐标系(`gl_Position`接收的值)——>NDC坐标系——>屏幕坐标系。
+ **模型坐标系**：一个物体通常由很多点构成，每个点在模型的什么位置？我们需要用一个坐标系来参照，这个坐标系就叫模型坐标系，模型坐标系原点通常在模型的中心，各个坐标轴遵循右手坐标系，即 X 轴向右，Y 轴向上，Z 轴朝向屏幕外。
+ **世界坐标系**：默认情况模型坐标系和世界坐标系重合。如果模型不在世界坐标系中心，那么就需要对模型坐标系进行转换，将模型的各个相对于模型中心的顶点坐标转换成世界坐标系下的坐标。

+ **观察坐标系**：将世界空间坐标转化为用户视野前方的坐标而产生的结果。人眼或者摄像机看到的世界中的物体相对于他自身的位置所参照的坐标系就叫观察坐标系。是以人眼/摄像机为原点而建立的坐标系。
+ **裁剪坐标系**：将相机坐标进行投影变换后得到的坐标，也就是 `gl_Position` 接收的坐标。观察坐标变换为裁剪坐标的投影矩阵可以为两种不同的形式，每种形式都定义了不同的平截头体。
  + 正射投影矩阵：又名正交投影，正射投影矩阵创建的是一个立方体的观察箱，它定义了一个裁剪空间，在该裁剪空间之外的坐标都会被丢弃。 正射投影矩阵需要指定观察箱的长度、宽度和高度。经过正射投影矩阵映射后的坐标 `w` 分量不会改变，始终是 1，所以在经过透视除法后物体的轮廓比例不会发生改变，这种投影一般用在建筑施工图纸中，不符合人眼观察世界所产生的近大远小的规律。
<img src='../../images/webgl/正射投影矩阵.png'>
  + 透视投影矩阵: 透视投影矩阵将给定的平截头体范围映射到裁剪空间，除此之外它还会修改每个顶点坐标的 `w` 值，使得离人眼越远的物体的坐标 `w` 值越大。被变换到裁剪空间的坐标都会在 `-w` 到 `w` 的范围之间（任何大于这个范围的坐标都会被裁剪掉）。`WebGL` 要求所有可见的坐标都落在`【-1.0 - 1.0】`范围内，因此，一旦坐标转换到裁剪空间，透视除法就会被应用到裁剪坐标上。透视投影需要设置**近平面、远平面、透视深度**。
<img src='../../images/webgl/透视投影矩阵.png' alt='暂无图片'>
**NDC坐标系**：一旦所有顶点被变换到裁剪空间，`GPU` 会对裁剪坐标执行透视除法，在这个过程中 `GPU` 会将顶点坐标的 `X，Y，Z` 分量分别除以齐次 `W` 分量。这一步会在每一个顶点着色器运行的最后被自动执行。最终所有坐标分量的范围都会在 `【-1，1】`之间，超出这个范围的坐标都将被 `GPU` 丢弃。
**屏幕坐标系**：有了 `NDC` 坐标之后，`GPU` 会执行最后一步变换操作，视口变换，这个过程会将所有在`【-1, 1】`之间的坐标映射到屏幕空间中，并被变换成片段。

**坐标转换流水线**
+ `CPU`中将模型坐标转换成裁剪坐标
  + 顶点在模型坐标系中的坐标经过模型变换，转换到世界坐标系中。主要变换有平移、旋转和缩放(模型变换)
  + 然后通过摄像机观察这个世界，将物体从世界坐标系中转换到观察坐标系。(视图变换)
  + 进行投影变换，将物体从观察坐标系转换到裁剪坐标系。(投影变换)
+ `GPU`接收`CPU`传递过来的裁剪坐标。
  + 接收裁剪坐标，通过透视除法，将裁剪坐标转换成 `NDC` 坐标。(透视除法)
  + `GPU` 将 `NDC` 坐标通过视口变换，渲染到屏幕上。将 3D 坐标转变成 2D 坐标，在 GPU 中执行，我们无法通过编程干预。(视口变换)
  ```js
  //设置视口 宽500 高300
  gl.viewport(0, 0,  500, 300);
  ```

## 6、纹理贴图
简单的说就是将 `png、jpg` 等格式图片显示在 `WebGL` 三维场景中。例如往三维模型上贴商标。

在着色器中图片的坐标称为**纹理坐标**，图片称为**纹理图像**，图片上的一个像素称为**纹素**，一个纹素就是一个 `RGB` 或者`RGBA`值。把整个图片看成一个平面区域，用一个二维`UV`坐标可以描述每一个纹素的位置。下图来源于网络。

<img src="../../images/webgl/WebGL-UV.png" alt="暂无图片" />

上图展示了 **纹理坐标** 和 **顶点坐标** 的对应关系。在纹理坐标系统中左下角是坐标原点 `(0,0)`。顶点坐标在顶点着色器中经过光栅化处理后得到片元数据，纹理坐标在光栅化过程中会进行插值计算，得到一系列的纹理坐标数据，纹理坐标会按照一定的规律对应纹理图像上的纹素，内插得到的片元纹理坐标会传递给片元着色器。

在片元着色器中利用插值得到的坐标数据可以抽取纹理图像中的纹素，将抽取的纹素逐个赋值给光栅化顶点坐标得到的片元。

**顶点着色器代码**
```js
attribute vec4 a_Position;//顶点位置坐标
attribute vec2 a_TexCoord;//纹理坐标
varying vec2 v_TexCoord;//插值后纹理坐标
void main() {
  //顶点坐标apos赋值给内置变量gl_Position
  gl_Position = a_Position;
  //纹理坐标插值计算
  v_TexCoord = a_TexCoord;
}
```
**片元着色器代码**
```js
/所有float类型数据的精度是highp
precision highp float;
// 接收插值后的纹理坐标
varying vec2 v_TexCoord;
// 纹理图片像素数据
uniform sampler2D u_Sampler;
void main() {
  // 采集纹素，逐片元赋值像素值
  gl_FragColor = texture2D(u_Sampler,v_TexCoord);
}
```

## 7、彩色图转灰度图

#### 1、亮度

灰度图颜色只有黑白两色，**灰度图颜色分量只有光亮度这一个分量**，黑色相当于没有光照，白色相当于最大光照强度。简单的说，`RGB` 分量越大，灰度图就越接近白色，具体的计算公式如下所示，`RGB`的系数之和为1，这样可以保证计算结果不会超过`WebGL`颜色分量默认的最大值1。
```js
亮度=0.3*R+0.5*G+0.2*B;
```
这里将彩色图转换为灰度图就需要在片元着色器中进行处理了。
```js
 //浮点数设置为中等精度
precision mediump float;
uniform sampler2D u_Texture;
varying vec2 v_Uv;
void main() {
  //采集纹素
  vec4 texture = texture2D(u_Sampler,v_Uv);
  //计算RGB三个分量光能量之和，也就是亮度
  float luminance = 0.3*texture.r+0.5*texture.g+0.2*texture.b;
  //逐片元赋值，RGB相同均为亮度值，用黑白两色表达图片的明暗变化
  gl_FragColor = vec4(luminance,luminance,luminance,1.0);
}
```

#### 2、透明度融合
比如源颜色像素值是 `(R1,G1,B1,A1)`,目标颜色像素值是 `(R2,G2,B2,A2)`，融合后的像素值计算方法如下：
```js
R3 = R1 x A1 + R2 x (1 - A1)

R3 = G1 x A1 + G2 x (1 - A1)

R3 = B1 x A1 + B2 x (1 - A1)
```
如果后绘制的面不透明，相当于 `A1`等于1，代入上面的公式 `1 - A1` 就表示0，也就是说先绘制面的像素值被完全覆盖；如果后绘制的面完全透明，`A1` 是0，那么 `R1 x A1` 结果就是0， 也就是说绘制的面无论它是什么颜色，融合后的像素值就是后面物体的像素，也就是说后绘制的三角面你看不到它的存在。
```js
/**
 * 表示开启GPU渲染管线α融合功能单元配置
 **/
gl.enable(gl.BLEND); //gl.BLEND表示α融合，实现颜色融合叠加
gl.blendFunc(gl.SRC_ALPHA,gl.ONE_MINUS_SRC_ALPHA);
```

## 8、光照简单数学模型
因为表面是无规则随机分布凹凸不同的反射面，光线的反射是不定向的，任何角度的反射光都是一样的，物体反射到眼睛中的光与人的观察位置无关。
```js
漫反射光的颜色 = 几何体表面基色 * 光线颜色 * 光线入射角余弦值
```
几何体表面基色简单的说就是不考虑光照物体自身的颜色。


#### 1、镜面反射

镜面反射是说光照到物体上的反射光线具有方向性，具体点说就是光线的反射角等于入射角。


**镜面反射光的颜色 = 几何体表面基色 * 光线颜色 * 视线与反射光线的夹角余弦值<sup>n</sup>**

#### 2、环境光照

**环境反射光颜色 = 几何体表面基色 x 环境光颜色**

#### 3、复合光照

**反射光线 = 漫反射光线 + 镜面反射光线 +环境反射光线**

**法向量：** 垂直于面的直线就是面的法线，在三维笛卡尔坐标系中，可以使用向量`(x,y,z)`来表示法向量，根据几何体表面的法向量与光线的方向，就可以求解出光线入射角的余弦值，着色器语言内置了一个方法点积 `dot()` 用来求解两个向量之间的余弦值。
```js
vec3 a1=vec3(x1,y1,z1);
vec3 a2=vec3(x2,y2,z2);
dot(a1,a2)可以求出a1、a2两个向量之间的余弦值。
```
#### 4、冯式光照模型

冯氏光照模型模拟现实生活中的三种情况，分别是环境光(`Ambient`)、漫反射(`Diffuse`)和镜面高光(`Specular`)。
+ 环境光：环境光在上节已经讲过了，主要用来模拟晚上或者阴天时，在没有光源直接照射的情况下，我们仍然能够看到物体，只是偏暗一些，通常情况我们使用一个 **较小的光线因子乘以光源颜色** 来模拟。
+ 漫反射：漫反射是为了模拟 **平行光源** 对物体的方向性影响，我们都知道，如果光源正对着物体，那么物体正对着光源的部分会更明亮，反之，背对光源的部分会暗一些。在冯氏光照模型中，漫反射分量占主要比重。
+ 镜面高光：为了模拟光线照射在 **比较光滑** 的物体时，物体正对光源的部分会产生 **高亮效果**。该分量颜色会和光源颜色更接近。
#### 5、计算漫反射光照

关键在于**入射角的表示**和 **光线强度的计算**。

**入射角的表示和计算**

入射角的计算需要用到**法向量**,垂直于物体表面，并且朝向屏幕外部。
光线照射方向根据光源的不同有两种表示方法。
+ 平行光线
光线方向是全局一致的，与照射点的位置无关，不会随着照射点的不同而不同,不是很真实。
+ 点光源
向四周发射光线，光线方向与照射点的位置有关，越靠近光源的部分越亮,光照效果比较真实。

**计算反射光强度**

因为入射角的大小与反射光的亮度成 **反比**，所以我们使用 **入射角的余弦值** 来表示漫反射的 **光线强度**。

**法向量**

法向量是垂直于顶点所在平面，指向平面外部的向量，只有方向，没有大小，类比光学现象中的法线。法向量存储在顶点属性中，为了便于计算入射角的余弦值，法向量的长度通常设置为 1。

**光源照射方向向量的计算**

在世界坐标系中有一光源 `P0(x0,y0,z0)`,光线照射到物体表面上的一点 `P1(x1,y1,z1)`;那么光线照射在该点的方向向量为：`p1-p0`。

#### 6、计算漫反射光照

+ 漫反射光照 = 光源颜色 * 漫反射光照强度因子
+ 漫反射光照强度因子 = 入射角的余弦值

根据向量的运算规则，可以使用向量之间的 **点积**,再除以向量的长度之积，就可以得到余弦值。首先将两个向量归一化，转化成单位向量，然后进行点积计算求出夹角余弦。**归一化向量**的实质就是将向量的长度转换为1，得出的一个单位向量。

`GLSL`内置了下面两个函数：
+ dot
求出两个向量的点积。
+ normalize
将向量转化为长度为 1 的向量。
```js
//light_Direction表示光源照射方向向量。
//normal 代表当前入射点的法向量
vec3 light_Color = vec3(1, 1, 1);
//余弦值
float diffuseFactor = dot(normalize(light_Direction), normalize(normal))
vec4 lightColor = vec4(light_Color * diffuseFactor, 1);
```

**1、平行光漫反射**
```js
// 光源照射方向向量
vec3 lightDirection = u_LightPosition - vec3(0, 0, 0);
```
**2、点光源的漫反射**
点光源需要根据光源位置和入射点位置计算入射角，所以我们需要计算出入射点的世界坐标系坐标。
```js
// 光源照射方向向量
//u_LightPosition光源位置 v_Position入射点位置
vec3 lightDirection = u_LightPosition - v_Position;
```

## 9、GLSL语法和WebGLAPI总结
#### 1、着色器语言`GLSL`
+ 修饰符
    + attribute：属性修饰符。
    + uniform：全局变量修饰符。
    + varying：顶点着色器传递给片元着色器的属性修饰符。
+ 屏幕坐标系到设备坐标系的转换。
    + 屏幕坐标系左上角为原点，X 轴坐标向右为正，Y 轴坐标向下为正。
    + 坐标范围：
        + X轴：【0, canvas.width】
        + Y轴：【0, canvas.height】
    + 设备坐标系以屏幕中心为原点，X 轴坐标向右为正，Y 轴向上为正。
    + 坐标范围是
        + X轴：【-1, 1】。
        + Y轴：【-1, 1】。
#### 2、WebGL API
+ shader：着色器对象
    + gl.createShader：创建着色器。
    + gl.shaderSource：指定着色器源码。
    + gl.compileShader：编译着色器。
+ program：着色器程序
    + gl.createProgram：创建着色器程序。
    + gl.attachShader：链接着色器对象。
    + gl.linkProgram：链接着色器程序。
    + gl.useProgram：使用着色器程序。
+ attribute：着色器属性
    + gl.getAttribLocation：获取顶点着色器中的属性位置。
    + gl.enableVertexAttribArray：启用着色器属性。
    + gl.vertexAttribPointer：设置着色器属性读取 buffer 的方式。
    + gl.vertexAttrib2f：给着色器属性赋值，值为两个浮点数。
    + gl.vertexAttrib3f：给着色器属性赋值，值为三个浮点数。
+ uniform：着色器全局属性
    + gl.getUniformLocation：获取全局变量位置。
    + gl.uniform1f (floatUniformLoc, v);                 // float
    + gl.uniform1fv(floatUniformLoc, [v]);               // float 或 float array
    + l.uniform2f (vec2UniformLoc,  v0, v1);            // vec2
    + gl.uniform2fv(vec2UniformLoc,  [v0, v1]);          // vec2 或 vec2 array
    + gl.uniform3f (vec3UniformLoc,  v0, v1, v2);        // vec3
    + gl.uniform3fv(vec3UniformLoc,  [v0, v1, v2]);      // vec3 或 vec3 array
    + gl.uniform4f (vec4UniformLoc,  v0, v1, v2, v4);    // vec4 给全局变量赋值 4 个浮点数。
    + gl.uniform4fv(vec4UniformLoc,  [v0, v1, v2, v4]);  // vec4 或 vec4 array
    
    + gl.uniformMatrix2fv(mat2UniformLoc, false, [  4x element array ])  // mat2 或 mat2 array
    + gl.uniformMatrix3fv(mat3UniformLoc, false, [  9x element array ])  // mat3 或 mat3 array
    + gl.uniformMatrix4fv(mat4UniformLoc, false, [ 16x element array ])  // mat4 或 mat4 array
    
    + gl.uniform1i (intUniformLoc,   v);                 // int 给全局变量赋值 1 个整数。
    + gl.uniform1iv(intUniformLoc, [v]);                 // int 或 int array
    + gl.uniform2i (ivec2UniformLoc, v0, v1);            // ivec2
    + gl.uniform2iv(ivec2UniformLoc, [v0, v1]);          // ivec2 或 ivec2 array
    + gl.uniform3i (ivec3UniformLoc, v0, v1, v2);        // ivec3
    + gl.uniform3iv(ivec3UniformLoc, [v0, v1, v2]);      // ivec3 or ivec3 array
    + gl.uniform4i (ivec4UniformLoc, v0, v1, v2, v4);    // ivec4
    + gl.uniform4iv(ivec4UniformLoc, [v0, v1, v2, v4]);  // ivec4 或 ivec4 array
    
    + gl.uniform1i (sampler2DUniformLoc,   v);           // sampler2D (textures)
    + gl.uniform1iv(sampler2DUniformLoc, [v]);           // sampler2D 或 sampler2D array
    
    + gl.uniform1i (samplerCubeUniformLoc,   v);         // samplerCube (textures)
    + gl.uniform1iv(samplerCubeUniformLoc, [v]);         // samplerCube 或 samplerCube array
+ buffer：缓冲区
    + gl.createBuffer：创建缓冲区对象。
    + gl.bindBuffer：将缓冲区对象设置为当前缓冲。
    + gl.bufferData：向当前缓冲对象复制数据。
+ clear：清屏
    + gl.clearColor：设置清除屏幕的背景色。
    + gl.clear：清除屏幕。
+ draw：绘制
    + gl.drawArrays：数组绘制方式。
    + gl.drawElements：索引绘制方式。
+ 图元类型及**图形绘制函数**
    -  drawArrays(type,start,count): 用指定的图元进行绘制。`type`主要有以下一些类型。`start` 指定从哪个点开始绘制。`count`指定绘制需要使用到多少个点。
    - gl.POINTS: 绘制一系列点。
    - gl.LINE_STRIP: 绘制一个线条。即，绘制一系列线段，上一点连接下一点。
    - gl.LINE_LOOP: 绘制一个线圈。即，绘制一系列线段，上一点连接下一点，并且最后一点与第一个点相连。
    - gl.LINES: 绘制一系列单独线段。每两个点作为端点，线段之间不连接。
    - gl.TRIANGLE_STRIP：绘制一个三角带。
    - gl.TRIANGLE_FAN：绘制一个三角扇。
    - gl.TRIANGLES: 绘制一系列三角形。每三个点作为顶点。
+ 纹理贴图
    + gl.createTexture：创建纹理对象。
    + gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true); 设置图片的翻转
    + gl.activeTexture：激活纹理单元。
    + gl.bindTexture：绑定纹理对象到当前纹理。
    + gl.texImage2D：将图片数据传递给 GPU。
    + gl.texParameterf：设置图片放大缩小时的过滤算法。
+ 常用方法总结
  - precision：精度设置限定符，使用此限定符设置完精度后，之后所有该数据类型都将沿用该精度，除非单独设置。
  - distance：计算顶点之间距离。
  - discard:舍弃片元。

+ 如何创建并连接着色器程序
  - createShader：创建着色器对象
  - shaderSource：提供着色器源码
  - compileShader：编译着色器对象
  - createProgram：创建着色器程序
  - attachShader：绑定着色器对象
  - linkProgram：链接着色器程序
  - useProgram：启用着色器程序

下面是完整的例子
```JS
function initShader(gl) {
  1.获取着色器源码:
  //顶点着色器源码
  const vertexShaderSource = document.getElementById('vertexShader').innerText;
  //片元着色器源码
  const fragmentShaderSource = document.getElementById('fragmentShader').innerText;
  2.创建着色器对象
  const vertexShader = gl.createShader(gl.VERTEX_SHADER);
  const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
  3.为着色器对象提供源码
  gl.shaderSource(vertexShader, vertexShaderSource);
  gl.shaderSource(fragmentShader, fragmentShaderSource);
  4.编译着色器 编译是将GLSL（OpenGL着色器语言）代码转换为GPU可执行代码的过程。
  gl.compileShader(vertexShader);
  gl.compileShader(fragmentShader);
  5.创建和连接着色器程序
  const program = gl.createProgram();
  //将编译后的顶点着色器和片元着色器附加到程序对象上。
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  // 链接着色器程序。链接是将多个着色器组合成一个完整的程序的过程，链接成功后，这个程序可以用于渲染。
  gl.linkProgram(program);
  // 将创建和链接好的着色器程序设置为当前使用的程序
  gl.useProgram(program);
  return program;
  }
```


## 10.webgl怎么处理传递进去的数据的
+ 构建图形的数据
数据一般是按三角形去绘制，按照顺时针的顺序去绘制的，并且第二个三角形的第一个点是前面一个三角形的最后一个点，并最终绘制成图形的。
```js
// 构建图形的数据 
function setGeometry(gl) {
  gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([
          // left column
          0, 0,
          30, 0,
          0, 150,
          0, 150,
          30, 0,
          30, 150,

          // top rung
          30, 0,
          100, 0,
          30, 30,
          30, 30,
          100, 0,
          100, 30,

          // middle rung
          30, 60,
          67, 60,
          30, 90,
          30, 90,
          67, 60,
          67, 90,
      ]),
      gl.STATIC_DRAW);
}
```
+ 绘制图形
```js
// look up where the vertex data needs to go.
  var positionLocation = gl.getAttribLocation(program, "a_position");

  // Create a buffer to put positions in
  var positionBuffer = gl.createBuffer();
  // Bind it to ARRAY_BUFFER (think of it as ARRAY_BUFFER = positionBuffer)
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
 // Draw the scene.
  function drawScene() {
    webglUtils.resizeCanvasToDisplaySize(gl.canvas);

    // Tell WebGL how to convert from clip space to pixels
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

    // Clear the canvas.
    gl.clear(gl.COLOR_BUFFER_BIT);

    // Tell it to use our program (pair of shaders)
    gl.useProgram(program);

    // Turn on the attribute
    gl.enableVertexAttribArray(positionLocation);

    // Bind the position buffer.
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

    // Tell the attribute how to get data out of positionBuffer (ARRAY_BUFFER)
    var size = 2;          // 2 components per iteration
    var type = gl.FLOAT;   // the data is 32bit floats
    var normalize = false; // don't normalize the data
    var stride = 0;        // 0 = move forward size * sizeof(type) each iteration to get the next position
    var offset = 0;        // start at the beginning of the buffer
    gl.vertexAttribPointer(
        positionLocation, size, type, normalize, stride, offset);
    // Draw the geometry.
    var primitiveType = gl.TRIANGLES;
    var offset = 0;
    var count = 18;  // 6 triangles in the 'F', 3 points per triangle
    gl.drawArrays(primitiveType, offset, count);
  }
```
+ 最终呈现的结果

<img src='../../images/webgl/F.png'>
<Valine></Valine>