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
const width =canvas.offsetWidth;
const height =canvas.offsetHeight;
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  70,
  width / height,
  0.1,
  1000
);

camera.position.set(10,10,10);
camera.lookAt(0,0,0);


const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true, });
renderer.setClearColor(0x000000);
renderer.setSize(width, height);

const geometry = new THREE.SphereGeometry(8,20,20);
const material = new THREE.MeshNormalMaterial({wireframe:true});
const shape = new THREE.Mesh(geometry,material);
scene.add(shape);

//animation method:
update();

function update() {
    renderer.render(scene,camera);
    shape.rotateY(0.003);
    requestAnimationFrame(update);
        
}


//morph object at set time:
//setTimeout(()=>{ morph(shape,2,2);},8000);


//morph object method:
function morph(object,width,height){
let condition = false;
let newGeometry = new THREE.SphereGeometry(8,width,height);
let newMaterial = new THREE.MeshNormalMaterial({wireframe:condition});

object.traverse((obj)=>{
    
    if(obj){
        obj.geometry = newGeometry;
        obj.material = newMaterial;
    }

});

}
