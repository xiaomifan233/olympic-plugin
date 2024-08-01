import {nameToId} from '../model/nameToId.js'
import puppeteer from 'puppeteer'

export class medals_c extends plugin {
  constructor () {
    super({
      name: '国家奖牌数',
      dsc: '查询某国家奖牌数量',
      event: 'message',//发出提示信息
      priority: '50',//优先级
      rule: [
        {
          reg: '^#(.*)奖牌(榜单|详情)?$',   // 正则表达式,有关正则表达式请自行百度
          fnc: 'medals_c'  // 执行方法
        },]
    })
  }


  async medals_c (e) {
    let country = e.msg.replace(/#|奖牌/g, '')
    let countryId = nameToId(country);
    if (countryId === null ) {
      e.reply('该国家或地区没有参与，或名称不正确');
      return true;
    }
    let browser = await puppeteer.launch({
      headless: true, // 是否无头模式，默认为true
      args: [
        "--disable-gpu",
        "--disable-dev-shm-usage",
        "--disable-setuid-sandbox",
        "--no-first-run",
        "--no-sandbox",
        "--no-zygote",
        "--single-process"
      ],defaultViewport: {
        width:1920,
        height:1080
      }
    });
    let baseUrl = 'https://sports.cctv.com/Paris2024/medal_list/details/index.shtml?countryid=';
    let fullUrl = baseUrl + countryId;
    let page = await browser.newPage();
    await page.goto(fullUrl, {timeout: 3000});
    await page.waitForSelector('#SUBD1721115610526169');
    let boxHeight= await page.$eval('#SUBD1721115610526169', el => el.clientHeight);
    let boxWidth = await page.$eval('#SUBD1721115610526169', el => el.clientWidth);
    let elemHandle = await page.$('#SUBD1721115610526169');
    let msg = [
      await segment.image( await elemHandle.screenshot({
        clip: {
          x: 2,
          y: 2,
          width: boxWidth-2,
          height: boxHeight-100
        }
      }))
    ];
    e.reply(msg);
    await browser.close();
    return true;
  }
}
