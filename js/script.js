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

const geometry = new THREE.SphereGeometry(8,40,40);
const material = new THREE.MeshNormalMaterial({wireframe:true});
const shape = new THREE.Mesh(geometry,material);
scene.add(shape);

update();


//animation method:
function update() {
    renderer.render(scene,camera);
    canvas.style.width = 100+"%";
    canvas.style.height = 100+"%";
    shape.rotateY(0.003);
    requestAnimationFrame(update);
    
}

//morph object at set time:
function change() {
    setTimeout(()=>{ morph(shape,1,3,true);},4000);
    setTimeout(()=>{ morph(shape,6,8,false);},8000);
    setTimeout(()=>{ morph(shape,5,7,true);},12000);
    setTimeout(()=>{ morph(shape,2,4,false);},16000);
    setTimeout(()=>{ morph(shape,9,11,true);},20000);
    setTimeout(()=>{ morph(shape,8,2,false);},24000);
    setTimeout(()=>{ morph(shape,13,15,true);},28000);
    setTimeout(()=>{ morph(shape,4,6,false);},32000);
    setTimeout(()=>{ morph(shape,17,19,true);},36000);
    setTimeout(()=>{ morph(shape,1,2,false);},40000);
    setTimeout(()=>{ morph(shape,21,23,true);},44000);
    setTimeout(()=>{ morph(shape,6,8,false);},48000);
    setTimeout(()=>{ morph(shape,25,27,true);},52000);
    setTimeout(()=>{ morph(shape,2,4,false);},56000);
    setTimeout(()=>{ morph(shape,9,3,true);},60000);
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
