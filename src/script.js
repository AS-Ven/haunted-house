import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { Timer } from 'three/addons/misc/Timer.js'
import GUI from 'lil-gui'

//#region Setup

// Debug
const gui = new GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

//#endregion



//#region Models

// Floor
const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(20,20),
    new THREE.MeshStandardMaterial()
)
floor.rotation.x = - Math.PI * 0.5


//#region House

const house = new THREE.Group()

// Walls
const walls = new THREE.Mesh(
    new THREE.BoxGeometry(4, 2.5, 4),
    new THREE.MeshStandardMaterial()
)
walls.position.y += 2.5 / 2

// Roof
const roof = new THREE.Mesh(
    new THREE.ConeGeometry(3.5, 1.5, 4),
    new THREE.MeshStandardMaterial()
)
roof.position.y += 2.5 + 1.5 / 2
roof.rotation.y += Math.PI * 0.25

// Door
const door = new THREE.Mesh(
    new THREE.PlaneGeometry(2.2, 2.2),
    new THREE.MeshStandardMaterial({color: "burlywood"})
)
door.position.y = 1
door.position.z = 2 + 0.001

house.add(walls, roof, door)

//#endregion


//#region Bushes

const bushes = new THREE.Group()

// Size and Textures
const bushGeometry = new THREE.SphereGeometry(1, 16, 16)
const bushMaterial = new THREE.MeshStandardMaterial()

// Bush_1
const bush_1 = new THREE.Mesh(bushGeometry, bushMaterial)
bush_1.scale.setScalar(0.5)
bush_1.position.set(0.8, 0.2, 2.2)

// Bush_2
const bush_2 = new THREE.Mesh(bushGeometry, bushMaterial)
bush_2.scale.setScalar(0.25)
bush_2.position.set(1.4, 0.1, 2.1)

// Bush_3
const bush_3 = new THREE.Mesh(bushGeometry, bushMaterial)
bush_3.scale.setScalar(0.4)
bush_3.position.set(- 0.8, 0.1, 2.2)

// Bush_4
const bush_4 = new THREE.Mesh(bushGeometry, bushMaterial)
bush_4.scale.setScalar(0.15)
bush_4.position.set(- 1, 0.05, 2.6)

bushes.add(bush_1, bush_2, bush_3, bush_4)

//#endregion


//#region Graves

const graves = new THREE.Group()

// Size and Textures
const graveGeometry = new THREE.BoxGeometry(0.6, 0.8, 0.2)
const graveMaterial = new THREE.MeshStandardMaterial()

for (let i = 0; i < 30; i++) {
    // Grave
    const grave = new THREE.Mesh(graveGeometry, graveMaterial)

    // Position
    const gap = 3 + Math.random() * 4
    grave.position.set(
        Math.sin(Math.random() * Math.PI * 2 ) * gap,
        Math.random() * 0.4,
        Math.cos(Math.random() * Math.PI * 2 ) * gap
    )

    // Rotation
    grave.rotation.set(
        (Math.random() - 0.5) * 0.4,
        (Math.random() - 0.5) * Math.PI,
        (Math.random() - 0.5) * 0.4
    )

    graves.add(grave)
}


//#endregion

scene.add(floor, house, bushes, graves)

//#endregion



//#region Lights

// Ambient light
const ambientLight = new THREE.AmbientLight('#ffffff', 0.5)
scene.add(ambientLight)

// Directional light
const directionalLight = new THREE.DirectionalLight('#ffffff', 1.5)
directionalLight.position.set(3, 2, -8)
scene.add(directionalLight)

//#endregion



//#region Camera

// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 4
camera.position.y = 2
camera.position.z = 5
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

//#endregion



//#region Render

//#region Renderer

const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

//#endregion


//#region Animation

// Timer
const timer = new Timer()

// Loop
const tick = () =>
{
    // Timer
    timer.update()
    const elapsedTime = timer.getElapsed()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

//#endregion


//#region Resize

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

//#endregion

//#endregion

tick()