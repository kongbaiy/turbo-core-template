import { reactConfig } from '@repo/eslint-config'
import eslintrcAutoImport from './.eslintrc-auto-import.json'

export default reactConfig([
    {
        files: ['**/*.{js,jsx,ts,tsx}'],
        languageOptions: {
            globals: {
                ...eslintrcAutoImport.globals,
                // 如果有需要额外声明的全局变量，也可以加在这里
                // React: 'readonly',
            },
        },
        rules: {
            // 确保 JSX 中未定义的组件会报错（但 globals 已声明，不会误报）
            'react/jsx-no-undef': 'error',
        },
    },
])
