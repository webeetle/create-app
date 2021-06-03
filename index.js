#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const argv = require("minimist")(process.argv.slice(2));
// eslint-disable-next-line node/no-restricted-require
const prompts = require("prompts");
const {
  yellow,
  green,
  cyan,
  blue,
  magenta,
  lightRed,
  red,
  white,
} = require("kolorist");

const cwd = process.cwd();

const FRAMEWORKS = [
  {
    name: "react",
    color: cyan,
    variants: [
      {
        name: "react-vite-tailwind",
        display: "React SPA with Vite & Tailwind",
        color: cyan,
      },
      {
        name: "react-admin-vite-tailwind",
        display: "React Admin Panel with MobX, Vite & Tailwind",
        color: cyan,
      },
    ],
  },
  {
    name: "fastify",
    color: magenta,
    variants: [
      {
        name: "fastify-mysql-rest",
        display: "REST service in Fastify + MySQL",
        color: magenta,
      },
    ],
  },
];

const TEMPLATES = FRAMEWORKS.map(
  (f) => (f.variants && f.variants.map((v) => v.name)) || [f.name]
).reduce((a, b) => a.concat(b), []);

const renameFiles = {
  _gitignore: ".gitignore",
};

async function init() {
  let targetDir = argv._[0];
  let template = argv.template || argv.t;

  const defaultProjectName = !targetDir ? "webeetle-project" : targetDir;

  let result = {};

  try {
    result = await prompts(
      [
        {
          type: targetDir ? null : "text",
          name: "projectName",
          message: "Project name:",
          initial: defaultProjectName,
          onState: (state) =>
            (targetDir = state.value.trim() || defaultProjectName),
        },
        {
          type: () =>
            !fs.existsSync(targetDir) || isEmpty(targetDir) ? null : "confirm",
          name: "overwrite",
          message: () =>
            (targetDir === "."
              ? "Current directory"
              : `Target directory "${targetDir}"`) +
            ` is not empty. Remove existing files and continue?`,
        },
        {
          type: (_, { overwrite } = {}) => {
            if (overwrite == false) {
              throw new Error(red("✖") + " Operation cancelled");
            }
            return null;
          },
          name: "overwriteChecker",
        },
        {
          type: template && TEMPLATES.includes(template) ? null : "select",
          name: "framework",
          message:
            template && !TEMPLATES.includes(template)
              ? `"${template}" isn't a valid template. Please choose from below: `
              : "Select a framework:",
          initial: 0,
          choices: FRAMEWORKS.map((framework) => {
            const frameworkColor = framework.color;
            return {
              title: frameworkColor(framework.name),
              value: framework,
            };
          }),
        },
        {
          type: (framework) =>
            framework && framework.variants ? "select" : null,
          name: "variant",
          message: "Select a variant:",
          // @ts-ignore
          choices: (framework) =>
            framework.variants.map((variant) => {
              const variantColor = variant.color;
              return {
                title: `${variantColor(variant.name)} - ${white(
                  variant.display
                )}`,
                value: variant.name,
              };
            }),
        },
      ],
      {
        onCancel: () => {
          throw new Error(red("✖") + " Operation cancelled");
        },
      }
    );
  } catch (cancelled) {
    console.log(cancelled.message);
    return;
  }

  // user choice associated with prompts
  const { framework, overwrite, variant } = result;

  const root = path.join(cwd, targetDir);

  if (overwrite) {
    emptyDir(root);
  } else if (!fs.existsSync(root)) {
    fs.mkdirSync(root);
  }

  // determine template
  template = variant || framework || template;

  console.log(`\nScaffolding project in ${root}...`);

  const templateDir = path.join(__dirname, `template-${template}`);

  const write = (file, content) => {
    const targetPath = renameFiles[file]
      ? path.join(root, renameFiles[file])
      : path.join(root, file);
    if (content) {
      fs.writeFileSync(targetPath, content);
    } else {
      copy(path.join(templateDir, file), targetPath);
    }
  };

  const files = fs.readdirSync(templateDir);
  for (const file of files.filter((f) => f !== "package.json")) {
    write(file);
  }

  const pkg = fs.existsSync(path.join(templateDir, `package.json`))
    ? require(path.join(templateDir, `package.json`))
    : false;
  if (pkg) {
    pkg.name = isValidPackageName(targetDir)
      ? targetDir
      : toValidPackageName(targetDir);
    write("package.json", JSON.stringify(pkg, null, 2));
  }

  // const pkgManager = /yarn/.test(process.env.npm_execpath) ? "yarn" : "npm";

  console.log(`\nDone! Now run:\n`);
  if (root !== cwd) {
    console.log(`  cd ${path.relative(cwd, root)}`);
  }
  console.log();
  console.log("and read the README.md file!");
  console.log();
}

function copy(src, dest) {
  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    copyDir(src, dest);
  } else {
    fs.copyFileSync(src, dest);
  }
}

function isValidPackageName(projectName) {
  return /^(?:@[a-z0-9-*~][a-z0-9-*._~]*\/)?[a-z0-9-~][a-z0-9-._~]*$/.test(
    projectName
  );
}

function toValidPackageName(projectName) {
  return projectName
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/^[._]/, "")
    .replace(/[^a-z0-9-~]+/g, "-");
}

function copyDir(srcDir, destDir) {
  fs.mkdirSync(destDir, { recursive: true });
  for (const file of fs.readdirSync(srcDir)) {
    const srcFile = path.resolve(srcDir, file);
    const destFile = path.resolve(destDir, file);
    copy(srcFile, destFile);
  }
}

function isEmpty(path) {
  return fs.readdirSync(path).length === 0;
}

function emptyDir(dir) {
  if (!fs.existsSync(dir)) {
    return;
  }
  for (const file of fs.readdirSync(dir)) {
    const abs = path.resolve(dir, file);
    // baseline is Node 12 so can't use rmSync :(
    if (fs.lstatSync(abs).isDirectory()) {
      emptyDir(abs);
      fs.rmdirSync(abs);
    } else {
      fs.unlinkSync(abs);
    }
  }
}

init().catch((e) => {
  console.error(e);
});
