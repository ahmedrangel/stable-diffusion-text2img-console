# Stable Diffusion Text2Img Console
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
Run app.js.
```J
$ node app.js
```
