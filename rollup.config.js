// rollup.config.js
import image from "@rollup/plugin-image";
import svgr from "@svgr/rollup";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import typescript from "rollup-plugin-typescript2";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  input: "src/index.tsx",
  output: {
    dir: "build",
    format: "cjs",
  },
  plugins: [
    peerDepsExternal(),
    image(),
    svgr({
      dimensions: true,
      svgo: false,
    }),
    typescript(),
  ],
  external: ["react", "react-dom", "styled-components", "formik"],
};
