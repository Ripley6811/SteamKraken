function addDocumentListeners() {

    var mousewheelevt=(/Firefox/i.test(navigator.userAgent))? "DOMMouseScroll" : "mousewheel";

    document.addEventListener(
        "keydown", 
        handleKeyDown,
        true
    );
    document.addEventListener(
        "keyup", 
        handleKeyUp,
        true
    );
    document.addEventListener(
        mousewheelevt, 
        handleWheel, 
        false
    );


    function handleKeyDown(evt){
        keys[evt.keyCode] = true;
        //console.log("+", evt.keyCode);
        
    }
    function handleKeyUp(evt){
        if (keys[32] && evt.keyCode == 32){
            if (controlFocus.body.GetUserData() === "Soldier"){
                if (controlFocus.canEmbark != null) {
                    if (controlFocus.canEmbark === "Ship") soldier.enterVehicle(ship);
                    if (controlFocus.canEmbark === "Rover") soldier.enterVehicle(rover);
                }
            }
            else {
                soldier.exitVehicle();
            }
        }
        keys[evt.keyCode] = false;
        //console.log("-", keys);
    }
    function handleWheel(evt){
        // Accelerate or decelerate main engines
        var delta=evt.detail? evt.detail*(-120) : evt.wheelDelta;
        console.log(delta, thrust);
        if (controlFocus === ship) {
            if (Math.abs(delta) > 10) {
                // Chrome
                if (delta != 0) thrust += 500*delta/120;
            } else {
                // Firefox
                if (delta != 0) thrust += 500*delta;
            }
            if (thrust < 0) thrust = 0;
        }
    }

};
