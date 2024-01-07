import './style.css'
import * as THREE from 'three';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGL1Renderer({
  canvas: document.querySelector('#bg')
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);


const geometry = new THREE.SphereGeometry(15,50,16);
const material = new THREE.MeshBasicMaterial( {color: 0xFF6347, wireframe: true});
const sphere = new THREE.Mesh(geometry, material);

scene.add(sphere);

renderer.render(scene, camera);