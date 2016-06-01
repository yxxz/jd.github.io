/**
 * Created by Administrator on 2016/3/17.
 */
window.onload= function () {
    //左侧滑动
    leftSwipe();
    swipeRight();
}
function leftSwipe(){
    /*
    * 1.要求垂直方向的滑动
    * 2.当滑动到一定的距离时 滑动不了
    * 3.当滑动的位置超过了最小和最大允许的定位范围时   要吸附回去
    * 4.点击li时  改变当前的远视眼元素的样式
    * 5.并且需要滑动到屏幕顶部的位置
    * 6.底部触底的时候  滑动不了
    * */
    //获取夫盒子
    var parentDom=document.querySelector('.jd_categroy_left');
    //获取子盒子
    var childDom=parentDom.querySelector('ul');
    //获取夫盒子的高度
    var parentH=parentDom.offsetHeight;
    //获取子盒子的高度
    var childH=childDom.offsetHeight;

    //获取定位的区间
    var maxPosition=0;
    var minPosition=parentH-childH;
    //吸附的距离
    var distance=100;
    //获取滑动的时候定位的区间
    var minSwipe= minPosition-distance;
    var maxSwipe=maxPosition+distance;

    //记录必要参数
    //开始的Y轴坐标
    var startY=0;
    //移动的Y轴坐标
    var moveY=0;
    //滑动的Y轴坐标
    var distanceY=0;
    //记录是否滑动过
    var isMove=false;
    //贯穿全程序的当前定位
    var currY=0;
    //加过渡
    var addTransition= function () {
        childDom.style.webkitTransition='all 0.2s';//兼容
        childDom.style.transition='all 0.2s';
    };
    //删过渡
    var removeTransition= function () {
        childDom.style.webkitTransition='none';
        childDom.style.transition='none';
    };
    //定位
    var setTranslateY= function (y) {
        childDom.style.webkitTransform='translateY('+y+'px)';
        childDom.style.transform='translateY('+y+'px)';
    };


    //开始绑定时间
    childDom.addEventListener('touchstart', function (e) {
            //首先获取Y轴开始坐标
        startY= e.touches[0].clientY;
    });
    childDom.addEventListener('touchmove', function (e) {
        //获取Y轴移动坐标
        moveY= e.touches[0].clientY;
        distanceY=moveY-startY;
       // console.log(distanceY)
       // 做滑动时以需要清除过渡
        removeTransition();

        //滑动到一定位子就划不动了
        //做定位就做判断
        if((currY+distanceY)>minSwipe&&(currY+distanceY)<maxSwipe){
            setTranslateY(currY+distanceY);
        }
        isMove=false;
    });

    window.addEventListener('touchend', function (e) {
        //记录当前的位子（是上一次的位子加上移动的距离）
        if((currY+distanceY)>maxPosition){
            currY=maxPosition;
            addTransition();
            setTranslateY(currY);
        }else if((currY+distanceY)<minPosition){
            currY=minPosition;
            addTransition();
            setTranslateY(currY);
        }else{
            currY=currY+distanceY;
        }
        startY=0;
        moveY=0;
        distanceY=0;
    });
    //放在外面只加载一次
    var lis=childDom.querySelectorAll('li');
    itcast.tap(childDom, function (e) {
        //这个时候的事件源 a
        console.log(e.target);
        //获取当前点击的li、(a的夫元素)
        var li= e.target.parentNode;
        console.log(li);
        //遍历
        for(var i=0;i<lis.length;i++){
            lis[i].className=" ";
            //获取当前li的索引
            lis[i].index=i;
        }
            li.className="now";
        console.log(li.index);
        //获取li的索引 计算要定位的位置
        var translateY=-li.index*50;
        //当定位在定位区间内才允许滑动
        if(translateY>minPosition){
            currY=translateY
            addTransition();
            setTranslateY(currY);
        }else{
            currY=minPosition;
            setTranslateY(currY);
        }
    });

}

//右侧活动
function swipeRight(){
    itcast.iScroll({
        swipeDom:document.querySelector('.jd_category_right'),
        swipeType:'y',
        swipeDistance:50
    });
}