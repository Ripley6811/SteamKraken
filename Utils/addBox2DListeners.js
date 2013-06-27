function addBox2DListeners() {

    var listener = new box2d.b2ContactListener();
    
    
    listener.PreSolve = function(contact, manifold){
    }
    listener.PostSolve = function(contact, manifold){
    }
    listener.BeginContact = function(contact){
        var fixtures = [
            contact.GetFixtureA().GetUserData(),
            contact.GetFixtureB().GetUserData()
        ];
        if (fixtures[1] == "Foot"){
            fixtures.reverse();
        }
        
        //console.log("BEGIN: " + fixtures);
        if (fixtures[0] == "Foot" && fixtures[1] == "Tile"){
                hero.isGrounded++;
        }
        if (fixtures[0] == "Foot" && fixtures[1] == "Ship") hero.canEmbark = "Ship";
        if (fixtures[0] == "Foot" && fixtures[1] == "Rover") hero.canEmbark = "Rover";
        
        
    }
    listener.EndContact = function(contact){
        var fixtures = [
            contact.GetFixtureA().GetUserData(),
            contact.GetFixtureB().GetUserData()
        ];
        if (fixtures[1] == "Foot"){
            fixtures.reverse();
        }
        
        //console.log("END: " + fixtures);
        if (fixtures[0] == "Foot" && fixtures[1] == "Tile"){
                hero.isGrounded--;
        }
        if (fixtures[0] == "Foot" && fixtures[1] == "Ship") hero.canEmbark = null;
        if (fixtures[0] == "Foot" && fixtures[1] == "Rover") hero.canEmbark = null;
        
    }

    world.SetContactListener(listener);



};