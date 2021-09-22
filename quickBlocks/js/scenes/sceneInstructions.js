class SceneInstructions extends Phaser.Scene {
    constructor() {
        super('SceneInstructions');
    }
    preload() {
        this.load.image("sample","images/sample.png")
    }
    create() {
        this.back=this.add.image(0,0,"titleBack")
        this.back.setOrigin(0,0)
        this.back.displayWidth=game.config.width
        this.back.displayHeight=game.config.height

        this.aGrid = new AlignGrid({scene:this, rows:11,cols:11})
        this.aGrid.showNumbers()

        this.sampleImage = this.add.image(0,0,"sample")
        Align.scaleToGameW(this.sampleImage,.5)
        this.aGrid.placeAtIndex(27, this.sampleImage)

        this.textInstruction = this.add.text(0,0,"Click the same color block\nas the center block\nbefore time runs out",{color:'#000', align: 'center', fontSize: game.config.width/30, backgroundColor: '#fff'})
        this.textInstruction.setOrigin(0.5,0.5)
        this.aGrid.placeAtIndex(71,this.textInstruction)

        this.btnBackToHome = new TextButton({
            scene:this,
            eventEmit:mt.constants.GO_HOME,
            params:this.scene,
            key:"btnGreen",
            text:"Back to Home",
            scale:0.35,
            textScale:25,
            textColor:'#fff'})
        this.aGrid.placeAtIndex(93, this.btnBackToHome)
    }
    update() {}
}