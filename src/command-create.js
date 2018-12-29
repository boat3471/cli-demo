const path = require('path');
const fs = require('fs-extra');
const prompts = require('prompts');
const {log, exit} = require('./tool');
const {setting} = require('./command-init');
const generator = require('./create/generator');

/** 取消操作 */
function cancel() {
    log.blankLine();
    log.warn('  取消操作');
    log.blankLine();
    exit(1);
}

/**
 * 确认工作目录
 */
async function sureWorkDir() {
    return await prompts({
        type: 'select',
        message: `工作目录：${__rootPath}`,
        name: 'sureWorkDir',
        initial: 1,
        choices: [
            {title: 'Y', value: true},
            {title: 'N', value: false}
        ]
    }, {
        onCancel: cancel,
        onSubmit(prompt, response) {
            if (!response) {
                cancel();
            }
        }
    });
}

/**
 * 确认项目名
 */
async function sureProjectName() {
    return await prompts({
        type: 'text',
        message: `请输入项目名：`,
        name: 'projectName',
        initial: '',
        validate: (value) => {
            if (!value || value.length < 4 || !/^[a-z\-]{4,32}$/.test(value)) {
                return '项目名不能为空，且长度至少4个字符，只能包含（小写字母、-符号）';
            }
            const projectPath = path.join(__rootPath, value);
            if (fs.pathExistsSync(projectPath)) {
                return '项目名已存在，请修改项目名称';
            }
            return true;
        }
    }, {
        onCancel: cancel
    });
}

/**
 * 确认项目类型
 */
async function sureProjectType() {
    return await prompts({
        type: 'select',
        message: `选择项目类型`,
        name: 'projectType',
        initial: 0,
        choices: [
            {title: '中小型单页、多页应用（React）', value: 'react'},
            {title: '大型复杂应用（React + Redux）', value: 'react-redux', disabled: true},
            {title: '重搜索，同构应用（React + NextJS）', value: 'react-next', disabled: true}
        ]
    }, {
        onCancel: cancel
    });
}

/**
 * 确认样式类型
 */
async function sureStyleType() {
    return await prompts({
        type: 'select',
        message: `选择CSS预处理`,
        name: 'styleType',
        initial: 0,
        choices: [
            {title: 'SCSS', value: 'scss'},
            {title: 'LESS', value: 'less'}
        ]
    }, {
        onCancel: cancel
    });
}

/**
 * 确认设备类型
 */
async function sureEquipmentType() {
    return await prompts({
        type: 'select',
        message: `选择设备类型`,
        name: 'equipmentType',
        initial: 0,
        choices: [
            {title: 'PC', value: 'pc'},
            {title: '移动', value: 'mobile'}
        ]
    }, {
        onCancel: cancel
    });
}

module.exports = async ([lv1]) => {

    // 初始化基本设置
    if (!__config.username || !__config.mail) {
        await setting();
    }

    // 开始创建项目
    log.blankLine();
    log.blueBold('♨ 开始创建项目：');
    log.blankLine();

    const projectConfig = {};

    // 确认项目根目录，工作目录
    await sureWorkDir();

    // 确认项目类型
    await sureProjectType().then((res) => {
        Object.assign(projectConfig, res);
    });

    // 确认CSS预处理
    await sureStyleType().then((res) => {
        Object.assign(projectConfig, res);
    });

    // 确认设备类型
    await sureEquipmentType().then((res) => {
        Object.assign(projectConfig, res);
    });

    // 确认项目名
    await sureProjectName().then((res) => {
        Object.assign(projectConfig, res);
    });

    // 调用项目生成器，根据配置生成项目
    await generator(projectConfig);

    log.blankLine();
    log.blueBold('♨ 创建完成，可使用IDEA打开项目');
    log.blankLine();
};
