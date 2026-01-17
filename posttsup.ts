import pkg from "./package.json";

async function copy(...files: string[]) {
    return files.map((file) => Bun.write("dist/" + file.replace("src/", ""), Bun.file(file), { createPath: true }));
}

copy("LICENSE", "CHANGELOG.md", "README.md");

const pkgOut = pkg as Record<string, any>;

pkg.private = false;
delete pkgOut.devDependencies;
delete pkgOut.overrides;
delete pkgOut.scripts;
delete pkgOut.engines;
delete pkgOut.commitlint;

const webEntries = ["index", "animated", "keyboard", "keyboard-controller", "reanimated", "section-list"];

const webExport = (name: string) => ({
    development: {
        import: `./${name}.development.mjs`,
        require: `./${name}.development.js`,
        types: `./${name}.d.ts`,
    },
    production: {
        import: `./${name}.production.mjs`,
        require: `./${name}.production.js`,
        types: `./${name}.d.ts`,
    },
    default: {
        import: `./${name}.production.mjs`,
        require: `./${name}.production.js`,
        types: `./${name}.d.ts`,
    },
});

const reactNativeExport = (name: string, typesPath: string) => ({
    "react-native": {
        import: `./${name}.mjs`,
        require: `./${name}.js`,
        types: typesPath,
    },
});

pkgOut.main = "./index.production.js";
pkgOut.module = "./index.production.mjs";
pkgOut.types = "./index.d.ts";
pkgOut["react-native"] = "./index.js";
pkgOut.exports = {
    ".": {
        "react-native": {
            import: "./index.mjs",
            require: "./index.js",
            types: "./index.d.ts",
        },
        ...webExport("index"),
    },
    ...Object.fromEntries(
        webEntries
            .filter((entry) => entry !== "index")
            .map((entry) => [
                `./${entry}`,
                {
                    ...reactNativeExport(entry, `./${entry}.d.ts`),
                    ...webExport(entry),
                },
            ]),
    ),
};

Bun.write("dist/package.json", JSON.stringify(pkg, undefined, 2));
