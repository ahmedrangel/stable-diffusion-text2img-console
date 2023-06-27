const model_id = "anything-v5"; // AI model

// Models catalogue: https://stablediffusionapi.com/models

import * as dotenv from "dotenv";
dotenv.config(); 
const key = process.env.STABLE_DIFFUSION_KEY  // API_KEY

const stdin = process.stdin.setEncoding('utf-8');
const stdout = process.stdout;

const start = async () => {
  stdout.write("Prompt: ");
  stdin.once("data", async(prompt) => {
    prompt = prompt.trim();
    const extra_prompt = ", highly detailed, f/1.4, ISO 200, 1/160s, 8K"; // extra prompts for better quality
    const extra_negative_prompt = ", (((NSFW))), ((unclothed)), poor lighting, unclear, pixelated"; // extra negative prompts for better quality
    const apiUrl = "https://stablediffusionapi.com/api/v3/dreambooth";
    const apiFetch = async () => {
      const options = {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          "key": key,
          "model_id": model_id,
          "prompt": prompt + extra_prompt,
          "negative_prompt": "duplicate, boring, bad art, (extra fingers), morbid, out of frame, mutated hands, mutilated, poorly drawn hands, poorly drawn face, deformed, disfigured, ugly, blurry, bad anatomy, bad proportions, ((extra limbs)), cloned face, skinny, glitchy, (double torso), (double body), ((extra arms)), ((extra hands)), (mangled fingers), missing lips, missing arms, malformed limbs, ugly face, distorted face, extra legs, watermark, out of frame" + extra_negative_prompt,
          "width": "1024",
          "height": "1024",
          "samples": "1",
          "enhance_prompt": "no",
          "num_inference_steps": "30",
          "seed": null,
          "guidance_scale": "7.5",
          "safety_checker": "no",
          "multi_lingual": "yes",
          "webhook": null,
          "track_id": null
          })
        }
        const response = await fetch(apiUrl, options);
        const data = await response.json();
        return await data;
    };
    const delay = (ms) => {
      return new Promise(resolve => setTimeout(resolve, ms));
    }
    const fetched = await apiFetch();
    const id = String(fetched.id);
      
    const checkFetch = async (fetched) => {
      if (fetched.status === "success" || fetched.status === "error"){
        if (fetched.status === "success") {
          return fetched.output[0];
        } else {
          console.log("error");
          return fetched.message;
        }
      } else {
        console.log("refetching...");
        await delay(3000);
        const refetchUrl = `${apiUrl}/fetch/${id}`;
        const options = {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({ "key": key, "request_id": id }),
          redirect: "follow"
        }
        const response = await fetch(refetchUrl, options);
        const data = await response.json();
        return await checkFetch(data);
      }
    }
    const response = await checkFetch(fetched);
    console.log("Image URL: " + response);

    stdout.write("Generate another image? (Y/N): ");
    stdin.once("data", (restart) => {
      restart = restart.trim().toLowerCase();
      if (restart === "y") {
        start();
      } else {
        process.exit();
      }
    });
  });
};

start();