import * as THREE from 'three';
import {EffectComposer} from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { PixelShader } from 'three/examples/jsm/shaders/PixelShader.js';
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial.js';
import { WireframeGeometry2 } from 'three/examples/jsm/lines/WireframeGeometry2.js';
import { Injectable, OnDestroy, NgZone } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AnimationService implements OnDestroy {
  private canvas!: HTMLCanvasElement;
  private renderer!: THREE.WebGLRenderer;
  private composer!: EffectComposer;
  private pixelPass!: ShaderPass;
  private camera!: THREE.PerspectiveCamera;
  private raycaster!: THREE.Raycaster;
  private scene!: THREE.Scene;
  private frameId: number | null = null;
  private group!: THREE.Group;

  private coordinates = {x: 0, y: 0};
  private triangles: THREE.Mesh[] = [];
  private mode = 2;

  private time = 0;
  private exitAcceleration = 2;
  private enterAcceleration = 8;

  private cWidth = 800;
  private cHeight = 600;
  private mouse = {
    x: 0,
    y: 0
  };

  // triangle options
  private numOfPoints = 600;
  private triangleMeshes: THREE.Mesh[] = [];

  constructor(private ngZone: NgZone) {}

  ngOnDestroy(): void {
    if (this.frameId != null) {
      cancelAnimationFrame(this.frameId);
    }
  }

  init(canvas: HTMLCanvasElement): void {
    this.canvas = canvas;
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      alpha: true,
      antialias: true,
    });
    this.renderer.setSize((window.innerWidth / 2), window.innerHeight);
    this.renderer.setClearColor(0xffffff);
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      75, (window.innerWidth / 2) / window.innerHeight, 0.1, 1000
    );
    this.camera.position.z = 200;
    this.camera.position.y = 0;
    this.camera.position.x = 0;
    this.camera.lookAt(0, 0, 0);
    this.scene.add(this.camera);

    const light = new THREE.PointLight( 0xffffff, 1, 0 );
    light.position.set( 400, 400, 50 );
    this.scene.add( light );

    const color = 0xFFFFFF;
    const intensity = 1;
    const lighta = new THREE.AmbientLight(color, intensity);
    this.scene.add(lighta);
    this.setupMouseListener();

    this.testPixels();
  }

  testPixels(): void{
    const hemisphereLight = new THREE.HemisphereLight( 0x000000, 0x000000, 1 );
    this.scene.add( hemisphereLight );

    const dirLight = new THREE.DirectionalLight( 0x000000, .5 );
    dirLight.position.set( 150, 75, 150 );
    this.scene.add( dirLight );

    const dirLight2 = new THREE.DirectionalLight( 0x000000, .2 );
    dirLight2.position.set( - 150, 75, - 150 );
    this.scene.add( dirLight2 );

    const dirLight3 = new THREE.DirectionalLight( 0x000000, .1 );
    dirLight3.position.set( 0, 125, 0 );
    this.scene.add( dirLight3 );

    const geometries = [
      new THREE.SphereGeometry( 1, 64, 64 ),
      new THREE.BoxGeometry( 1, 1, 1 ),
      new THREE.ConeGeometry( 1, 1, 32 ),
      new THREE.TetrahedronGeometry( 1 ),
      new THREE.TorusKnotGeometry( 1, .4 )
    ];

    this.group = new THREE.Group();
    const geometry = new THREE.IcosahedronGeometry(100, 1); // new THREE.SphereGeometry(100, 7, 12, 3, 6.3, 0, 6.3);
    const color = new THREE.Color();
    color.setHSL( Math.random(), .7 + .2 * Math.random(), .5 + .1 * Math.random() );
    const material = new THREE.MeshLambertMaterial( { color } );
    const mesh = new THREE.Mesh(geometry, material);

    /*
    const geo = new WireframeGeometry2( mesh.geometry );
    const mat = new LineMaterial( {
      color: 0x000000,
      linewidth: 155, // in pixels
      dashed: false
    } );
    const wireframe = new THREE.LineSegments( geo, mat );
    */
    const geo = new THREE.EdgesGeometry( mesh.geometry ); // or WireframeGeometry
    const mat = new THREE.LineBasicMaterial( { color: 0x000000 } );
    const wireframe = new THREE.LineSegments( geo, mat );
    mesh.add( wireframe );
    this.group.add(mesh);

    this.scene.add( this.group );
    this.composer = new EffectComposer( this.renderer );
    this.composer.addPass( new RenderPass( this.scene, this.camera ) );

    this.pixelPass = new ShaderPass( PixelShader );
    this.pixelPass.uniforms.resolution.value = new THREE.Vector2( window.innerWidth, window.innerHeight );
    this.pixelPass.uniforms.pixelSize.value = 4;
    this.pixelPass.uniforms.resolution.value.multiplyScalar( window.devicePixelRatio );
    this.composer.addPass( this.pixelPass );

    const params = {
      pixelSize: 16,
      postprocessing: true
    };
  }

  public animate(): void {
    this.ngZone.runOutsideAngular(() => {
      if (document.readyState !== 'loading') {
        this.render();
      } else {
        window.addEventListener('DOMContentLoaded', () => {
          this.render();
        });
      }
      window.addEventListener('resize', () => {
        this.resize();
      });
    });
  }

  changeColors(colorNumber: number): void{
    const colorString = getComputedStyle(document.documentElement)
    .getPropertyValue(`--colorAccent${colorNumber + 1}`)
    .toLocaleLowerCase()
    .trim();
    const color = new THREE.Color(colorString);
    this.group.children.forEach(object => {
      const mesh = object as THREE.Mesh;
      const material = mesh.material as THREE.MeshLambertMaterial;
      material.color.set(color);
    });
  }

  setupMouseListener(): void {
    document.addEventListener('mousemove', e => {
      this.mouse.x = e.x;
      this.mouse.y = e.y;
    });
  }

  public render(): void {
    this.frameId = requestAnimationFrame(() => {
      this.render();
    });
    this.group.rotation.y += .0015;
    this.group.rotation.z += .001;
    this.camera.position.x += ( - this.mouse.x + window.innerWidth / 2 - this.camera.position.x  ) * .0001;
    this.camera.position.y += ( - this.mouse.y + window.innerHeight / 2 - this.camera.position.y ) * .0001;
    this.composer.render();
  }

  private resize(): void {
    const width = (window.innerWidth / 2);
    const height = window.innerHeight;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize( width, height );
  }
}
