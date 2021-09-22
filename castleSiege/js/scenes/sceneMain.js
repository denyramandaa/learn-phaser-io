class SceneMain extends Phaser.Scene {
    constructor() {
        super('SceneMain');
    }
    preload()
    {
        
    }
    create() {
        this.checkFlag=false
        mt.mediaManager.setBackground("background")

        this.arrowGroup = this.physics.add.group()
        this.blockerGroup = this.physics.add.group()
        this.arrowCounter = 50
        this.speed=100
        this.arrowsShot=0;
        this.score=0;

        this.back=this.add.image(0,0,"back")
        this.back.displayHeight=game.config.height
        this.back.displayWidth=game.config.width 
        this.back.setOrigin(0,0)
        this.agrid = new AlignGrid({scene:this,rows:11,cols:11})
        // this.agrid.showNumbers()

        const wall = this.add.image(0,0,"wall")
        Align.scaleToGameW(wall,1)
        wall.x=game.config.width/2
        wall.y=wall.displayHeight/2
        this.wall = wall

        this.target = this.physics.add.sprite(0,0,"target")
        Align.scaleToGameW(this.target,.2)
        this.agrid.placeAtIndex(16,this.target)
        this.target.setVelocityX(this.speed)
        this.target.setImmovable()

        this.setColliders()

        this.input.on('pointerdown',this.spawnArrow, this)

        this.arrowCounterText = this.add.text(0,0,this.arrowCounter,{color:"#000", fontSize:game.config.width/30})
        this.arrowCounterText.setOrigin(0.5,0.5)
        this.agrid.placeAtIndex(100,this.arrowCounterText)

        this.arrowIcon = this.add.image(0,0,"arrow")
        Align.scaleToGameW(this.arrowIcon,.03)
        this.agrid.placeAtIndex(99, this.arrowIcon)

        this.scoreText = this.add.text(0,0,"0/0",{color:"#000", fontSize:game.config.width/30})
        this.scoreText.setOrigin(0.5,0.5)
        this.agrid.placeAtIndex(108, this.scoreText)
    }
    updateText() {
        this.scoreText.setText(this.score+"/"+this.arrowsShot)
    }
    setColliders() {
        this.physics.add.collider(this.target, this.arrowGroup, this.hitTarget,null, this)
        this.physics.add.collider(this.arrowGroup, this.blockerGroup, this.hitBlocker,null, this)
    }
    spawnArrow(pointer) {
        if(this.arrowCounter==0) return
        this.arrowCounter--
        this.arrowsShot++
        this.arrowCounterText.setText(this.arrowCounter)
        let arrow = this.physics.add.sprite(0,0,"arrow")
        Align.scaleToGameW(arrow, .025)
        this.arrowGroup.add(arrow)
        this.agrid.placeAtIndex(93,arrow)
        arrow.x=pointer.x
        arrow.setVelocityY(-250)
        this.updateText()
        if(this.arrowCounter/2==Math.floor(this.arrowCounter/2)) {
            mt.mediaManager.playSound("swish1")
        } else {
            mt.mediaManager.playSound("swish2")
        }
    }
    hitBlocker(arrow, block) {
        arrow.destroy()
    }
    hitTarget(target, arrow) {
        arrow.destroy()
        this.speed+=5
        this.score++
        this.updateText()

        let effect=new Effect({scene:this, effectNumber:mt.model.effectNumber})
        effect.x=this.target.x;
        effect.y=this.target.y;
        mt.mediaManager.playSound("hit")
        if(this.score==10) {
            this.addBlocker(50)
        }
        if(this.score==20) {
            this.addBlocker(68)
        }
        if(this.score==50) {
            this.addBlocker(22)
        }
    }
    addBlocker(pos) {
        let blocker = this.physics.add.sprite(0,0,"blocker")
        Align.scaleToGameW(blocker, 0.1)
        this.blockerGroup.add(blocker)
        this.agrid.placeAtIndex(pos, blocker)
        blocker.setVelocityX(this.speed)
        blocker.setImmovable()
    }
    update() {
        if(this.target.x>game.config.width) {
            this.target.setVelocityX(-this.speed)
        }
        if(this.target.x<0) {
            this.target.setVelocityX(this.speed)
        }
        this.arrowGroup.children.iterate(function(child) {
            if(child && child.y<0) {
                child.destroy()
            }
        }.bind(this))
        this.blockerGroup.children.iterate(function(child) {
            if(child && child.x<0) {
                child.setVelocityX(this.speed)
            }
            if(child && child.x>game.config.width) {
                child.setVelocityX(-this.speed)
            }
        }.bind(this))
        if(this.arrowCounter==0 && this.arrowGroup.children.entries.length==0) {
            this.checkWin()
        }
    }
    checkWin() {
        if(this.checkFlag) return
        this.checkFlag=true
        mt.mediaManager.stopMusic()
        if(this.score<5) {
            this.scene.start("SceneOver")
        } else {
            let exp = new Effect({scene:this, effectNumber:mt.model.explodeNumber})
            exp.x=this.wall.x
            exp.y=this.wall.y
            this.tweens.add({targets: this.wall,duration: 2000,alpha:0})
            mt.mediaManager.playSound("boom")
            this.time.addEvent({ delay: 3000, callback: this.doGameOver, callbackScope: this, loop: false });
        }
    }
    doGameOver() {
        this.scene.start("SceneOver")
    }
}