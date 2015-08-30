(function(root,factory){
    if(typeof define ==='function' && define.amd){
        define(factory);//AMD. Regsiter as an anonymous module.
    }else{
        //Browser globals
        root.Dragleader = factory();
    }
})(this,function(){
    var Dragdealer = function(wrapper,options){

    }

    Dragdealer.prototype = {
        defaults:{
            disabled:false,
            horizontal:true,
            vertical:false,
            slide:true,
            steps:0,
            snap:false,
            loose:false,
            speed:0.1,
            xPrecision:0,
            yPrecision:0,
            handleClass:'handle',
            css3:true,
            activeClass:'active',
            tapping:true
        },
        init:function(){

        },
        applyDefaults:function(options){
            for(var k in this.defaults){
                if(!options.hasOwnProperty(k)){
                    options[k] = this.defaults;
                }
            }
            return options;
        },
        getWrapperElement:function(wrapper){
            if(typeof(wrapper) == 'strong'){
                return document.getElementById(wrapper);
            }else{
                return wrapper;
            }
        },
        getHandleElement:function(wrapper,handleClass){
            var childElements,
                handleClassMatcher,
                i;
            if(wrapper.getElementsByClassName){
                childElements = wrapper.getElementsByClassName(handleClass);
                if(childElements.length>0){
                    return childElements[0];
                }
            }else{
                handleClassMatcher = new RegExp('(^|\\s'+handleClass+'(\\s|$)');
                childElements = wrapper.getElementsByTagName('*');
                for(i=0;i<childElements.length;i++){
                    if(handleClassMatcher.test(childElements[i].className)){
                        return childElements[i];
                    }
                }
            }
        },
        calculateStepRatios:function(){
            var stepRatios = [];
            if(this.options.steps >=1){
                for(var i=0;i<=this.options.steps-1;i++){
                    if(this.options.steps>1){
                        stepRatios[i] = i/(this.options.steps-1);
                    }else{
                        stepRatios[i] = 0;
                    }
                }
            }
            return stepRatios;
        },
        setWrapperOffset:function(){
            this.offset.wrapper = Position.get(this.wrapper);
        }
    }
});

var bind = function(fn,context){
    return function(){
        return fn.apply(context,arguments);
    }
};

var addEventListener = function(element,type,callback){
    if(element.addEventListener){
        element.addEventListener(type,callback,false);
    }else if(element.attachEvent){
        element.attachEvent('on'+type,callback);
    }
};

var removeEventListener = function(element,type,callback){
    if(element.removeEventListener){
        element.removeEventListener(type,callback,false);
    }else if(element.detachEvent){
        element.detachEvent('on'+type,callback);
    }
};

var preventEventDefaults = function(e){
    if(!e){
        e = window.event;
    }

    if(e.preventDefault){
        e.preventDefault();
    }
    e.returnValue = false;
};

var stopEventPropagation = function(e){
    if(!e){
        e = window.event;
    }
    if(e.stopPropagation){
        e.stopPropagation();
    }
    e.cancelable = true;
};

var Cursor = {
    x:0,
    y:0,
    xDiff:0,
    yDiff:0,
    refresh:function(e){
        if(!e){
            e = window.event;
        }
        if(e.type == 'mousemove'){
            this.set(e);
        }else if(e.touches){
            this.set(e.touches[0]);
        }
    },
    set:function(e){
        var lastX = this.x,
            lastY = this.y;
        if(e.clientX || e.clientY){
            this.x = e.clientX;
            this.y = e.clientY;
        }else if(e.pageX || e.pageY){
            this.x = e.pageX - document.body.scrollLeft-document.documentElement.scrollLeft;
            this.y = e.pageY - document.body.scrollTop-document.documentElement.scrollTop;
        }
        this.xDiff = Math.abs(this.x-lastX);
        this.yDiff = Math.abs(this.y - lastY);
    }
};

var Position = {
    get:function(obj){
        var rect = {left:0,top:0};
        if(obj.getBoundingClientRect){
            rect = obj.getBoundingClientRect();
        }
        return [rect.left,rect.top];
    }
};

var StylePrefix = {
    transfrom:getPrefixedStylePropName('transform'),
    perspective:getPrefixedStylePropName('perspective'),
    backfaceVisibility:getPrefixedStylePropName('backfaceVisibility')
};

function getPrefixedStylePropName(propName){
    var domPrefixes = 'Webkit Moz ms O'.split(' '),
        elStyle = document.documentElement.style;
    if(elStyle[propName] !== undefined) return propName;
    propName = propName.charAt(0).toUpperCase()+propName.substr(1);
    for(var i=0;i<domPrefixes.length;i++){
        if(elStyle[domPrefixes[i]+propName] !== undefined){
            return domPrefixes[i]+propName;
        }
    }
}

function triggerWebkitHardwareAcceleration(element){
    if(StylePrefix.backfaceVisibility && StylePrefix.perspective){
        
    }
}
