export default class {
  public static readonly FILE_MAX_SIZE = 100_000_000;
  public static readonly B_TO_MB = 1_000_000;
  public static readonly IMAGE_MIME_TYPE =
    'image/png|image/gif|image/jpeg|image/svg+xml|image/webp';

  public static readonly BLOCKCHAIN_DATA = new Array<string>('ETH', 'Polygon');
  public static readonly PROTOCOL_DATA = new Array<string>('IPFS', 'Arweave');

  public static readonly NAME_MIN_LEN = 3;
  public static readonly NAME_MAX_LEN = 25;

  public static readonly SYMBOL_MIN_LEN = 1;
  public static readonly SYMBOL_MAX_LEN = 3;

  public static readonly AMOUNT_MIN = 1;
  public static readonly AMOUNT_MAX = 10_000;

  public static readonly ADDRESS_LENGTH = 42;

  public static readonly DESCRIPTION_MIN_LEN = 20;
  public static readonly DESCRIPTION_MAX_LEN = 2000;
}
