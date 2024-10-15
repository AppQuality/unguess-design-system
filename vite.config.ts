import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import dts from "vite-plugin-dts";
import { libInjectCss } from "vite-plugin-lib-inject-css";

import {
  Plugin,
  createFilter,
  defineConfig,
  loadEnv,
  transformWithEsbuild,
} from "vite";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  setEnv(mode);
  return {
    build: {
      ...(mode === "development" ? { emptyOutDir: false } : {}),
      outDir: "build",
      lib: {
        entry: resolve(__dirname, "src/index.tsx"),
        formats: ["es"],
      },
      rollupOptions: {
        external: [
          "react",
          "react-dom",
          "styled-components",
          "react/jsx-runtime",
          // "@zendeskgarden/react-dropdowns",
          "formik",
        ],
        output: {
          assetFileNames: "assets/[name][extname]",
          entryFileNames: "[name].js",
        },
      },
    },
    plugins: [
      svgrPlugin(),
      libInjectCss(),
      dts({
        include: ["src"],
        ...(mode === "development" ? {} : { rollupTypes: true }),
      }),
    ],
  };
});

function setEnv(mode: string) {
  Object.assign(
    process.env,
    loadEnv(mode, ".", ["REACT_APP_", "NODE_ENV", "PUBLIC_URL"])
  );
  process.env.NODE_ENV ||= mode;
  const { homepage } = JSON.parse(readFileSync("package.json", "utf-8"));
  process.env.PUBLIC_URL ||= homepage
    ? `${
        homepage.startsWith("http") || homepage.startsWith("/")
          ? homepage
          : `/${homepage}`
      }`.replace(/\/$/, "")
    : "";
}

// In Create React App, SVGs can be imported directly as React components. This is achieved by svgr libraries.
// https://create-react-app.dev/docs/adding-images-fonts-and-files/#adding-svgs
function svgrPlugin(): Plugin {
  const filter = createFilter("**/*.svg");
  const postfixRE = /[?#].*$/s;

  return {
    name: "svgr-plugin",
    async transform(code, id) {
      if (filter(id)) {
        const { transform } = await import("@svgr/core");
        const { default: jsx } = await import("@svgr/plugin-jsx");

        const filePath = id.replace(postfixRE, "");
        const svgCode = readFileSync(filePath, "utf8");

        const componentCode = await transform(svgCode, undefined, {
          filePath,
          caller: {
            previousExport: code,
            defaultPlugins: [jsx],
          },
        });

        const res = await transformWithEsbuild(componentCode, id, {
          loader: "jsx",
        });

        return {
          code: res.code,
          map: null,
        };
      }
    },
  };
}
