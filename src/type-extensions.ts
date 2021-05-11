import "hardhat/types/config";
import "hardhat/types/runtime";

import { IpfsConfig } from "./types";

declare module "hardhat/types/config" {
  export interface HardhatUserConfig {
    ipfs?: IpfsConfig;
  }

  export interface HardhatConfig {
    ipfs: IpfsConfig;
  }
}

declare module "hardhat/types/runtime" {
  export interface HardhatRuntimeEnvironment {
    ipfs: any;
  }
}
