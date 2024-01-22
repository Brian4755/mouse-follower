import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const textureLoader = new THREE.TextureLoader();

const waterBaseColor = textureLoader.load("./public/Water_002_COLOR.jpg");
const waterNormalMap = textureLoader.load("./public/Water_002_NORM.jpg");
const waterHeightMap = textureLoader.load("./public/Water_002_DISP.png");
const waterRoughness = textureLoader.load("./public/Water_002_ROUGH.jpg");
const waterAmbientOcclusion = textureLoader.load("./public/Water_002_OCC.jpg");

const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector3();

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGL1Renderer({
  canvas: document.querySelector('#bg')
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
const controls = new OrbitControls(camera, renderer.domElement);

scene.add(new THREE.AmbientLight(0xffffff, 0.5));
const dirLight = new THREE.DirectionalLight(0xffffff, 8.0)
dirLight.position.x += 20
dirLight.position.y += 20
dirLight.position.z += 20
dirLight.castShadow = true

scene.add(dirLight)

const geometry = new THREE.SphereGeometry(4.5,50);
const material = new THREE.MeshStandardMaterial({
  map: waterBaseColor,
  normalMap: waterNormalMap, 
  displacementMap: waterHeightMap, displacementScale: 0.01, 
  roughnessMap: waterRoughness, roughness: 0, 
  aoMap: waterAmbientOcclusion
});
const sphere = new THREE.Mesh(geometry, material);

controls.enableZoom = false;


function onPointerMove( event ) {
	pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
}

pointer.unproject(camera)
pointer.sub(camera.position).normalize()

let sizeGoal = 0
let event = false

function shrink() {
  sizeGoal = 0

  if (event === false) {
    Math.random() > 0.95 ? event = true : event
  }

  if (event === true) {
    if (sizeGoal === 0) {
      sizeGoal = -1
    }
    if (sphere.scale.x <= 0.01) {
      if (Math.random() > 0.4) {
        sizeGoal = 1
        event = !event
      }
    }
  }
  setTimeout(shrink, 2000)
}



function animate() {
  requestAnimationFrame(animate);
  sphere.rotation.z += 0.02
  
  raycaster.setFromCamera( pointer, camera );

  sphere.scale.x += sizeGoal * 0.01
  sphere.scale.y += sizeGoal * 0.01
  sphere.scale.z += sizeGoal * 0.01
  if (event === true && sphere.scale.x < 0.01) {
    sphere.scale.set(0,0,0)
  }

    console.log(pointer.x, sphere.position.x)


  controls.update();

  renderer.render(scene, camera);
}

shrink()


scene.add(sphere);

window.addEventListener( 'pointermove', onPointerMove );

renderer.render(scene, camera);
animate()