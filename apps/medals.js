import puppeteer from 'puppeteer'

export class medals extends plugin {
  constructor () {
    super({
      name: '奖牌数',
      dsc: '查询奖牌数量',
      event: 'message',//发出提示信息
      priority: '50',//优先级
      rule: [{
        reg: '^#(奥运|奖牌)(总榜|排名|榜单)$',   // 正则表达式,有关正则表达式请自行百度
        fnc: 'medal'  // 执行方法
      },]
    })

  }

  async medal (e) {
    let url = 'https://sports.cctv.com/Paris2024/medal_list/';
    let browser = await puppeteer.launch({
      headless: true, args: ["--disable-gpu", "--disable-dev-shm-usage", "--disable-setuid-sandbox", "--no-first-run", "--no-sandbox", "--no-zygote", "--single-process"]
    });
    let page = await browser.newPage();
    await page.goto(url, { timeout: 4000 });
    let msg = [segment.image(await page.screenshot({
      clip: {
        x: 107, y: 750, width: 1266, height: 935
      }
    }))];
    e.reply(msg);
    await browser.close();
    return true;
  }
}
