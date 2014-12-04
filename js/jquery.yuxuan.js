/*****************************************
*jQuery.yuxuan.js                        *
* (c) 2014 from yuxuan-王军              *
*2014-10-3                               *
*****************************************/
$(document).ready(function () {
    var screenWidth=$(window).width();  //获取浏览器宽度
    var img=$(".banner li").length;     //获取轮播数量
    var long=screenWidth*(img-1);       //设置轮播条件
    var ullong=screenWidth*img;         //设置轮播盒子宽度
    var isRun=false;
    $(".bannerbox").css("width",screenWidth);
    $(".banner").css("width",ullong);
    $(".banner img").css("width",screenWidth);
    $(".banner li").css("width",screenWidth);
    $(".bar").css("width",screenWidth);
    $(".footer").css("width",screenWidth);
    $("body").css("width",screenWidth);
    //依据浏览器宽度对页面属性设置
    function leftslide(){//上一张轮播
    if(isRun==true) return false;
    isRun=false;
    clearInterval(clock);//停止计时器计时，防止下一张提前
    var right=parseInt($(".banner").css("right"));//获取当前轮播位置
        if(right>0){//判断是否为第一张
            $(".banner").animate({right:'-='+screenWidth+'px'},"slow",function(){isRun=false});
        }
        else{//是第一张则转换为最后一张
            $(".banner").css("right",long+"px");
        }
    }
    function rightslide(){//下一张轮播
    if(isRun==true) return false;
    isRun=false;
    clearInterval(clock);//停止计时器计时，防止下一张提前
    var right=parseInt($(".banner").css("right"));
        if(right<long){//判断是否为最后一张
            $(".banner").animate({right:'+='+screenWidth+'px'},"slow",function(){isRun=false});
        }
        else{//是最后一张则转换为第一张
            $(".banner").css("right","0px");
        }
    }
    var clock=setInterval(slide,4000);//循环函数，数字越大轮播速度越慢
    function slide(){//轮播子函数
    if(isRun==true) return false;
    isRun=false;
     var right=parseInt($(".banner").css("right"));
        if(right<long){
            $(".banner").animate({right:'+='+screenWidth+'px'},"slow",function(){isRun=false});
        }
        else{
            $(".banner").css("right","0px");
        }
    }
    $(".left_bth").click(leftslide);    //上一张轮播事件
    $(".right_bth").click(rightslide);  //下一张轮播事件
    });