import fetch from 'node-fetch'
import fs from 'fs'
import {pluginData} from '../config/config.js'
function extractJsonFromJsonp(jsonpData) {
  // 使用正则表达式移除包裹的函数调用
  const jsonString = jsonpData.replace(/^jpb((.*));$/, '$1');
  // 解析 JSON 字符串
  return JSON.parse(jsonString);
}
async function getJpb (url) {
  try {
    let response = await fetch(url);
    let jsonpData = await response.text();
    // 提取 JSON 数据
    let jsonObject = extractJsonFromJsonp(jsonpData);
    // 将 JSON 对象转换为字符串，并准备保存为文件
    let jsonString = JSON.stringify(jsonObject, null, 2); // 使用缩进美化输出
    // 创建 Blob 对象
    fs.writeFileSync(`${pluginData}data.json`, jsonString, 'utf8');
    logger.info('JSON saved successfully!');
  } catch (error) {
    logger.error('Error:', error);
  }
}

export {getJpb}
