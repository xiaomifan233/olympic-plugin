import {getJpb} from '../model/sx.js'

export class medals extends plugin {
  constructor () {
    super({
      name: '奥运帮助',
      dsc: '奥运插件帮助',
      event: 'message',//发出提示信息
      priority: '50',//优先级
      rule: [{

        reg: '^#奥运帮助$',
        fnc: 'help'
        // 执行方法
      },]
    })

  }
  async help (e) {
    e.reply('#(今日/奥运)赛程:查看今天全部赛程\n#(今日)中国(金牌)赛程:查看中国(金牌)赛程\n#奥运总榜:查看到现在为止所有参赛队伍的获奖情况\n#中国/日本奖牌榜:查看到现在为止某个参赛队伍的的获奖详情\n\n希望中国运动员可以获得理想的成绩，中国队加油！');
  }
}
