var Ball = function(game) {
    var img = game.imageByName('ball')
    //var image = imageFromPath('./image/ball.png')
    var o = {
        image: img.image,
        x: 100,
        y: 200,
        speedX: 5,
        speedY: 5,
        speedXDir: 1,
        speedYDir: -1,
        fired: false,
    }
    o.fire = function() {
        o.fired = true
    }
    o.move = function() {
        if (o.fired) {
            var nextX = o.x + o.speedX * o.speedXDir
            var nextY = o.y + o.speedY * o.speedYDir
            if (nextX > 0 && nextX + o.image.width < 600) {
                o.x = nextX
            } else {
                o.speedXDir *= -1
                if (nextX < 0) {
                    o.x = 0
                }
                if (nextX + o.image.width > 600) {
                    o.x = 600 - o.image.width
                }
            }
            if (nextY > 0 && nextY + o.image.height < 400) {
                o.y = nextY
            } else {
                o.speedYDir *= -1
                if (nextY < 0) {
                    o.y = 0
                }
                if (nextY + o.image.height > 400) {
                    o.y = 400 - o.image.height
                }
            }
        }
    }
    o.collide = function(block) {
        var collideBool = [0, 0]
        var rect = {
            top: block.y,
            bottom: block.y + block.image.height,
            left: block.x,
            right: block.x + block.image.width,
        }
        var leftTop = {
            x: o.x,
            y: o.y,
        }
        var rightTop = {
            x: o.x + o.image.width,
            y: o.y,
        }
        var leftBottom = {
            x: o.x,
            y: o.y  + o.image.height,
        }
        var rightBottom = {
            x: o.x + o.image.width,
            y: o.y + o.image.height,
        }
        if (rectIntersects(o, block) || rectIntersects(block, o)) {
            if (postionInRect(leftTop, rect) && postionInRect(leftBottom, rect)) {
                collideBool[0] = -1
            } else if (postionInRect(rightTop, rect) && postionInRect(rightBottom, rect)) {
                collideBool[0] = -1
            } else if (postionInRect(leftTop, rect) && postionInRect(rightTop, rect)) {
                collideBool[1] = 1
            } else if (postionInRect(leftBottom, rect) && postionInRect(rightBottom, rect)) {
                collideBool[1] = -1
            }
            //log (collideBool)
            if (collideBool[0] === 0 && collideBool[1] === 0) {
                //log(leftTop, leftBottom, rightTop, rightBottom, rect)
                if (postionInRect(leftTop, rect)) {
                    collideBool[0] = 1
                    collideBool[1] = 1
                } else if (postionInRect(rightTop, rect)) {
                    collideBool[0] = -1
                    collideBool[1] = 1
                } else if (postionInRect(leftBottom, rect)) {
                    collideBool[0] = 1
                    collideBool[1] = -1
                } else if (postionInRect(rightBottom, rect)) {
                    collideBool[0] = -1
                    collideBool[1] = -1
                }
            }
            //log (collideBool)
        }
        return collideBool
    }
    o.rebound = function(xChange, yChange) {
        if (xChange != 0)
            o.speedXDir = xChange
        if (yChange != 0)
            o.speedYDir = yChange
    }
    o.hasPoint = function(x, y) {
        var xIn = x >= o.x && x <= o.x + o.image.width
        var yIn = y >= o.y && y <= o.y + o.image.height
        return xIn && yIn
    }
    return o
}