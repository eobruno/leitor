/* import * as FaceDetector from "expo-face-detector";
import { CanvasOptions } from "../types/types";

export const DetectarRosto = async (imageUri) => {
  try {
    const face = await FaceDetector.detectFacesAsync(imageUri, {
      mode: FaceDetector.FaceDetectorMode.fast,
    });

    if (face.faces.length > 0) {
      //console.log(JSON.stringify(face));
      const cropData: CanvasOptions = {
        width: face.faces[0].bounds.size.width,
        height: face.faces[0].bounds.size.height,
        x: face.faces[0].bounds.origin.x,
        y: face.faces[0].bounds.origin.y,
      };
      //console.log(JSON.stringify(cropData));
      //Código de alterar imagem aqui!
      return JSON.stringify(cropData);

    } else {
      console.log("Nenhum rosto detectado");
      return null;
    }
  } catch (error) {
    console.error("Erro na detecção de rosto:", error);
    return null;
  }
}; */
