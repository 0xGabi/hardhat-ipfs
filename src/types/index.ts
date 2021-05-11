export interface PinningService {
  name: string;
  endpoint: string;
  key: string;
}

export interface IpfsConfig {
  url: string;
  pinning?: PinningService[];
}
