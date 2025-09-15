/** @type {import('eslint').Linter.Config} */
module.exports = {
    plugins: ["import"],
    rules: {
        "import/no-internal-modules": ["error", {
            allow: [
                "**/index",
            ],
        }],
    },
    settings: {
        "import/resolver": {
            typescript: { project: "./tsconfig.json" },
        },
    },
};
