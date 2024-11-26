import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { RGBELoader } from "three/examples/jsm/Addons.js";


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);

// Lights

// const light = new THREE.DirectionalLight("white", 2);
// light.position.set(2, 1, 1);
// scene.add(light);

// const helper = new THREE.DirectionalLightHelper(light, 1);
// scene.add(helper);

let textureLoader = new THREE.TextureLoader();

let earthtex = textureLoader.load("./Earth.jpg");
earthtex.colorSpace = THREE.SRGBColorSpace;  

let cloudtext = textureLoader.load("./Clouds.jpg");
earthtex.cloudtext = THREE.SRGBColorSpace;  


// Earth texture
const geometry = new THREE.SphereGeometry(1, 250, 250);
const material = new THREE.MeshPhysicalMaterial({
  map: earthtex,
  roughness: 0.5,
  metalness: 0.5,
});
const cube = new THREE.Mesh(geometry, material);


// Clouds texture
const geometry2 = new THREE.SphereGeometry(1.1, 250, 250);
const material2 = new THREE.MeshPhysicalMaterial({
  transparent: true,
  alphaMap: cloudtext,
  roughness: 0.5,
  metalness: 0.5,
});

const cube2 = new THREE.Mesh(geometry2, material2);
camera.position.z = 2.5;
scene.add(cube);
scene.add(cube2);

let hdri = new RGBELoader();
hdri.load("https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/4k/qwantani_patio_4k.hdr",
  function (hdritexture) {
    hdritexture.mapping = THREE.EquirectangularReflectionMapping; 
    scene.environment = hdritexture;
    scene.background = hdritexture;
  }
);


const canvas = document.querySelector("#draw");
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;


function animate() {
  requestAnimationFrame(animate);

  cube.rotation.x += 0.001;
  cube.rotation.y += 0.001;

  cube2.rotation.x -= 0.002;
  cube2.rotation.y -= 0.002;
  controls.update();
  renderer.render(scene, camera);
}
animate();
