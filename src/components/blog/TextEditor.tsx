import React from 'react';
import { Bold, Italic, List, Quote } from 'lucide-react';

interface TextEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export default function TextEditor({ value, onChange }: TextEditorProps) {
  const toolbar = [
    { icon: <Bold className="h-4 w-4" />, action: 'bold' },
    { icon: <Italic className="h-4 w-4" />, action: 'italic' },
    { icon: <List className="h-4 w-4" />, action: 'bullet' },
    { icon: <Quote className="h-4 w-4" />, action: 'quote' },
  ];

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden bg-white/50">
      <div className="flex gap-2 p-2 border-b border-gray-200">
        {toolbar.map((item, index) => (
          <button
            key={index}
            type="button"
            className="p-2 hover:bg-gray-100 rounded"
            onClick={() => {/* TODO: Implement formatting */}}
          >
            {item.icon}
          </button>
        ))}
      </div>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-4 min-h-[300px] focus:outline-none focus:ring-2 focus:ring-orange-500 bg-transparent"
        placeholder="Write your blog content here..."
      />
    </div>
  );
}