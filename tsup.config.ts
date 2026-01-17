import { defineConfig } from "tsup";

const external = [
    "react",
    "react-dom",
    "react-native",
    "react-native-keyboard-controller",
    "react-native-reanimated",
    "@legendapp/list",
    "@legendapp/list/animated",
    "@legendapp/list/reanimated",
];

const webEntries = {
    animated: "src/integrations/animated.tsx",
    index: "src/index.ts",
    keyboard: "src/integrations/keyboard.tsx",
    "keyboard-controller": "src/integrations/keyboard-controller.tsx",
    reanimated: "src/integrations/reanimated.tsx",
    "section-list": "src/section-list/index.ts",
};

const entriesWithSuffix = (suffix: "development" | "production") =>
    Object.fromEntries(Object.entries(webEntries).map(([key, value]) => [`${key}.${suffix}`, value]));

const defineEnv = (isDev: boolean) => {
    const mode = isDev ? "development" : "production";
    return {
        __DEV__: JSON.stringify(isDev),
        "process.env.NODE_ENV": JSON.stringify(mode),
        "process.env.MODE": JSON.stringify(mode),
    };
};

export default defineConfig([
    {
        name: "web-production",
        clean: true,
        define: defineEnv(false),
        dts: {
            entry: webEntries,
        },
        entry: entriesWithSuffix("production"),
        external,
        format: ["cjs", "esm"],
        minify: true,
        splitting: false,
        treeshake: true,
    },
    {
        name: "web-development",
        clean: false,
        define: defineEnv(true),
        dts: false,
        entry: entriesWithSuffix("development"),
        external,
        format: ["cjs", "esm"],
        splitting: false,
        treeshake: true,
    },
    {
        name: "shared-native",
        clean: false,
        dts: false,
        entry: webEntries,
        external,
        format: ["cjs", "esm"],
        splitting: false,
        treeshake: true,
    },
    {
        name: "native",
        clean: false,
        dts: true,
        entry: {
            "index.native": "src/index.ts",
        },
        esbuildOptions(options) {
            options.resolveExtensions = [".native.tsx", ".native.ts", ".tsx", ".ts", ".json"];
        },
        external,
        format: ["cjs", "esm"],
        splitting: false,
        treeshake: true,
    },
]);
