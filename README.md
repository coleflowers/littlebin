# 小玩意儿

## shell

### icns.sh

一键生成icns图标，需要运行在macOS

## php脚本

### pprefix.php

非`/usr/local/bin/`目录可执行文件依赖动态库及其rpath修正。

如：hello可执行文件编译过程如果没有指定prefix进行了编译
   然后通过`DESTDIT=/tmp make install`安装或手动拷贝等

   执行`/tmp/usr/local/bin/hello`
   由于依赖的动态库存在`/tmp/usr/local/lib/libhello.dylib`
   可执行文件启动失败，报错
dyld: Library not loaded: /usr/local/lib/libhello.dylib
   Referenced from: /tmp/usr/local/bin/hello
   Reason: image not found

此时可以使用此脚本进行修复:
   `php pprefix.php /tmp/ /tmp/usr/local/bin/hello`

## 各种photoshop的javascript脚本

### Batch_cutting_image.jsx

Batch_cutting_image.jsx是一个Photoshop script，实现批量裁切相应文件夹下图片，使用简单，和打开图片一样直接拖动到Photoshop窗口之后，指定相应参数即可实现自动裁切，省时省力。

### appicons.jsx

图片尺寸批量处理为指定数字的正方形，可用于ios,addroid的app icon尺寸调整。

### paintCircleAndCircle.jsx

javascript在Photoshop中画图实验。