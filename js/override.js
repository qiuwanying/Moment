function timer() {
    //定义画布容器
    this.canvas = document.getElementById("clock");
    this.ctx = this.canvas.getContext("2d");
    this.angle = 0;
}
timer.prototype.start = function () {
    //获取当前时间
    this.date = new Date();
    this.hours = this.date.getHours();
    this.min = this.date.getMinutes();
    this.sec = this.date.getSeconds();
    this.hours = this.hours>12 ? this.hours-12 : this.hours;
    //继承并执行
    createArc.apply(this);
};

function createArc() {
    ctx = this.ctx;
    //清理画布
    ctx.clearRect(0,0,500,500);
    ctx.beginPath();
    //先画外圆框
    ctx.lineWidth = 8;
    ctx.strokeStyle = "#fff";
    ctx.arc(200, 200, 100, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.stroke();
    //画小时刻度
    for(i=0; i<=12; i++){
        ctx.save();
        ctx.lineWidth=6;
        ctx.strokeStyle="#89bdd3";
        ctx.translate(200,200);
        ctx.rotate(i*30*Math.PI/180);
        ctx.beginPath();
        ctx.moveTo(0,-90);
        ctx.lineTo(0,-80);
        ctx.closePath();
        ctx.stroke();
        ctx.restore();
    }
    //画分钟刻度
    for(i=0; i<=60; i++){
        ctx.save();
        ctx.lineWidth=4;
        ctx.strokeStyle="#9ad3de";
        ctx.translate(200,200);
        ctx.rotate(i*6*Math.PI/180);
        ctx.beginPath();
        ctx.moveTo(0,-90);
        ctx.lineTo(0,-85);
        ctx.closePath();
        ctx.stroke();
        ctx.restore();
    }
    //画时针
    ctx.save();
    ctx.strokeStyle="#e3e3e3";
    ctx.lineWidth = 7;
    ctx.translate(200,200);
    ctx.rotate((this.hours*5+Math.floor(this.min/12))*6*Math.PI/180);
    ctx.beginPath();
    ctx.moveTo(0,-40);
    ctx.lineTo(0,5);
    ctx.closePath();
    ctx.stroke();
    ctx.restore();

    //画分针
    ctx.save();
    ctx.strokeStyle="#000";
    ctx.lineWidth = 5;
    ctx.translate(200,200);
    ctx.rotate(this.min*6*Math.PI/180);
    ctx.beginPath();
    ctx.moveTo(0,-55);
    ctx.lineTo(0,5);
    ctx.closePath();
    ctx.stroke();
    ctx.restore();
    //画秒针
    ctx.save();
    ctx.strokeStyle="#9ad3de";
    ctx.lineWidth = 3;
    ctx.translate(200,200);
    ctx.rotate(this.sec*6*Math.PI/180);
    ctx.beginPath();
    ctx.moveTo(0,-65);
    ctx.lineTo(0,10);
    ctx.closePath();
    ctx.stroke();
    //画小圆修饰秒针
    ctx.fillStyle="#fff";
    ctx.lineWidth=2;
    ctx.strokeStyle="#9ad3de";
    ctx.beginPath();
    ctx.arc(0,0,5,0,2*Math.PI);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();
}
createArc.prototype.rotateCanvas = function () {
    this.angle += 5;
    this.ctx.rotate(this.angle);
};

function load() {
    // 设置闹钟
    // var time = new timer();
    // time.start();
    // //每秒执行一次
    // setInterval(time.start,1000);
    updateCurrentTime();
    setInterval(updateCurrentTime, 1000);
    updateBg();
    setInterval(updateBg, 90000);
};

function updateBg() {
    var num = parseInt(Math.random()*15);
    var bgImg = '../images/' + num + '.jpg';
    $('.main').css('background-image', 'url(' + bgImg + ')');
};
function updateCurrentTime() {
    var now = new Date();
    var hh = now.getHours();
    var mm = now.getMinutes();
    var ss = now.getSeconds();
    var str = '';
    
    if (hh >= 10) {
        str += hh;
    } else {
        str += '0' + hh;
    }
    str += ':';
    if (mm >= 10) {
      str += mm;
    } else {
      str += '0' + mm;
    }
    str += ':';
    if (ss >= 10) {
      str += ss;
    } else {
      str += '0' + ss;
    }
    
    $('#current_time').html(str)
}
document.addEventListener('DOMContentLoaded', load);