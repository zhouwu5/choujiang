// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

var trophy = cc.Class({
	name:"trophy",
	properties:{
	    prefab: { //商品
            default: null,
            type: cc.Prefab
        },
	}
})

cc.Class({
    extends: cc.Component,

    properties: ()=>({
    	content:{
    		default: null,
    		type: cc.Node
    	},
	    spriteFrame: { //动画背景图片
            default: null,
            type: cc.SpriteFrame
        },
	    spriteFrameActive: { //动画背景图片
            default: null,
            type: cc.SpriteFrame
        },
        trophy:{
        	default:[],
        	type:trophy
        },
        sound:{
        	default: null,
    		type: cc.Node
        },
        sTime:0,
        sycle:0,
        timeNum:0,
        snum:0,
        index:0
        //奖品图集
    }),

    // LIFE-CYCLE CALLBACKS:

     onLoad () {
     	for(var i=0;i<this.content.children.length;i++){
     		this.content.children[i].getComponent(cc.Sprite).spriteFrame = this.spriteFrame;
     		var node = cc.instantiate(this.trophy[i%this.trophy.length].prefab);
     		node.parent = this.content.children[i];
     	}
     	console.log(this.content.children)
     	//self.node.getComponent(cc.Sprite).spriteFrame = spriteFrame;

     	 
     },

    start () {

    },
	
	startAction:function(){
		if(this.snum==0){
			this.sound.getComponent(cc.AudioSource).play();
			this.runschedule()
 	 	}
	},
    
    runschedule:function(){
		this.runanimate=function(){
			if(this.snum>this.sycle*this.content.children.length+this.timeNum+this.timeNum){
				this.sound.getComponent(cc.AudioSource).stop();
				this.unschedule(this.runanimate);
				this.snum=0;
			}
			else if(this.snum>this.sycle*this.content.children.length){ 
				this.sound.getComponent(cc.AudioSource).play()
     	 		this.content.children[(this.index+this.content.children.length-1)%this.content.children.length].getComponent(cc.Sprite).spriteFrame = this.spriteFrame;
     	 		this.index=this.index%this.content.children.length;
     	 		this.content.children[this.index].getComponent(cc.Sprite).spriteFrame = this.spriteFrameActive;
     	 		this.index++;
     	 		this.snum++;
				this.unschedule(this.runanimate);
     	 		this.schedule(this.runanimate,this.sTime*7,cc.macro.REPEAT_FOREVER);
			}else if(this.snum==(this.sycle-1)*this.content.children.length){
				this.sound.getComponent(cc.AudioSource).play()
     	 		this.content.children[(this.index+this.content.children.length-1)%this.content.children.length].getComponent(cc.Sprite).spriteFrame = this.spriteFrame;
     	 		this.index=this.index%this.content.children.length;
     	 		this.content.children[this.index].getComponent(cc.Sprite).spriteFrame = this.spriteFrameActive;
     	 		this.index++;
     	 		this.snum++;
     	 		this.unschedule(this.runanimate);
     	 		this.schedule(this.runanimate,this.sTime*3.5,cc.macro.REPEAT_FOREVER);
   }else{
     	 		this.content.children[(this.index+this.content.children.length-1)%this.content.children.length].getComponent(cc.Sprite).spriteFrame = this.spriteFrame;
     	 		this.index=this.index%this.content.children.length;
     	 		this.content.children[this.index].getComponent(cc.Sprite).spriteFrame = this.spriteFrameActive;
     	 		this.index++;
     	 		this.snum++;
     	 	}
		}.bind(this)
     	this.schedule(this.runanimate,this.sTime,cc.macro.REPEAT_FOREVER);
     	console.log(1)
    }
});
