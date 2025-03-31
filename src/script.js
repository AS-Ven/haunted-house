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



//#region Textures

const textureLoader = new THREE.TextureLoader()

// Floor
const floorAlphaTexture = textureLoader.load("./floor/alpha.jpg")
const floorColorTexture = textureLoader.load("./floor/coast_sand_rocks_02_1k/coast_sand_rocks_02_diff_1k.jpg")
floorColorTexture.repeat.set(8, 8)
floorColorTexture.wrapS = THREE.RepeatWrapping
floorColorTexture.wrapT = THREE.RepeatWrapping
floorColorTexture.colorSpace = THREE.SRGBColorSpace
const floorARMTexture = textureLoader.load("./floor/coast_sand_rocks_02_1k/coast_sand_rocks_02_arm_1k.jpg")
floorARMTexture.repeat.set(8, 8)
floorARMTexture.wrapS = THREE.RepeatWrapping
floorARMTexture.wrapT = THREE.RepeatWrapping
const floorNormalTexture = textureLoader.load("./floor/coast_sand_rocks_02_1k/coast_sand_rocks_02_nor_gl_1k.jpg")
floorNormalTexture.repeat.set(8, 8)
floorNormalTexture.wrapS = THREE.RepeatWrapping
floorNormalTexture.wrapT = THREE.RepeatWrapping
const floorDisplacementTexture = textureLoader.load("./floor/coast_sand_rocks_02_1k/coast_sand_rocks_02_disp_1k.jpg")
floorDisplacementTexture.repeat.set(8, 8)
floorDisplacementTexture.wrapS = THREE.RepeatWrapping
floorDisplacementTexture.wrapT = THREE.RepeatWrapping

// Wall
const wallColorTexture = textureLoader.load('./wall/castle_brick_broken_06_1k/castle_brick_broken_06_diff_1k.jpg')
wallColorTexture.colorSpace = THREE.SRGBColorSpace
const wallARMTexture = textureLoader.load('./wall/castle_brick_broken_06_1k/castle_brick_broken_06_arm_1k.jpg')
const wallNormalTexture = textureLoader.load('./wall/castle_brick_broken_06_1k/castle_brick_broken_06_nor_gl_1k.jpg')

// Roof
const roofColorTexture = textureLoader.load('./roof/roof_slates_02_1k/roof_slates_02_diff_1k.jpg')
roofColorTexture.repeat.set(3, 1)
roofColorTexture.wrapS = THREE.RepeatWrapping
roofColorTexture.colorSpace = THREE.SRGBColorSpace
const roofARMTexture = textureLoader.load('./roof/roof_slates_02_1k/roof_slates_02_arm_1k.jpg')
roofARMTexture.repeat.set(3, 1)
roofARMTexture.wrapS = THREE.RepeatWrapping
const roofNormalTexture = textureLoader.load('./roof/roof_slates_02_1k/roof_slates_02_nor_gl_1k.jpg')
roofNormalTexture.repeat.set(3, 1)
roofNormalTexture.wrapS = THREE.RepeatWrapping

// Bush
const bushColorTexture = textureLoader.load('./bush/leaves_forest_ground_1k/leaves_forest_ground_diff_1k.jpg')
bushColorTexture.repeat.set(2, 1)
bushColorTexture.wrapS = THREE.RepeatWrapping
bushColorTexture.colorSpace = THREE.SRGBColorSpace
const bushARMTexture = textureLoader.load('./bush/leaves_forest_ground_1k/leaves_forest_ground_arm_1k.jpg')
bushARMTexture.repeat.set(2, 1)
bushARMTexture.wrapS = THREE.RepeatWrapping
const bushNormalTexture = textureLoader.load('./bush/leaves_forest_ground_1k/leaves_forest_ground_nor_gl_1k.jpg')
bushNormalTexture.repeat.set(2, 1)
bushNormalTexture.wrapS = THREE.RepeatWrapping

// Grave
const graveColorTexture = textureLoader.load('./grave/plastered_stone_wall_1k/plastered_stone_wall_diff_1k.jpg')
graveColorTexture.repeat.set(0.3, 0.4)
graveColorTexture.colorSpace = THREE.SRGBColorSpace
const graveARMTexture = textureLoader.load('./grave/plastered_stone_wall_1k/plastered_stone_wall_arm_1k.jpg')
graveARMTexture.repeat.set(0.3, 0.4)
const graveNormalTexture = textureLoader.load('./grave/plastered_stone_wall_1k/plastered_stone_wall_nor_gl_1k.jpg')
graveNormalTexture.repeat.set(0.3, 0.4)

// Door
const doorColorTexture = textureLoader.load('./door/color.jpg')
doorColorTexture.colorSpace = THREE.SRGBColorSpace
const doorAlphaTexture = textureLoader.load('./door/alpha.jpg')
const doorAmbientOcclusionTexture = textureLoader.load('./door/ambientOcclusion.jpg')
const doorHeightTexture = textureLoader.load('./door/height.jpg')
const doorNormalTexture = textureLoader.load('./door/normal.jpg')
const doorMetalnessTexture = textureLoader.load('./door/metalness.jpg')
const doorRoughnessTexture = textureLoader.load('./door/roughness.jpg')


//#endregion



//#region Models

// Floor
const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(20, 20, 100, 100),
    new THREE.MeshStandardMaterial({
        alphaMap: floorAlphaTexture,
        transparent: true,
        map: floorColorTexture,
        aoMap: floorARMTexture,
        roughnessMap: floorARMTexture,
        metalnessMap: floorARMTexture,
        normalMap: floorNormalTexture,
        displacementMap: floorDisplacementTexture,
        displacementScale: 0.3,
        displacementBias: -0.2
    })
)
floor.rotation.x = - Math.PI * 0.5

