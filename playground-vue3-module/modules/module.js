import { resolve } from "path";
import { fileURLToPath } from "url";

import {
  defineNuxtModule,
  addPlugin,
  // addComponentsDir,
  addAutoImport
} from "@nuxt/kit";

export default defineNuxtModule({
  meta: {
    name: "@storyblok/nuxt-beta",
    configKey: "storyblok"
  },
  defaults: {},
  setup(options, nuxt) {
    // Enable dirs
    nuxt.options.components.global = true;
    nuxt.options.components.dirs = ["~/components/storyblok"];
    // addComponentsDir("~/components/storyblok");
    nuxt.hook("components:dirs", (dirs) => {
      //   dirs.push({
      //     path: "/Users/alexjm/WebDev/@storyblok/storyblok-nuxt-beta/playground-vue3-module/components/storyblok"
      //   });
      console.log(dirs);
    });
    console.log(nuxt.options.components);

    const runtimeDir = fileURLToPath(new URL("./runtime", import.meta.url));
    nuxt.options.build.transpile.push(runtimeDir);

    // Add plugin
    nuxt.options.publicRuntimeConfig.storyblok = options;
    addPlugin(resolve(__dirname, "runtime", `./plugin`));

    // Autoimports
    const names = ["useStoryblok", "useStoyblokApi", "useStoryblokBridge"];
    names.forEach((name) =>
      addAutoImport({ name, as: name, from: "@storyblok/vue" })
    );
  }
});
