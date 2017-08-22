var loadLevel = function(game, n) {
    var level = levels[n - 1]
    var blocks = []
    for (var i = 0; i < level.length; i++) {
        var p = level[i]
        var b = Block(game, p)
        blocks.push(b)
    }
    return blocks
}

var blocks = []
var enableDebugMode = function(game, enable) {
    if (!enable) {
        return
    }
    window.paused = false
    window.addEventListener('keydown', function(event) {
        var k = event.key
        if (k === 'p') {
            // pause mode
            window.paused = !window.paused
        } else if ('1234567'.includes(k)) {
            // 为了 debug 临时加的载入关卡功能
            blocks = loadLevel(game, Number(k))
        }
    })
    // speed control
    document.querySelector('#id-input-speed').addEventListener('input', function(event) {
        var input = event.target
        log(event, input.value)
        window.fps = Number(input.value)
    })
}

var __main = function() {
    var images = {
        ball: './image/ball.png',
        block: './image/block.png',
        paddle: './image/paddle.png',
    }

    var game = GuaGame(30, images, function(g) {
        var paddle = Paddle(game)
        var ball = Ball(game)
        var score = 0
        blocks = loadLevel(game, 1)
        var noFired = true
        game.registerAction('a', function() {
            paddle.moveLeft()
        })
        game.registerAction('d', function() {
            paddle.moveRight()
        })
        game.registerAction('f', function() {
            ball.fire()
            noFired = false
        })

        // mouse event
        var enableDrag = false
        var oldMousePostion = {
            x: 0,
            y: 0,
        }
        game.canvas.addEventListener('mousedown', function(event) {
            var x = event.offsetX
            var y = event.offsetY
            // 检查是否点中了 ball
            if ((noFired || window.paused) && ball.hasPoint(x, y)) {
                // 设置拖拽状态
                enableDrag = true
                oldMousePostion.x = x
                oldMousePostion.y = y
            }
        })
        game.canvas.addEventListener('mousemove', function(event) {
            var x = event.offsetX
            var y = event.offsetY
            if ((noFired || window.paused) && enableDrag) {
                ball.x += (x - oldMousePostion.x)
                ball.y += (y - oldMousePostion.y)
                oldMousePostion.x = x
                oldMousePostion.y = y
            }
        })
        game.canvas.addEventListener('mouseup', function(event) {
            var x = event.offsetX
            var y = event.offsetY
            enableDrag = false
            oldMousePostion = {
                x: 0,
                y: 0,
            }
        })

        game.update = function() {
            if (window.paused) {
                return
            }
            ball.move()
        
            // 判断相撞
            var collide = ball.collide(paddle)
            ball.rebound(collide[0], collide[1])
            
            // 判断 ball 和 blocks 相撞
            for (var i = 0; i < blocks.length; i++) {
                var block = blocks[i]
                if (!block.alive) {
                    continue
                }
                var collide = ball.collide(block)
                ball.rebound(collide[0], collide[1])
                if (collide[0] != 0 || collide[1] != 0) {
                    block.kill()
                    // 更新分数
                    score += 100
                    break
                }
            }
        }

        game.draw = function() {
            // draw 背景
            game.context.fillStyle = "#554"
            game.context.fillRect(0, 0, 600, 400)
            // draw
            game.drawImage(paddle)
            game.drawImage(ball)
            // draw blocks
            for (var i = 0; i < blocks.length; i++) {
                var block = blocks[i]
                if (block.alive) {
                    game.drawImage(block)
                }
            }

            // draw labels
            game.context.fillText('分数: ' + score, 10, 390)
        }
    })

    enableDebugMode(game, true)
}

__main()

