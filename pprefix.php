<?php
/**
 * file        : pprefix.php
 * 
 * description : 非`/usr/local/bin/`目录可执行文件依赖动态库及其rpath修正
 * 
 *    如：hello可执行文件如果没有指定prefix进行了编译
 *       然后通过`DESTDIT=/tmp make install`安装
 *       执行`/tmp/usr/local/bin/hello`
 *       由于依赖的动态库存在`/tmp/usr/local/lib/libhello.dylib`
 *       可执行文件启动失败，报错
 *    dyld: Library not loaded: /usr/local/lib/libhello.dylib
 *       Referenced from: /tmp/usr/local/bin/hello
 *       Reason: image not found
 * 
 *    此时可以使用此脚本进行修复:
 *       `php pprefix.php /tmp/ /tmp/usr/local/bin/hello`
 * 
 * author      : coleflowers
 * date        : 20210930
 */

$pprefix = $argv[1] ?? '';// '/pathroot/';
$bin = $argv[2] ?? '';// '/pathroot/usr/local/bin/radare2';

if (empty($pprefix) || empty($bin)) {
    echo $argv[0] . ' /pathroot/ ' . '/pathroot/usr/local/bin/binname/' . PHP_EOL;
    return 1;
}

return pprefix($bin, $pprefix);

/**
 * @param string $bin
 * @param string $pprefix
 * @return int
 */
function pprefix(string $bin, string $pprefix): int
{
    $info = fileInfo($bin);
    if (!startWith($info, 'Mach-O')) {
        echo 'It is not Mach-O file' . PHP_EOL;
        return 1;
    }

    $fixed = false;
    $rpath = getRPATH($bin);
    if (in_array($pprefix, $rpath)) {
        echo 'Has fixed!' . PHP_EOL;
        $fixed = true;
    }

    $cmd = 'otool -L ' . $bin;
    $res = exec($cmd, $out);
    if (empty($out)) {
        echo 'Nothing to need fix' . PHP_EOL;
        exit;
    }

    foreach ($out as $k => $v) {
        if ($k == 0) {
            continue;
        }
        $s = trim($v);
        $t = explode(' ', $s);
        $lib = $t[0];

        $file = $pprefix . '/' . $lib;
        if (file_exists($file)) {
            $info = pathinfo($lib);
            if (!isset($info['basename'])) {
                continue;
            }
            if ($file == $bin) {
                continue; // 有些动态库第一条是自己
            }

            $fixLib = pprefix($file, $pprefix);

            $newLib = '@rpath' . $lib;
            $cmd = 'install_name_tool -change '.$lib.' '.$newLib.' '.$bin;
            
            exec($cmd);
        } 
    }

    if (!$fixed) {
        // add rpath
        $cmd = 'install_name_tool -add_rpath '.$pprefix.' '.$bin;
        $out = [];
        $res = exec($cmd);
    }

    return 0;
}


/**
 * @param string $str
 * @param string $pre
 * @return bool
 */
function startWith(string $str, string $pre): bool
{
    if (empty($str) || empty($pre)) {
        return false;
    }

    if (strlen($str) < strlen($pre)) {
        return false;
    }
    return substr($str, 0, strlen($pre)) == $pre;
}

/**
 * 获取文件的file信息
 * 依赖 `/usr/bin/file` 命令
 * @param string $filePath
 * @return string
 */
function fileInfo(string $filePath): string
{
    $out = [];
    $cmd = 'file ' . $filePath;
    $res = exec($cmd, $out);
    if (empty($out)) {
        return '';
    }

    $ret = $out[0];
    $ret = ltrim($ret, $filePath);
    $ret = ltrim($ret, ':');
    $ret = trim($ret);
    return $ret;
}

/**
 * @param string $macho
 * @return array
 */
function getRPATH(string $macho): array
{
    if (empty($macho)) {
        return [];
    }
    $cmd = 'otool -l ' . $macho;
    $out = [];
    $res = exec($cmd, $out);
    foreach ($out as $k => $v) {
        $out[$k] = trim($v);
    }

    $ret = [];
    foreach ($out as $k => $v) {
        if ($v == 'cmd LC_RPATH' 
            && isset($out[$k - 1]) 
            && isset($out[$k + 2])) {

            $pre = $out[$k - 1];
            if (startWith($pre, 'Load command')) {
                $nex = $out[$k + 2];
                $tmp = explode(' ', $nex);
                
                $ret[] = $tmp[1];
            }
        }
    }

    return $ret;
}
