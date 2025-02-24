import { relative } from "path";

const buildEslintCommand = (filenames) =>
  `eslint --fix --file ${filenames
    .map((f) => relative(process.cwd(), f))
    .join(" --file ")}`;

const prettierCommand = "prettier --write";

export default {
  "*.{js,ts}": [prettierCommand, buildEslintCommand],
  "*.{json,md}": [prettierCommand],
};
