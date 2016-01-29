var main=document.querySelector("#main");
var winW = document.documentElement.clientWidth;
var winH = document.documentElement.clientHeight;
var desW = 640;
var desH = 1008;
if(winW/winH<desW/desH){
    main.style.webkitTransform = "scale("+winH/desH+")";
}else{
    main.style.webkitTransform = "scale("+winW/desW+")";
}
/*第一页*/
var divs=document.querySelectorAll("div");
var loadBox=document.querySelector("#loadBox");
var ps=document.querySelectorAll("p");
function rubberBan(){
    ps[2].className="animated flip";
    loadBox.className="animated rotateOut";
    window.setTimeout(function(){
        ps[2].className="";
        loadBox.className="";
    },2000);
    window.setTimeout(rubberBan,3000);
}
rubberBan();
var pageT=document.querySelector("#pageT");
var photo=document.querySelector("#photo");
function photoAn(){
    photo.className="animated zoomInUp";
}

photoAn();
var title1=document.querySelector("#title1");
var title2=document.querySelector("#title2");
var title3=document.querySelector("#title3");
title1.className="animated fadeInLeft";
title2.className="animated fadeInLeft";
title3.className="animated fadeInRight";


[].forEach.call(divs,function(){
    var oDiv = arguments[0];
    oDiv.index = arguments[1];
    oDiv.addEventListener("touchstart",start,false);
    oDiv.addEventListener("touchmove",move,false);
    oDiv.addEventListener("touchend",end,false);
});
function start(e){
    this.startX = e.changedTouches[0].pageY;
}
function move(e){
    this.flag = true;
    var moveTouch = e.changedTouches[0].pageY;
    var movePos = moveTouch-this.startX;
    var index = this.index;
    [].forEach.call(divs,function(){
        arguments[0].className = "";
        if(arguments[1]!=index){
            arguments[0].style.display = "none"
        }
    });
    if(movePos>0){
        this.prevSIndex = (index == 0?divs.length-1:index-1);
        var duration = -winH+movePos;
    }else if(movePos<0){
        this.prevSIndex = (index == divs.length-1?0:index+1);
         duration = winH+movePos;
    }
    divs[this.prevSIndex].style.webkitTransform = "translate(0,"+duration+"px)";
    divs[this.prevSIndex].className = 'zIndex';
    divs[this.prevSIndex].style.display ="block";
}
function end(e){
    if(this.flag){
        divs[this.prevSIndex].style.webkitTransform = "translate(0,0)";
        divs[this.prevSIndex].style.webkitTransition = "0.5s ease-out";
        divs[this.prevSIndex].addEventListener("webkitTransitionEnd",function(e){
            if(e.target.tagName =="DIV"){
                this.style.webkitTransition = "";
            }
            this.firstElementChild.id="a"+(this.index+1);
        },false)
    }

}
