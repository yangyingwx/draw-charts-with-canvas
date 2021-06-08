import { colors, marginBottom } from "./constant.js"
import { fillRoundRect } from "./util.js"
function translate(context) {
  context.translate(canvas.width / 2, canvas.height / 2)
}

const data = [
  { value: 1048, name: '搜索引擎' },
  { value: 735, name: '直接访问' },
  { value: 580, name: '邮件营销' },
  { value: 484, name: '联盟广告' },
  { value: 300, name: '视频广告' }
]
function dataProcess(data) {
  let total = 0
  for (const item of data) {
    total += item.value
  }
  for (const item of data) {
    item.percent = item.value / total
  }
}
dataProcess(data)
const r = 200

function drawRing(context) {
  let startAngle = -0.5 * Math.PI
  context.lineWidth = 40
  for (let i = 0; i < data.length; i++) {
    const item = data[i];
    const endAngle = item.percent * 2 * Math.PI + startAngle
    context.beginPath()
    context.arc(0, 0, r, startAngle, endAngle, false)

    context.strokeStyle = colors[i]
    context.stroke()
    startAngle = endAngle
  }
}

function drawLegend(context) {
  const itemWidth = 25 // 图例标记的图形宽度
  const itemHeight = 14 // 图例标记的图形高度
  const itemGap = 12 // 图例每项之间的间隔
  context.save()
  let totalWidth = 0
  for (let i = 0; i < data.length; i++) {
    const item = data[i];
    const textWidth = context.measureText(item.name);
    totalWidth += (50 + textWidth.width)
  }
  context.translate(-totalWidth / 2, -canvas.height / 2 + marginBottom + 10)
  context.font = "12px sans-serif";
  for (let i = 0; i < data.length; i++) {
    const item = data[i];
    fillRoundRect(context, 0, 0, itemWidth, itemHeight, 5, colors[i])
    context.fillText(item.name, itemWidth + itemGap, 12)
    const textWidth = context.measureText(item.name);
    context.translate(50 + textWidth.width, 0)
  }
  context.restore()
}


export default {
  translate,
  drawRing,
  drawLegend
}