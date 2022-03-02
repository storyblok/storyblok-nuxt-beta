import { resolve } from "path";
import { defineNuxtModule, addPlugin } from "@nuxt/kit";

const noopTransform = () => {
  return {
    props: [],
    needRuntime: true
  };
};

export default defineNuxtModule({
  meta: {
    name: "@storyblok/nuxt",
    configKey: "storyblok"
  },
  defaults: {},
  setup(options, nuxt) {
    const isDev = process.env.NODE_ENV !== "production";
    // Add components/storyblok
    nuxt.options.components.global = true;
    if (Array.isArray(nuxt.options.components.dirs))
      nuxt.options.components.dirs.push("~/components/storyblok");
    else
      nuxt.options.components.dirs = ["~/components", "~/components/storyblok"];

    // Transpile runtime files
    const runtimeDir = resolve(__dirname, "./runtime");
    nuxt.options.build.transpile.push(runtimeDir);
    // nuxt.options.build.transpile.push("storyblok-js-client");

    // Add plugin
    const isBridgeDefined = typeof options.bridge === "undefined";
    options.bridge = isBridgeDefined ? isDev : options.bridge;
    nuxt.options.publicRuntimeConfig.storyblok = options;
    const pluginName =
      options.useApiClient !== false ? "plugin" : "plugin-no-client";
    addPlugin(resolve(__dirname, `./runtime/${pluginName}`));

    // Autoimports
    nuxt.hook("autoImports:dirs", (dirs) => {
      dirs.push(resolve(__dirname, "./runtime/composables"));
    });

    nuxt.hook("build:before", (_, config) => {
      // Add SSR directive
      const opts = config.loaders.vue.compilerOptions;
      const transforms = opts.directiveTransforms || {};
      opts.directiveTransforms = { ...transforms, editable: noopTransform };
    });
  }
});
