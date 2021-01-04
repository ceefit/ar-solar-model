import * as BABYLON from 'babylonjs';
import * as GUI from 'babylonjs-gui';
import earcut from 'earcut';

export const createScene = async function (canvas, engine) {
    // This creates a basic Babylon Scene object (non-mesh)
    var scene = new BABYLON.Scene(engine);

    // // This creates and positions a free camera (non-mesh)
    // var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -5), scene);
    //
    // // This targets the camera to scene origin
    // camera.setTarget(BABYLON.Vector3.Zero());
    //
    // // This attaches the camera to the canvas
    // camera.attachControl(canvas, true);

    var camera = new BABYLON.UniversalCamera("UniversalCamera", new BABYLON.Vector3(3, 1, -7), scene);
// Targets the camera to a particular position. In this case the scene origin
    camera.setTarget(BABYLON.Vector3.Zero());
// Attach the camera to the canvas
    camera.attachControl(canvas, true);

    // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
    var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);

    // Default intensity is 1. Let's dim the light a small amount
    light.intensity = 0.7;

    // // Our built-in 'sphere' shape.
    // var sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {diameter: 1.4, segments: 32}, scene);
    // var sphere2 = BABYLON.MeshBuilder.CreateSphere("sphere", {diameter: 0.4, segments: 32}, scene);

    // // Move the sphere upward 1/2 its height
    // sphere.position.y = 1;
    // sphere2.position.x = 2;

    // sphere.material = new BABYLON.StandardMaterial("sphereMat", scene);
    // sphere2.material = new BABYLON.StandardMaterial("sphereMat", scene);

    // const environment = scene.createDefaultEnvironment();

    // // GUI
    // var plane = BABYLON.Mesh.CreatePlane("plane", 1);
    // plane.position = new BABYLON.Vector3(1.4, 1.5, 0.4)
    // var advancedTexture = GUI.AdvancedDynamicTexture.CreateForMesh(plane);
    // var panel = new GUI.StackPanel();
    // advancedTexture.addControl(panel);
    // var header = new GUI.TextBlock();
    // header.text = "Color GUI";
    // header.height = "100px";
    // header.color = "white";
    // header.textHorizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
    // header.fontSize = "120"
    // panel.addControl(header);
    // var picker = new GUI.ColorPicker();
    // picker.value = sphere.material.diffuseColor;
    // picker.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
    // picker.height = "350px";
    // picker.width = "350px";
    // picker.onValueChangedObservable.add(function(value) {
    //     sphere.material.diffuseColor.copyFrom(value);
    //     sphere2.material.diffuseColor.copyFrom(value);
    // });
    // panel.addControl(picker);


    // BABYLON.SceneLoader.ImportMeshAsync("semi_house", "https://assets.babylonjs.com/meshes/", "both_houses_scene.babylon").then((result) => {
    //     result.meshes[1].position.x = 20;
    //     const myMesh_1 = scene.getMeshByName("semi_house");
    //     myMesh1.rotation.y = Math.PI / 3.75;
    // });

    // XR



    // const roofMat = new BABYLON.StandardMaterial("roofMat");
    // roofMat.diffuseTexture = new BABYLON.Texture("https://assets.babylonjs.com/environments/roof.jpg", scene);
    // const roof = BABYLON.MeshBuilder.CreateCylinder("roof", {diameter: 1.3, height: 1.2, tessellation: 3});
    // roof.scaling.x = 0.75;
    // roof.rotation.z = Math.PI / 2;
    // roof.position.y = 1.22;
    // roof.material = roofMat;
    //
    // const groundMat = new BABYLON.StandardMaterial("groundMat");
    // groundMat.diffuseColor = new BABYLON.Color3(0, 1, 0);
    // const ground = BABYLON.MeshBuilder.CreateGround("ground", {width:10, height:10});
    // ground.material = groundMat; //Place the material property of the ground
    //
    // const boxMat = new BABYLON.StandardMaterial("roofMat");
    // boxMat.diffuseTexture = new BABYLON.Texture("https://assets.babylonjs.com/environments/cubehouse.png");
    // const faceUV = [];
    // faceUV[0] = new BABYLON.Vector4(0.5, 0.0, 0.75, 1.0); //rear face
    // faceUV[1] = new BABYLON.Vector4(0.0, 0.0, 0.25, 1.0); //front face
    // faceUV[2] = new BABYLON.Vector4(0.25, 0, 0.5, 1.0); //right side
    // faceUV[3] = new BABYLON.Vector4(0.75, 0, 1.0, 1.0); //left side
    // const box = BABYLON.MeshBuilder.CreateBox("box", {faceUV: faceUV, wrap: true});
    // box.position.y += 0.5;
    // box.material = boxMat;


    /******Build Functions***********/
    const buildGround = () => {
        //color
        const groundMat = new BABYLON.StandardMaterial("groundMat");
        groundMat.diffuseColor = new BABYLON.Color3(0, 1, 0);

        const ground = BABYLON.MeshBuilder.CreateGround("ground", {width:15, height:16});
        ground.material = groundMat;
        return ground;
    }

    const buildBox = (width) => {
        //texture
        const boxMat = new BABYLON.StandardMaterial("boxMat");
        if (width == 2) {
            boxMat.diffuseTexture = new BABYLON.Texture("https://assets.babylonjs.com/environments/semihouse.png")
        }
        else {
            boxMat.diffuseTexture = new BABYLON.Texture("https://assets.babylonjs.com/environments/cubehouse.png");
        }

        //options parameter to set different images on each side
        const faceUV = [];
        if (width == 2) {
            faceUV[0] = new BABYLON.Vector4(0.6, 0.0, 1.0, 1.0); //rear face
            faceUV[1] = new BABYLON.Vector4(0.0, 0.0, 0.4, 1.0); //front face
            faceUV[2] = new BABYLON.Vector4(0.4, 0, 0.6, 1.0); //right side
            faceUV[3] = new BABYLON.Vector4(0.4, 0, 0.6, 1.0); //left side
        }
        else {
            faceUV[0] = new BABYLON.Vector4(0.5, 0.0, 0.75, 1.0); //rear face
            faceUV[1] = new BABYLON.Vector4(0.0, 0.0, 0.25, 1.0); //front face
            faceUV[2] = new BABYLON.Vector4(0.25, 0, 0.5, 1.0); //right side
            faceUV[3] = new BABYLON.Vector4(0.75, 0, 1.0, 1.0); //left side
        }
        // top 4 and bottom 5 not seen so not set

        /**** World Objects *****/
        const box = BABYLON.MeshBuilder.CreateBox("box", {width: width, faceUV: faceUV, wrap: true});
        box.material = boxMat;
        box.position.y = 0.5;

        return box;
    }

    const buildRoof = (width) => {
        //texture
        const roofMat = new BABYLON.StandardMaterial("roofMat");
        roofMat.diffuseTexture = new BABYLON.Texture("https://assets.babylonjs.com/environments/roof.jpg");

        const roof = BABYLON.MeshBuilder.CreateCylinder("roof", {diameter: 1.3, height: 1.2, tessellation: 3});
        roof.material = roofMat;
        roof.scaling.x = 0.75;
        roof.scaling.y = width;
        roof.rotation.z = Math.PI / 2;
        roof.position.y = 1.22;

        return roof;
    }

    const buildHouse = (width) => {
        const box = buildBox(width);
        const roof = buildRoof(width);

        return BABYLON.Mesh.MergeMeshes([box, roof], true, false, null, false, true);
    }

    const detached_house = buildHouse(1);
    detached_house.rotation.y = -Math.PI / 16;
    detached_house.position.x = -6.8;
    detached_house.position.z = 2.5;

    const semi_house = buildHouse(2);
    semi_house .rotation.y = -Math.PI / 16;
    semi_house.position.x = -4.5;
    semi_house.position.z = 3;

    const places = []; //each entry is an array [house type, rotation, x, z]
    places.push([1, -Math.PI / 16, -6.8, 2.5 ]);
    places.push([2, -Math.PI / 16, -4.5, 3 ]);
    places.push([2, -Math.PI / 16, -1.5, 4 ]);
    places.push([2, -Math.PI / 3, 1.5, 6 ]);
    places.push([2, 15 * Math.PI / 16, -6.4, -1.5 ]);
    places.push([1, 15 * Math.PI / 16, -4.1, -1 ]);
    places.push([2, 15 * Math.PI / 16, -2.1, -0.5 ]);
    places.push([1, 5 * Math.PI / 4, 0, -1 ]);
    places.push([1, Math.PI + Math.PI / 2.5, 0.5, -3 ]);
    places.push([2, Math.PI + Math.PI / 2.1, 0.75, -5 ]);
    places.push([1, Math.PI + Math.PI / 2.25, 0.75, -7 ]);
    places.push([2, Math.PI / 1.9, 4.75, -1 ]);
    places.push([1, Math.PI / 1.95, 4.5, -3 ]);
    places.push([2, Math.PI / 1.9, 4.75, -5 ]);
    places.push([1, Math.PI / 1.9, 4.75, -7 ]);
    places.push([2, -Math.PI / 3, 5.25, 2 ]);
    places.push([1, -Math.PI / 3, 6, 4 ]);

    const houses = [];
    for (let i = 0; i < places.length; i++) {
        if (places[i][0] === 1) {
            houses[i] = detached_house.createInstance("house" + i);
        }
        else {
            houses[i] = semi_house.createInstance("house" + i);
        }
        houses[i].rotation.y = places[i][1];
        houses[i].position.x = places[i][2];
        houses[i].position.z = places[i][3];
    }

    const ground = buildGround();

    //base
    const outline = [
        new BABYLON.Vector3(-0.3, 0, -0.1),
        new BABYLON.Vector3(0.2, 0, -0.1),
    ]

    //curved front
    for (let i = 0; i < 20; i++) {
        outline.push(new BABYLON.Vector3(0.2 * Math.cos(i * Math.PI / 40), 0, 0.2 * Math.sin(i * Math.PI / 40) - 0.1));
    }

    //top
    outline.push(new BABYLON.Vector3(0, 0, 0.1));
    outline.push(new BABYLON.Vector3(-0.3, 0, 0.1));

    // wheel UVs
    const wheelUV = [];
    wheelUV[0] = new BABYLON.Vector4(0, 0, 1, 1);
    wheelUV[1] = new BABYLON.Vector4(0, 0.5, 0, 0.5);
    wheelUV[2] = new BABYLON.Vector4(0, 0, 1, 1);

    //wheel material
    const wheelMat = new BABYLON.StandardMaterial("wheelMat");
    wheelMat.diffuseTexture = new BABYLON.Texture("https://assets.babylonjs.com/environments/wheel.png");



    //face UVs
    const faceUV = [];
    faceUV[0] = new BABYLON.Vector4(0, 0.5, 0.38, 1);
    faceUV[1] = new BABYLON.Vector4(0, 0, 1, 0.5);
    faceUV[2] = new BABYLON.Vector4(0.38, 1, 0, 0.5);


    //material
    const carMat = new BABYLON.StandardMaterial("carMat");
    carMat.diffuseTexture = new BABYLON.Texture("https://assets.babylonjs.com/environments/car.png");

    const car = BABYLON.MeshBuilder.ExtrudePolygon("car", {shape: outline, depth: 0.2, faceUV: faceUV, wrap: true}, scene, earcut);
    car.material = carMat;
    car.rotation.x = 3*(Math.PI / 2);
    car.position.y += 0.2;

    //back formed automatically
    const wheelRB = BABYLON.MeshBuilder.CreateCylinder("wheelRB", {diameter: 0.125, height: 0.05, faceUV: wheelUV, wrap: true})
    wheelRB.material = wheelMat;
    wheelRB.parent = car;
    wheelRB.position.z = -0.1;
    wheelRB.position.x = -0.2;
    wheelRB.position.y = 0.035;
    const wheelRF = wheelRB.clone("wheelRF");
    wheelRF.position.x = 0.1;
    const wheelLB = wheelRB.clone("wheelLB");
    wheelLB.position.y = -0.2 - 0.035;
    const wheelLF = wheelRF.clone("wheelLF");
    wheelLF.position.y = -0.2 - 0.035;



    const animWheel = new BABYLON.Animation("wheelAnimation", "rotation.y", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
    const wheelKeys = [];
    //At the animation key 0, the value of rotation.y is 0
    wheelKeys.push({
        frame: 0,
        value: 0
    });
    //At the animation key 30, (after 1 sec since animation fps = 30) the value of rotation.y is 2PI for a complete rotation
    wheelKeys.push({
        frame: 30,
        value: 2 * Math.PI
    });
    //set the keys
    animWheel.setKeys(wheelKeys);

    //Link this animation to the right back wheel
    wheelRB.animations = [];
    wheelRB.animations.push(animWheel);
    wheelRF.animations = [];
    wheelRF.animations.push(animWheel);
    wheelLB.animations = [];
    wheelLB.animations.push(animWheel);
    wheelLF.animations = [];
    wheelLF.animations.push(animWheel);
    //Begin animation - object to animate, first frame, last frame and loop if true
    scene.beginAnimation(wheelRB, 0, 30, true);
    scene.beginAnimation(wheelRF, 0, 30, true);
    scene.beginAnimation(wheelLB, 0, 30, true);
    scene.beginAnimation(wheelLF, 0, 30, true);


    const animCar = new BABYLON.Animation("carAnimation", "position.x", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
    const carKeys = [];
    carKeys.push({
        frame: 0,
        value: -4
    });
    carKeys.push({
        frame: 150,
        value: 4
    });
    carKeys.push({
        frame: 210,
        value: 4
    });
    animCar.setKeys(carKeys);
    car.animations = [];
    car.animations.push(animCar);
    scene.beginAnimation(car, 0, 210, true);
    var coordSystem = function (b) {
        var g = b.normalize();
        b = 0 == Math.abs(b.x) && 0 == Math.abs(b.y) ? (new BABYLON.Vector3(b.z, 0, 0)).normalize() : (new BABYLON.Vector3(b.y, -b.x, 0)).normalize();
        var r = BABYLON.Vector3.Cross(b, g);
        return {x: b, y: g, z: r}
    }, randPct = function (b, g) {
        return 0 == g ? b : (1 + (1 - 2 * Math.random()) * g) * b
    }, createBranch = function (b, g, r, w, h, l, v, n, x) {
        for (var t = [], d, c = [], f, q = [], a = 0; 12 > a; a++) t[a] = [];
        for (var m = 0; m < h; m++) for (a = m / h, d = g.y.scale(a * r), d.addInPlace(g.x.scale(v * Math.exp(-a) * Math.sin(l * a * Math.PI))), d.addInPlace(b), c[m] = d, d = n * (1 + (.4 * Math.random() - .2)) * (1 - (1 - w) * a), q.push(d), a = 0; 12 > a; a++) f = a * Math.PI / 6, f = g.x.scale(d * Math.cos(f)).add(g.z.scale(d * Math.sin(f))), f.addInPlace(c[m]), t[a].push(f);
        for (a = 0; 12 > a; a++) t[a].push(c[c.length - 1]);
        return {
            branch: BABYLON.MeshBuilder.CreateRibbon("branch", {pathArray: t, closeArray: !0}, x),
            core: c,
            _radii: q
        }
    }, createTreeBase = function (b, g, r, w, h, l, v, n, x, t) {
        var d = 2 / (1 + Math.sqrt(5)), c = new BABYLON.Vector3(0, 1, 0), f, c = coordSystem(c),
            q = new BABYLON.Vector3(0, 0, 0), a = [], m = [], e = [], A = [],
            q = createBranch(q, c, b, g, r, 1, x, 1, t);
        a.push(q.branch);
        var y = q.core;
        m.push(y);
        e.push(q._radii);
        A.push(c);
        for (var q = y[y.length - 1], y = 2 * Math.PI / h, z, u, p, C, B = 0; B < h; B++) if (f = randPct(B * y, .25), f = c.y.scale(Math.cos(randPct(l, .15))).add(c.x.scale(Math.sin(randPct(l, .15)) * Math.sin(f))).add(c.z.scale(Math.sin(randPct(l, .15)) * Math.cos(f))), z = coordSystem(f), f = createBranch(q, z, b * v, g, r, n, x * d, g, t), p = f.core, p = p[p.length - 1], a.push(f.branch), m.push(f.core), e.push(f._radii), A.push(z), 1 < w) for (var D = 0; D < h; D++) u = randPct(D * y, .25), u = z.y.scale(Math.cos(randPct(l, .15))).add(z.x.scale(Math.sin(randPct(l, .15)) * Math.sin(u))).add(z.z.scale(Math.sin(randPct(l, .15)) * Math.cos(u))), u = coordSystem(u), C = createBranch(p, u, b * v * v, g, r, n, x * d * d, g * g, t), a.push(C.branch), m.push(C.core), e.push(f._radii), A.push(u);
        return {tree: BABYLON.Mesh.MergeMeshes(a), paths: m, radii: e, directions: A}
    }, createTree = function (b, g, r, w, h, l, v, n, x, t, d, c, f, q, a, m) {
        1 != h && 2 != h && (h = 1);
        var e = createTreeBase(b, g, r, h, l, v, n, d, c, m);
        e.tree.material = w;
        var A = b * Math.pow(n, h), y = A / (2 * f), z = 1.5 * Math.pow(g, h - 1);
        n = BABYLON.MeshBuilder.CreateDisc("leaf", {
            radius: z / 2,
            tessellation: 12,
            sideOrientation: BABYLON.Mesh.DOUBLESIDE
        }, m);
        b = new BABYLON.SolidParticleSystem("leaveSPS", m, {updatable: !1});
        b.addShape(n, 2 * f * Math.pow(l, h), {
            positionFunction: function (b, a, g) {
                a = Math.floor(g / (2 * f));
                1 == h ? a++ : a = 2 + a % l + Math.floor(a / l) * (l + 1);
                var E = (g % (2 * f) * y + 3 * y / 2) / A, d = Math.ceil(r * E);
                d > e.paths[a].length - 1 && (d = e.paths[a].length - 1);
                var k = d - 1, c = k / (r - 1), m = d / (r - 1);
                b.position = new BABYLON.Vector3(e.paths[a][k].x + (e.paths[a][d].x - e.paths[a][k].x) * (E - c) / (m - c), e.paths[a][k].y + (e.paths[a][d].y - e.paths[a][k].y) * (E - c) / (m - c) + (.6 * z / q + e.radii[a][d]) * (g % 2 * 2 - 1), e.paths[a][k].z + (e.paths[a][d].z - e.paths[a][k].z) * (E - c) / (m - c));
                b.rotation.z = Math.random() * Math.PI / 4;
                b.rotation.y = Math.random() * Math.PI / 2;
                b.rotation.z = Math.random() * Math.PI / 4;
                b.scale.y = 1 / q
            }
        });
        b = b.buildMesh();
        b.billboard = !0;
        n.dispose();
        d = new BABYLON.SolidParticleSystem("miniSPS", m, {updatable: !1});
        n = new BABYLON.SolidParticleSystem("minileavesSPS", m, {updatable: !1});
        var u = [];
        c = 2 * Math.PI / l;
        for (var p = 0; p < Math.pow(l, h + 1); p++) u.push(randPct(Math.floor(p / Math.pow(l, h)) * c, .2));
        c = function (a, b, d) {
            var c = d % Math.pow(l, h);
            1 == h ? c++ : c = 2 + c % l + Math.floor(c / l) * (l + 1);
            var f = e.directions[c],
                c = new BABYLON.Vector3(e.paths[c][e.paths[c].length - 1].x, e.paths[c][e.paths[c].length - 1].y, e.paths[c][e.paths[c].length - 1].z),
                k = u[d],
                k = f.y.scale(Math.cos(randPct(v, 0))).add(f.x.scale(Math.sin(randPct(v, 0)) * Math.sin(k))).add(f.z.scale(Math.sin(randPct(v, 0)) * Math.cos(k))),
                f = BABYLON.Vector3.Cross(BABYLON.Axis.Y, k),
                k = Math.acos(BABYLON.Vector3.Dot(k, BABYLON.Axis.Y) / k.length());
            a.scale = new BABYLON.Vector3(Math.pow(g, h + 1), Math.pow(g, h + 1), Math.pow(g, h + 1));
            a.quaternion = BABYLON.Quaternion.RotationAxis(f, k);
            a.position = c;
        };
        for (var C = [], B = [], p = e.paths.length, D = e.paths[0].length, F = 0; F < x; F++) C.push(2 * Math.PI * Math.random() - Math.PI), B.push([Math.floor(Math.random() * p), Math.floor(Math.random() * (D - 1) + 1)]);
        p = function (a, c, b) {
            var d = B[b][0], f = B[b][1], k = e.directions[d];
            c = new BABYLON.Vector3(e.paths[d][f].x, e.paths[d][f].y, e.paths[d][f].z);
            c.addInPlace(k.z.scale(e.radii[d][f] / 2));
            b = C[b];
            k = k.y.scale(Math.cos(randPct(t, 0))).add(k.x.scale(Math.sin(randPct(t, 0)) * Math.sin(b))).add(k.z.scale(Math.sin(randPct(t, 0)) * Math.cos(b)));
            b = BABYLON.Vector3.Cross(BABYLON.Axis.Y, k);
            k = Math.acos(BABYLON.Vector3.Dot(k, BABYLON.Axis.Y) / k.length());
            a.scale = new BABYLON.Vector3(Math.pow(g, h + 1), Math.pow(g, h + 1), Math.pow(g, h + 1));
            a.quaternion = BABYLON.Quaternion.RotationAxis(b, k);
            a.position = c
        };
        d.addShape(e.tree, Math.pow(l, h + 1), {positionFunction: c});
        d.addShape(e.tree, x, {positionFunction: p});
        d = d.buildMesh();
        d.material = w;
        n.addShape(b, Math.pow(l, h + 1), {positionFunction: c});
        n.addShape(b, x, {positionFunction: p});
        w = n.buildMesh();
        b.dispose();
        w.material = a;
        a = BABYLON.MeshBuilder.CreateBox("", {}, m);
        a.isVisible = !1;
        e.tree.parent = a;
        d.parent = a;
        return w.parent = a
    };

    //leaf material
    var green = new BABYLON.StandardMaterial("green", scene);
    green.diffuseColor = new BABYLON.Color3(0,1,0);

    //trunk and branch material
    var bark = new BABYLON.StandardMaterial("bark", scene);
    bark.emissiveTexture = new BABYLON.Texture("https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Bark_texture_wood.jpg/800px-Bark_texture_wood.jpg", scene);
    bark.diffuseTexture = new BABYLON.Texture("https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Bark_texture_wood.jpg/800px-Bark_texture_wood.jpg", scene);
    bark.diffuseTexture.uScale = 2.0;//Repeat 5 times on the Vertical Axes
    bark.diffuseTexture.vScale = 2.0;//Repeat 5 times on the Horizontal Axes

    //Tree parameters
    var trunk_height = 20;
    var trunk_taper = 0.6;
    var trunk_slices = 5;
    var boughs = 2; // 1 or 2
    var forks = 4;
    var fork_angle = Math.PI/4;
    var fork_ratio = 2/(1+Math.sqrt(5)); //PHI the golden ratio
    var branch_angle = Math.PI/3;
    var bow_freq = 2;
    var bow_height = 3.5;
    var branches = 10;
    var leaves_on_branch = 5;
    var leaf_wh_ratio = 0.5;

    var tree = createTree(trunk_height, trunk_taper, trunk_slices, bark, boughs, forks, fork_angle, fork_ratio, branches, branch_angle, bow_freq, bow_height, leaves_on_branch, leaf_wh_ratio, green, scene);
    tree.position.y = 0;



// XR
    async function createWebXR(scene) {
        return scene.createDefaultXRExperienceAsync({floorMeshes: ground}).then((xrHelper) => {
            xrHelper.pointerSelection = xrHelper.baseExperience.featuresManager.enableFeature(BABYLON.WebXRFeatureName.POINTER_SELECTION, "latest", {
                xrInput: xrHelper.input,
                renderingGroupId: 2
            });
            xrHelper.pointerSelection.displayLaserPointer = true;
            xrHelper.pointerSelection.displaySelectionMesh = false;
            // set controller meshes's renderingGroupId
            xrHelper.input.onControllerAddedObservable.add((controller) => {
                controller.onMeshLoadedObservable.add((rootMesh) => {
                    rootMesh.renderingGroupId = 2;
                    rootMesh.getChildMeshes(false).forEach(m => m.renderingGroupId = 2)
                });
            });

            xrHelper.teleportation = xrHelper.baseExperience.featuresManager.enableFeature(BABYLON.WebXRFeatureName.TELEPORTATION, 'stable', {
                xrInput: xrHelper.input, floorMeshes: [ground], renderingGroupId: 2,
            });
            return xrHelper;
        });
    }
    createWebXR(scene);










    
    return scene;
}
