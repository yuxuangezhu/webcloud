/*****************************************
*jsonp                                   *
* (c) 2014 from yuxuan-王军              *
*2014-10-3                               *
*****************************************/
$(document).ready(function () {
        $.ajax({//jsonp调取数据
            dataType: "jsonp",
            //data: "id=10",
            jsonp: "callback",
            url: "http://mwebtest.duapp.com",
            success: function (data) {
                if(data.errno!=0){//判断是否成功调取
                    $('.list').empty().append('网络异常，数据获取失败！');
                    return;
                }
                var data=data.list;//定义所调取的数据
                console.log(data);
                var i=data.length;//定义获取数据条数
                var array=[];//定义显示数组                
                var num=9;//定义每页显示几条数据
                var screenWidth=$(window).width();  //获取浏览器宽度
                if(screenWidth<=898){
                    num=3
                }else if(screenWidth<1349){
                    num=6
                };
                var page= Math.ceil(i/num);//计算页数
                var k=parseInt(geturl('text_k'));//调用函数获取$text_k的值
                    if(isNaN(k))//判断是否为空,初始化分页
                        {
                            var k=1;
                        };         
                var up=k-1;//上一页按钮传递的参数
                var down=k+1;//下一页按钮传递的参数
                    if(up==0){
                        up=1;
                        };
                    if (down>page) {
                        down=page;
                        };
                var h=0;
                for(var i=(k-1)*num;(i<k*num)&&(i<data.length);i++){
                    h=h+1;
                }
                h=251*Math.ceil(h/3)+25;
                $(".list").css("height",[h]+"px");//页面list高度    
                $(".text_box").css("height",[h+200]+"px");//页面text_box高度
                for(var i=(k-1)*num;(i<k*num)&&(i<data.length);i++){//将获取的数据循环出来  
                        array=data[i];
                        var title=array.title;//获取标题
                            if(title.length>=10){//检测标题长度
                                title=title.substr(0,10)+"...";//标题过长，则加"..."
                                };
                        var username=array.username;
                            if(username.length>=8){
                                username=username.substr(0,8)+"...";
                                };
                        var msgcount=array.msgcount.toString();
                            if(msgcount.length>=3){
                                msgcount=msgcount.substr(0,3);
                                };
                        var lovecount=array.lovecount.toString();
                            if(lovecount.length>=3){
                                lovecount=lovecount.substr(0,3);
                                };
                        var sharecount=array.sharecount.toString();
                            if(sharecount.length>=3){
                                sharecount=sharecount.substr(0,3);
                                };
                    $(".list").append("<div class='list_box'>\
                                            <img class='list_img' src='images/img.png' />\
                                            <div class='list_title'>"+title+"</div>\
                                            <div class='list_inf'>\
                                                <div class='list_inf_left'>\
                                                    <div class='list_inf_left_user'></div>\
                                                    <div class='list_user'>"+username+"</div>\
                                                </div>\
                                                <div class='list_inf_right'>\
                                                    <span class='list_inf_right_msg'></span><span>"+msgcount+"</span>\
                                                    <span class='list_inf_right_love'></span><span>"+lovecount+"</span>\
                                                    <span class='list_inf_right_share'></span><span>"+sharecount+"</span>\
                                                </div>\
                                            </div>\
                                        </div>"); 
                                    }
                if(page<=7){//输出页码
                    $(".page_left").append("<a href='./index.html?text_k="+[up]+"' class='page_left'></a>");
                    for(var p=1;p<=page;p++)
                        {
                            if(p==k){
                                $(".page_center").append("<span id='page"+[p]+"'>"+[p]+"</span>");
                            }else{
                                $(".page_center").append("<span id='page"+[p]+"'><a href='./index.html?text_k="+[p]+"'>"+[p]+"</a></span>");
                            }
                        }
                    $(".page_right").append("<a href='./index.html?text_k="+[down]+"' class='page_right'></a>");
                }else{
                    $(".page_left").append("<a href='./index.html?text_k="+[up]+"' class='page_left'></a>");
                    if(k<6){
                        for(var p=1;p<=7;p++)
                            {
                                if(p==k){
                                    $(".page_center").append("<span id='page"+[p]+"'>"+[p]+"</span>");
                                }else{
                                    $(".page_center").append("<span id='page"+[p]+"'><a href='./index.html?text_k="+[p]+"'>"+[p]+"</a></span>");
                                }
                            }
                    $(".page_center").append("<span_end id='page"+[page]+"'>...<a href='./index.html?text_k="+[page]+"'>"+[page]+"</a></span_end>");
                    }else if(k<page-3){
                        $(".page_center").append("<span_first id='page1'><a href='./index.html?text_k=1'>1</a>...</span_end>");
                        for(var p=k-3;p<=k+3;p++)
                            {
                                if(p==k){
                                    $(".page_center").append("<span id='page"+[p]+"'>"+[p]+"</span>");
                                }else{
                                    $(".page_center").append("<span id='page"+[p]+"'><a href='./index.html?text_k="+[p]+"'>"+[p]+"</a></span>");
                                }
                            }
                        $(".page_center").append("<span_end id='page"+[page]+"'>...<a href='./index.html?text_k="+[page]+"'>"+[page]+"</a></span_end>");
                    }else{
                        $(".page_center").append("<span_first id='page1'><a href='./index.html?text_k=1'>1</a>...</span_end>");
                        for(var p=page-6;p<=page;p++)
                            {
                                if(p==k){
                                    $(".page_center").append("<span id='page"+[p]+"'>"+[p]+"</span>");
                                }else{
                                    $(".page_center").append("<span id='page"+[p]+"'><a href='./index.html?text_k="+[p]+"'>"+[p]+"</a></span>");
                                }
                            }
                        }
                        $(".page_right").append("<a href='./index.html?text_k="+[down]+"' class='page_right'></a>");
                    }


                function geturl(name) {
                    var con_url = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
                    var condition = window.location.search.substr(1).match(con_url);
                    if (condition != null) return unescape(condition[2]); return null;
                }//正则获取url参数
               
            },
        });
    });
