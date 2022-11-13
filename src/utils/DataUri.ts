import { Buffer } from 'buffer';

export function dataUriToBuffer(dataUri: string) {
  if (!dataUri.match(/data:.+;base64,.+/)) {
    throw new Error(
      'Parameter "dataUri" is not a Data URI. Data URI format should be "data:<mime>;base64,<b64>".',
    );
  }

  const array = dataUri.split(',');
  const buffer = Buffer.from(array[1], 'base64');

  return buffer;
}

export function dataUriSize(dataUri: string) {
  if (!dataUri.match(/data:.+;base64,.+/)) {
    throw new Error(
      'Parameter "dataUri" is not a Data URI. Data URI format should be "data:<mime>;base64,<b64>".',
    );
  }

  const array = dataUri.split(',');

  return (array[1].length * 6) / 8;
}

export function dataUriType(dataUri: string) {
  if (!dataUri.match(/data:.+;base64,.+/)) {
    throw new Error(
      'Parameter "dataUri" is not a Data URI. Data URI format should be "data:<mime>;base64,<b64>".',
    );
  }

  const array = dataUri.split(',');

  return array[0].match(/:(.+?);/)?.[1];
}
