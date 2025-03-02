import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';

const InteractiveSkillsGlobe = () => {
  const containerRef = useRef(null);
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Define skill categories with vibrant colors
  const skillCategories = {
    security: { color: 0xec4899, name: 'Security' },
    development: { color: 0x6366f1, name: 'Development' },
    cloud: { color: 0x3b82f6, name: 'Cloud' },
    datascience: { color: 0x10b981, name: 'Data Science' }
  };
  
  // Define skills with properties
  const skills = [
    { name: 'Python', category: 'development', level: 95, description: 'Advanced scripting, security tools, ML implementations' },
    { name: 'C/C++', category: 'development', level: 85, description: 'Low-level systems programming, performance optimization' },
    { name: 'JavaScript', category: 'development', level: 80, description: 'Web development, React frameworks, security dashboards' },
    { name: 'Threat Modeling', category: 'security', level: 90, description: 'STRIDE methodology and MITRE ATT&CK framework' },
    { name: 'Penetration Testing', category: 'security', level: 85, description: 'Network and application security assessment' },
    { name: 'Malware Analysis', category: 'security', level: 88, description: 'Static and dynamic analysis of malicious code' },
    { name: 'Vulnerability Research', category: 'security', level: 92, description: 'Discovery and documentation of security flaws' },
    { name: 'AWS', category: 'cloud', level: 82, description: 'Cloud infrastructure and security services' },
    { name: 'Docker', category: 'cloud', level: 85, description: 'Container security and orchestration' },
    { name: 'TensorFlow', category: 'datascience', level: 80, description: 'Neural networks for security classification' },
    { name: 'Machine Learning', category: 'datascience', level: 88, description: 'Anomaly detection, classification systems' },
    { name: 'Rust', category: 'development', level: 75, description: 'Memory-safe systems programming' },
    { name: 'Network Security', category: 'security', level: 90, description: 'Protocol analysis, traffic inspection, packet filtering' },
    { name: 'Threat Intelligence', category: 'security', level: 87, description: 'Collection and analysis of threat indicators' },
    { name: 'Incident Response', category: 'security', level: 82, description: 'Investigation and remediation of security breaches' }
  ];

  useEffect(() => {
    if (!containerRef.current) return;
    
    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x050505);
    
    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      60, 
      containerRef.current.clientWidth / containerRef.current.clientHeight, 
      0.1, 
      1000
    );
    camera.position.z = 40;
    
    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);
    
    // Controls for interactivity
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.rotateSpeed = 0.5;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 1;
    
    // Create sphere to represent the universe of skills
    const sphereGeometry = new THREE.SphereGeometry(18, 64, 64);
    const sphereMaterial = new THREE.MeshBasicMaterial({
      color: 0x111111,
      wireframe: true,
      transparent: true,
      opacity: 0.3
    });
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    scene.add(sphere);
    
    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    // Add directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);
    
    // Create a glow effect
    const glowGeometry = new THREE.SphereGeometry(18.2, 64, 64);
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
    
    // Create Fibonacci sphere points for even distribution
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
    const skillPoints = fibonacciSphere(skills.length, 18);
    
    // Skill nodes 
    const skillNodes = [];
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    
    // Font loader for skill labels
    const fontLoader = new FontLoader();
    
    // Load font for text labels
    fontLoader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', function (font) {
      skills.forEach((skill, index) => {
        const position = skillPoints[index];
        
        // Determine color based on skill category
        const categoryInfo = skillCategories[skill.category];
        const color = categoryInfo ? categoryInfo.color : 0xffffff;
        
        // Create node - size based on skill level
        const nodeSize = 0.2 + (skill.level / 100) * 0.6;
        const nodeGeometry = new THREE.SphereGeometry(nodeSize, 32, 32);
        const nodeMaterial = new THREE.MeshPhongMaterial({ 
          color: color,
          emissive: color,
          emissiveIntensity: 0.3,
          specular: 0xffffff,
          shininess: 100
        });
        
        const node = new THREE.Mesh(nodeGeometry, nodeMaterial);
        node.position.copy(position);
        node.userData = { ...skill, index };
        
        // Add node to scene
        scene.add(node);
        skillNodes.push(node);
        
        // Add particle system around node for effect
        const particleGeometry = new THREE.BufferGeometry();
        const particleCount = Math.floor(skill.level / 10);
        const particlePositions = new Float32Array(particleCount * 3);
        
        for (let i = 0; i < particleCount; i++) {
          const i3 = i * 3;
          const radius = nodeSize * 3;
          const theta = Math.random() * Math.PI * 2;
          const phi = Math.random() * Math.PI;
          
          particlePositions[i3] = position.x + radius * Math.sin(phi) * Math.cos(theta);
          particlePositions[i3 + 1] = position.y + radius * Math.sin(phi) * Math.sin(theta);
          particlePositions[i3 + 2] = position.z + radius * Math.cos(phi);
        }
        
        particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
        
        const particleMaterial = new THREE.PointsMaterial({
          color: color,
          size: 0.1,
          transparent: true,
          opacity: 0.4
        });
        
        const particles = new THREE.Points(particleGeometry, particleMaterial);
        scene.add(particles);
        
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
        
        // Add text label for high-level skills
        if (skill.level >= 85) {
          try {
            const textGeometry = new TextGeometry(skill.name, {
              font: font,
              size: 0.8,
              height: 0.1
            });
            
            textGeometry.computeBoundingBox();
            textGeometry.center();
            
            const textMaterial = new THREE.MeshPhongMaterial({ 
              color: 0xffffff,
              emissive: color,
              emissiveIntensity: 0.5
            });
            
            const textMesh = new THREE.Mesh(textGeometry, textMaterial);
            
            // Position text slightly offset from node
            const direction = position.clone().normalize();
            const textPosition = position.clone().add(direction.multiplyScalar(nodeSize + 1));
            
            textMesh.position.copy(textPosition);
            textMesh.lookAt(camera.position);
            
            // Store the original position for animation
            textMesh.userData = { 
              originalPosition: textPosition.clone(),
              skill: skill
            };
            
            scene.add(textMesh);
          } catch (error) {
            console.error("Error creating text geometry:", error);
          }
        }
      });
      
      setLoading(false);
    });
    
    // Handle hover on skill nodes
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
        
        // Visual feedback on hover
        hoveredNode.scale.set(1.5, 1.5, 1.5);
        hoveredNode.material.emissiveIntensity = 0.8;
        document.body.style.cursor = 'pointer';
        
        // Slow down autorotation when hovering
        controls.autoRotateSpeed = 0.5;
      } else {
        // Reset all nodes
        skillNodes.forEach(node => {
          node.scale.set(1, 1, 1);
          node.material.emissiveIntensity = 0.3;
        });
        document.body.style.cursor = 'default';
        setHoveredSkill(null);
        
        // Normal autorotation speed when not hovering
        controls.autoRotateSpeed = 1;
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
    const clock = new THREE.Clock();
    
    const animate = () => {
      requestAnimationFrame(animate);
      
      const elapsedTime = clock.getElapsedTime();
      
      // Update sphere rotation
      sphere.rotation.y = elapsedTime * 0.05;
      glowMesh.rotation.y = elapsedTime * 0.05;
      
      // Pulse glow effect
      const pulseScale = 1 + Math.sin(elapsedTime * 2) * 0.03;
      glowMesh.scale.set(pulseScale, pulseScale, pulseScale);
      
      // Update controls
      controls.update();
      
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
  }, []);
  
  return (
    <div className="relative w-full">
      {/* Loading indicator */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 border-4 border-t-pink-500 border-r-purple-500 border-b-blue-500 border-l-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-lg text-white">Loading Skills Universe...</p>
          </div>
        </div>
      )}
      
      {/* 3D container */}
      <div 
        ref={containerRef} 
        className="w-full h-[600px] relative"
      />
      
      {/* Skill details popup when hovering */}
      {hoveredSkill && (
        <div className="absolute top-4 right-4 bg-gray-900/90 backdrop-blur-xl p-6 rounded-xl border border-pink-500/50 shadow-lg max-w-xs z-20">
          <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            {hoveredSkill.name}
          </h3>
          <div className="flex items-center mb-4">
            <div className="w-full bg-gray-800 rounded-full h-3 mr-2">
              <div 
                className="bg-gradient-to-r from-pink-500 to-purple-500 h-3 rounded-full"
                style={{ width: `${hoveredSkill.level}%` }}
              ></div>
            </div>
            <span className="text-pink-400 font-medium">{hoveredSkill.level}%</span>
          </div>
          <p className="text-gray-300">{hoveredSkill.description}</p>
          <div className="mt-3 pt-3 border-t border-gray-700/30">
            <span className="px-3 py-1 rounded-full text-xs bg-gradient-to-r from-pink-500/20 to-purple-500/20 text-pink-400 border border-pink-500/20">
              {skillCategories[hoveredSkill.category]?.name || hoveredSkill.category}
            </span>
          </div>
        </div>
      )}
      
      {/* Instructions */}
      <div className="absolute bottom-4 left-4 bg-gray-900/70 backdrop-blur-sm px-3 py-2 rounded-md text-xs text-gray-300">
        <span>Drag to rotate | Scroll to zoom | Hover for details</span>
      </div>
      
      {/* Legend */}
      <div className="absolute bottom-4 right-4 bg-gray-900/70 backdrop-blur-sm p-3 rounded-md">
        <div className="text-xs text-gray-300 mb-2">Skill Categories:</div>
        <div className="flex flex-col gap-1">
          {Object.entries(skillCategories).map(([key, value]) => (
            <div key={key} className="flex items-center">
              <span 
                className="w-3 h-3 rounded-full mr-2" 
                style={{ backgroundColor: `#${value.color.toString(16)}` }}
              ></span>
              <span className="text-xs text-gray-300">{value.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InteractiveSkillsGlobe;
