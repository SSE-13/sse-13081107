"use strict";
const fs = require('fs');
function readFile() {
    var map_path = __dirname + "/map.json";
    var content = fs.readFileSync(map_path, "utf-8");
    var obj = JSON.parse(content);
    var mapData = obj.map;
    return mapData;
}
function writeFile() {
    var map_path = __dirname + "/map.json";
    var content = fs.readFileSync(map_path, "utf-8");
    var obj = JSON.parse(content);
    obj.map = mapData;
    fs.writeFileSync(map_path, JSON.stringify(obj), "utf-8");
    //  return true;
}
function createMapEditor() {
    var sekai = new editor.WorldMap();
    var lines = mapData.length;
    var queues = mapData[0].length;
    for (var queue = 0; queue < lines; queue++) {
        for (var line = 0; line < queues; line++) {
            var tile = new editor.Tile();
            tile.setWalkable(mapData[line][queue]);
            tile.x = queue * editor.GRID_PIXEL_WIDTH;
            tile.y = line * editor.GRID_PIXEL_HEIGHT;
            tile.ownedCol = queue;
            tile.ownedRow = line;
            tile.width = editor.GRID_PIXEL_WIDTH;
            tile.height = editor.GRID_PIXEL_HEIGHT;
            sekai.addChild(tile);
            eventCore.register(tile, events.displayObjectRectHitTest, onTileClick);
        }
    }
    return sekai;
}
var backList = new Array();
function onTileClick(tile) {
    console.log(tile);
    backList.push(tile);
    if (tile.color != "#0000FF") {
        tile.color = "#0000FF";
        mapData[tile.ownedRow][tile.ownedCol] = 1;
        console.log("blue");
    }
    else {
        tile.color = "#FF0000";
        mapData[tile.ownedRow][tile.ownedCol] = 0;
        console.log("red");
    }
}
var saveOnClick = () => {
    writeFile();
    console.log("save");
};
var backOnClick = () => {
    if (backList.length > 0) {
        var lastStep = backList.pop();
        console.log(lastStep);
        if (lastStep.color == "#0000FF") {
            lastStep.color = "#FF0000";
            mapData[lastStep.ownedRow][lastStep.ownedCol] = 0;
        }
        else {
            lastStep.color = "#0000FF";
            mapData[lastStep.ownedRow][lastStep.ownedCol] = 1;
        }
        //writeFile();
        console.log("back");
    }
    else {
        console.log("No More Step to Go Back");
    }
};
//mapData[0][0]=1;
//writeFile(mapData);
var mapData = readFile();
var renderCore = new render.RenderCore();
var eventCore = new events.EventCore();
eventCore.init();
var humanContainer = new render.DisplayObjectContainer();
var editor = createMapEditor();
humanContainer.addChild(editor);
var saveButton = new render.Bitmap();
saveButton.source = 'save.png';
humanContainer.addChild(saveButton);
saveButton.x = 125;
saveButton.y = 215;
var backButton = new render.Bitmap();
backButton.source = 'back.png';
humanContainer.addChild(backButton);
backButton.x = 25;
backButton.y = 215;
renderCore.start(humanContainer, ['save.png', 'back.png']);
eventCore.register(saveButton, events.displayObjectRectHitTest, saveOnClick);
eventCore.register(backButton, events.displayObjectRectHitTest, backOnClick);
