var Paddle = function(game) {
    //var image = imageFromPath('./image/paddle.png')
    var img = game.imageByName('paddle')
    var o = {
        image: img.image,
        x: 100,
        y: 250,
        speed: 15,
        speedDir: 1,
    }
    var paddle = o
    o.move = function(x) {
        if (x < 0) {
            x = 0
        }
        if (x > 600 - o.image.width) {
            x = 600 - o.image.width
        }
        o.x = x
    }
    o.moveLeft = function() {
        paddle.speedDir = -1
        o.move(o.x + o.speed * o.speedDir)
    }
    o.moveRight = function() {
        o.speedDir = 1
        o.move(o.x + o.speed * o.speedDir)
    }
    return o
}