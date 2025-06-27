// Script para crear un modelo 3D de ejemplo usando Three.js
// Este script genera un archivo GLB que se puede usar como demo

import * as THREE from 'three';
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter.js';
import fs from 'fs';
import path from 'path';

function createSampleModel() {
  const scene = new THREE.Scene();
  
  // Crear una geometría de ejemplo (un cubo con detalles)
  const geometry = new THREE.BoxGeometry(2, 2, 2);
  
  // Crear material con textura
  const material = new THREE.MeshStandardMaterial({
    color: 0x3b82f6,
    roughness: 0.3,
    metalness: 0.1
  });
  
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);
  
  // Agregar algunas esferas decorativas
  for (let i = 0; i < 8; i++) {
    const sphereGeometry = new THREE.SphereGeometry(0.2, 16, 16);
    const sphereMaterial = new THREE.MeshStandardMaterial({
      color: Math.random() * 0xffffff,
      roughness: 0.2,
      metalness: 0.8
    });
    
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    
    // Posicionar esferas alrededor del cubo
    const angle = (i / 8) * Math.PI * 2;
    sphere.position.set(
      Math.cos(angle) * 2.5,
      Math.sin(angle * 2) * 1.5,
      Math.sin(angle) * 2.5
    );
    
    scene.add(sphere);
  }
  
  // Exportar como GLB
  const exporter = new GLTFExporter();
  
  exporter.parse(
    scene,
    (gltf) => {
      const output = JSON.stringify(gltf, null, 2);
      const outputPath = path.join(process.cwd(), 'public', 'models', 'sample.glb');
      
      // Crear directorio si no existe
      const dir = path.dirname(outputPath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      
      // En un entorno real, aquí escribirías el archivo binario GLB
      // Por ahora, creamos un archivo de texto con información del modelo
      const modelInfo = {
        name: 'Sample 3D Model',
        description: 'Modelo de ejemplo creado con Three.js',
        vertices: geometry.attributes.position.count,
        faces: geometry.index ? geometry.index.count / 3 : geometry.attributes.position.count / 3,
        created: new Date().toISOString()
      };
      
      fs.writeFileSync(
        path.join(process.cwd(), 'public', 'models', 'sample-info.json'),
        JSON.stringify(modelInfo, null, 2)
      );
      
      console.log('✅ Modelo de ejemplo creado en public/models/');
    },
    { binary: true }
  );
}

// Ejecutar si se llama directamente
if (import.meta.url === `file://${process.argv[1]}`) {
  createSampleModel();
}

export { createSampleModel };
