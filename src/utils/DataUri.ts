import { Buffer } from 'buffer';

export function dataUriToFile(dataUri: string) {
  if(!dataUri.match(/data:.+;base64,.+/)) {
    throw new Error('Error: Parameter "dataUri" is not a Data URI. Data URI format should be "data:<mime>;base64,<b64>".');
  }
  
  const array = dataUri.split(',');
  const type = array[0].match(/:(.+?);/)?.[1];
  const buffer = Buffer.from(array[1], 'base64');
  const arrayBuffer = buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength);

  return new File([arrayBuffer], Date.now().toString(), {type: type});
}

export function dataUriToBuffer(dataUri: string) {
  if(!dataUri.match(/data:.+;base64,.+/)) {
    throw new Error('Error: Parameter "dataUri" is not a Data URI. Data URI format should be "data:<mime>;base64,<b64>".');
  }
  
  const array = dataUri.split(',');
  const buffer = Buffer.from(array[1], 'base64');
    
  return buffer;
}
