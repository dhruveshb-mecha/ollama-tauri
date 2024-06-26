"use client";

export default function Input({ message, setMessage, onSend }) {
  return (
    <div className="flex items-center pt-0">
      <form
        className="flex items-center justify-center w-full space-x-2"
        onSubmit={(e) => {
          e.preventDefault();
          onSend();
          setMessage("");
        }}
      >
        <input
          className="flex h-10 w-full rounded-md border border-[#e5e7eb] px-3 py-2 text-sm placeholder-[#6b7280] focus:outline-none focus:ring-2 focus:ring-[#9ca3af] disabled:cursor-not-allowed disabled:opacity-50 text-[#030712] focus-visible:ring-offset-2"
          placeholder="Type your message"
          onChange={(e) => {
            setMessage(e.target.value);
          }}
          value={message}
        />
        <button
          className="inline-flex items-center justify-center rounded-md text-sm font-medium text-[#f9fafb] disabled:pointer-events-none disabled:opacity-50 bg-black hover:bg-[#111827E6] h-10 px-4 py-2"
          onClick={() => {
            onSend();
            setMessage("");
          }}
        >
          Send
        </button>
      </form>
    </div>
  );
}
