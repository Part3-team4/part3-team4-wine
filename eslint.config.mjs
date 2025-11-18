import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import importPlugin from "eslint-plugin-import";
import prettier from "eslint-plugin-prettier";

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    plugins: {
      prettier,
      import: importPlugin,
    },
    extends: ["plugin:prettier/recommended"], // Prettier 규칙 우선
    rules: {
      "prettier/prettier": "error", // Prettier 위반 시 ESLint 오류
      "import/order": [
        "error",
        {
          groups: ["builtin", "external", "internal", ["parent", "sibling", "index"]],
          "newlines-between": "always",
          alphabetize: {
            order: "asc",
            caseInsensitive: true,
          },
        },
      ],
    },
  },
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
]);
