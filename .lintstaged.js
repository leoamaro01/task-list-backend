import { relative } from "path";

const buildEslintCommand = (filenames) =>
  `eslint --fix ${filenames.map((f) => relative(process.cwd(), f)).join(" ")}`;

const prettierCommand = "prettier --write";

export default {
  "*.{js,ts}": [prettierCommand, buildEslintCommand],
  "*.{json,md}": [prettierCommand],
};
