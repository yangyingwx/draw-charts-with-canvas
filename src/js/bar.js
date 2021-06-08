import { marginBottom, marginLeft, category, values, series, heightOfOne } from "./constant.js"
import { fillRoundRect } from "./util.js"
const length = series.length
const count = series[0].data.length
//绘制矩形等条状物
function drawRect(context) {

  context.save()
  context.beginPath()

  let widthOne = (canvas.width - marginLeft * 2) / count
  let widthOneRect = widthOne / length
  const danweiHeight = heightOfOne / 50
  for (let i = 0; i < count; i++) {

    for (let j = 0; j < length; j++) {
      const data = series[j].data[i];
      context.fillStyle = series[j].color;
      context.fillRect(widthOneRect * j, 1, widthOneRect - 1, data * danweiHeight)
    }

    // // context.fillStyle = 'rgb(189,119,119)';
    // context.fill()
    // //第一个条纹
    // context.fillRect(0, 0, widthOneRect - 1, datas[i][0] * danweiHeight)
    // // context.fillStyle = 'rgb(19,172,172)';
    // //第二个条纹
    // context.fillRect(widthOneRect, 0, widthOneRect - 1, datas[i][1] * danweiHeight)
    // // context.fillStyle = 'rgb(111,73,142)';
    // //第三个条纹
    // context.fillRect(widthOneRect * 2, 0, widthOneRect - 1, datas[i][2] * danweiHeight)
    context.translate(widthOne, 0)
  }
  context.restore()
}
function drawLegend(context) {
  const itemWidth = 25 // 图例标记的图形宽度
  const itemHeight = 14 // 图例标记的图形高度
  const itemGap = 12 // 图例每项之间的间隔
  context.save()
  context.scale(1, -1)
  context.translate(0, -canvas.height + marginBottom + 10)
  context.font = "12px sans-serif";
  for (let i = 0; i < series.length; i++) {
    const item = series[i];
    fillRoundRect(context, 0, 0, itemWidth, itemHeight, 5, item.color)
    context.fillText(item.name, itemWidth + itemGap, 12)
    const textWidth = context.measureText(item.name);
    context.translate(50 + textWidth.width, 0)
  }
  context.restore()
}
export default {
  drawRect,
  drawLegend
}