---
title: 13、多个纹理贴图
date: "2021-06-27"
type: 技术
tags: WebGL
note: 多个纹理贴图
---
可以给一个面添加多个问题，并且还能然纹理动起来。这个`demo`是在纹理贴图和纹理动画的基础上修改的。修改的代码如下所示：

#### 1、片元着色器代码
这里用到了两个纹理，所以在片元着色器中需要创建两个纹理变（`u_Texture,u_Texture1`）。通过`texture2D`函数得到片元的颜色，再将多个颜色进行矢量相乘，就得到了片元的最终颜色。
```js
<script type="shader-source" id="fragmentShader">
    //浮点数设置为中等精度
    precision mediump float;
    //对应纹理图片的像素数据
    uniform sampler2D u_Texture;
    //对应纹理图片的像素数据
    uniform sampler2D u_Texture1;
    //x坐标的平移量
    uniform float anim;
    varying vec2 v_Uv;
    void main(){
        // 点的最终颜色。
        vec4 color0=texture2D(u_Texture,v_Uv);
        vec4 color1=texture2D(u_Texture1, vec2(v_Uv.x+anim,v_Uv.y));
        gl_FragColor = color0*color1;
    }
</script>
```
#### 3、JavaScript代码
+ 1、构建着色器需要的数据与顶点着色器交互
```js
function assignValue(gl, program) {
    ...
    const u_Texture = gl.getUniformLocation(program, "u_Texture");
    const u_Texture1 = gl.getUniformLocation(program, "u_Texture1");
    const anim = gl.getUniformLocation(program, "anim");
    ...
    //这里需要加载两次纹理图片
    loadTexture(gl, '../images/webgl/1.jpg', u_Texture, 0);
    loadTexture(gl, '../images/webgl/2.jpg', u_Texture1, 1, () => render(gl, anim, positions));
}
```
+ 2、加载纹理图片并将纹理数据传递给片元着色器
```js
function loadTexture(gl, src, attribute, index, callBack) {
    let img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = function () {
        let texture = gl.createTexture();//创建纹理图像缓冲区
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true); //纹理图片上下反转,使得图片的左下角与UV坐标原点重合。
        gl.activeTexture(gl[`TEXTURE${index}`]);//激活0,1号纹理单元TEXTURE0
        
        gl.bindTexture(gl.TEXTURE_2D, texture);//绑定纹理缓冲区
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img); //设置纹素格式，jpg格式对应gl.RGB,将图片数据传递给 GPU。
        //设置纹理贴图填充方式(纹理贴图像素尺寸小于顶点绘制区域像素尺寸)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
            //设置纹理贴图填充方式(纹理贴图像素尺寸大于顶点绘制区域像素尺寸)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        // 水平填充
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
        //竖直填充
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
        //给全局变量赋值 1 个整数。纹理缓冲区单元TEXTURE0中的颜色数据传入片元着色器
        gl.uniform1i(attribute, 0);
        callback && callback();
    };
    img.src = src;
}
```
+ `WebGL`渲染
```js
let animate = 0;
function render(gl, anim, positions) {
    gl.uniform1f(anim, animate);
    gl.clear(gl.COLOR_BUFFER_BIT);
    if (positions.length <= 0) {
    return;
    }
    gl.drawArrays(gl.TRIANGLES, 0, positions.length / 4);
    animate += 0.002;
    requestAnimationFrame(() => {
    render(gl, anim, positions)
    });
}
```
最终效果如下所示：

<img src='../../images/webgl/纹理动画-多个纹理.gif' alt='暂无数据'>