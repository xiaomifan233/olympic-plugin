import {getJpb} from '../model/sx.js'

export class medals extends plugin {
  constructor () {
    super({
      name: '刷新奖牌数',
      dsc: '刷新奖牌数量',
      event: 'message',//发出提示信息
      priority: '50',//优先级
      rule: [{

        reg: '^#刷新奖牌榜$',
        fnc: 'sx'
        // 执行方法
      },]
    })

  }
  async sx (e) {
    process.cwd()
    let apiUrl = 'https://api.cntv.cn/Olympic/getOlyMedals?serviceId=2024aoyun&olyseason=2024S&itemcode=GEN-------------------------------&t=jsonp&cb=jpb';
    await getJpb(apiUrl)
    logger.info('刷新成功')
    e.reply('刷新成功');
    return true;
  }
}
