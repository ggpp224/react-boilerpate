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

move(
    [
        'dist/index.html',
        'dist/ios.html',
        'dist/android.html'
    ],
    '_tmp'
);

// zip 因archiver作用域问题不能提取公共函数
fs.copySync('dist','ios');
fs.copySync('dist','android');
var archive = archiver('zip');
archive.on('finish',function () {
    fs.removeSync('ios');
    zipProcess++;
    zipFinish();
})
archive.pipe(fs.createWriteStream('ios.zip'));
archive.bulk([
    { src: ['ios/**']}
]);
archive.finalize();

var archiveAndroid = archiver('zip');
archiveAndroid.on('finish',function () {
    fs.removeSync('android');
    zipProcess++;
    zipFinish();
})
archiveAndroid.pipe(fs.createWriteStream('android.zip'));
archiveAndroid.bulk([
    { src: ['android/**']}
]);
archiveAndroid.finalize();

//fs.removeSync('ios');
//fs.removeSync('android');


