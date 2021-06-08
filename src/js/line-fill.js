import { marginBottom, marginLeft, category, values, series, heightOfOne } from "./constant.js"
import { hexToRgba } from "./util.js"
import Point from "./point.js"
const count = category.length // 7
function drawX(context) {
  const widthOfOne = (canvas.width - marginLeft * 2) / (count - 1)
  context.save()
  // x轴及横线
  context.lineWidth = 1
  context.translate(0.5, 0.5); // 神奇的代码，加上这一行，线就变细了
  for (let i = 0; i < count; i++) {
    if (i === 0) {
      context.strokeStyle = "#515a6e"
    } else {
      context.strokeStyle = '#e8eaec'
    }
    context.beginPath()
    context.moveTo(0, 0)
    context.lineTo(canvas.width - marginLeft, 0)
    context.closePath()
    //画不是闭合区域 fill是闭合区域
    context.stroke()
    //每次绘制完之后继续往上平移
    context.translate(0, heightOfOne);
  }
  context.restore()

  context.save()
  // 刻度线
  context.lineWidth = 1
  context.strokeStyle = "#515a6e"
  context.translate(-0.5, -0.5);
  for (let i = 0; i < 7; i++) {
    context.beginPath()
    context.moveTo(0, 0)
    context.lineTo(0, -5)
    context.closePath()
    //画不是闭合区域 fill是闭合区域
    context.stroke()
    context.translate(widthOfOne, 0);

  }
  context.restore()
}
function drawText(context) {
  const widthOfOne = (canvas.width - marginLeft * 2) / (count - 1)
  //x轴绘制文字数组
  context.save()

  //这里沿着X轴镜像对称变换。那么Y轴向下为正，X没变向右为正。
  context.scale(1, -1)
  context.font = "12px Arial";
  context.fillStyle = '#515a6e';
  context.translate(0, 15);
  for (let i = 0; i < category.length; i++) {
    let item = category[i]


    // 测量文字
    const textWidth = context.measureText(item);
    context.fillText(item, -textWidth.width / 2, 0);
    context.translate(widthOfOne, 0);
  }
  context.restore()

  //y轴左边的文字
  context.save()
  context.scale(1, -1)

  context.font = "12px Arial";
  context.fillStyle = '#515a6e';
  for (let i = 0; i < 7; i++) {
    let item = (50 * i).toString()

    // 测量文字
    const textWidth = context.measureText(item);

    context.fillText(item, -textWidth.width - 5, 3);
    //每次绘制完之后继续往上平移
    context.translate(0, -heightOfOne);


  }
  context.restore()
}
function drawFillLine(context, itemdata = {}) {
  const widthOfOne = (canvas.width - marginLeft * 2) / (count - 1)
  //绘制折线段
  const danweiHeight = heightOfOne / 50
  const points = []
  let datas = itemdata.data || values

  datas.forEach((item, index) => {
    const point = new Point(widthOfOne * index, danweiHeight * item)
    points.push(point)
  })
  context.save();
  context.beginPath();
  for (let i = 0; i < points.length; i++) {
    const point = points[i];
    context.lineTo(point.x, point.y);

  }
  context.strokeStyle = itemdata.color || "rgb(93,111,194)"
  context.lineWidth = 2
  context.shadowBlur = 5;
  context.stroke();
  context.closePath();

  //绘制闭环多边形
  context.beginPath();
  context.moveTo(0, 0)
  for (let i = 0; i < points.length; i++) {
    const point = points[i];
    context.lineTo(point.x, point.y);
  }
  context.lineTo(points[points.length - 1].x, 0)
  context.lineTo(0, 0)
  context.closePath()
  const gradient = itemdata.color ? hexToRgba(itemdata.color, 0.6) : "rgba(93,111,194,0.6)"
  context.fillStyle = gradient

  context.fill()
  // 绘制圆形
  for (let i = 0; i < points.length; i++) {
    const point = points[i];
    context.beginPath();
    context.arc(point.x, point.y, 3, 0, Math.PI * 2, true);
    context.closePath();
    context.fillStyle = "#fff";
    context.fill()
    context.lineWidth = 1
    context.strokeStyle = itemdata.color || "rgb(93,111,194)"
    context.stroke()
  }

  context.restore();
}

function drawSeriesFillLine(context) {
  series.reverse().forEach(item => {
    drawFillLine(context, item)
  })
}

export default {
  drawX,
  drawText,
  drawFillLine,
  drawSeriesFillLine
}