// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use dirs;
use dotenv;
use std::env;
use std::path::PathBuf;

#[tauri::command]
fn read_args() -> String {
    // read LLM_ARGS from .env file and return it or default to ""
    let mut path = match dirs::home_dir() {
        Some(path) => PathBuf::from(path),
        None => PathBuf::from(""),
    };
    path.push(".ollama-llm/.env");
    println!("Reading .env file from: {:?}", path);
    dotenv::from_path(path).ok();
    // read LLM_MODEL from .env file and return it or default to "tinyllama"
    let model = env::var("LLM_MODEL").unwrap_or("tinyllama".to_string());
    model
}

fn main() {
    tauri::Builder::default()
        // This is where you pass in your commands
        .invoke_handler(tauri::generate_handler![read_args])
        .run(tauri::generate_context!())
        .expect("failed to run app");
}
