/**
 * Created by Administrator on 2016/3/17.
 */
//页面加载完成之后执行
window.onload= function () {
    //固定搜索特效
    search();
    banner();
    timeDown();
}

    //搜索特效
    function search(){
        //在页面滚动的时候 盒子改变透明度
        //当页面的滚动的高度超过banner的高度时盒子透明度为0.85不改变

        //获取我们操作的盒子
        var scrollBox=document.getElementsByClassName("jd_header")[0];
        //获取banner盒子以便于获取它的高度
        var bannerBox=document.getElementsByClassName("jd_banner")[0];
        //获取banner的高度
        var bannerH=bannerBox.offsetHeight;
        //监听页面滚动
        window.onscroll= function () {
            //不停获取距离顶部的高复
            var topH=document.body.scrollTop;
            //开始判断
            var opacity=0;//透明度默认为0；
            if(topH<bannerH){
                opacity=topH/bannerH*0.85//比例计算出透明度
            }else{
                opacity=0.85;
            }
            //拿到Dom设置背景颜色
            scrollBox.style.background="rgba(201,21,35,"+opacity+")"
        }


    }

    //轮播图
    function banner(){
        //需求：
        //1.让小圆点自动滚动；
        //2.图片无缝滚动
        //3.图片盒子可以滑动
        //4.当滑动的距离不超过1/3时 让图片自动吸附回去
        //5.超过三分之一时 根据滑动的方向来决定下一张还是上一张
        //首先获取到banner
        var banner=document.getElementsByClassName("jd_banner")[0];
        //获取图片的盒子
        var imgBox=banner.getElementsByTagName("ul")[0];
        //获取小圆点盒子
        var circleBox=banner.getElementsByTagName("ul")[1];
        var circle=circleBox.getElementsByTagName("li");

        //获取banner的宽度
        var bannerwidth=banner.offsetWidth;



        //加过渡
        var addTransition= function () {
            imgBox.style.webkitTransition="all 0.2s";
            imgBox.style.transition="all 0.2s";
        }
        //删除过渡
        var removeTransition= function () {
            imgBox.style.webkitTransition="none";
            imgBox.style.transition="none";
        }
        //加定位
        //当前X轴的定位
        var setTranslateX= function (x) {
            imgBox.style.webkitTransform='translateX('+x+'px)';
            imgBox.style.transform='translateX('+x+'px)';
        }


        //设置圆点的样式
        var setcircle= function (index) {
            //遍历小圆点
            for(var i=0;i<circle.length;i++){
                //排他  清除原有的类
                circle[i].className=" ";
            }
            //为当前图片对应的圆点添加样式
            circle[index-1].className="now";
        };

        var index=1;//默认索引
        var timer=setInterval(function () {
            index++;//索引加加
            //加过度
            addTransition();
            //设置移动x轴的位置   （等于负的索引乘以banner的宽度）
            setTranslateX(-index*bannerwidth);
        },3000);
        //transition 过渡结束时触发
        //animationEnd 动画结束时触发
        //过渡结束时判断当前图片的索引位子  无缝衔接
    itcast.transitionEnd(imgBox, function () {
        //运行到这个位子  index0-9之间
        if(index>=9){
            //第九章图片动画结束是 瞬间定位到第一张
            index=1;
            //删除过渡
            removeTransition();
            //设置x轴位置  定位
            setTranslateX(-index*bannerwidth);
        }else if(index<=0){
            //当第0张图片动画结束时 瞬间定位到最后一张图片
            index=8;
            //删除过渡
            removeTransition();
            //设置x轴位置  定位
            setTranslateX(-index*bannerwidth);
        }
        //设置点
        setcircle(index);
    });


   //触摸事件
        var startX=0;
        //记录滑动的时候的x坐标
        var moveX=0;
        //记录滑动的距离
        var distanceX=0;
        //记录是否移动过
        var isMove=false;
        //为imgbox盒子绑定触摸开始事件
        imgBox.addEventListener('touchstart', function (e) {
            //记录x轴的位子
            startX= e.touches[0].clientX;
            //清除定时器
            clearInterval(timer);
        });
        //为imgbox盒子绑定触摸移动事件
        imgBox.addEventListener('touchmove', function (e) {
            //不停滑动时 x轴的坐标
            moveX= e.touches[0].clientX;
            //滑动改变的距离
            distanceX=moveX-startX;
            console.log(distanceX);
            //删除过渡
            removeTransition();
            //设置位子
            setTranslateX(-index*bannerwidth+distanceX);
            //当touchmove事件结束后  设置为已经滑动过
            isMove=true;
        });
          //在最终完成touchend事件触发来操作  模拟器中有bug
        window.addEventListener('touchend', function (e) {
            //判断如果滑动的距离超过三分之一
            if(Math.abs(distanceX)>(bannerwidth/3)&&isMove){
                     //上一张
                if(distanceX>0){
                    index--;
                    //下一张
                }else{
                    index++;
                }
                //加过度
                addTransition();
                //定位子
                setTranslateX(-index*bannerwidth);
            }else{
                addTransition();
                setTranslateX(-index*bannerwidth);
            }
            //重置记录的参数的值
            startX=0;
            moveX=0;
            distanceX=0;
            isMove=false;
            //定时器
            clearInterval(timer);
            timer=setInterval(function () {
                index++;
                addTransition();
                setTranslateX(-index*bannerwidth);
            },3000);
        });
    };



//倒计时
var timeDown= function () {
    var time=5*60*60;
    //为了找到填充的地方  找到dom对象
    var timeBox=document.getElementsByClassName('sk_time')[0];
    var spans=timeBox.getElementsByTagName('span');
    var timer=setInterval(function () {
        //如果时间为零 则不做倒计时
        if(time<=0){
            clearInterval(timer);
            return false;//下面代码就不执行了
        }
        time--;
        var h=Math.floor(time/3600);
        var m=Math.floor((time%3600)/60);
        var s=time%60;
        //console.log(h+":"+m+":"+s);
        //放置到html中
        spans[0].innerHTML=Math.floor(h/10);
        spans[1].innerHTML=h%10;
        spans[3].innerHTML=Math.floor(m/10);
        spans[4].innerHTML=m%10;
        spans[6].innerHTML=Math.floor(s/10);
        spans[7].innerHTML=s%10;






    },1000)
}



























