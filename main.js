import './style.css'
import * as THREE from 'three';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const target = new THREE.Vector3

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGL1Renderer({
  canvas: document.querySelector('#bg')
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);


const geometry = new THREE.SphereGeometry(7,50);
// const geometry = new THREE.BoxGeometry(15,15,15);
const material = new THREE.MeshBasicMaterial( {color: 0xFF6347, wireframe: true});
const material1 = new THREE.MeshBasicMaterial( {color: 0x0000FF, wireframe: true});
const sphere = new THREE.Mesh(geometry, material);
const sphere1 = new THREE.Mesh(geometry, material1);
const sphere2 = new THREE.Mesh(geometry, material);
const sphere3 = new THREE.Mesh(geometry, material);


document.addEventListener('mousemove', onDocumentMouseMove)

let mouseX = 0
let mouseY = 0

function onDocumentMouseMove(e) {
  mouseX = e.clientX - window.innerWidth/2
  mouseY = e.clientY - window.innerHeight/2
}
// const controls = new OrbitControls(camera, renderer.domElement);


console.log(changeSize())

let sizeGoal = 0
let event = false
let sign = 1

function shrink() {
  sizeGoal = 0

  if (event === false) {
    Math.random() > 0.9 ? event = true : event
  }
  console.log(event)

  if (event === true) {
    if (sizeGoal === 0) {
      sizeGoal = -1
    }
    if (sphere.scale.x <= 0.01) {
      if (Math.random() > 0.7) {
        sizeGoal = 1
        event = !event
      }
    }
    // sizeGoal = -1 * sign

    // if (sphere.scale.x <= 0.01 && sizeGoal === -1) {
    //   sizeGoal = 0
    //   event = !event
    //   // sign *= -1
    // } else if (sphere.scale.x <= 0.01) {
    //   sizeGoal = 3
    // }
  }
  //   sizeGoal += -1
  // if (sphere.scale.x < 0.01) {
  //   sizeGoal += 2
  // }
  // if (sphere.scale.x > 1.1) {

  // }
  console.log(sphere.scale.x, sizeGoal)
  setTimeout(shrink, 2000)
}


console.log(sphere.scale)

function animate() {
  requestAnimationFrame(animate);
  target.x = (mouseX);
  target.y = (-mouseY);
  sphere.lookAt(target)
  sphere.position.x += (mouseX * 0.12 - sphere.position.x) * 0.02
  sphere.position.y += (-mouseY * 0.12 - sphere.position.y) * 0.02
  sphere1.position.x += (mouseX * 0.12 - sphere1.position.x) * 0.02
  sphere1.position.y += (-mouseY * 0.2 - sphere1.position.y) * 0.04
  

  sphere.scale.x += sizeGoal * 0.01
  sphere.scale.y += sizeGoal * 0.01
  sphere.scale.z += sizeGoal * 0.01
  if (event === true && sphere.scale.x < 0.01) {
    sphere.scale.set(0,0,0)
  }

  renderer.render(scene, camera);
}

shrink()


scene.add(sphere, sphere1);

renderer.render(scene, camera);
animate()