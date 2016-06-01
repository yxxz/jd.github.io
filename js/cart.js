/**
 * Created by Administrator on 2016/3/21.
 */
window.onload= function () {
    deleteFuc();
};
function deleteFuc(){
    //让弹出框动画显示出来
    //打开盖子
    //点击取消时隐藏弹出框
    //同时盖上盖子



    //获取到弹出框
    var win=document.querySelector(".jd_window");
    var winbox=document.querySelector(".jd_win_box");
    //获取垃圾桶  事件源、
    var deleteBtns=document.querySelectorAll(".delete_box");
    //当前点击的按钮
    var deleteBox;
    //console.log(win);
    //console.log(winbox);
    //console.log(deleteBtns);
    //给所有的删除按钮绑定点击事件
    //遍历
    for(var i=0;i<deleteBtns.length;i++){
        deleteBtns[i].onclick= function () {
            //点击时让盒子做动画 加上bounceInDown
            win.style.display="block";
            //动画
            winbox.className="jd_win_box bounceInDown";
            //console.log(this)
            deleteBox=this;
            var deleteUp=deleteBox.querySelector('span:first-child');
            deleteUp.style.webkitTransition="all 1s";
            deleteUp.style.transition="all 1s";
            deleteUp.style.webkitTransform="rotate(-30deg) translate(2px)";
            deleteUp.style.transform="rotate(-30deg) translate(2px)";
            //改变旋转圆点
            deleteUp.style.webkitTransformOrigin="0 5px";
            deleteUp.style.transformOrigin="0 5px";
        }
    }

    //给取消按钮绑定事件
    //获取到取消按钮
    var cancleBtn=document.querySelector(".cancle");

    cancleBtn.onclick= function () {
        win.style.display="none";
        //盖上盖子
        //当点击过之后才有
        if(deleteBox){
          var deleteUp=deleteBox.querySelector('span:first-child');
            //console.log(deleteUp);
            deleteUp.style.webkitTransform="none";
            deleteUp.style.transform="none";
        }

    }
}












