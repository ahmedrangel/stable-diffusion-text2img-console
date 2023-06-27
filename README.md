# Stable Diffusion Text2Img Console
A console program that utilizes Stable Diffusion API and a selected AI model to generate images based on user-provided text input.
## First steps
Install dependencies.
```J
$ pnpm install
```

Create your .env file and add your api key.
```js
STABLE_DIFFUSION_KEY = "YOUR_API_KEY"
```

Assign your preferred model to the variable `model_id` located on the first line of the `app.js` file.
```js
const model_id = "anything-v5"; // AI model

// Models catalogue: https://stablediffusionapi.com/models

// ...
```

## Run program
```J
$ node app.js
```
