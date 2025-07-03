import {Progress} from "./types";
import {spinnerProgress} from "./spinner-progress";

const handler: ProxyHandler<Record<string, Progress>> = {
  get(obj, name: string) {
    if (!obj[name]) {
      obj[name] = spinnerProgress(name);
    }

    return obj[name];
  }
};

export const consoleProgress = new Proxy<Record<string, Progress>>({}, handler);
