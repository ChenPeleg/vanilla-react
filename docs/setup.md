# Project setup

## Prerequisites
- [Node.js](https://nodejs.org/en/download/)

## Npm installations

### Vite

```bash
npm create vite@latest rotem-fortune -- --template react-ts 
```

### Eslint and prettier

```bash
npm install --save-dev eslint prettier eslint-config-prettier eslint-plugin-prettier
``` 
### Tailwind CSS

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
npm i -D prettier-plugin-tailwindcss
```
 

### create a .prettierrc file in the root of the project and add the following code:

```json
{
  "plugins": ["prettier-plugin-tailwindcss"],
  "trailingComma": "es5",
  "tabWidth": 4,
  "semi": true,
  "singleQuote": true,
  "endOfLine": "auto"
}

```
 


## Installation
1. Clone the repository
2. Install dependencies
```bash
npm install
```

