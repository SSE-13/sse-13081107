
module game {


}


var humanContainer = new render.DisplayObjectContainer();




var head = new render.Bitmap();
head.source = 'head.png';
humanContainer.addChild(head)
head.x=-10;
head.y=-50;

var trunk = new render.Bitmap();
trunk.source = 'body.png';
humanContainer.addChild(trunk)
trunk.x=-25;
trunk.y=-25;

var left_arm = new render.Bitmap();
left_arm.source = 'leftarm.png';
humanContainer.addChild(left_arm)
left_arm.x=-75;
left_arm.y=-25;

var right_arm = new render.Bitmap();
right_arm.source = 'rightarm.png';
humanContainer.addChild(right_arm)
right_arm.x=75;
right_arm.y=-25;

var left_leg = new render.Bitmap();
left_leg.source = 'leftleg.png';
humanContainer.addChild(left_leg)
left_leg.x=-50;
left_leg.y=50;

var right_leg = new render.Bitmap();
right_leg.source = 'rightleg.png';
humanContainer.addChild(right_leg)
right_leg.x=50;
right_leg.y=50;




humanContainer.globalMatrix
humanContainer.x=200;
humanContainer.y=300;
//humanContainer.globalMatrix.tx=50;

console.log(humanContainer.globalMatrix);

var renderCore = new render.RenderCore();
//renderCore.start(humanContainer, ["wander-icon.jpg"]);
renderCore.start(humanContainer, ['head.png','body.png','leftarm.png','rightarm.png','leftleg.png','rightleg.png']);


class HumanBody extends Body {
    vx=5;
    
    vr=5;
    
    


    onTicker(duringTime: number) {
      
       

        this.x+=duringTime*this.vx;
         this.rotation +=duringTime*this.vr;
       
        
        
        

    }
}

var ticker = new Ticker();
var body = new HumanBody(humanContainer);
ticker.start([body]);


