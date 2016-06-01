/**
 * Created by Administrator on 2016/3/21.
 */
/**
 * Created by zhousg on 2016/3/18.
 */
/**
 * @author zhousg
 * @Date 2016-02-04
 * @Method ��������  ���һ���������ڲ���������������װ
 * @param args args.swipeDom ����������  args.swipeType ��������  args.swipeDistance �������
 * ע�⣺�������ĸ߿����ȡ�����ݵĸ߿� ����padding�Ĵ�С��Ӱ��
 */
if(!window.itcast){
    window.itcast = {};
}
itcast.iScroll = function(args){
    /*���õ�ʱ��û�г�ʼ���Ļ����ǳ�ʼ��һ��*/
    if(!(this instanceof arguments.callee)) return new arguments.callee(args);
    this.init(args);
};
itcast.iScroll.prototype = {
    constructor:itcast.iScroll,
    init:function(args){
        /*�ֲ����������ܵ�ǰ��this*/
        var that  = this;
        /*�������Ķ�����һ��Dom����Ͱ������������ǵĴ���������*/
        if(args.swipeDom && typeof  args.swipeDom == 'object'){
            that.parentDom = args.swipeDom;
        }
        /*��������ڸ�������ֹͣ��ʼ��*/
        if(!that.parentDom) return false;
        /*�ҵ�������*/
        that.childDom = that.parentDom.children&&that.parentDom.children[0]?that.parentDom.children[0]:'';
        /*�����������������ֹͣ��ʼ��*/
        if(!that.childDom) return false;
        /*��ʼ������Ĳ���*/
        that.settings = {};
        /*Ĭ������  Ĭ�ϵ�Y�Ử�� �������y�Ļ�������x�Ὺʼ����*/
        that.settings.swipeType = args.swipeType?args.swipeType:'y';
        /*Ĭ�ϵĻ��廬������*/
        that.settings.swipeDistance = args.swipeDistance>=0?args.swipeDistance:150;
        /*��ʼ������*/
        that._scroll();
    },
    /*���⿪�ŵ����ö�λ�ķ���*/
    setTranslate:function(translate){
        this.currPostion = translate;
        this._addTransition();
        this._changeTranslate(this.currPostion);
    },
    _addTransition:function(){
        this.childDom.style.transition = "all .2s ease";
        this.childDom.style.webkitTransition = "all .2s ease";/*���� �ϰ汾webkit�ں������*/
    },
    _removeTransition:function(){
        this.childDom.style.transition = "none";
        this.childDom.style.webkitTransition = "none";/*���� �ϰ汾webkit�ں������*/
    },
    _changeTranslate:function(translate){
        if(this.settings.swipeType == 'y'){
            this.childDom.style.transform = "translateY("+translate+"px)";
            this.childDom.style.webkitTransform = "translateY("+translate+"px)";
        }else{
            this.childDom.style.transform = "translateX("+translate+"px)";
            this.childDom.style.webkitTransform = "translateX("+translate+"px)";
        }
    },
    _scroll:function(){
        /*�ֲ����������ܵ�ǰ��this*/
        var that = this;
        /*����������*/
        var type = that.settings.swipeType == 'y'?true:false;
        /*�������ĸ߶Ȼ���*/
        var parentHeight = type?that.parentDom.offsetHeight:that.parentDom.offsetWidth;
        /*�������ĸ߶Ȼ���*/
        var childHeight = type?that.childDom.offsetHeight:that.childDom.offsetWidth;

        /*������û�и��������ʱ��*/
        if(childHeight < parentHeight){
            if(type){
                that.childDom.style.height = parentHeight + 'px';
                childHeight = parentHeight;
            }else{
                that.childDom.style.width = parentHeight + 'px';
                childHeight = parentHeight;
            }
        }

        /*�������*/
        var distance = that.settings.swipeDistance;
        /*����*/
        /*�����Ӷ�λ������*/
        that.maxPostion = 0;
        that.minPostion = -(childHeight-parentHeight);
        /*���û����ĵ�ǰλ��*/
        that.currPostion = 0;
        that.startPostion = 0;
        that.endPostion = 0;
        that.movePostion = 0;
        /*1.����*/
        that.childDom.addEventListener('touchstart',function(e){
            /*��ʼ��Y������*/
            that.startPostion = type?e.touches[0].clientY: e.touches[0].clientX;
        },false);
        that.childDom.addEventListener('touchmove',function(e){
            e.preventDefault();
            /*��ͣ����������ʱ���¼��endY��ֵ*/
            that.endPostion = type?e.touches[0].clientY: e.touches[0].clientX;
            that.movePostion = that.startPostion - that.endPostion;/*�������ƶ��ľ���*/

            /*2.��������*/
            /*���ǻ�������*/
            if((that.currPostion-that.movePostion)<(that.maxPostion+distance)
                &&
                (that.currPostion-that.movePostion)>(that.minPostion -distance)){
                that._removeTransition();
                that._changeTranslate(that.currPostion-that.movePostion);
            }
        },false);
        window.addEventListener('touchend',function(e){
            /*�����ƻ�������֮�� ���¼��㵱ǰ��λ*/
            /*�ж��Ƿ������ǵĺ���λ������*/
            /*�����»��� */
            if((that.currPostion-that.movePostion) > that.maxPostion){
                that.currPostion = that.maxPostion;
                that._addTransition();
                that._changeTranslate(that.currPostion);
            }
            /*���ϻ�����ʱ��*/
            else if((that.currPostion-that.movePostion) < that.minPostion){
                that.currPostion = that.minPostion;
                that._addTransition();
                that._changeTranslate(that.currPostion);
            }
            /*���������*/
            else{
                that.currPostion = that.currPostion-that.movePostion;
            }
            that._reset();
        },false);

    },
    _reset:function(){
        var that = this;
        that.startPostion = 0;
        that.endPostion = 0;
        that.movePostion = 0;
    }
};