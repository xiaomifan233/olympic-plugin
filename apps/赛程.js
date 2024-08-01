import {nameToId} from '../model/nameToId.js'
import puppeteer from 'puppeteer'

export class medals_c extends plugin {
  constructor () {
    super({
      name: '奥运赛程',
      dsc: '查看今日奥运赛程',
      event: 'message',//发出提示信息
      priority: '50',//优先级
      rule: [
        {
          reg: '^#(今日|奥运)?(中国)?(金牌)?赛程$',   // 正则表达式,有关正则表达式请自行百度
          fnc: 'Schedule'  // 执行方法
        }
        ]
    })
  }


  async Schedule (e) {
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
    let url = 'https://www.miguvideo.com/mgs/website/prd/parisOlympicSchedule.html';
    let page = await browser.newPage();
    await page.goto(url);
    await page.waitForSelector('.data-list-box');
    if(/.*中国.*/.test(e.msg)) await page.$eval(`input[name="isChina"]`, checkbox => checkbox.click());
    if(/.*金牌.*/.test(e.msg))await page.$eval(`input[name="medal"]`, checkbox => checkbox.click());
    let boxHeight= await page.$eval('.olympic-schedule', el => el.clientHeight);
    let boxWidth = await page.$eval('.olympic-schedule', el => el.clientWidth);
    let elemHandle = await page.$('.olympic-schedule');
    let msg = [
      await segment.image( await elemHandle.screenshot({
        clip: {
          x: 2,
          y: 2,
          width: boxWidth,
          height: boxHeight
        }
      }))
    ];
    e.reply(msg);
    await browser.close();
    return true;
  }

}


