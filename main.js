import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

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
const dirLight = new THREE.DirectionalLight(0xffffff, 1.0)
dirLight.position.x += 20
dirLight.position.y += 20
dirLight.position.z += 20

scene.add(dirLight)

const geometry = new THREE.SphereGeometry(4.5,50);
// const material = new THREE.MeshBasicMaterial( {color: 0xFF6347});
const material = new THREE.MeshStandardMaterial( {color: 0xFF6347});
const sphere = new THREE.Mesh(geometry, material);

sphere.receiveShadow = true
sphere.castShadow = true

document.addEventListener('mousemove', onDocumentMouseMove)

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
  // console.log(sphere.scale.x, sizeGoal)
  setTimeout(shrink, 2000)
}


// console.log(sphere.scale)

function animate() {
  requestAnimationFrame(animate);
  sphere.rotation.z += 0.01
  target.x = (mouseX);
  target.y = (-mouseY);
  sphere.position.x += (mouseX * 0.12 - sphere.position.x) * 0.02
  sphere.position.y += (-mouseY * 0.12 - sphere.position.y) * 0.02
  

  sphere.scale.x += sizeGoal * 0.01
  sphere.scale.y += sizeGoal * 0.01
  sphere.scale.z += sizeGoal * 0.01
  if (event === true && sphere.scale.x < 0.01) {
    sphere.scale.set(0,0,0)
  }

  controls.update();

  renderer.render(scene, camera);
}

shrink()


scene.add(sphere);

renderer.render(scene, camera);
animate()