import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';

const SkillsGlobe = ({ skills }) => {
  const containerRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    if (!containerRef.current || !skills || skills.length === 0) return;
    
    // Scene, camera, renderer
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x050505);
    
    const camera = new THREE.PerspectiveCamera(
      60, 
      containerRef.current.clientWidth / containerRef.current.clientHeight, 
      0.1, 
      1000
    );
    camera.position.z = 25;
    
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);
    
    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.rotateSpeed = 0.5;
    controls.autoRotate = true;
    controls.autoRotateSpeed = isHovering ? 0.5 : 2;
    
    // Create sphere
    const sphereGeometry = new THREE.SphereGeometry(10, 32, 32);
    const sphereMaterial = new THREE.MeshBasicMaterial({
      color: 0x000000,
      wireframe: true,
      transparent: true,
      opacity: 0.3
    });
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    scene.add(sphere);
    
    // Create a glow effect
    const glowGeometry = new THREE.SphereGeometry(10.2, 32, 32);
    const glowMaterial = new THREE.ShaderMaterial({
      uniforms: {
        c: { type: "f", value: 0.2 },
        p: { type: "f", value: 4.0 },
        glowColor: { type: "c", value: new THREE.Color(0xec4899) },
        viewVector: { type: "v3", value: camera.position }
      },
      vertexShader: `
        uniform vec3 viewVector;
        uniform float c;
        uniform float p;
        varying float intensity;
        void main() {
          vec3 vNormal = normalize(normal);
          vec3 vNormel = normalize(viewVector);
          intensity = pow(c - dot(vNormal, vNormel), p);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 glowColor;
        varying float intensity;
        void main() {
          vec3 glow = glowColor * intensity;
          gl_FragColor = vec4(glow, 1.0);
        }
      `,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
      transparent: true
    });
    
    const glowMesh = new THREE.Mesh(glowGeometry, glowMaterial);
    scene.add(glowMesh);
    
    // Skills positioning function using fibonacci sphere
    const fibonacciSphere = (samples, radius) => {
      const points = [];
      const phi = Math.PI * (3 - Math.sqrt(5)); // Golden angle
      
      for (let i = 0; i < samples; i++) {
        const y = 1 - (i / (samples - 1)) * 2; // y goes from 1 to -1
        const radiusAtY = Math.sqrt(1 - y * y); // radius at y
        
        const theta = phi * i; // Golden angle increment
        
        const x = Math.cos(theta) * radiusAtY;
        const z = Math.sin(theta) * radiusAtY;
        
        points.push(new THREE.Vector3(x * radius, y * radius, z * radius));
      }
      
      return points;
    };
    
    // Generate skill points around the sphere
    const skillPoints = fibonacciSphere(skills.length, 10);
    
    // Skill nodes and labels
    const skillNodes = [];
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    
    // Font loader for skill labels
    const fontLoader = new FontLoader();
    
    // A dictionary to map skill types to colors
    const typeColors = {
      'language': 0xec4899, // Pink
      'security': 0x9333ea, // Purple
      'cloud': 0x3b82f6, // Blue
      'datascience': 0x10b981, // Green
      'default': 0xffffff  // White
    };
    
    fontLoader.load('/fonts/helvetiker_regular.typeface.json', function (font) {
      skills.forEach((skill, index) => {
        const position = skillPoints[index];
        
        // Determine color based on skill type
        const skillType = skill.category || 'default';
        const color = typeColors[skillType] || typeColors.default;
        
        // Create node geometry - size based on skill level
        const nodeSize = 0.1 + (skill.level / 100) * 0.3;
        const nodeGeometry = new THREE.SphereGeometry(nodeSize, 16, 16);
        const nodeMaterial = new THREE.MeshBasicMaterial({ 
          color: color,
          transparent: true,
          opacity: 0.8
        });
        
        const node = new THREE.Mesh(nodeGeometry, nodeMaterial);
        node.position.copy(position);
        node.userData = { ...skill, index };
        
        // Add node to scene and array
        scene.add(node);
        skillNodes.push(node);
        
        // Connect to center with line
        const lineMaterial = new THREE.LineBasicMaterial({
          color: color,
          transparent: true,
          opacity: 0.3
        });
        
        const linePoints = [
          new THREE.Vector3(0, 0, 0),
          position
        ];
        
        const lineGeometry = new THREE.BufferGeometry().setFromPoints(linePoints);
        const line = new THREE.Line(lineGeometry, lineMaterial);
        scene.add(line);
        
        // Only add 3D text label for significant skills (level > 80)
        if (skill.level > 80) {
          try {
            // Position text slightly offset from node
            const direction = position.clone().normalize();
            const textPosition = position.clone().add(direction.multiplyScalar(1));
            
            // Create text geometry
            const textGeometry = new TextGeometry(skill.name, {
              font: font,
              size: 0.4,
              height: 0.05
            });
            
            textGeometry.computeBoundingBox();
            textGeometry.center();
            
            const textMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
            const textMesh = new THREE.Mesh(textGeometry, textMaterial);
            
            // Position and orient text to face camera
            textMesh.position.copy(textPosition);
            textMesh.lookAt(camera.position);
            
            scene.add(textMesh);
          } catch (error) {
            console.error("Error creating text geometry:", error);
          }
        }
      });
      
      setIsLoaded(true);
    });
    
    // Handle hover/click on skill nodes
    const handleMouseMove = (event) => {
      // Calculate mouse position in normalized device coordinates
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      
      // Check for intersections
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(skillNodes);
      
      if (intersects.length > 0) {
        const hoveredNode = intersects[0].object;
        setHoveredSkill(hoveredNode.userData);
        
        // Visual feedback
        hoveredNode.scale.set(1.5, 1.5, 1.5);
        document.body.style.cursor = 'pointer';
        
        setIsHovering(true);
      } else {
        // Reset all nodes if not hovering
        skillNodes.forEach(node => {
          node.scale.set(1, 1, 1);
        });
        document.body.style.cursor = 'default';
        setHoveredSkill(null);
        setIsHovering(false);
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    // Handle window resize
    const handleResize = () => {
      if (!containerRef.current) return;
      
      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Update controls
      controls.update();
      
      // Update sphere rotation
      sphere.rotation.y += 0.001;
      glowMesh.rotation.y += 0.001;
      
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Cleanup
    return () => {
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      controls.dispose();
    };
  }, [skills, isHovering]);
  
  return (
    <div className="relative w-full">
      <div 
        ref={containerRef} 
        className="w-full h-[500px] relative"
      >
        {!isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center text-pink-500">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-pink-500"></div>
          </div>
        )}
      </div>
      
      {/* Skill details popup when hovering */}
      {hoveredSkill && (
        <div className="absolute top-4 right-4 bg-gray-900/90 backdrop-blur-sm p-4 rounded-lg border border-pink-500/50 shadow-lg max-w-xs">
          <h3 className="text-xl font-bold mb-1 text-white">{hoveredSkill.name}</h3>
          <div className="flex items-center mb-2">
            <div className="w-full bg-gray-700 rounded-full h-2.5 mr-2">
              <div 
                className="bg-gradient-to-r from-pink-500 to-purple-500 h-2.5 rounded-full"
                style={{ width: `${hoveredSkill.level}%` }}
              ></div>
            </div>
            <span className="text-pink-500 text-sm">{hoveredSkill.level}%</span>
          </div>
          <p className="text-gray-300 text-sm">{hoveredSkill.description}</p>
        </div>
      )}
      
      {/* Instructions */}
      <div className="absolute bottom-4 left-4 bg-gray-900/70 backdrop-blur-sm px-3 py-2 rounded-md text-xs text-gray-300">
        <span>Drag to rotate | Scroll to zoom</span>
      </div>
      
      {/* Legend */}
      <div className="absolute bottom-4 right-4 bg-gray-900/70 backdrop-blur-sm p-3 rounded-md">
        <div className="text-xs text-gray-300 mb-2">Skill Categories:</div>
        <div className="flex flex-col gap-1">
          <div className="flex items-center">
            <span className="w-3 h-3 rounded-full bg-pink-500 mr-2"></span>
            <span className="text-xs text-gray-300">Languages</span>
          </div>
          <div className="flex items-center">
            <span className="w-3 h-3 rounded-full bg-purple-600 mr-2"></span>
            <span className="text-xs text-gray-300">Security</span>
          </div>
          <div className="flex items-center">
            <span className="w-3 h-3 rounded-full bg-blue-500 mr-2"></span>
            <span className="text-xs text-gray-300">Cloud</span>
          </div>
          <div className="flex items-center">
            <span className="w-3 h-3 rounded-full bg-green-500 mr-2"></span>
            <span className="text-xs text-gray-300">Data Science</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillsGlobe;
