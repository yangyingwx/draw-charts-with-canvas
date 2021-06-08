export const marginBottom = 50;
export const marginLeft = 40;

// 准备绘制的数据(单条折线)
export const category = ["Mon", "Tue", "Wed", "Thu", "Fir", "Sat", "Sun"]
export const values = [150, 250, 225, 211, 140, 148, 260]
export const colors = ['#e6a0c4', '#c6cdf7', '#d8a499', '#7294d4', '#fdc765']
// 准备绘制的数据(多条折线)
export const series = [
  {
    name: '邮件营销',
    type: 'line',
    stack: '总量',
    color: '#e6a0c4',
    data: [10, 15, 20, 30, 20, 30, 10]
  },
  {
    name: '联盟广告',
    type: 'line',
    stack: '总量',
    color: '#c6cdf7',
    data: [20, 25, 30, 45, 50, 50, 68]
  },
  {
    name: '视频广告',
    type: 'line',
    stack: '总量',
    color: '#d8a499',
    data: [40, 55, 120, 64, 90, 69, 90]
  },
  {
    name: '直接访问',
    type: 'line',
    stack: '总量',
    color: '#7294d4',
    data: [120, 132, 140, 120, 190, 130, 120]
  },
  {
    name: '搜索引擎',
    type: 'line',
    stack: '总量',
    color: '#fdc765',
    data: [130, 232, 201, 234, 290, 230, 220]
  }
]


export const heightOfOne = 80