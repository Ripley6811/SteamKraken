function loadMap(){
    console.log("loading map");

    for(var layerIdx = 0; layerIdx < map1.layers.length; layerIdx++) {
        if(map1.layers[layerIdx].type != "tilelayer") continue;
        var dat = map1.layers[layerIdx].data;
        for(var tileIDX = 0; tileIDX < dat.length; tileIDX++) {
            var tID = dat[tileIDX];
            if(tID === 0) continue;
            var cat = CAT.GROUND;
            if(tID === 30) cat = CAT.BACKGROUND;
            var tPKT = getTilePacket(map1,tID);
            var wX = Math.floor(tileIDX % map1.width) * map1.tilewidth;
            var wY = Math.floor(tileIDX / map1.width) * map1.tileheight;
            var t = new Tile(queue.getResult("map1"),  tPKT.px, tPKT.py, wX, wY, map1.tilewidth, map1.tileheight, cat)
            
            stage.addChild(t.view);
        }
    }

}// loadMap()


function getTilePacket(map1, tileIndex) {
        var pkt = {
            "img": null,
            "px": 0,
            "py": 0
        };

        var tile = 0;
        for(tile = map1.tilesets.length - 1; tile >= 0; tile--) {
            if(map1.tilesets[tile].firstgid <= tileIndex) break;
        }

        pkt.img = map1.tilesets[tile].image;


        var localIdx = tileIndex - map1.tilesets[tile].firstgid;
        var margin = map1.tilesets[tile].margin;
        var spacing = map1.tilesets[tile].spacing;

        var lTileX = Math.floor(localIdx % Math.floor(map1.tilesets[tile].imagewidth / map1.tilesets[tile].tilewidth));
        var lTileY = Math.floor(localIdx / Math.floor(map1.tilesets[tile].imagewidth / map1.tilesets[tile].tileheight));

        pkt.px = margin + lTileX * (map1.tilewidth + spacing);
        pkt.py = margin + lTileY * (map1.tileheight + spacing);


        return pkt;
} // getTilePacket()