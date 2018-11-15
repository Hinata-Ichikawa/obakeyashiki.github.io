var $noizeElems;
var oldTime;
var newTime;

// アニメーション中フラグ
var isAnimation = false;

// ノイズアニメーションの時間
var animationTime = 700;
// アニメーションさせない時間間隔
var animationInterval = 1000;
// ノイズで揺らす許容値
var animationRange = 50;

// 簡易的にsetTimeoutでアニメーション
function animationLoop(){
    newTime = new Date().getTime();

    var diff = newTime - oldTime;

    if(isAnimation) {
        if(diff >= animationTime) {
            initNoizePosition();
            oldTime = newTime;
            isAnimation = false;
        } else {
            noizeAnimation();
        }
    } else {
        if(diff >= animationInterval) {
            oldTime = newTime;
            isAnimation = true;
            noizeAnimation();
        }
    }

setTimeout(animationLoop, 1000 / 60);
}

// アニメーション終了時にcssの値を戻す
function initNoizePosition(){
    $noizeElems.css("left", 0);
}

// 乱数を使ってノイズのアニメーション
function noizeAnimation(){
    $noizeElems.each(function(){
        var animValue = (Math.random() - Math.random()) * animationRange;
        $(this).css({left: animValue});
    });
}

$(function(){
    oldTime = new Date().getTime();
    $noizeElems = $(".noizeAnim");
    setTimeout(animationLoop, 1000 / 60);
});

