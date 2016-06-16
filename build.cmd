@echo off
pushd task
if [%1]==[retail] set uglify=true
node gulpfile.js
set uglify=false
popd
