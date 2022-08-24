export interface ICResourceCube {
  name: string;
  type: 'cubeTexture';
  path: Array<string> ;
}
export interface ICResourceGltf {
  name: string;
  type: 'gltfLoader';
  path: string;
}
export interface ICResourceTexture {
  name: string;
  type: 'textureLaoder';
  path: string;
}

export type ICResources =  Array<ICResourceCube | ICResourceGltf | ICResourceTexture>
