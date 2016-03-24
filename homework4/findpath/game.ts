module game {


    const GRID_PIXEL_WIDTH = 50;

    const GRID_PIXEL_HEIGHT = 50;

    const NUM_ROWS = 12;

    const NUM_COLS = 12;
    
    const times=5;

    export class WorldMap extends DisplayObject {


        public grid: astar.Grid;
        constructor() {
            super();
            var grid = new astar.Grid(NUM_COLS, NUM_ROWS);
            this.grid = grid;
            grid.setWalkable(5, 0, false);
            grid.setWalkable(5, 1, false);
            grid.setWalkable(5, 2, false);
            grid.setWalkable(5, 3, false);
            grid.setWalkable(5, 4, false);
            grid.setWalkable(5, 5, false);

        }

        render(context: CanvasRenderingContext2D) {
            context.fillStyle = '#0000FF';
            context.strokeStyle = '#FF0000';
            context.beginPath();
            for (var i = 0; i < NUM_COLS; i++) {
                for (var j = 0; j < NUM_ROWS; j++) {
                   /* if(this.grid.getNode(i,j).walkable==true){
                         context.fillStyle = '#0000FF';
                      
                    }else{
                         context.fillStyle = '#000000';
                    
                    }*/
                    context.rect(i * GRID_PIXEL_WIDTH, j * GRID_PIXEL_HEIGHT, GRID_PIXEL_WIDTH, GRID_PIXEL_HEIGHT);
                    context.fill();
                   context.stroke();
                }
            }
            context.closePath();
        }
         
    }

    export class BoyShape extends DisplayObject {
        render(context: CanvasRenderingContext2D) {
            context.beginPath()
            context.fillStyle = '#00FFFF';
            context.arc(GRID_PIXEL_WIDTH / 2, GRID_PIXEL_HEIGHT / 2, Math.min(GRID_PIXEL_WIDTH, GRID_PIXEL_HEIGHT) / 2 - 5, 0, Math.PI * 2);
            context.fill();
            context.closePath();
        }
    }
    
     export class Barrier extends DisplayObject {
        render(context: CanvasRenderingContext2D) {
            context.beginPath()
            context.fillStyle = '#000000';
            context.strokeStyle = '#FF0000';
            for (var j = 0; j < 6; j++) {
                context.rect(5* GRID_PIXEL_HEIGHT, j * GRID_PIXEL_HEIGHT, GRID_PIXEL_WIDTH, GRID_PIXEL_HEIGHT);
                context.fill();
                context.stroke();
           } 
            context.closePath();
        }
    }

    export class BoyBody extends Body {
         path:Array<astar.Node>;
         time=0;
         vx;
         vy;
         
        
         public run(grid) {
            grid.setStartNode(0, 0);
            grid.setEndNode(10, 8);
            var findpath = new astar.AStar();
            findpath.setHeurisitic(findpath.diagonal);
            var result = findpath.findPath(grid);
            this.path = findpath._path;
            console.log(this.path);
            console.log(grid.toString());
        }

         public onTicker(duringTime) {
            
             console.log(duringTime);
              console.log(this.time);
            
              if(this.time<times){
                 
                   this.time+=1;
                  
              }else{
                this.time=1;
                this.path.shift();
              }
 
                   
              
              
                if( this.path.length>2){
                   var node1=this.path.shift();
                
                   var node2=this.path.shift();
                   this.path.unshift(node2);
                   this.path.unshift(node1);
                   this.vx=(node2.x-node1.x)*GRID_PIXEL_WIDTH/times;
                   this.vy=(node2.y-node1.y)*GRID_PIXEL_HEIGHT/times;
                 
                   this.x+=this.vx;
                   this.y+=this.vy;
                 } else{
                    this.time=0;
                    this.vx=0;
                    this.vy=0;
                }   
             }
        
    }
}




var boy = new game.BoyShape();
var Barrier = new game.Barrier();
var world = new game.WorldMap();
var karada = new game.BoyBody(boy);
karada.run(world.grid);


var renderCore = new RenderCore();
renderCore.start([world, boy,Barrier]);

var tck = new Ticker();
tck.start([karada]);