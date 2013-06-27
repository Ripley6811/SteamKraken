
var gameOver = false;

function tick(){
    // BOX2D WORLD: PHYSICS STEP FORWARD THEN CLEAR FORCES
    world.Step(
         1 / 60   //frame-rate
      ,  10       //velocity iterations
      ,  10       //position iterations
    );
    world.ClearForces();
    
    // SHOW/HIDE BOX2D FIXTURES
    if (debugBox2d) {
        dctx.save();
        dctx.translate(canvas.width/2-controlFocus.x,canvas.height/2-controlFocus.y);
        world.DrawDebugData();
        dctx.restore();
    }
    
    // CREATEJS STAGE: UPDATE DISPLAY POSITIONS FROM PHYSICS BODIES
    if (!gameOver) {
        stage.update(controlFocus);
        stage.setTransform(canvas.width/2-controlFocus.x,canvas.height/2-controlFocus.y);
        
        
        // DISPLAY SOME TEXT INFORMATION
        ctx.font = "bold 15px sans-serif";
        ctx.fillStyle = "#555";
        ctx.textBaseline = "center";
        var pbody = hero.body;
        ctx.fillText("Space bar to embark/disembark spaceship", 20, 20);
        ctx.fillText("SPACESHIP CONTROLS", 20, 40);
        ctx.fillText("Arrow keys or [4,5,6,8] for directional impulse.", 20, 60);
        ctx.fillText("[1,3,7,9] for rotational impulse.", 20, 80);
        ctx.fillText("Mousewheel and +/- keys for main engine thrust.", 20, 100);
        //ctx.fillText(pbody.GetLinearVelocity().x.toFixed(2), 20, 20);
        //ctx.fillText(pbody.GetLinearVelocity().y.toFixed(2), 20, 40);
        
    }
} // tick()
