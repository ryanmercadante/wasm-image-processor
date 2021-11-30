# Setting up Web Assembly in a NextJS App (name undecided)

### Table of Contents
  * [Demo Application](#demo-application)
  * [Quick Rundown of Web Assembly](#quick-rundown-of-web-assembly)
  * [Adding Wasm to Next.js app](#adding-wasm-to-nextjs-app)
  * [Issues I ran into](#issues-I-ran-into)
  * [Contact](#contact)

## Demo Application

In this post we're going to learn how to get web assembly running in our Next.js applications. In order to do that, we'll be looking at this [demo](https://wasm-image-processor.vercel.app/) site I built.

![Homepage of Image Effects](screenshots/homepage.png) |![Homepage of Image Effects with Image Processed](screenshots/homepage2.png)
|-|-|

It is a pretty basic web app that uses web assembly to process images. You can grayscale, blur, rotate, etc., to edit your image. Before going further, I absolutely need to give credit to Andrei Neagoie and Luis Ramirez Jr for the course at https://academy.zerotomastery.io/p/learn-webassembly. This set the groundwork for the application and my knowledge with using wasm. We used Rust to compile to web assembly. I took what I learned here and simply added to it to make it more my own and challenge myself. To do this, I used Next.js, Typescript, and added more image processing functionality in the Rust code.


## Quick Rundown of Web Assembly

- Give brief overview of web assembly.
- Talk about how its a compilation target and typically you wouldnt want to actually write web assembly code.
- Rust is best choice for compiling to wasm.
- Talk about why wasm is badass. What does it enable you to do?
- Link to resources to learn more about wasm.


## Adding Wasm to Next.js App

- Run create next app (optionally add typescript)
- Run `cargo init . --lib` inside project directory
- Talk about setting up wasm-pack inside `next.config.js`
- Setup wasm script in `package.json` to compile rust lib to wasm
- Setup Husky to run wasm script before commiting so you have production compilation when pushing to github.

## Issues I ran into

- Deployment to Vercel
- Not sure if `pkg` folder should be checked into source control or not
- Specifically wanted wasm running on the frontend. Did not want any network calls.
  - Mention that could have created npm package for wasm code


## Contact

- [LinkedIn](https://www.linkedin.com/in/ryan-mercadante-11a035152/)
- [Github](https://www.github.com/ryanmercadante)
- [Twitter](https://twitter.com/polkamerc)
- [Email](mailto:ryan.a.mercadante@gmail.com)