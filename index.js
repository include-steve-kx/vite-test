import * as THREE from 'three';
import { OrbitControls } from "three/addons";
import { GLTFLoader } from "three/addons";

let camera, scene, renderer;
let geometry, material, mesh;
let controls;

function setupEventListeners() {
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        renderer.setSize( window.innerWidth, window.innerHeight );
    })
}

function init() {
    // renderer
    renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    let canvas_parent_div = document.querySelector('#canvas-container');
    canvas_parent_div.appendChild(renderer.domElement);

    // scene
    scene = new THREE.Scene();

    // camera
    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 1000);
    camera.position.set(2, 2, 2);
    camera.lookAt(10, 0, 0);

    // lighting
    const light = new THREE.AmbientLight(0x404040, 10);
    scene.add(light);
    const light2 = new THREE.PointLight(0x404040, 1000, 100);
    light2.position.set(1, 2.5, 5);
    scene.add(light2);

    // mesh
    geometry = new THREE.BoxGeometry(1, 1, 1);
    material = new THREE.MeshStandardMaterial({color: 0x0000ff});
    mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // test loading a model
    loadModel();

    // orbit control
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = true;

    setupEventListeners();
}

function loadModel() {
    let modelPath = `${import.meta.env.BASE_URL}models/table.glb`;
    console.log(import.meta.env.BASE_URL)
    new GLTFLoader().load(
        modelPath,
        function (gltf) {
            console.log(gltf);

            scene.add(gltf.scene);
        }
    )
}

function animate() {
    requestAnimationFrame(animate);

    renderer.render(scene, camera);

}

init();
animate();