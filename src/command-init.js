const fs = require('fs');
const path = require('path');
const prompts = require('prompts');
const {log, currentDate, writeJsonFile} = require('./tool');

let config = __config || {};

function install({username, mail}) {
    // 初始化PID文件
    if (!fs.existsSync(__pidPath)) {
        fs.writeFileSync(__pidPath, '0');
    }

    // 初始化全局配置文件
    if (!fs.existsSync(__configPath)) {
        writeJsonFile({}, __configPath);
    }

    config = {
        installDate: config.installDate || currentDate(),
        updateDate: currentDate(),
        username: username || config.username,
        mail: mail || config.mail,
        configPath: __configPath,
        dir: {
            user: __userPath,
            install: __rootPath,
            conf: path.normalize(path.join(__rootPath, 'conf/')),
            core: path.normalize(path.join(__rootPath, 'core/'))
        }
    };
    writeJsonFile(config, __configPath);

    console.info('');
    console.info('★ 配置初始化完成!\n');
}

async function setting() {
    const response = await prompts([
        {
            type: 'text',
            name: 'username',
            initial: config.username || '',
            message: `请输入你的名称 (${config.username || '公司账户名'}): `,
            validate(value) {
                if (value.length < 4) {
                    return '至少4个字符';
                }
                return true;
            }
        },
        {
            type: 'text',
            name: 'mail',
            initial: config.mail || '',
            message: `请输入你的邮箱 (${config.mail || '公司个人邮箱'}): `,
            validate(value) {
                // 校验邮箱格式
                return true;
            }
        }
    ], {
        onCancel() {
            log.info('  已取消');
            log.blankLine();
            process.exit(1);
        }
    });
    install(response);
}

module.exports = {
    setting: setting,
    start: ([lv1]) => {
        log.blankLine();
        log.success(`欢迎使用 ${__cmdName} 工具！接下来按步骤完成一些的基础配置:  \n`);

        setting().then(() => {
            // ignore
        });
    }
};
