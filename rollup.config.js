// rollup.config.js

import { rollup } from "rollup";

import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import babel from "@rollup/plugin-babel";
import {
  chromeExtension,
  simpleReloader
} from "rollup-plugin-chrome-extension";
import replace from "rollup-plugin-replace";
import postcss from "rollup-plugin-postcss";
import scss from "rollup-plugin-scss";
// const isProduction = process.env.NODE_ENV === "production";

export default commandLineArgs => {
  const isFirefox = commandLineArgs.firefox;
  // let manifestPath = 'src/manifest.json';

  // // This is the important part
  // if (isFirefox === true) {
  //   manifestPath = 'src/manifest.firefox.json' ;
  // }
  return {
  input: isFirefox ? 'src/manifest.firefox.json' : 'src/manifest.json' ,
  output: {
    dir: "dist",
    format: "esm"
  },
  plugins: [
    // always put chromeExtension() before other plugins
    chromeExtension(),
    simpleReloader(),
    // the plugins below are optional
    replace({
      "process.env.NODE_ENV": JSON.stringify("production")
    }),
    babel({
      babelHelpers: "runtime",
      presets: [["@babel/env", { modules: false }], ["@babel/preset-react"]],
      exclude: "node_modules/**",
      plugins: [
        [
          "@babel/plugin-transform-runtime",
          {
            regenerator: true
          }
        ]
      ]
    }),

    resolve(),
    commonjs({
      include: "node_modules/**"
    })
  ]
};

}
