<?php
// 返回二进制流数据
$file_path = __DIR__ . '/files/video.mp4';
$file_size = filesize($file_path);
$oct_data = fread(fopen($file_path, "r"), $filesize);

header("Content-type: video/mpeg4;charset=UTF-8");
header("Content-Length: " . $filesize);
echo $oct_data;
?>
