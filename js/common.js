/**
 * Created by Administrator on 2016/3/17.
 */
//����һ��windowȫ�ֶ���
window.itcast={};
//��window������һ��itcast����
//��itcast�������¼���ʱ��
itcast.transitionEnd= function (dom,callback) {
    //�ж�dom�ǲ���һ������ �Ƕ�����Ϊ����¼�
    if (typeof dom == 'object') {
        dom.addEventListener('webkitTransitionEnd', function () {
            callback && callback();
        });
        dom.addEventListener('transitionEnd', function () {
            callback && callback();
        });
    }
};



//��װtap�¼�
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
                /*Ϊ�������Ӧ���ٶ�*/
                callback && callback(e);
            }
        });
        isMove = false;
        time = 0;
    }
};