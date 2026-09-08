"""
Blender 3D Cyber Robot Generator Script
========================================
This script generates a futuristic, floating cyberpunk robot in Blender:
- Smooth aerodynamic mech helmet with visor
- Emissive digital LED eyes & HUD
- Torso with glowing neon arc reactor chest core
- Articulated arms with hovering cybernetic hands
- Floating anti-gravity thruster base with ion rings
- Studio lighting & camera setup
- Automatic export to .glb (ready for Three.js / WebGL)

How to use in Blender:
1. Open Blender (v3.0+ or v4.0+)
2. Go to the "Scripting" tab
3. Click "New" and paste this code
4. Click "Run Script" (or press Alt + P)
"""

import bpy
import math

def clean_scene():
    """Clear default objects (cube, camera, light) to start clean."""
    bpy.ops.object.select_all(action='SELECT')
    bpy.ops.object.delete(use_global=False)

def create_material(name, base_color, metallic=0.0, roughness=0.5, emission_color=(0, 0, 0, 1), emission_strength=0.0, transmission=0.0):
    """Utility to create a Principled BSDF material with custom properties."""
    mat = bpy.data.materials.new(name=name)
    mat.use_nodes = True
    nodes = mat.node_tree.nodes
    bsdf = nodes.get("Principled BSDF")

    if bsdf:
        # Base Color
        bsdf.inputs['Base Color'].default_value = base_color
        # Metallic & Roughness
        if 'Metallic' in bsdf.inputs:
            bsdf.inputs['Metallic'].default_value = metallic
        if 'Roughness' in bsdf.inputs:
            bsdf.inputs['Roughness'].default_value = roughness
        # Emission
        if 'Emission Color' in bsdf.inputs:
            bsdf.inputs['Emission Color'].default_value = emission_color
            bsdf.inputs['Emission Strength'].default_value = emission_strength
        elif 'Emission' in bsdf.inputs:
            bsdf.inputs['Emission'].default_value = emission_color
        # Transmission (glass)
        if 'Transmission Weight' in bsdf.inputs:
            bsdf.inputs['Transmission Weight'].default_value = transmission
        elif 'Transmission' in bsdf.inputs:
            bsdf.inputs['Transmission'].default_value = transmission

    return mat

