## JsFormat配置文件：
```
{
  // exposed jsbeautifier options
  "indent_with_tabs": false,
  // 保留换行符
  "preserve_newlines": true,
  // 最大连续保留2二个换行符，也就是有一个空行
  "max_preserve_newlines": 2,
  // 在条件语句前有空格
  "space_before_conditional":false,
  //括弧添加空格
  "space_in_paren": false,
  // 在函数的括弧后面添加空格
  //"space-after-anon-function":true,
  "jslint_happy": false,
  // [collapse-preserve-inline|collapse|expand|end-expand|none] ["collapse"]
  // 代码的样式
  "brace_style": "collapse",
  "keep_array_indentation": false,
  "keep_function_indentation": false,
  "eval_code": false,
  "unescape_strings": false,
  "break_chained_methods": false,
  "wrap_attributes_indent_size":0,
  "wrap-line-length":0,
  "end-with-newline":false,
  // 支持JSX
  "e4x": true,
  //最初的缩进级别
  "indent_level": 0,
  // 缩进二个字符
  "indent_size": 2,
  // 缩进2个字符，字符是一个空格
  "indent_char":" ",
  //"eol":"\n",
  // 保存时自动格式化
  "format_on_save": true,
  //格式化选中的文本
  "format_selection": true,
  // 是否启动.jsbeautifyrc文件
  "jsbeautifyrc_files": false,
  "ignore_sublime_settings": true,
  "format_on_save_extensions": ["js", "json"]
}
```
参考链接：
https://blog.csdn.net/itpinpai/article/details/53284061

```$xslt
{
    // exposed jsbeautifier options
    "translate_tabs_to_spaces": true,
    "tab_size": 4,
    "indent_with_tabs": false,
    "preserve_newlines": true,
    "max_preserve_newlines": 4,
    "space_in_paren": false,
    "jslint_happy": true,
    "brace_style": "end-expand",
    "keep_array_indentation": false,
    "keep_function_indentation": false,
    "eval_code": false,
    "unescape_strings": false,
    "break_chained_methods": false,
    "e4x": false,
    "wrap_line_length": 0,
 
    // jsformat options
    "format_on_save": true,
    "jsbeautifyrc_files": false
}

```
