extern crate wasm_bindgen;

use base64::{decode, encode};
use image::ImageOutputFormat::Png;
use image::{load_from_memory, DynamicImage};
use wasm_bindgen::prelude::wasm_bindgen;
use web_sys::console::log_1 as log;

#[wasm_bindgen]
pub fn grayscale(encoded_file: &str) -> String {
    let mut img = decode_and_load(encoded_file);
    img = img.grayscale();
    log(&"Grayscale effect applied".into());

    let encoded_img = encode_image(&img);
    format_image(encoded_img)
}

#[wasm_bindgen]
pub fn blur(encoded_file: &str, sigma: f32) -> String {
    let mut img = decode_and_load(encoded_file);
    img = img.blur(sigma);
    log(&"Blur effect applied".into());

    let encoded_img = encode_image(&img);
    format_image(encoded_img)
}

#[wasm_bindgen]
pub fn brighten(encoded_file: &str, value: i32) -> String {
    let mut img = decode_and_load(encoded_file);
    img = img.brighten(value);
    log(&"Brighten effect applied".into());

    let encoded_img = encode_image(&img);
    format_image(encoded_img)
}

fn decode_and_load(encoded_file: &str) -> DynamicImage {
    let base64_to_vector = decode(encoded_file).unwrap();
    let img = load_from_memory(&base64_to_vector).unwrap();

    img
}

fn encode_image(img: &DynamicImage) -> String {
    let mut buffer = vec![];
    img.write_to(&mut buffer, Png).unwrap();
    log(&"New image written".into());

    encode(&buffer)
}

fn format_image(img: String) -> String {
    let data_url = format!("data:image/png;base64,{}", img);

    data_url
}
