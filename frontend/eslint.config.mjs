import js from "@eslint/js";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import globals from "globals";

export default [
  // Применяем стандартные рекомендуемые правила ESLint
  js.configs.recommended,
  
  {
    // Указываем файлы, которые нужно проверять
    files: ["**/*.{js,jsx,ts,tsx}"],
    
    // Настраиваем плагины
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    
    // Переносим правила из плагинов
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      // Сюда можно добавить правило для автоматической очистки лишнего кода:
      "no-unused-vars": "warn", // Подсветит неиспользуемый код как предупреждение
      "no-console": "off"       // Разрешает или запрещает console.log (поменяйте на 'warn' при желании)
    },
    
    // Настраиваем глобальное окружение (чтобы линтер знал про window, document и т.д.)
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.es2020
      },
    
    parserOptions: {
      ecmaFeatures :{
        jsx:true
      }
    }
  }
}
];
