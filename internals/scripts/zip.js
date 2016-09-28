/**
 * Created by guopeng on 16/9/27.
 */

var fs = require("fs-extra");
const path = require('path');
var archiver = require('archiver');

var zipProcess = 0;

function move(files, directory) {
    files.forEach(function (file) {
        var fileName = file.split('/').pop();
        fs.copySync(file, path.join(directory, fileName));
        fs.removeSync(file);
    })
}

function zipFinish() {
    if(zipProcess==2){
        move(
            [
                '_tmp/index.html',
                '_tmp/ios.html',
                '_tmp/android.html'
            ],
            'dist'
        );
        fs.removeSync('_tmp');
    }
}

//删除已存在的zip包
fs.removeSync('dist/android.zip');
fs.removeSync('dist/ios.zip');

// 将html从dist中移出
move(
    [
        'dist/index.html',
        'dist/ios.html',
        'dist/android.html'
    ],
    '_tmp'
);

// zip 因archiver作用域问题不能提取公共函数
fs.copySync('dist','_tmp/ios');
fs.copySync('dist','_tmp/android');

// 将iso.html移入_tmp/ios文件夹内
fs.copySync('_tmp/ios.html', '_tmp/ios/index.html');
// 将android.html移入_tmp/ios文件夹内
fs.copySync('_tmp/android.html', '_tmp/ios/index.html');

// zip ios包
var archive = archiver('zip');
archive.on('finish',function () {
    zipProcess++;
    zipFinish();
})
archive.pipe(fs.createWriteStream('dist/ios.zip'));
archive.bulk([
    { expand: true, cwd:'_tmp',src: ['ios/**']}
]);
archive.finalize();

// zip android包
var androidArchive = archiver('zip');
androidArchive.on('finish',function () {
    zipProcess++;
    zipFinish();
})
androidArchive.pipe(fs.createWriteStream('dist/android.zip'));
androidArchive.bulk([
    { expand: true, cwd:'_tmp',src: ['android/**']}
]);
androidArchive.finalize();

//fs.removeSync('ios');
//fs.removeSync('android');


