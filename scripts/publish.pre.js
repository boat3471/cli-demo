/* 发布前 */

const {reg, exec, log} = require('../src/tool');

log.blankLine();

// 代码编译
// exec('babel src --out-dir lib');

// 切换 npm 镜像
reg.npm();
