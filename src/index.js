
//import _ from 'lodash'
var scene = document.querySelector('a-scene')
var gamepad = navigator.getGamepads ? navigator.getGamepads() : ( navigator.webkitGetGamepads ? navigator.webkitGetGamepads() : null )
console.log(gamepad)

AFRAME.registerComponent(
    'camera-warning',{
        init:function(){
            this.cam = this.el.sceneEl.querySelector("#player")
            this.object = this.el.sceneEl.querySelector("#ball")
            this.objects = this.el.sceneEl.querySelector("#gen")
            this.triangle = this.cam.querySelector("#triangle")
            this.animate = this.triangle.querySelector('a-animation')
        },
        update: function () {
            this.cam.addEventListener('distance-warning',function(event){
                console.log(event)
                //event.detail.target.setAttribute('material','color','red')
                event.detail.target.emit('warn')
                //event.detail.target.setAttribute('material','color','#ccc')
            })
            
          },
        tick:function(){
            let camPos = this.cam.object3D.position
            let ballPos = this.object.object3D.position
            let distance = camPos.distanceTo(ballPos)
            //console.log(camPos)
            for(var i=0;i<1;i++){
                let itemPos = this.objects.children[i].object3D.position
                let dis = camPos.distanceTo(itemPos)
                if (dis<5){
                    this.triangle.emit("distance-warning",{direction:"left"})
                }
            }

            if (distance<5){
                console.log("too close")
            }
        }
    }
)


AFRAME.registerComponent(
    
    'camera-collision',{
        init:function(){
            this.triangle = this.el.querySelector('a-triangle')
            this.el.addEventListener('collide',function(e){
                console.log(e.detail.target.querySelector('a-triangle'))
                e.detail.target.emit('warn')
            }
            )
        }
        
    }
)


AFRAME.registerComponent(
    'distance-detect',{
        init:function(){
            this.cam = this.el.sceneEl.querySelector("#player")
            this.triangle = this.cam.querySelector("#triangle")
        },
        update: function () {
            this.el.addEventListener('distance-warning',function(event){
                event.detail.el_tochange.emit('warn')
            })
        },
        tick:function(){
            let camPos = this.cam.object3D.position
            let itemPos = this.el.object3D.position
            
            const distanceTo = (p1,p2)=>{
                return (Math.sqrt(Math.abs((p1.x-p2.x)*(p1.x-p2.x)+(p1.z-p2.z)*(p1.z-p2.z))))
            }
            
            let dis = distanceTo(itemPos,camPos)
            
            if (dis<5){
                this.el.emit("distance-warning",{el_tochange:this.triangle})
            }
        }
    }
)