#!/bin/sh
# 参考 : https://stackoverflow.com/questions/12306223/how-to-manually-create-icns-files-using-iconutil
if [ x$1 != x ]; then
    mkdir MyIconTmp.iconset
    sips -z 16 16     $1 --out MyIconTmp.iconset/icon_16x16.png
    sips -z 32 32     $1 --out MyIconTmp.iconset/icon_16x16@2x.png
    sips -z 32 32     $1 --out MyIconTmp.iconset/icon_32x32.png
    sips -z 64 64     $1 --out MyIconTmp.iconset/icon_32x32@2x.png
    sips -z 128 128   $1 --out MyIconTmp.iconset/icon_128x128.png
    sips -z 256 256   $1 --out MyIconTmp.iconset/icon_128x128@2x.png
    sips -z 256 256   $1 --out MyIconTmp.iconset/icon_256x256.png
    sips -z 512 512   $1 --out MyIconTmp.iconset/icon_256x256@2x.png
    sips -z 512 512   $1 --out MyIconTmp.iconset/icon_512x512.png
    cp $1 MyIconTmp.iconset/icon_512x512@2x.png
    iconutil -c icns MyIconTmp.iconset -o icon.icns
    rm -R MyIconTmp.iconset
else
    echo "usage: "
    echo $0 "1024.png"
    exit 1
fi