class TextButton extends UIBlock {
    constructor(config) {
        super()
        this.scene=config.scene

        this.back=this.scene.add.image(0,0,config.key)
        this.back.setInteractive()
        this.back.on("pointerdown", this.pressed, this)
        this.add(this.back)
        if(!config.scale) config.scale=0.45
        Align.scaleToGameW(this.back,config.scale)

        if(!config.textScale) config.textScale=30
        if(!config.textColor) config.textColor='#000'
        this.textField=this.scene.add.text(0,0,config.text,{fontSize:game.config.width/config.textScale,color:config.textColor})
        this.textField.setOrigin(0.5,0.5)
        this.add(this.textField)

        if(config.callBack) this.callBack=config.callBack
        if(config.callBackScope) this.callBackScope=config.callBackScope
        if(config.eventEmit) this.eventEmit=config.eventEmit
        if(config.params) this.params=config.params
    }
    pressed() {
        if(this.callBack) {
            this.callBackScope ?this.callBack.call(this.callBackScope) : this.callBack.apply()
        }
        if(this.eventEmit) {
            this.params ? mt.emitter.emit(this.eventEmit, this.params) : mt.emitter.emit(this.eventEmit)
        }
    }
}