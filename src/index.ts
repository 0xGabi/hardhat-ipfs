import { extendConfig, extendEnvironment, task } from "hardhat/config";
import { lazyObject, HardhatPluginError } from "hardhat/plugins";
import { HardhatConfig, HardhatUserConfig } from "hardhat/types";

// This import is needed to let the TypeScript compiler know that it should include your type
// extensions in your npm package's types file.
import "./type-extensions";

import { DEFAULT_IPFS_ENDPOINT } from "./constants";
import { PinningService } from "./types";

export const TASK_IPFS_UPLOAD = "upload";
export const TASK_IPFS_PIN = "pin";

extendConfig(
  (config: HardhatConfig, userConfig: Readonly<HardhatUserConfig>) => {
    config.ipfs = userConfig.ipfs || {
      url: DEFAULT_IPFS_ENDPOINT,
    };
  }
);

extendEnvironment((hre) => {
  hre.ipfs = lazyObject(() => {
    const ipfsHttpClient = require("ipfs-http-client");

    let url;
    try {
      url = new URL(hre.config.ipfs.url);
    } catch (e) {
      throw new HardhatPluginError(`Invalid IPFS URL: ${hre.config.ipfs.url}
The IPFS URL must be of the following format: http(s)://host[:port]/[path]`);
    }

    return ipfsHttpClient({
      protocol: url.protocol.replace(/[:]+$/, ""),
      host: url.hostname,
      port: url.port,
      "api-path": url.pathname.replace(/\/$/, "") + "/api/v0/",
    });
  });
});

async function addPinningServices(ipfs: any, pinning: PinningService[]): void {
  const exitingServices = await ipfs.pin.remote.service.ls();

  Promise.all(async () => {
    pinning.forEach(service => exitingServices.)
  });
}

task(TASK_IPFS_UPLOAD, "Upload file to IPFS")
  .addFlag("file", "File to upload")
  .addFlag("pin", "")
  .setAction(async (args, hre) => {
    try {
      let hash = (await hre.ipfs.add([file]))[0].hash;
      if (pin) {
        addPinningServices();
        await hre.ipfs.pin.add(hash);
      }
      return hash;
    } catch (e) {
      throw new HardhatPluginError(
        `Failed to upload file to IPFS: ${e.message}`
      );
    }
  });

task(TASK_IPFS_PIN, "Pin hash to IPFS")
  .addFlag("file", "File to upload")
  .addFlag("pin", "")
  .setAction(async (args, hre) => {
    try {
      let hash = (await hre.ipfs.add([file]))[0].hash;
      await hre.ipfs.pin.add(hash)
      return hash;
    } catch (e) {
      throw new HardhatPluginError(
        `Failed to upload file to IPFS: ${e.message}`
      );
    }
    if (pin) {
        addPinningServices();
        await hre.ipfs.pin.add(hash);
      }
            return hash;
  });
