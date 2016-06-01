/**
 * Created by Administrator on 2016/3/17.
 */
window.onload= function () {
    //��໬��
    leftSwipe();
    swipeRight();
}
function leftSwipe(){
    /*
    * 1.Ҫ��ֱ����Ļ���
    * 2.��������һ���ľ���ʱ ��������
    * 3.��������λ�ó�������С���������Ķ�λ��Χʱ   Ҫ������ȥ
    * 4.���liʱ  �ı䵱ǰ��Զ����Ԫ�ص���ʽ
    * 5.������Ҫ��������Ļ������λ��
    * 6.�ײ����׵�ʱ��  ��������
    * */
    //��ȡ�����
    var parentDom=document.querySelector('.jd_categroy_left');
    //��ȡ�Ӻ���
    var childDom=parentDom.querySelector('ul');
    //��ȡ����ӵĸ߶�
    var parentH=parentDom.offsetHeight;
    //��ȡ�Ӻ��ӵĸ߶�
    var childH=childDom.offsetHeight;

    //��ȡ��λ������
    var maxPosition=0;
    var minPosition=parentH-childH;
    //�����ľ���
    var distance=100;
    //��ȡ������ʱ��λ������
    var minSwipe= minPosition-distance;
    var maxSwipe=maxPosition+distance;

    //��¼��Ҫ����
    //��ʼ��Y������
    var startY=0;
    //�ƶ���Y������
    var moveY=0;
    //������Y������
    var distanceY=0;
    //��¼�Ƿ񻬶���
    var isMove=false;
    //�ᴩȫ����ĵ�ǰ��λ
    var currY=0;
    //�ӹ���
    var addTransition= function () {
        childDom.style.webkitTransition='all 0.2s';//����
        childDom.style.transition='all 0.2s';
    };
    //ɾ����
    var removeTransition= function () {
        childDom.style.webkitTransition='none';
        childDom.style.transition='none';
    };
    //��λ
    var setTranslateY= function (y) {
        childDom.style.webkitTransform='translateY('+y+'px)';
        childDom.style.transform='translateY('+y+'px)';
    };


    //��ʼ��ʱ��
    childDom.addEventListener('touchstart', function (e) {
            //���Ȼ�ȡY�Ὺʼ����
        startY= e.touches[0].clientY;
    });
    childDom.addEventListener('touchmove', function (e) {
        //��ȡY���ƶ�����
        moveY= e.touches[0].clientY;
        distanceY=moveY-startY;
       // console.log(distanceY)
       // ������ʱ����Ҫ�������
        removeTransition();

        //������һ��λ�Ӿͻ�������
        //����λ�����ж�
        if((currY+distanceY)>minSwipe&&(currY+distanceY)<maxSwipe){
            setTranslateY(currY+distanceY);
        }
        isMove=false;
    });

    window.addEventListener('touchend', function (e) {
        //��¼��ǰ��λ�ӣ�����һ�ε�λ�Ӽ����ƶ��ľ��룩
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
    //��������ֻ����һ��
    var lis=childDom.querySelectorAll('li');
    itcast.tap(childDom, function (e) {
        //���ʱ����¼�Դ a
        console.log(e.target);
        //��ȡ��ǰ�����li��(a�ķ�Ԫ��)
        var li= e.target.parentNode;
        console.log(li);
        //����
        for(var i=0;i<lis.length;i++){
            lis[i].className=" ";
            //��ȡ��ǰli������
            lis[i].index=i;
        }
            li.className="now";
        console.log(li.index);
        //��ȡli������ ����Ҫ��λ��λ��
        var translateY=-li.index*50;
        //����λ�ڶ�λ�����ڲ�������
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

//�Ҳ�
function swipeRight(){
    itcast.iScroll({
        swipeDom:document.querySelector('.jd_category_right'),
        swipeType:'y',
        swipeDistance:50
    });
}