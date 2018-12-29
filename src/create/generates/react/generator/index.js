const path = require('path');
const fs = require('fs-extra');

/**
 * 设置 package.json 基本信息
 * 1. 设置项目名
 * 2. 设置用户信息
 * 3. 。。。。。
 * @param config
 * @param tempPath
 */
function settingPackageBase(config, tempPath) {
    const packagePath = path.join(tempPath, 'package.json');
    const packageInfo = require(packagePath);

    packageInfo.name = config.projectName;
    packageInfo.author = {
        name: __config.username,
        email: __config.mail
    };

    fs.writeJsonSync(packagePath, packageInfo, {spaces: 4});
}

/**
 * 设置样式
 * @param config
 * @param tempPath
 */
function settingPackageStyle(config, tempPath) {

    // 设置 devDependencies
    {
        const packagePath = path.join(tempPath, 'package.json');
        const packageInfo = require(packagePath);
        let devDependencies = {};
        switch (config.styleType) {
            case 'less':
                devDependencies = {
                    ...packageInfo.devDependencies,
                    'less': '^3.9.0',
                    'less-loader': '^4.1.0'
                };
                break;
            default:
                // scss
                devDependencies = {
                    ...packageInfo.devDependencies,
                    'node-sass': '^4.11.0',
                    'sass-loader': '^7.1.0'
                };
                break;
        }
        packageInfo.devDependencies = {};
        Object.keys(devDependencies).sort().forEach((key) => {
            packageInfo.devDependencies[key] = devDependencies[key];
        });
        fs.writeJsonSync(packagePath, packageInfo, {spaces: 4});
    }
}

module.exports = {
    execute(config, tempPath) {
        // 设置 package.json
        settingPackageBase(config, tempPath);

        // 设置样式相关内容
        settingPackageStyle(config, tempPath);

        {
            const htmlPath = path.join(__dirname, 'html', `${config.equipmentType}.ejs`);
            const htmlTargetPath = path.join(tempPath, 'build/core/template', 'index.ejs');
            fs.copySync(htmlPath, htmlTargetPath);
        }

        {
            const pagePath = path.join(__dirname, 'pages', config.styleType, 'Demo.jsx');
            const pageTargetPath = path.join(tempPath, 'src/pages', 'Demo.jsx');
            fs.copySync(pagePath, pageTargetPath);
        }

        {
            const styles = ['common', 'pages'];
            styles.forEach((style) => {
                const stylePath = path.join(__dirname, 'styles', style, config.styleType);
                const styleTargetPath = path.join(tempPath, 'src/styles', style);
                fs.copySync(stylePath, styleTargetPath);
            });
        }

        {
            const webpackPath = path.join(__dirname, 'webpack', 'webpack.config');
            const webpackStylePath = path.join(__dirname, 'webpack', `${config.styleType}.config.js`);

            let webpackContent = fs.readFileSync(webpackPath).toString();
            webpackContent = webpackContent.replace('{{style}}', require(webpackStylePath));

            console.info(webpackContent);

            const webpackTargetPath = path.join(tempPath, 'build', 'webpack.config.js');
            fs.writeFileSync(webpackTargetPath, webpackContent);
        }

        fs.removeSync(__dirname);
    }
};
