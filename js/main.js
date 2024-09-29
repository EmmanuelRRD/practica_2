import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import Stats from 'three/addons/libs/stats.module.js';
import GUI from 'three/addons/libs/lil-gui.module.min.js';
import { RectAreaLightUniformsLib } from 'three/addons/ligths/RectAreaLightUniformsLib.js';

window.addEventListener('resize', onResize, false);

const stats = Stats();
document.body.appendChild( stats.dom);

//configuracion basica del escenario
const scene = new THREE.Scene();
scene.backgroundColor = 0xffffff;
scene.fog = new THREE.Fog(0xffffff, 0.0025, 50);

//configuracion camara perspectiva
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

//configuraciones para el renderizado del escenario
const renderer = new THREE.WebGLRenderer({antialias:true});
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.VSMShadowMap;
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xffffff);
document.body.appendChild( renderer.domElement);



const orbitControl = new OrbitControls(camera, renderer.domElement);
const loader = new GLTFLoader();


// figuras

// cubo
const cubeGeometry = new THREE.BoxGeometry(1,1,1);
const cubeMaterial = new THREE.MeshPhongMaterial({
    color: 0x3333ff,
    transparent: true,
    
});
const cube = new THREE.Mesh( cubeGeometry, cubeMaterial);
cube.position.x = -1;
cube.castShadow = true;
scene.add(cube);
//cubo

//cubo1

const cubeGeometry1 = new THREE.BoxGeometry();
const cubeMaterial1 = new THREE.MeshToonMaterial({
    color: 0x33ff00
});

const cube1 = new THREE.Mesh(cubeGeometry1, cubeMaterial1);
cube1.position.y = 3;
cube1.castShadow = true;
scene.add(cube1);

//cubo1

//tubo
const torusKnotGeometry = new THREE.TorusKnotGeometry(0.5,0.2,100,100);
const torusKnotMaterial = new THREE.MeshStandardMaterial({
    color: 0x00ff88,
    roughness: 0.1,
    
});
const torusKnot = new THREE.Mesh(torusKnotGeometry, torusKnotMaterial);
torusKnot.position.x = 2;
torusKnot.castShadow = true;
scene.add(torusKnot);

const groundGeometry = new THREE.PlaneGeometry(10000, 10000);
const groundMaterial = new THREE.MeshLambertMaterial({color: 0xffffff});
const ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.position.set(0, -2, 0);
ground.rotation.set(Math.PI / -2, 0, 0);
ground.receiveShadow = true;
scene.add(ground);
//tubo

//tubo1
const torusKnotGeometry1 = new THREE.TorusKnotGeometry(0.5,0.2,100,100);
const torusKnotMaterial1 = new THREE.MeshToonMaterial({
    color: 0x0fff022,
    roughness: 0.1,
    
});
const torusKnot1 = new THREE.Mesh(torusKnotGeometry1, torusKnotMaterial1);
torusKnot1.position.z = 2;
torusKnot1.cstShadow = true;
scene.add(torusKnot1);

const groundGeometry1 = new THREE.PlaneGeometry(10000, 10000);
const groundMaterial1 = new THREE.MeshLambertMaterial({color: 0xffffff});
const ground1 = new THREE.Mesh(groundGeometry1, groundMaterial1);
ground1.position.set(0, -2, 0);
ground1.rotation.set(Math.PI / -2, 0, 0);
ground1.receiveShadow = true;
scene.add(ground1);

//tubo1

// figuras


//luz
//luz ambiental
scene.add(new THREE.AmbientLight(0x666666));

// Lampara
const dirLight = new THREE.DirectionalLight(0xaaaaaa);
dirLight.position.set(5,12,8);
dirLight.castShadow = true;
dirLight.intensity = 2;
dirLight.shadow.camera.near = 0.1;
dirLight.shadow.camera.far = 200;
dirLight.shadow.camera.right = 10;
dirLight.shadow.camera.left = -10;
dirLight.shadow.camera.top = 10;
dirLight.shadow.camera.bottom = -10;
dirLight.shadow.mapSize.height = 750;
dirLight.shadow.mapSize.width = 750;
dirLight.shadow.radius = 4;
dirLight.shadow.bias = -0.0005;
scene.add(dirLight);
//luz

//camara
camera.position.set( 3,2,4 );
camera.lookAt(scene.position);
//camara

//interfas grafica
const gui = new GUI();
const props = {
    cubeSpeedY: 0.01,
    opacity: 0.05,
    cubeSpeedX: 0.01,
    cubeSpeedZ: 0.01,
    torusKnot1Speed: 0.01,
    scaleX: 1,
    scaleY: 1,
    scaleZ: 1,
    radio: 0.5,
    tubo: 0.2,




};
gui.add(props, 'cubeSpeedY', -1, 1, 0.01,);
gui.add(props, 'cubeSpeedX', -1,1,0.01,);
gui.add(props, 'cubeSpeedZ', -1,1,0.01,);
gui.add(props, 'cubeGeometryX',1,5,0.01);
gui.add(props, 'scaleX',1,10,0.01);
gui.add(props, 'scaleY',1,10,0.01);
gui.add(props, 'scaleZ',1,10,0.01);
gui.add(props, 'opacity', 0,1,0.01);
//------------------------------------------

gui.add(props, 'torusKnot1Speed', -10,10,0.01);
gui.add(props, 'radio', 0.1,20,0.1);
gui.add(props, 'tubo', 0.1,10,0.1);


//interfas grafica


//animacion
animate();

function animate(){
    requestAnimationFrame( animate );
    stats.update();
    orbitControl.update();
    
    cube.rotation.y += props.cubeSpeedY;
    cube.rotation.x += props.cubeSpeedX;
    cube.rotation.z += props.cubeSpeedZ;
    cube.scale.y = props.scaleY;
    cube.scale.x = props.scaleX;
    cube.scale.z = props.scaleZ;
    cube.material.opacity = props.opacity
//-----------------------------

    torusKnot1.rotation.y += props.torusKnot1Speed;


    
    
    renderer.render (scene, camera);



    
}

//animacion

function onResize(){
    camera.aspect = window.innerWidth/ window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}