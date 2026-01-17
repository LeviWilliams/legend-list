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
        "process.env.MODE": JSON.stringify(mode),
        "process.env.NODE_ENV": JSON.stringify(mode),
    };
};

export default defineConfig([
    {
        clean: true,
        define: defineEnv(false),
        dts: {
            entry: webEntries,
        },
        entry: entriesWithSuffix("production"),
        external,
        format: ["cjs", "esm"],
        minify: true,
        name: "web-production",
        splitting: false,
        treeshake: true,
    },
    {
        clean: false,
        define: defineEnv(true),
        dts: false,
        entry: entriesWithSuffix("development"),
        external,
        format: ["cjs", "esm"],
        name: "web-development",
        splitting: false,
        treeshake: true,
    },
    {
        clean: false,
        dts: false,
        entry: webEntries,
        external,
        format: ["cjs", "esm"],
        name: "shared-native",
        splitting: false,
        treeshake: true,
    },
    {
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
        name: "native",
        splitting: false,
        treeshake: true,
    },
]);
