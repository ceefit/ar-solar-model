import * as BABYLON from 'babylonjs';
import * as GUI from 'babylonjs-gui';
import * as Loaders from 'babylonjs-loaders';

import earcut from 'earcut';
import snowyPark from '../images/snowy_park_01_2k.hdr'

const buildGround = () => {
    //color
    const groundMat = new BABYLON.StandardMaterial("groundMat");
    groundMat.diffuseColor = new BABYLON.Color3(1, 1, 1);

    const ground = BABYLON.MeshBuilder.CreateGround("ground", {width:10, height:10});
    ground.material = groundMat;
    ground.material.alpha = 0.0;
    return ground;
}

const makeFountain = () => {
       // Fountain object
    var fountain = BABYLON.Mesh.CreateBox("foutain", 1.0, scene);
    fountain.material = new BABYLON.StandardMaterial("fountainMat", scene);
    fountain.material.alpha = 0.0;
    fountain.position.x = 10;

    // Create a particle system
    var particleSystem = new BABYLON.ParticleSystem("particles", 2000, scene);

    //Texture of each particle
    particleSystem.particleTexture = new BABYLON.Texture("flare.png", scene);

    // Where the particles come from
    particleSystem.emitter = fountain; // the starting object, the emitter
    particleSystem.minEmitBox = new BABYLON.Vector3(-10, 5, -10); // Starting all from
    particleSystem.maxEmitBox = new BABYLON.Vector3(10, 15, 10); // To...

    // Colors of all particles
    particleSystem.color1 = new BABYLON.Color4(0.7, 0.8, 1.0, 1.0);
    particleSystem.color2 = new BABYLON.Color4(0.2, 0.5, 1.0, 1.0);
    particleSystem.colorDead = new BABYLON.Color4(0, 0, 0.2, 0.0);

    // Size of each particle (random between...
    particleSystem.minSize = 0.1;
    particleSystem.maxSize = 0.5;

    // Life time of each particle (random between...
    particleSystem.minLifeTime = 2;
    particleSystem.maxLifeTime = 5;

    // Emission rate
    particleSystem.emitRate = 1500;

    // Blend mode : BLENDMODE_ONEONE, or BLENDMODE_STANDARD
    particleSystem.blendMode = BABYLON.ParticleSystem.BLENDMODE_ONEONE;

    // Set the gravity of all particles
    particleSystem.gravity = new BABYLON.Vector3(0, -9.81, 0);

    // Direction of each particle after it has been emitted
    particleSystem.direction1 = new BABYLON.Vector3(0, 5, 0);
    particleSystem.direction2 = new BABYLON.Vector3(0, 5, 0);

    // Angular speed, in radians
    particleSystem.minAngularSpeed = 0;
    particleSystem.maxAngularSpeed = Math.PI;

    // Speed
    particleSystem.minEmitPower = 1;
    particleSystem.maxEmitPower = 3;
    particleSystem.updateSpeed = 0.005;

    particleSystem.isLocal = true;

    // Start the particle system
    // particleSystem.start();
};

export const createScene = async function (canvas, engine) {
    // This creates a basic Babylon Scene object (non-mesh)
    var scene = new BABYLON.Scene(engine);

// Parameters: name, alpha, beta, radius, target position, scene
    var camera = new BABYLON.ArcRotateCamera("Camera", 0, 0, 10, new BABYLON.Vector3(0, 0, 0), scene);
// Positions the camera overwriting alpha, beta, radius
    camera.setPosition(new BABYLON.Vector3(0, 0, 20));
// This attaches the camera to the canvas
    camera.attachControl(canvas, true);
    // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
    var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(-1, -1, -1), scene);
    light.intensity = 1.0;

    // // Environment Texture
    // var hdrTexture = new BABYLON.HDRCubeTexture(snowyPark, scene, 512);

    // // Skybox
    // var hdrSkybox = BABYLON.Mesh.CreateBox("hdrSkyBox", 1000.0, scene);
    // var hdrSkyboxMaterial = new BABYLON.PBRMaterial("skyBox", scene);
    // hdrSkyboxMaterial.backFaceCulling = false;
    // hdrSkyboxMaterial.reflectionTexture = hdrTexture.clone();
    // hdrSkyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
    // hdrSkyboxMaterial.microSurface = 1.0;
    // hdrSkyboxMaterial.cameraExposure = 0.66;
    // hdrSkyboxMaterial.cameraContrast = 1.66;
    // hdrSkyboxMaterial.disableLighting = true;
    // hdrSkybox.material = hdrSkyboxMaterial;
    // hdrSkybox.infiniteDistance = true;

    const ground = buildGround();

    BABYLON.SceneLoader.ImportMesh("", "/", "snow-globe.glb", scene, function (meshes) {
        meshes[1].material.reflectionTexture = new BABYLON.CubeTexture("skybox", scene);
        meshes[1].material.reflectionTexture.coordinatesMode = BABYLON.Texture.PLANAR_MODE;
        }
    );

    var advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI", true, scene);


    var slider = new GUI.Slider();
    slider.minimum = -1;
    slider.maximum = 1;
    slider.value = 0;
    slider.height = "20px";
    slider.width = "150px";
    slider.color = "#003399";
    slider.background = "grey";
    slider.left = "120px";
    slider.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
    slider.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_CENTER;
    slider.onValueChangedObservable.add(function (value) {
        // sphere.scaling = unitVec.scale(value);
    });

    advancedTexture.addControl(slider);

    //GUI
    var myGUI = GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");

    var panel = new GUI.StackPanel();
    panel.width = "210px";
    panel.isVertical = true;
    panel.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
    panel.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_CENTER;    
    myGUI.addControl(panel);
    
    var panelHeading = new GUI.StackPanel();
    panelHeading.width = "150px";
    panelHeading.height = "45px";
    panelHeading.isVertical = false;
    panelHeading.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    panelHeading.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_CENTER;    
    panel.addControl(panelHeading);

    var readout = new GUI.TextBlock();
    readout.text = "Toggle Visibility";
    readout.width = "180px";
    readout.height = "40px"
    readout.paddingLeft = "10px";
    readout.paddingBottom = "15px";
    readout.textHorizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    readout.color = "white";
    panelHeading.addControl(readout);


    const xr = await scene.createDefaultXRExperienceAsync({floorMeshes: [ground]});

    // Code in this function will run ~60 times per second
    scene.registerBeforeRender(function () {
        slider.value = xr.baseExperience.camera.leftCamera.rotationQuaternion.y;            
        readout.text = "Y Rotation: " + xr.baseExperience.camera.leftCamera.rotationQuaternion.y;            

    });


    return scene;
}
