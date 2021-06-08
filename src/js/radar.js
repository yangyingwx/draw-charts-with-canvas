import { hexToRgba } from "./util.js"
function translate(context) {
  context.translate(canvas.width / 2, canvas.height / 2)
  context.scale(1, -1)
}

//绘制圆
const colors = [
  'rgba(238, 197, 102, 1)', 'rgba(238, 197, 102, 0.8)',
  'rgba(238, 197, 102, 0.6)', 'rgba(238, 197, 102, 0.4)',
  'rgba(238, 197, 102, 0.2)', 'rgba(238, 197, 102, 0.1)'
]
function drawArc(context) {
  for (let i = 0; i < 6; i++) {
    context.beginPath();
    context.arc(0, 0, 50 * (i + 1), 0, 2 * Math.PI, true)
    context.strokeStyle = colors[i]
    context.stroke()
    context.closePath();
  }

}

// 绘制骨架线
const r = 300 // 半径
function drawRadarLine(context) {
  let x1 = r * Math.cos(Math.PI / 180 * 30)
  let y1 = r * Math.sin(Math.PI / 180 * 30)

  context.beginPath();
  context.moveTo(x1, y1)
  context.lineTo(-x1, -y1)

  context.moveTo(x1, -y1)
  context.lineTo(-x1, y1)
  //中间骨架线
  context.moveTo(0, r)
  context.lineTo(0, -r)
  context.strokeStyle = "rgba(238, 197, 102, 0.5)"
  context.stroke()
  context.closePath();
}

// 绘制网线填充
const category = [
  { name: 'AQI', max: 300 },
  { name: 'PM2.5', max: 250 },
  { name: 'PM10', max: 300 },
  { name: 'CO', max: 5 },
  { name: 'NO2', max: 200 },
  { name: 'SO2', max: 100 }
]
var dataBJ = [
  [55, 9, 56, 0.46, 18, 6, 1],
  [25, 11, 21, 0.65, 34, 9, 2],
  [56, 7, 63, 0.3, 14, 5, 3],
  [33, 7, 29, 0.33, 16, 6, 4],
  [42, 24, 44, 0.76, 40, 16, 5],
  [82, 58, 90, 1.77, 68, 33, 6],
  [74, 49, 77, 1.46, 48, 27, 7],
  [78, 55, 80, 1.29, 59, 29, 8],
  [267, 216, 280, 4.8, 108, 64, 9],
  [185, 127, 216, 2.52, 61, 27, 10],
  [39, 19, 38, 0.57, 31, 15, 11],
  [41, 11, 40, 0.43, 21, 7, 12],
  [64, 38, 74, 1.04, 46, 22, 13],
  [108, 79, 120, 1.7, 75, 41, 14],
  [108, 63, 116, 1.48, 44, 26, 15],
  [33, 6, 29, 0.34, 13, 5, 16],
  [94, 66, 110, 1.54, 62, 31, 17],
  [186, 142, 192, 3.88, 93, 79, 18],
  [57, 31, 54, 0.96, 32, 14, 19],
  [22, 8, 17, 0.48, 23, 10, 20],
  [39, 15, 36, 0.61, 29, 13, 21],
  [94, 69, 114, 2.08, 73, 39, 22],
  [99, 73, 110, 2.43, 76, 48, 23],
  [31, 12, 30, 0.5, 32, 16, 24],
  [42, 27, 43, 1, 53, 22, 25],
  [154, 117, 157, 3.05, 92, 58, 26],
  [234, 185, 230, 4.09, 123, 69, 27],
  [160, 120, 186, 2.77, 91, 50, 28],
  [134, 96, 165, 2.76, 83, 41, 29],
  [52, 24, 60, 1.03, 50, 21, 30],
  [46, 5, 49, 0.28, 10, 6, 31]
];

function drawRadarArea(context) {
  for (let i = 0; i < dataBJ.length; i++) {
    const data = dataBJ[i];
    context.beginPath()
    // 从右上角开始画
    context.lineTo(data[0] * Math.cos(Math.PI / 180 * 30) * (r / category[0].max), data[0] * Math.sin(Math.PI / 180 * 30) * (r / category[0].max))
    context.lineTo(data[1] * Math.cos(Math.PI / 180 * 30) * (r / category[1].max), -data[1] * Math.sin(Math.PI / 180 * 30) * (r / category[1].max))
    context.lineTo(0, -data[2] * (r / category[2].max))
    context.lineTo(-data[3] * Math.cos(Math.PI / 180 * 30) * (r / category[3].max), -data[3] * Math.sin(Math.PI / 180 * 30) * (r / category[3].max))
    context.lineTo(-data[4] * Math.cos(Math.PI / 180 * 30) * (r / category[4].max), data[4] * Math.sin(Math.PI / 180 * 30) * (r / category[4].max))
    context.lineTo(0, data[5] * (r / category[5].max))
    context.lineTo(data[0] * Math.cos(Math.PI / 180 * 30) * (r / category[0].max), data[0] * Math.sin(Math.PI / 180 * 30) * (r / category[0].max))
    context.fillStyle = hexToRgba("#F9713C", 0.1)
    context.fill()
    context.strokeStyle = "#F9713C"
    context.stroke()
    context.closePath();
  }
}

function drawAxisText(context) {
  const offset = 10
  context.save()
  context.scale(1, -1)
  context.font = "12px sans-serif";
  context.fillStyle = 'rgb(238, 197, 102)'
  let x1 = r * Math.cos(Math.PI / 180 * 30)
  let y1 = r * Math.sin(Math.PI / 180 * 30)

  context.fillText(category[0].name, x1 + offset, -y1)
  context.fillText(category[1].name, x1 + offset, y1 + offset)
  let textWidth1 = context.measureText(category[2].name)
  context.fillText(category[2].name, -textWidth1.width / 2, r + offset + 12)
  let textWidth2 = context.measureText(category[3].name)
  context.fillText(category[3].name, -x1 - offset - textWidth2.width, y1 + offset)
  let textWidth3 = context.measureText(category[4].name)
  context.fillText(category[4].name, -x1 - offset - textWidth3.width, -y1)
  let textWidth4 = context.measureText(category[5].name)
  context.fillText(category[5].name, -textWidth4.width / 2, -r - offset)
  context.restore()
}
export default {
  translate,
  drawRadarLine,
  drawArc,
  drawRadarArea,
  drawAxisText
}