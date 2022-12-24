//method for contact detail animation:
fotter();

function fotter() {    
    const inView = (object)=>{
        object.forEach(element => {
        element.target.classList.toggle('is-inViewport',element.isIntersecting);
    });
};

const object = new IntersectionObserver(inView);

const element = document.querySelectorAll('[data-inviewport]');
element.forEach(el=>{
    object.observe(el);
});
}

let svgObjects = document.getElementsByClassName("svgImg");
    console.log(svgObjects);

    let svgFrame = document.getElementsByClassName('svgFrame');
    console.log(svgFrame);
    svgFrame.item(0).style.width = "100%";
    svgFrame.item(1).style.width = "100%";

    
    
    let angle = Math.PI

    function animate(time, lastTime) {
        
        if (lastTime != null) {
            angle += Math.random()*0.005;
        }
        
    svgObjects.item(0).style.cy = (100*Math.abs(0.5-Math.sin(angle)));
    svgObjects.item(0).style.cx = (100*Math.abs(Math.cos(angle)));
        
    svgObjects.item(1).style.cy = (100*Math.abs(0.5+Math.sin(angle)));
    svgObjects.item(1).style.cx = (100*Math.abs(2*Math.cos(angle)));
    
    svgObjects.item(2).style.cy = (100*Math.abs(0.5-Math.sin(angle)));
    svgObjects.item(2).style.cx = (100*Math.abs(2*Math.cos(angle)));
    
    svgObjects.item(3).style.cy = (100*Math.abs(0.5*Math.sin(angle)));
    svgObjects.item(3).style.cx = (100*Math.abs(-3*Math.cos(angle)));
    
    svgObjects.item(4).style.cy = (100*Math.abs(Math.sin(0.5+angle)));
    svgObjects.item(4).style.cx = (100*Math.abs(2*Math.cos(angle)));
    
    svgObjects.item(5).style.cy = (100*Math.abs(Math.sin(0.5-angle)));
    svgObjects.item(5).style.cx = (100*Math.abs(Math.cos(2*angle)));
    
    requestAnimationFrame(newTime => animate(newTime, time));
    
    
}
requestAnimationFrame(animate);

//three.js code
//essential three.js components:
    
const canvas=document.getElementById('canvas');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
70,
window.innerWidth / window.innerHeight,
0.1,
1000
);

camera.position.set(10,10,10);
camera.lookAt(0,0,0);


const renderer = new THREE.WebGLRenderer({ canvas: canvas });
renderer.setClearColor(0x000000);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

const geometry = new THREE.SphereGeometry(8,40,40);
const material = new THREE.MeshNormalMaterial({wireframe:true});
const shape = new THREE.Mesh(geometry,material);
scene.add(shape);

//window resize && animation method:
function update() {
    renderer.render(scene,camera);
    canvas.style.width = 100+"%";
    canvas.style.height = 100+"%";
    shape.rotateY(0.003);    
    requestAnimationFrame(update);
//    renderer.setSize(canvas.clientWidth,canvas.clientHeight);

}
update();

//morph object at set time:
function change() {
    setTimeout(()=>{ morph(shape,9,3,true);},5000);
    setTimeout(()=>{ morph(shape,19,40,false);},10000);
    setTimeout(()=>{ morph(shape,6,5,true);},15000);
    setTimeout(()=>{ morph(shape,2,19,true);},20000);
    setTimeout(()=>{ morph(shape,9,3,false);},25000);
    setTimeout(()=>{ morph(shape,40,1,true);},30000);
    setTimeout(()=>{ morph(shape,1,40,true);},35000);
}   
change();



//morph object method:
function morph(object,width,height,condition){

let newGeometry = new THREE.SphereGeometry(8,width,height);
let newMaterial = new THREE.MeshNormalMaterial({wireframe:condition});

object.traverse((obj)=>{
    
    if(obj){
        obj.geometry = newGeometry;
        obj.material = newMaterial;
    }

});

}