def build_robot():
    clean_scene()

    # -------------------------------------------------------------
    # 1. Materials
    # -------------------------------------------------------------
    mat_dark_armor = create_material("DarkArmor", base_color=(0.04, 0.04, 0.05, 1.0), metallic=0.9, roughness=0.25)
    mat_white_armor = create_material("WhiteArmor", base_color=(0.9, 0.9, 0.92, 1.0), metallic=0.3, roughness=0.15)
    mat_metal_joint = create_material("MetalJoint", base_color=(0.15, 0.15, 0.18, 1.0), metallic=0.95, roughness=0.35)
    mat_neon_purple = create_material("NeonPurple", base_color=(0.66, 0.33, 0.97, 1.0), emission_color=(0.66, 0.33, 0.97, 1.0), emission_strength=8.0)
    mat_neon_cyan = create_material("NeonCyan", base_color=(0.2, 0.6, 1.0, 1.0), emission_color=(0.2, 0.6, 1.0, 1.0), emission_strength=6.0)
    mat_visor_glass = create_material("VisorGlass", base_color=(0.02, 0.02, 0.03, 1.0), metallic=0.1, roughness=0.05, transmission=0.6)

    # -------------------------------------------------------------
    # 2. Head & Helmet
    # -------------------------------------------------------------
    # Outer Helmet
    bpy.ops.mesh.primitive_uv_sphere_add(radius=0.9, location=(0, 0, 3.2), segments=32, ring_count=24)
    helmet = bpy.context.active_object
    helmet.name = "Robot_Helmet"
    helmet.scale = (1.0, 1.1, 0.95)
    helmet.data.materials.append(mat_white_armor)
    bpy.ops.object.shade_smooth()

    # Curved Front Visor
    bpy.ops.mesh.primitive_uv_sphere_add(radius=0.75, location=(0, 0.45, 3.25), segments=32, ring_count=24)
    visor = bpy.context.active_object
    visor.name = "Robot_Visor"
    visor.scale = (0.9, 0.6, 0.65)
    visor.data.materials.append(mat_visor_glass)
    bpy.ops.object.shade_smooth()

    # Digital LED Eyes (Left and Right)
    for side, x_pos in [("L", -0.28), ("R", 0.28)]:
        bpy.ops.mesh.primitive_cylinder_add(radius=0.1, depth=0.1, location=(x_pos, 0.92, 3.28), rotation=(math.radians(90), 0, 0))
        eye = bpy.context.active_object
        eye.name = f"Robot_Eye_{side}"
        eye.scale = (1.0, 0.4, 0.2)
        eye.data.materials.append(mat_neon_purple)
        bpy.ops.object.shade_smooth()

    # Helmet Ear Pods / Audio Discs
    for side, x_pos in [("L", -0.92), ("R", 0.92)]:
        bpy.ops.mesh.primitive_cylinder_add(radius=0.25, depth=0.15, location=(x_pos, 0, 3.2), rotation=(0, math.radians(90), 0))
        ear = bpy.context.active_object
        ear.name = f"Robot_Ear_{side}"
        ear.data.materials.append(mat_dark_armor)
        bpy.ops.object.shade_smooth()

        # Inner Glowing Ring in Ear
        bpy.ops.mesh.primitive_torus_add(major_radius=0.15, minor_radius=0.03, location=(x_pos * 1.05, 0, 3.2), rotation=(0, math.radians(90), 0))
        ear_glow = bpy.context.active_object
        ear_glow.name = f"Robot_EarGlow_{side}"
        ear_glow.data.materials.append(mat_neon_cyan)

    # -------------------------------------------------------------
    # 3. Neck & Torso
    # -------------------------------------------------------------
    # Neck Joint
    bpy.ops.mesh.primitive_cylinder_add(radius=0.35, depth=0.3, location=(0, 0, 2.45))
    neck = bpy.context.active_object
    neck.name = "Robot_Neck"
    neck.data.materials.append(mat_metal_joint)

    # Chest Chassis
    bpy.ops.mesh.primitive_cube_add(size=1.0, location=(0, 0, 1.7))
    chest = bpy.context.active_object
    chest.name = "Robot_Chest"
    chest.scale = (1.2, 0.8, 1.1)
    chest.data.materials.append(mat_dark_armor)
    bpy.ops.object.shade_smooth()

    # Bevel modifier on chest for sleek cyber edge highlights
    bevel = chest.modifiers.new(name="Bevel", type='BEVEL')
    bevel.width = 0.12
    bevel.segments = 4

    # Glowing Arc Reactor Core (Center of Chest)
    bpy.ops.mesh.primitive_cylinder_add(radius=0.22, depth=0.1, location=(0, 0.42, 1.8), rotation=(math.radians(90), 0, 0))
    core = bpy.context.active_object
    core.name = "Robot_ChestCore"
    core.data.materials.append(mat_neon_purple)
    bpy.ops.object.shade_smooth()

    # Outer Core Ring
    bpy.ops.mesh.primitive_torus_add(major_radius=0.28, minor_radius=0.04, location=(0, 0.42, 1.8), rotation=(math.radians(90), 0, 0))
    core_ring = bpy.context.active_object
    core_ring.name = "Robot_ChestCoreRing"
    core_ring.data.materials.append(mat_neon_cyan)

    # -------------------------------------------------------------
    # 4. Shoulders & Articulated Arms
    # -------------------------------------------------------------
    for side, x_mult in [("L", -1), ("R", 1)]:
        # Shoulder Armor Spheres
        bpy.ops.mesh.primitive_uv_sphere_add(radius=0.42, location=(x_mult * 1.5, 0, 2.05), segments=24, ring_count=16)
        shoulder = bpy.context.active_object
        shoulder.name = f"Robot_Shoulder_{side}"
        shoulder.scale = (1.1, 0.9, 0.9)
        shoulder.data.materials.append(mat_white_armor)
        bpy.ops.object.shade_smooth()

        # Upper Arm
        bpy.ops.mesh.primitive_cylinder_add(radius=0.18, depth=0.7, location=(x_mult * 1.55, 0, 1.45))
        upper_arm = bpy.context.active_object
        upper_arm.name = f"Robot_UpperArm_{side}"
        upper_arm.data.materials.append(mat_dark_armor)
        bpy.ops.object.shade_smooth()

        # Elbow Joint
        bpy.ops.mesh.primitive_uv_sphere_add(radius=0.2, location=(x_mult * 1.55, 0, 1.05))
        elbow = bpy.context.active_object
        elbow.name = f"Robot_Elbow_{side}"
        elbow.data.materials.append(mat_metal_joint)

        # Forearm angled slightly forward
        bpy.ops.mesh.primitive_cylinder_add(
            radius=0.16, 
            depth=0.7, 
            location=(x_mult * 1.55, 0.25, 0.65), 
            rotation=(math.radians(25), 0, 0)
        )
        forearm = bpy.context.active_object
        forearm.name = f"Robot_Forearm_{side}"
        forearm.data.materials.append(mat_white_armor)
        bpy.ops.object.shade_smooth()

        # Floating Hover Hands / Magnetic Claws
        bpy.ops.mesh.primitive_uv_sphere_add(radius=0.18, location=(x_mult * 1.55, 0.45, 0.25))
        hand = bpy.context.active_object
        hand.name = f"Robot_Hand_{side}"
        hand.data.materials.append(mat_metal_joint)

        # Floating Palm Glow
        bpy.ops.mesh.primitive_cylinder_add(radius=0.08, depth=0.05, location=(x_mult * 1.55, 0.52, 0.25), rotation=(math.radians(90), 0, 0))
        palm_glow = bpy.context.active_object
        palm_glow.name = f"Robot_PalmGlow_{side}"
        palm_glow.data.materials.append(mat_neon_purple)

    # -------------------------------------------------------------
    # 5. Anti-Gravity Thruster Base
    # -------------------------------------------------------------
    # Waist Pelvis Plate
    bpy.ops.mesh.primitive_cylinder_add(radius=0.45, depth=0.35, location=(0, 0, 1.0))
    waist = bpy.context.active_object
    waist.name = "Robot_Waist"
    waist.scale = (1.1, 0.8, 1.0)
    waist.data.materials.append(mat_dark_armor)
    bpy.ops.object.shade_smooth()

    # Floating Ion Thruster Cone
    bpy.ops.mesh.primitive_cone_add(radius1=0.4, radius2=0.15, depth=0.5, location=(0, 0, 0.65))
    thruster = bpy.context.active_object
    thruster.name = "Robot_Thruster"
    thruster.data.materials.append(mat_metal_joint)
    bpy.ops.object.shade_smooth()

    # Anti-Gravity Glowing Rings
    for idx, (z_pos, rad, mat) in enumerate([(0.42, 0.48, mat_neon_purple), (0.28, 0.35, mat_neon_cyan)]):
        bpy.ops.mesh.primitive_torus_add(major_radius=rad, minor_radius=0.04, location=(0, 0, z_pos))
        ring = bpy.context.active_object
        ring.name = f"Robot_IonRing_{idx+1}"
        ring.data.materials.append(mat)

    # -------------------------------------------------------------
    # 6. Lighting & Studio Setup
    # -------------------------------------------------------------
    # Key Light (Purple Neon)
    bpy.ops.object.light_add(type='AREA', radius=2.0, location=(-3.0, -3.5, 4.0))
    key_light = bpy.context.active_object
    key_light.name = "Light_Key_Purple"
    key_light.data.energy = 450
    key_light.data.color = (0.66, 0.33, 0.97)

    # Fill / Rim Light (Cyan Blue)
    bpy.ops.object.light_add(type='AREA', radius=2.5, location=(3.5, -2.5, 3.5))
    fill_light = bpy.context.active_object
    fill_light.name = "Light_Fill_Cyan"
    fill_light.data.energy = 350
    fill_light.data.color = (0.2, 0.6, 1.0)

    # Top Rim Light (Pure Crisp White)
    bpy.ops.object.light_add(type='SPOT', location=(0, 2.5, 5.0))
    rim_light = bpy.context.active_object
    rim_light.name = "Light_Rim_White"
    rim_light.data.energy = 500
    rim_light.data.spot_size = math.radians(65)

    # Camera Setup (Framed on the Robot)
    bpy.ops.object.camera_add(location=(0, -6.5, 2.2), rotation=(math.radians(82), 0, 0))
    cam = bpy.context.active_object
    cam.name = "Main_Camera"
    cam.data.lens = 65
    bpy.context.scene.camera = cam

    # World background: Deep OLED dark
    bpy.context.scene.world.use_nodes = True
    bg_node = bpy.context.scene.world.node_tree.nodes.get("Background")
    if bg_node:
        bg_node.inputs['Color'].default_value = (0.02, 0.02, 0.03, 1.0)
        bg_node.inputs['Strength'].default_value = 0.5

    # Save .blend file
    blend_path = "d:/Personal-portfolio/blender/cyber_robot.blend"
    bpy.ops.wm.save_as_mainfile(filepath=blend_path)
    print(f"Saved .blend file to: {blend_path}")

    # Export to .glb for web / Three.js
    glb_path = "d:/Personal-portfolio/public/cyber_robot.glb"
    try:
        bpy.ops.export_scene.gltf(filepath=glb_path, export_format='GLB')
        print(f"Exported .glb file to: {glb_path}")
    except Exception as e:
        print(f"GLTF export notice: {e}")

    print("Cyber Robot model generated successfully in Blender!")

if __name__ == "__main__":
    build_robot()

