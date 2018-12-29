const generator = require('./../src/create/generator');

global.__rootPath = '/Users/wenchaoxin/code/test';
global.__config = {
    username: 'zhangsan',
    mail: 'zhangsan@me.com'
};

generator({
    projectType: 'react',
    styleType: 'scss',
    equipmentType: 'pc',
    projectName: 'test-demo'
});
