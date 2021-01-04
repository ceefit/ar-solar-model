import * as BABYLON from 'babylonjs';
import * as GUI from 'babylonjs-gui';
import * as Loaders from 'babylonjs-loaders';

import earcut from 'earcut';

export const createScene = async function (canvas, engine) {

    const scene = new BABYLON.Scene(engine);
    const camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -10), scene);
    camera.setTarget(BABYLON.Vector3.Zero());
    camera.attachControl(canvas, true);
    const light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);
    light.intensity = 0.7;

    BABYLON.SceneLoader.ImportMesh("", "./", "solar-system.glb", scene, function (meshes) {
            console.log(meshes)
        }
    );

    const xr = await scene.createDefaultXRExperienceAsync({
        uiOptions: {
            sessionMode: 'immersive-ar'
        }
    });

    return scene;
};
