This is Next.js app wrap with tauri. [tauri-app with next js](https://tauri.app/v1/guides/getting-started/setup/next-js)

## Getting Started

```bash

cargo tauri dev

# for prod

cargo tauri build

```

## Ollama on local machine

Dowlonad ollama on machine from the link
[Download](https://ollama.com/download)

## Get llm model

Ollama supports a list of models available on [ollama.com/library](https://ollama.com/library "ollama model library")

we are using [TinyLlama](https://github.com/jzhang38/TinyLlama)

## Customize a model

### Import from GGUF

Ollama supports importing GGUF models in the Modelfile:

1. Create a file named `Modelfile`, with a `FROM` instruction with the local filepath to the model you want to import.

```

FROM tinyllama

```

2. Create the model in Ollama

```

ollama create mecha-llm -f Modelfile

```

3. Run the model

```

ollama run mecha-llm

```

### model we're using mecha-llm

```
FROM tinyllama

# sets the temperature to 1 [higher is more creative, lower is more coherent]
PARAMETER temperature 0.5

# sets the context window size to 1024, this controls how many tokens the LLM can use as context to generate the next token
PARAMETER num_ctx 1024

# Maximum number of tokens to predict when generating text.
PARAMETER num_predict 72

# Reduces the probability of generating nonsense.
PARAMETER top_p 10

# Sets how far back for the model to look back to prevent repetition
PARAMETER repeat_last_n 18

PARAMETER mirostat 0

# Tail free sampling is used to reduce the impact of less probable tokens from the output.
PARAMETER tfs_z 0.5
```

### Run created model

`ollama run mecha-llm`

## REST API

Ollama has a REST API for running and managing models.

### Generate a response

```

curl http://localhost:11434/api/generate -d '{

"model": "mecha-llm",

"prompt":"Why is the sky blue?"

}'

```

### Chat with a model

```

curl http://localhost:11434/api/chat -d '{
"model": "mecha-llm",
"messages": [
{ "role": "user", "content": "why is the sky blue?" }
]
}'

```

See the [API documentation](./docs/api.md) for all endpoints.
