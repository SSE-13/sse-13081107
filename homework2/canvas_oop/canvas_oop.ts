/**
 * 基类，负责处理x,y,rotation 等属性
 */ 
class DisplayObject {

    x = 0;

    y = 0;

    rotation = 0;

    draw(context: CanvasRenderingContext2D) {
        context.save();
        context.rotate(this.rotation);
        context.translate(this.x, this.y);
        this.render(context);

        context.restore();
    }

    render(context: CanvasRenderingContext2D) {

    }

}

class Bitmap extends DisplayObject {


    source;

    render(context: CanvasRenderingContext2D) {

        var image = imagePool[this.source];
        if (image) {
            context.drawImage(image, 0, 0);
        }
        else {
            context.font = "20px Arial";
            context.fillStyle = '#000000';
            context.fillText('错误的URL', 0, 20);
        }
    }

}

class Rect extends DisplayObject {

    width = 100;

    height = 100;

    color = '#FF0000';

    render(context: CanvasRenderingContext2D) {
        context.fillStyle = this.color;
        context.fillRect(0, 0, this.width, this.height);
    }
}

class TextField extends DisplayObject {
    title = '';

    render(context: CanvasRenderingContext2D) {
        context.font = "50px Arial";
        context.fillStyle = '#000000';
        context.fillText(this.title,0,20);
    }
}

function drawQueue(queue) {
    for (var i = 0; i < renderQueue.length; i++) {
        var displayObject: DisplayObject = renderQueue[i];
        displayObject.draw(context);
    }
}

var imagePool = {};

function loadResource(imageList, callback) {
    var count = 0;
    imageList.forEach(function(imageUrl) {
        var image = new Image();
        image.src = imageUrl;
        image.onload = onLoadComplete;
        image.onerror = onLoadError;

        function onLoadComplete() {
            imagePool[imageUrl] = image;
            count++;
            if (count == imageList.length) {
                callback();
            }
        }
        
        function onLoadError(){
            alert('资源加载失败:' + imageUrl);
        }
    })
}


var canvas: HTMLCanvasElement = document.getElementById("game") as HTMLCanvasElement;
var context = canvas.getContext("2d");

var text = new TextField();
text.x = 10;
text.y = 50;
text.title = '13081107';

var rect1 = new Rect();
rect1.x = 10;
rect1.y = 30;
rect1.height = 50;
rect1.width = 220;

var bg2 = new Bitmap();
bg2.source = '2.jpg';
bg2.x = 300;
bg2.y = 50;

var bg3 = new Bitmap();
bg3.source = '3.jpg';
bg3.x = 300;
bg3.y = 400;

var bg4 = new Bitmap();
bg4.source = '4.jpg';
bg4.y = 700;

var bg1 = new Bitmap();
bg1.source='1.jpg';

//渲染队列
var renderQueue = [bg1,bg2,bg3,bg4,rect1,text];
//资源加载列表
var imageList = ['1.jpg','2.jpg','3.jpg','4.jpg'];

//先加载资源，加载成功之后执行渲染队列
loadResource(imageList, function() {
    drawQueue(renderQueue);
})


