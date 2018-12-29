const path = require('path');
const generator = require('./../src/create/generator');

global.__rootPath = path.join(__dirname, '../');
global.__config = {
    username: 'zhangsan',
    mail: 'zhangsan@me.com'
};

generator({
    projectType: 'react',
    styleType: 'scss',
    equipmentType: 'pc',
    projectName: 'test-demo',
    projectPath: path.join('/Users/wenchaoxin/code/test', 'test-demo')
});