//#region House

const house = new THREE.Group()

// Walls
const walls = new THREE.Mesh(
    new THREE.BoxGeometry(4, 2.5, 4),
    new THREE.MeshStandardMaterial({
        map: wallColorTexture,
        aoMap: wallARMTexture,
        roughnessMap: wallARMTexture,
        metalnessMap: wallARMTexture,
        normalMap: wallNormalTexture
    })
)
walls.position.y += 2.5 / 2

// Roof
const roof = new THREE.Mesh(
    new THREE.ConeGeometry(3.5, 1.5, 4),
    new THREE.MeshStandardMaterial({
        map: roofColorTexture,
        aoMap: roofARMTexture,
        roughnessMap: roofARMTexture,
        metalnessMap: roofARMTexture,
        normalMap: roofNormalTexture
    })
)
roof.position.y += 2.5 + 1.5 / 2
roof.rotation.y += Math.PI * 0.25

// Door
const door = new THREE.Mesh(
    new THREE.PlaneGeometry(2.2, 2.2, 100, 100),
    new THREE.MeshStandardMaterial({
        map: doorColorTexture,
        transparent: true,
        alphaMap: doorAlphaTexture,
        aoMap: doorAmbientOcclusionTexture,
        displacementMap: doorHeightTexture,
        displacementScale: 0.15,
        displacementBias: -0.04,
        normalMap: doorNormalTexture,
        metalnessMap: doorMetalnessTexture,
        roughnessMap: doorRoughnessTexture
    })
)
door.position.y = 1
door.position.z = 2 + 0.001

house.add(walls, roof, door)

//#endregion


//#region Bushes

const bushes = new THREE.Group()


// Size and Textures
const bushGeometry = new THREE.SphereGeometry(1, 16, 16)
const bushMaterial = new THREE.MeshStandardMaterial({
    color: '#ccffcc',
    map: bushColorTexture,
    aoMap: bushARMTexture,
    roughnessMap: bushARMTexture,
    metalnessMap: bushARMTexture,
    normalMap: bushNormalTexture
})

// Bush_1
const bush_1 = new THREE.Mesh(bushGeometry, bushMaterial)
bush_1.scale.setScalar(0.5)
bush_1.rotation.x = - 0.75
bush_1.position.set(0.8, 0.2, 2.2)

// Bush_2
const bush_2 = new THREE.Mesh(bushGeometry, bushMaterial)
bush_2.scale.setScalar(0.25)
bush_2.rotation.x = - 0.75
bush_2.position.set(1.4, 0.1, 2.1)

// Bush_3
const bush_3 = new THREE.Mesh(bushGeometry, bushMaterial)
bush_3.scale.setScalar(0.4)
bush_3.rotation.x = - 0.75
bush_3.position.set(- 0.8, 0.1, 2.2)

// Bush_4
const bush_4 = new THREE.Mesh(bushGeometry, bushMaterial)
bush_4.scale.setScalar(0.15)
bush_4.rotation.x = - 0.75
bush_4.position.set(- 1, 0.05, 2.6)

bushes.add(bush_1, bush_2, bush_3, bush_4)

//#endregion


//#region Graves

const graves = new THREE.Group()

// Size and Textures
const graveGeometry = new THREE.BoxGeometry(0.6, 0.8, 0.2)
const graveMaterial = new THREE.MeshStandardMaterial({
    map: graveColorTexture,
    aoMap: graveARMTexture,
    roughnessMap: graveARMTexture,
    metalnessMap: graveARMTexture,
    normalMap: graveNormalTexture
})

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
const ambientLight = new THREE.AmbientLight('#86cdff', 0.275)
scene.add(ambientLight)

// Directional light
const directionalLight = new THREE.DirectionalLight('#86cdff', 1)
directionalLight.position.set(3, 2, -8)
scene.add(directionalLight)

// Door Light
const doorLight = new THREE.PointLight('#ff7d46', 5)
doorLight.position.set(0, 2.2, 2.5)
house.add(doorLight)

//#endregion



//#region Ghost

const ghost_1 = new THREE.PointLight('#8800ff', 6)
const ghost_2 = new THREE.PointLight('#ff8800', 6)
const ghost_3 = new THREE.PointLight('#00ff88', 6)
scene.add(ghost_1, ghost_2, ghost_3)

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

    // Ghost
    const ghost_1Angle = elapsedTime * 0.3
    ghost_1.position.x = Math.cos(ghost_1Angle) * 4
    ghost_1.position.y = Math.sin(ghost_1Angle) * Math.sin(ghost_1Angle * 2.34) * Math.sin(ghost_1Angle * 3.45)
    ghost_1.position.z = Math.sin(ghost_1Angle) * 4

    const ghost_2Angle = - elapsedTime * 0.3
    ghost_2.position.x = Math.cos(ghost_2Angle) * 5
    ghost_2.position.y = Math.sin(ghost_2Angle) * Math.sin(ghost_2Angle * 2.34) * Math.sin(ghost_2Angle * 3.45)
    ghost_2.position.z = Math.sin(ghost_2Angle) * 5

    const ghost_3Angle = elapsedTime * 0.4
    ghost_3.position.x = Math.sin(ghost_3Angle) * 3.5
    ghost_3.position.y = Math.cos(ghost_3Angle) * Math.sin(ghost_3Angle * 2.34) * Math.sin(ghost_3Angle * 3.45)
    ghost_3.position.z = Math.cos(ghost_3Angle) * 6

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