import {Progress} from "./types";

export const SimpleProgress: Progress = {

  error(message) {
    console.log(message);
  },
  success(message) {
    console.log(message);
  },
  progress(message) {
    console.log(message);
  }
}
