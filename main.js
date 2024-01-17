import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const textureLoader = new THREE.TextureLoader();

const waterBaseColor = textureLoader.load("./public/Water_002_COLOR.jpg");
const waterNormalMap = textureLoader.load("./public/Water_002_NORM.jpg");
const waterHeightMap = textureLoader.load("./public/Water_002_DISP.png");
const waterRoughness = textureLoader.load("./public/Water_002_ROUGH.jpg");
const waterAmbientOcclusion = textureLoader.load("./public/Water_002_OCC.jpg");

const target = new THREE.Vector3

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
// const material = new THREE.MeshBasicMaterial({
//   map: waterBaseColor,
// });
const material = new THREE.MeshStandardMaterial({
  map: waterBaseColor,
  normalMap: waterNormalMap, 
  displacementMap: waterHeightMap, displacementScale: 0.01, 
  roughnessMap: waterRoughness, roughness: 0, 
  aoMap: waterAmbientOcclusion
});
const sphere = new THREE.Mesh(geometry, material);

// sphere.receiveShadow = true
// sphere.castShadow = true

document.addEventListener('mousemove', onDocumentMouseMove)
controls.enableZoom = false;

let mouseX = 0
let mouseY = 0

function onDocumentMouseMove(e) {
  mouseX = e.clientX - window.innerWidth/2
  mouseY = e.clientY - window.innerHeight/2
}

let sizeGoal = 0
let event = false

function shrink() {
  sizeGoal = 0

  if (event === false) {
    Math.random() > 0.8 ? event = true : event
  }
  // console.log(event)

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
  console.log( mouseX, sphere.position.x)
  // console.log(sphere.scale.x, sizeGoal)
  setTimeout(shrink, 2000)
}


// console.log(sphere.scale)

function animate() {
  requestAnimationFrame(animate);
  sphere.rotation.z += 0.01
  target.x = (mouseX);
  target.y = (-mouseY);
  sphere.position.x += (mouseX * 0.119 - sphere.position.x) * 0.03
  sphere.position.y += (-mouseY * 0.119 - sphere.position.y) * 0.03
  

  // sphere.scale.x += sizeGoal * 0.01
  // sphere.scale.y += sizeGoal * 0.01
  // sphere.scale.z += sizeGoal * 0.01
  // if (event === true && sphere.scale.x < 0.01) {
  //   sphere.scale.set(0,0,0)
  // }

  controls.update();

  renderer.render(scene, camera);
}

shrink()


scene.add(sphere);

renderer.render(scene, camera);
animate()