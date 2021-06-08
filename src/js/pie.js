import { hexToRgba } from "./util.js"
import { colors } from "./constant.js"
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
const r = 300
function drawFan(context) {
  const startAngle = -0.5 * Math.PI
  context.save()
  for (let i = 0; i < data.length; i++) {
    const item = data[i]
    context.beginPath()
    context.moveTo(0, 0)
    context.lineTo(0, -r)
    const endAngle = item.percent * 2 * Math.PI + startAngle
    context.arc(0, 0, r, startAngle, endAngle, false)
    context.closePath()
    context.fillStyle = colors[i]
    context.fill()
    context.rotate(item.percent * 2 * Math.PI)
  }
  context.restore()
}
function drawText(context) {
  context.font = "14px sans-serif";
  context.fillStyle = "#fff"
  const a = 180
  let angle = 0
  for (const item of data) {
    const thita = (angle * 2 + item.percent) * Math.PI
    const x = a * Math.sin(thita)
    const y = -a * Math.cos(thita)
    const textWidth = context.measureText(item.name)
    context.fillText(item.name, x - textWidth.width / 2, y)
    angle += item.percent
  }


}


export default {
  translate,
  drawFan,
  drawText
}