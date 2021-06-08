import { marginBottom, marginLeft, category, values, series, heightOfOne } from "./constant.js"
const count = category.length // 7
import Point from "./point.js"
// 坐标变换
function translate(context) {
  //沿x轴镜像变换必须明白最重要的一点,这时候y坐标系向下为正，经过下面scale(1,-1)y轴坐标系向下为负。
  context.scale(1, -1);
  //向下平移，注意这时候向下是负方向哦
  context.translate(marginLeft, -canvas.height + marginBottom);
}
function drawX(context) {
  const widthOfOne = (canvas.width - marginLeft * 2) / count
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
  for (let i = 0; i < 8; i++) {
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
  const widthOfOne = (canvas.width - marginLeft * 2) / count
  //x轴绘制文字数组
  context.save()

  //这里沿着X轴镜像对称变换。那么Y轴向下为正，X没变向右为正。
  context.scale(1, -1)
  context.font = "12px sans-serif";
  context.fillStyle = '#515a6e';
  for (let i = 0; i < category.length; i++) {
    let item = category[i]
    //分析之后第一次移动了单位长度的一半。后面的每次都平移一个刻度长度,坐标圆心就平移到了每个刻度的中间。y轴向下平移了5个像素。这样就和X轴不会重合。
    if (i === 0) {
      context.translate(widthOfOne / 2, 15);
    } else {
      context.translate(widthOfOne, 0);
    }
    // 测量文字
    const textWidth = context.measureText(item);
    context.fillText(item, -textWidth.width / 2, 0);

  }
  context.restore()

  //y轴左边的文字
  context.save()
  context.scale(1, -1)

  context.font = "12px sans-serif";
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
function drawLine(context, itemdata = {}) {
  const widthOfOne = (canvas.width - marginLeft * 2) / count
  const danweiHeight = heightOfOne / 50
  const points = []
  let datas = itemdata.data || values
  datas.forEach((item, index) => {
    const point = new Point((widthOfOne / 2 + widthOfOne * index), danweiHeight * item)
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
  context.restore();
}
function drawCircle(context, itemdata = {}) {
  const widthOfOne = (canvas.width - marginLeft * 2) / count
  const danweiHeight = heightOfOne / 50
  const points = []
  let datas = itemdata.data || values
  datas.forEach((item, index) => {
    const point = new Point((widthOfOne / 2 + widthOfOne * index), danweiHeight * item)
    points.push(point)
  })
  context.save();

  for (let i = 0; i < points.length; i++) {
    const point = points[i];
    context.beginPath();
    context.arc(point.x, point.y, 3, 0, Math.PI * 2, true);
    context.closePath();
    context.fillStyle = "#fff";
    context.fill()
    // context.shadowBlur = 5;
    // context.shadowColor = 'rgb(100,255,255)';

    context.strokeStyle = itemdata.color || "rgb(93,111,194)"
    context.stroke()
  }

  context.restore();
}
function drawSmoothLine(context) {
  const widthOfOne = (canvas.width - marginLeft * 2) / count
  const danweiHeight = heightOfOne / 50
  const points = []
  values.forEach((item, index) => {
    const point = new Point((widthOfOne / 2 + widthOfOne * index), danweiHeight * item)
    points.push(point)
  })
  context.save();
  context.beginPath();
  context.lineTo(points[0].x, points[0].y)


  for (let i = 0; i < points.length - 1; i++) {
    const point1 = points[i];
    const point2 = points[i + 1]
    if (point1.y === point2.y) {
      context.lineTo(point2.x, point2.y)
    } else if (point1.y < point2.y) {// y1 < y2 情况
      const centerX = (point1.x + point2.x) / 2
      const centerY = (point1.y + point2.y) / 2
      const controlX0 = (centerX + point1.x) / 2
      const controlY0 = (centerY + point1.y) / 2
      const controlX1 = (centerX + point2.x) / 2
      const controlY1 = (centerY + point2.y) / 2
      const xMoveDistance = 20
      const yMoveDistance = (point2.y - point1.y) / heightOfOne * 10
      context.bezierCurveTo(controlX0 + xMoveDistance, controlY0 - yMoveDistance, controlX1 - xMoveDistance, controlY1 + yMoveDistance, point2.x, point2.y)
    } else {// y1 > y2 情况
      const centerX = (point1.x + point2.x) / 2
      const centerY = (point1.y + point2.y) / 2
      const controlX0 = (centerX + point1.x) / 2
      const controlY0 = (centerY + point1.y) / 2
      const controlX1 = (centerX + point2.x) / 2
      const controlY1 = (centerY + point2.y) / 2
      const xMoveDistance = 20
      const yMoveDistance = (point1.y - point2.y) / heightOfOne * 10
      context.bezierCurveTo(controlX0 + xMoveDistance, controlY0 + yMoveDistance, controlX1 - xMoveDistance, controlY1 - yMoveDistance, point2.x, point2.y)
    }

  }
  context.strokeStyle = "rgb(93,111,194)"
  context.lineWidth = 2
  context.shadowBlur = 5;
  context.stroke();
  context.closePath();
  context.restore();
}
function drawMoreLine(context) {
  series.forEach(item => {
    drawLine(context, item)
    drawCircle(context, item)

  })

}
export default {
  translate,
  drawX,
  drawText,
  drawLine,
  drawCircle,
  drawSmoothLine,
  drawMoreLine
}