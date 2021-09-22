class SceneOver extends Phaser.Scene {
    constructor() {
        super('SceneOver');
    }
    preload() {
    }
    create() {
        this.back=this.add.image(0,0,"titleBack")
        this.back.setOrigin(0,0)
        this.back.displayWidth=game.config.width
        this.back.displayHeight=game.config.height

        this.aGrid = new AlignGrid({scene:this,rows:11,cols:11})
        // this.aGrid.showNumbers()
        
        this.titleText=this.add.text(0,0,"QUICK\nBLOCK",{fontSize:game.config.width/5, color:"#000"})

        this.btnStart = new TextButton({
            scene:this,
            eventEmit:mt.constants.START_GAME,
            params:this.scene,
            key:"btnRed",
            text:"Play Again",
            scale:0.35,
            textScale:30,
            textColor:'#fff'})
        Align.center(this.btnStart)

        this.btnInstr = new TextButton({
            scene:this,
            eventEmit:mt.constants.SHOW_INSTR,
            params:this.scene,
            key:"btnBlue",
            text:"How to Play",
            scale:0.35,
            textScale:30,
            textColor:'#fff'})
        this.aGrid.placeAtIndex(35, this.btnInstr)

        this.btnSettings = new TextButton({
            scene:this,
            eventEmit:mt.constants.SHOW_SETTINGS,
            params:this.scene,
            key:"btnOrange",
            text:"Settings",
            scale:0.35,
            textScale:30,
            textColor:'#fff'})
        this.aGrid.placeAtIndex(85, this.btnSettings)
    }
    update() {}
}