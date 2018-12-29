const path = require('path');
const {log} = require('./tool');

function show([lv1]) {
    switch (lv1) {
        case 'config':
            log.blankLine();
            log.success('CLI 配置: ');
            console.info(JSON.stringify(__config, null, 4));
            log.blankLine();
            break;
        default:
            log.line();
            log.warn('参考命令: ');
            log.success(`  ${__cmdName} show config`);
            log.line();
            break;
    }
}

function showVersion() {
    const packageJson = require(path.join(__dirname, '../', 'package.json'));
    console.info(packageJson.name, packageJson.version);
}

module.exports = function (mainCommand, subCommand) {
    switch (mainCommand) {
        case '-v':
        case 'version':
            showVersion();
            break;
        case 'show':
            show(subCommand);
            break;
        default:
            break;
    }
};
