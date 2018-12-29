const path = require('path');
const fs = require('fs-extra');

module.exports = (config) => {
    const rootPath = __rootPath;
    const projectPath = path.join(rootPath, config.projectName);
    const tempPath = path.join(__dirname, '../../', 'temp');
    const generatePath = path.join(__dirname, 'generates', config.projectType);

    // 创建项目根目录
    fs.mkdirsSync(projectPath);

    // 生成临时目录结构
    fs.removeSync(tempPath);
    fs.mkdirsSync(tempPath);

    // 拷贝项目文件
    fs.copySync(generatePath, tempPath);

    const generatorPath = path.join(tempPath, 'generator', 'index.js');
    const generator = require(generatorPath);
    generator.execute(config, tempPath);

    fs.copySync(tempPath, projectPath);

    // 销毁临时文件
    fs.removeSync(tempPath);
};
