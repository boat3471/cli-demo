const os = require('os');
const fs = require('fs');
const path = require('path');
const userPath = path.normalize(path.join(os.homedir(), '/'));
const rootPath = path.normalize(path.join(__dirname, '../'));
const packagePath = path.join(rootPath, 'package.json');

global.__config = {};
global.__package = require(packagePath);
global.__userPath = userPath;
global.__rootPath = rootPath;
global.__configPath = path.normalize(path.join(userPath, `.${__package.name}-rc`));
global.__pidPath = path.normalize(path.join(userPath, `.${__package.name}-pid`));
global.__cmdName = Object.keys(__package.bin)[0];

if (fs.existsSync(__configPath)) {
    try {
        global.__config = JSON.parse(fs.readFileSync(__configPath).toString());
    } catch (e) {
        console.error(e);
    }
}

const commandHelp = require('./command-help');
const commandShow = require('./command-show');
const commandInit = require('./command-init');
const commandCreate = require('./command-create');

const {log} = require('./tool');

const [, , mainCommand, ...subCommand] = process.argv;

switch (mainCommand) {
    case 'help':
    case '-h':
        commandHelp();
        break;
    case 'version':
    case '-v':
        commandShow(mainCommand, subCommand);
        break;
    case 'show':
        commandShow(mainCommand, subCommand);
        break;
    case 'init':
        commandInit.start(subCommand);
        break;
    case 'create':
        commandCreate(subCommand);
        break;
    default:
        log.blankLine();
        log.blueBold('参考命令: ');
        commandHelp();
        log.blankLine();
        break;
}

