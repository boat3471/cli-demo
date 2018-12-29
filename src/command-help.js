const cmdList = [
        `  ${__cmdName} 命令：`,
        '    help, -h          显示帮助信息',
        '    version, -v       显示版本号',
        '    init              初始化环境',
        '    show              显示全局配置',
        '    create            创建项目',
        '    reg               注册npm镜像地址'
    ]
;
const {log} = require('./tool');

module.exports = function fasHelp() {
    log.line();
    console.info(cmdList.join('\n'));
    log.line();
    log.blankLine();
};
