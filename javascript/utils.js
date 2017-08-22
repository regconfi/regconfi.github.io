//var e = sel => document.querySelector(sel)

var log = console.log.bind(console)

var imageFromPath = function(path) {
    var img = new Image()
    img.src = path   
    return img
}

var postionInRect = function (postion, rect) {
    //log(postion, rect)
    return (postion.x > rect.left && postion.x < rect.right && postion.y > rect.top && postion.y < rect.bottom)
}

var rectIntersects = function(a, b) {
    if ((b.y + b.image.height > a.y && b.y + b.image.height < a.y + a.image.height) || (b.y > a.y && b.y < a.y + a.image.height)) {
        if ((b.x + b.image.width > a.x && b.x + b.image.width < a.x + a.image.width) || (b.x > a.x && b.x < a.x + a.image.width)) {
            return true
        }
    }
    return false
} 