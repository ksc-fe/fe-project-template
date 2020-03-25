/**
 * Usage: 
 * command: npm run new:view
 * instruction：自动创建src/views/目录下的vue文件，按以下格式输入路径名和vue页面文件名称：directory_name/vue_component_name
 * example: 运行npm run new:view 后输入 test/TestView.vue，会创建文件src/views/test/TestView.vue
 * note：输入格式为 "目录名称"+分隔符"\"+"组件名称"，如果没有分隔符，将会在src/views/目录下直接创建vue文件
 */

const path = require('path');
const fs = require('fs');
const log = require('./log');
const resolve = (...file) => path.resolve(__dirname, ...file);
const { vueTemplate } = require('./template');


let usage =`
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Usage: 
 * command: npm run new:view
 * instruction：自动创建src/views/目录下的vue文件，按以下格式输入路径名和vue页面文件名称：directory_name/vue_component_name
 * example: 运行npm run new:view 后输入 test/TestView.vue，会创建文件src/views/test/TestView.vue
 * note：输入格式为 "目录名称"+分隔符"\"+"组件名称"，如果没有分隔符，将会在src/views/目录下直接创建vue文件
 */
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
`
log.info(usage);

log.info('请输入要生成的vue页面名称、会生成在 views/目录下');
let componentName = '';

//生成页面目录及文件
process.stdin.on('data', async chunk =>{
    const inputName = String(chunk).trim().toString();
    if(!inputName) {
        return;
    }
    console.log('inputName: ', inputName)

    //页面组件路径
    let componentVueName = resolve('../src/views', inputName);
    if(!componentVueName.endsWith('.vue')) {
        componentVueName += '.vue';
    }
    //页面组件目录路径
    const componentDirectory = path.dirname(componentVueName);
    const isComponentExists = fs.existsSync(componentVueName);
    if(isComponentExists) {
        log.error(`${inputName}页面已存在${componentDirectory}目录下，请重新输入`);
        return;
    } else {
        log.info(`正在生成vue页面目录: ${componentDirectory}`);
        await directoryCreate(componentDirectory);
    }

    //生成view文件
    try {
        if(inputName.includes('\\')) {
            const inputArr = inputName.split('\\');
            componentName = inputArr[inputArr.length -1];
        }else {
            componentName = inputName;
        }
        log.info(`正在生成vue文件 ${componentVueName}`);
        await generateFile(componentVueName, vueTemplate(componentName))
        log.success(`生成成功, 目录：${componentDirectory}\\${componentName}`);
    } catch (e) {
        log.error(e.message);
    }

    process.stdin.emit('end');

});

process.stdin.on('end', () => {
    log.info('exit');
    process.exit();
})


/**
 * 创建vue文件
 * @param {*} path 
 * @param {*} data 
 */
const generateFile = (path, data) => {
    if(fs.existsSync(path)) {
        log.error(`${path}文件已存在`);
        return;
    }

    return new Promise((resolve, reject) => {
        fs.writeFile(path, data, 'utf-8', err => {
            if(err) {
                log.error(err.message);
                reject(err);
            }else {
                resolve(true);
            }
        });
    });
}

function directoryCreate (directory) {
    return new Promise((resolve) => {
      mkdirs(directory, function () {
        resolve(true)
      });
    });
}
  
/**
 *递归创建目录
 * @param {*} directory 路径
 * @param {*} callback
 */
function mkdirs(directory, callback) {
    let exists = fs.existsSync(directory);

    if(exists) {
        callback();
    }else{
        mkdirs(path.dirname(directory), function() {
            fs.mkdirSync(directory);
            callback();
        });
    }
}