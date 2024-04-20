"use client";
import { useState, useEffect, useRef } from "react";
import Input from "./input";
import { AiIcon, UserIcon } from "./icons";
import { fetch, Body } from "@tauri-apps/api/http";
import { invoke } from "@tauri-apps/api/tauri";

export default function Home() {

  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [llm_model, setLlmModel] = useState("tinyllama");

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  useEffect(() => {
    const get_llm_model = async () => {
      const response = await invoke("read_args").then((res) => {
        return res;
      });

      setLlmModel(response); // Update llm_model once the Promise resolves
    };

    get_llm_model();
  }, []);

  const handleSend = async () => {
    console.log(llm_model);
    const payload = Body.json({
      model: llm_model,
      stream: false,
      messages: [{ role: "user", content: message }],
    });

    if (message !== "") {
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: "user", content: message },
      ]); // Update the messages
      try {
        const response = await fetch("http://localhost:11434/api/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: payload,
        });
        const data = await response.data;
        setMessages((prevMessages) => [
          ...prevMessages,
          { role: "ai", content: data.message.content },
        ]); // Add the new response to the array
        setMessage(""); // Clear the input field
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  return (
    <main className="flex flex-col items-center justify-between w-full h-screen bg-white">
      <div className="mb-auto overflow-auto w-full">
        <div className="m-2">
          {messages.map((message, index) => (
            <div
              key={index}
              className="flex gap-3 my-4 text-gray-600 text-sm flex-1"
            >
              <span className="relative flex shrink-0 overflow-hidden rounded-full w-8 h-8">
                {message.role === "user" ? <UserIcon /> : <AiIcon />}
              </span>
              <p className="leading-relaxed" ref={messagesEndRef}>
                <span className="block font-bold text-gray-700">
                  {message.role === "user" ? "You" : "AI"}{" "}
                </span>
                {message.content}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-auto w-full m-2 p-2">
        <Input message={message} setMessage={setMessage} onSend={handleSend} />
      </div>
    </main>
  );
}
