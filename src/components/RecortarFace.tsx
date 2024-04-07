
import { manipulateAsync, SaveFormat } from "expo-image-manipulator";

const redimensionarImagem = async (uri, newWidth, newHeight, x, y) => {
    //console.log("Processando recorte da imagem...");
    //console.log(uri);
    try {
      const cropData = {
        originX: x,
        originY: y,
        width: newWidth,
        height: newHeight,
      };
      //console.log("cropData:");
      //console.log(JSON.stringify(cropData));

      // Realiza o recorte
      const croppedImage = await manipulateAsync(
        uri,
        [{ crop: cropData }],
        { format: SaveFormat.JPEG, compress: 1 }
      );
      //console.log("Imagem recortada:");
      //console.log(JSON.stringify(croppedImage));

      // Retorna o caminho ou base64 da imagem recortada
      return croppedImage.uri;
    } catch (error) {
      console.error("Erro ao recortar a imagem:", error);
      throw error;
    }
  };

export const RecortarFace = async (uri, objetoJson) => {
    //console.log("Recortando a foto...");
    //console.log(JSON.stringify(objetoJson));

    try {
      const imageUrl = uri;
      const width = objetoJson.width;
      const height = objetoJson.height;
      const x = objetoJson.x;
      const y = objetoJson.y;

      //Coloca a foto em 3:4 pegando mais área da foto
      const novaLargura = width * (1 + 25/100);
      const novaAltura = (novaLargura * 4) / 3;
      const novoX = x * (1 - 20/100);
      const novoY = y * (1 - 5/100);

      const dataURL = await redimensionarImagem(imageUrl, novaLargura, novaAltura, novoX, novoY);

      //console.log("URL da foto recortada:");
      //console.log(dataURL);

      return dataURL;
      
    } catch (error) {

      console.error(error.message);

    }
  }