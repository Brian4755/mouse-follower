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


const geometry = new THREE.SphereGeometry(15,50,16);
// const geometry = new THREE.BoxGeometry(15,15,15);
const material = new THREE.MeshBasicMaterial( {color: 0xFF6347, wireframe: true});
const sphere = new THREE.Mesh(geometry, material);


document.addEventListener('mousemove', onDocumentMouseMove)

let mouseX = 0
let mouseY = 0

function onDocumentMouseMove(e) {
  mouseX = e.clientX - window.innerWidth/2
  mouseY = e.clientY - window.innerHeight/2
}
// const controls = new OrbitControls(camera, renderer.domElement);

function animate() {
  requestAnimationFrame(animate);
  target.x = (mouseX);
  target.y = (-mouseY);
  // target.z = camera.position.z
  sphere.lookAt(target)
  sphere.position.x += (mouseX * 0.12 - sphere.position.x) * 0.02
  sphere.position.y += (-mouseY * 0.12 - sphere.position.y) * 0.02


  // controls.update();
  // console.log(target.x - sphere.position.x)
  console.log(target.x, sphere.position.x)
  // console.log(sphere.position.x)
  renderer.render(scene, camera);
}

scene.add(sphere);

renderer.render(scene, camera);
animate()