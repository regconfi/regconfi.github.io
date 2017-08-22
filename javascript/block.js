var Block = function(game, position) {
    // positon 是 [0, 0] 格式
    var p = position
    //var image = imageFromPath('./image/block.png')
    var img = game.imageByName('block')
    var o = {
        image: img.image,
        x: p[0],
        y: p[1],
        w: img.width,
        h: img.height,
        alive: true,
        lifes: p[2] || 1,
        score: (p[2] || 1) * 100
    }
    o.kill = function() {
        o.lifes--
        if (o.lifes < 1) {
            o.alive = false
        }
    }
    return o
}