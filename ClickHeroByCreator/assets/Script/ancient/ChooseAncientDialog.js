
cc.Class({
    extends: cc.Component,

    properties: {
        items : [cc.Sprite],
        desc : cc.Label,
        container : cc.Node,
        btnAccept : cc.Node,
        sign : cc.Node,
    },

    // onLoad () {},

    start () {
        this.selIndex = -1;
        // 用选好的AncientList遍历初始化
        this.selAncients = HeroDatas.selAncients;
        for (let i = 0; i < 4; i++) {
            if (i >= this.selAncients.length) {
                this.items[i].node.active = false;
                continue;
            }
            const ancient = this.selAncients[i];
            this.items[i].node.bean = ancient;
            this.items[i].node.children[0].getComponent(cc.Label).string = ancient.name;
        }
    },

    onSelItem(event,i){
        this.btnAccept.active = true;
        this.selIndex = i;
        this.ancient = this.selAncients[i];
        this.desc.string = this.ancient.desc;
        this.sign.active = true;
        this.sign.parent = this.items[i].node;

        for (let j = 0; j < this.selAncients.length; j++) {
            this.items[j].node.color = (j == i)? new cc.Color(0xff,0xff,0xff):new cc.Color(0xc0,0xc0,0xc0);
        }
    },

    setCallback(cb){
        this._cb = cb;
    },

    onAccept(){
        // 这里要检查英魂是否够
        // 够了就扣掉
        let result = this.ancient.buy();
        if (!result) {
            console.log("英魂不够");
            return;
        }
        this.selAncients.splice(this.selIndex,1);
        HeroDatas.addSelAncient();
        this._cb(this.ancient);
        this.node.destroy();
    },

    onCancal(){
        this.node.destroy();
    },
});
