//////////////////////////
// HTML Setup
var size = {
  width: window.innerWidth || document.body.clientWidth,
  height: window.innerHeight || document.body.clientHeight
}


function Color(r,g,b){
    this.r = r;
    this.g = g;
    this.b = b;
    this.toString = function(){
        return "rgb("+this.r.toFixed(0)+","+this.g.toFixed(0)+","+this.b.toFixed(0)+")";
    }
    this.transitioning = false;
}
var backColor = new Color(90,30,80);


var canvas = document.getElementById("canvas");
canvas.width = size.width;
canvas.height = size.height;
canvas.style.background = backColor.toString();
canvas.position = "absolute";
var ctx = canvas.getContext("2d");
document.documentElement.style.overflow = 'hidden';
document.body.style.margin = "0px";

var debugBox2d = false;
var debug;
if(debugBox2d){
    var debug = document.getElementById("debug");
    debug.width = size.width;
    debug.height = size.height;
    debug.position = "absolute";
    var dctx = debug.getContext("2d");
}



//////////////////////
// LOAD GAME IMAGES AND OTHER ASSETS USING PreloadJS
var manifest = [
    // IMAGES
    {src:"../Classes/images/hero.png", id:"hero"},
    {src:"../Maps/tmw_desert_spacing.png", id:"map1"},
    // JAVASCRIPT
    {src:"../Utils/addBox2DListeners.js"},
    {src:"Utils/addDocumentListeners.js"},
    {src:"Utils/namespaces.js"},
    {src:"Utils/loadMap.js"},
    {src:"Maps/map1.js"},
    {src:"Classes/Tile.js"},
    {src:"Classes/Hero.js"},
    {src:"Game/tick.js"},
];

stage = new createjs.Stage("canvas");
// Color changing backdrop while loading
// Add floating clouds under a starry sky
// Or maybe a dark purple-ish screen with lightning
var loadingText = new createjs.Text("Loading", "bold 40px Arial", "#4AD");
loadingText.shadow = new createjs.Shadow("#000", 5,5,10);
loadingText.textAlign = "center";
loadingText.x = size.width/2;
loadingText.y = size.height/2;
stage.addChild(loadingText);

// NOTE: useXHR=true will prevent showing line numbers of any script errors.
this.queue = new createjs.LoadQueue(useXHR=false);
queue.installPlugin(createjs.Sound);
queue.addEventListener("complete", 
        function (event){
            stage.removeAllChildren();
            this.init();
        }
);
queue.addEventListener("progress", 
        function (event){
            loadingText.text = "Loading " + (event.progress*100|0) + "%";
            stage.update();
        }
);
queue.addEventListener("fileload",
        function (event){
            if (event.item.type == createjs.LoadQueue.JAVASCRIPT){
                document.body.appendChild(event.result);
            }
        }
);
queue.loadManifest(manifest);


/////////////////////
// GLOBAL Variables
var keys = [];
var world, stage;
var SCALE = 30;

var controlFocus; // Object to control and center screen upon
var hero;
    

function init(){
    setupPhysics();
    
    addBox2DListeners(); // addBox2DListeners.js
    
    addDocumentListeners(); // addDocumentListeners.js
    
    
    createjs.Ticker.addEventListener("tick", tick);
    createjs.Ticker.setFPS(60);
    createjs.Ticker.useRAD = true;
}; // init()





function setupPhysics() {

    world = new box2d.b2World(
                       new box2d.b2Vec2(0, 10), // Gravity in physics world
                       true                  // Sleeping enabled
                  );
                  
                  
    //planet = new Earth();
    //stage.addChild(planet);
    
    
    loadMap();
    
    
    
    // CREATE PLAYER
    hero = new Hero();
    stage.addChild(hero);
    
    controlFocus = hero;
    
    
    
    if(debugBox2d){
        //setup debug draw
        var debugDraw = new box2d.b2DebugDraw();
        debugDraw.SetSprite(dctx);
        debugDraw.SetDrawScale(SCALE);
        debugDraw.SetFillAlpha(0.3);
        debugDraw.SetLineThickness(1.0);
        debugDraw.SetFlags(box2d.b2DebugDraw.e_shapeBit | box2d.b2DebugDraw.e_jointBit);
        world.SetDebugDraw(debugDraw);
    }

} // setupPhysics()



