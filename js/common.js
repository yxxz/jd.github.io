/**
 * Created by Administrator on 2016/3/17.
 */
//声明一个window全局对象
window.itcast={};
//在window下声明一个itcast对象
//在itcast下声明事件绑定时间
itcast.transitionEnd= function (dom,callback) {
    //判断dom是不是一个对象 是对象则为其绑定事件
    if (typeof dom == 'object') {
        dom.addEventListener('webkitTransitionEnd', function () {
            callback && callback();
        });
        dom.addEventListener('transitionEnd', function () {
            callback && callback();
        });
    }
};



//封装tap事件
itcast.tap= function (dom, callback) {
    if(typeof dom=='object'){
        var isMove = false;
        var time = 0;
        dom.addEventListener('touchstart',function(e){
            time = Date.now();
        });
        dom.addEventListener('touchmove',function(e){
            isMove = true;
        });
        window.addEventListener('touchend',function(e){
            if(!isMove && (Date.now()-time) < 150){
                /*为了提高响应的速度*/
                callback && callback(e);
            }
        });
        isMove = false;
        time = 0;
    }
};