import fs from 'node:fs'
import {pluginName} from './config/config.js'
import {pluginRoot} from './config/config.js'

logger.info("~~~~~~~~~~★~~~~~~~~~");
logger.blue('奥运插件加载中...');
const files = fs.readdirSync(`${pluginRoot}/apps`).filter(file => file.endsWith('.js'));
let ret = [];
files.forEach((file) => {
  ret.push(import(`./apps/${file}`))
});
ret = await Promise.allSettled(ret)
let apps = {}
for (let i in files) {
  let name = files[i].replace('.js', '')
  if (ret[i].status != "fulfilled") {
    logger.error(`载入插件错误：${logger.red(name)}`)
    logger.error(ret[i].reason)
    continue
  }
  apps[name] = ret[i].value[Object.keys(ret[i].value)[0]]
}
logger.info(`${pluginName}插件加载完成`);
logger.blue('顶峰相见，巴黎如愿！')
logger.blue('观巴黎奥运，为中国喝彩')
logger.info("~~~~~~~~~~★~~~~~~~~~")
//☆☆☆☆☆☆☆☆☆☆☆

export { apps }
