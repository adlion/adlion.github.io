import { AmbientLight, DirectionalLight } from 'three';
/**
 * @param color Color of main directional light
 * @param intensity  Intensity of main light.
 * @returns { ambientLight, mainLight }
 */
function lightDirectional({
  color = 'white',
  intensity = 8,
  position = { x: 1, y: 1, z: 1 },
}) {
  const mainLight = new DirectionalLight(color, intensity);
  mainLight.position.set(position.x, position.y, position.z);
  return { mainLight };
}

/**
 * @param color color of main directional light
 * @param intensity  Intensity of main light.
 * @returns { ambientLight, mainLight }
 */
function lightAmbient({ color = 'white', intensity = 5 }) {
  const ambientLight = new AmbientLight(color, intensity);

  return { ambientLight };
}

export { lightDirectional, lightAmbient };
