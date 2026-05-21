import { reactConfig } from '@repo/eslint-config'
import eslintrcAutoImport from './.eslintrc-auto-import.json'

export default reactConfig([
    {
        files: ['**/*.{js,jsx,ts,tsx}'],
        languageOptions: {
            globals: {
                ...eslintrcAutoImport.globals,
            },
        },
    },
])
