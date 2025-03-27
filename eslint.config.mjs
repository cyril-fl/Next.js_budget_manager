import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import prettier from "eslint-plugin-prettier"; // Assurez-vous que ce module est bien installé

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    plugins: {
      prettier, // Utilisation de l'objet plutôt que de la chaîne de caractères
    },
    rules: {
      "prettier/prettier": [
        "error",
        {
          endOfLine: "auto",
        },
      ],
      "import/order": [
        "warn",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
            "index",
          ],
          alphabetize: { order: "asc", caseInsensitive: true },
          "newlines-between": "never",
          distinctGroup: true,
          warnOnUnassignedImports: false,
        },
      ],
    },
  },
  {
    files: ["**/*.ts", "**/*.tsx", "**/*.js"],
    rules: {
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/unified-signatures": "off",

      "no-console": process.env.NEXT_ENV === "production" ? "warn" : "off",
      "no-debugger": process.env.NEXT_ENV === "production" ? "warn" : "off",
      'no-restricted-globals': 'off',
    },
  },
];

export default eslintConfig;