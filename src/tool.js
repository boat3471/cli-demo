const fs = require('fs');
const shell = require('shelljs');
const chalk = require('chalk');
const moment = require('moment');
const spawn = require('cross-spawn');

module.exports = {
    reg: {
        tb() {
            shell.exec('npm set registry=https://registry.npm.taobao.org/');
            console.info(' ');
            console.info(chalk.white('设置 npm 为淘宝镜像: https://registry.npm.taobao.org/'));
            console.info(' ');
        },
        npm() {
            shell.exec('npm set registry=https://registry.npmjs.org/');
            console.info(' ');
            console.info(chalk.white('设置 npm 为官方镜像: https://registry.npmjs.org/'));
            console.info(' ');
        }
    },
    shell: shell,
    exec(command, ...args) {
        return shell.exec(command, args);
    },
    executeCommand(commandLine, stdio = 'pipe') {
        const commands = commandLine.split(' ');
        const command = commands.shift();
        const res = spawn.sync(command, commands, {stdio: stdio});
        res.stdoutBuffer = res.stdout;
        res.stderrBuffer = res.stderr;
        res.stdout = res.stdout ? res.stdout.toString() : '';
        res.stderr = res.stderr ? res.stderr.toString() : '';
        res.error = res.stderr || res.stdout;
        return res;
    },
    exit(code) {
        return shell.exit(code);
    },
    currentDate(style) {
        return moment().format(style || 'YYYY-MM-DD HH:mm:ss');
    },
    writeJsonFile(data = {}, path = '', compress = false) {
        if (!path) {
            return;
        }
        let content = '';
        if (compress === true) {
            content = JSON.stringify(data);
        } else {
            content = JSON.stringify(data, null, 4);
        }
        return fs.writeFileSync(path, content || {});
    },
    chalk: chalk,
    log: {
        line(title = '') {
            console.info(chalk.white(`---${title}-------------------------------------------------------------`));
        },
        blankLine() {
            console.info(' ');
        },
        info(...args) {
            const list = args.map((content) => {
                return chalk.white(content);
            });
            console.info(...list);
        },
        error(...args) {
            const list = args.map((content) => {
                return chalk.bold.red(content);
            });
            console.info(...list);
        },
        warn(...args) {
            const list = args.map((content) => {
                return chalk.bold.yellow(content);
            });
            console.info(...list);
        },
        success(...args) {
            const list = args.map((content) => {
                return chalk.bold.green(content);
            });
            console.info(...list);
        },
        blue(...args) {
            const list = args.map((content) => {
                return chalk.blue(content);
            });
            console.info(...list);
        },
        blueBold(...args) {
            const list = args.map((content) => {
                return chalk.bold.blue(content);
            });
            console.info(...list);
        }
    }
};
