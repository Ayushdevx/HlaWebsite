import React, { useState } from 'react';
import { Bold, Italic, List, Quote, Image as ImageIcon, Link as LinkIcon } from 'lucide-react';
import Button from '../ui/Button';
import Tooltip from '../ui/Tooltip';

interface BlogEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export default function BlogEditor({ value, onChange }: BlogEditorProps) {
  const [selectedText, setSelectedText] = useState('');

  const toolbar = [
    { icon: <Bold className="h-4 w-4" />, action: 'bold', tooltip: 'Bold' },
    { icon: <Italic className="h-4 w-4" />, action: 'italic', tooltip: 'Italic' },
    { icon: <List className="h-4 w-4" />, action: 'bullet', tooltip: 'Bullet List' },
    { icon: <Quote className="h-4 w-4" />, action: 'quote', tooltip: 'Quote' },
    { icon: <ImageIcon className="h-4 w-4" />, action: 'image', tooltip: 'Insert Image' },
    { icon: <LinkIcon className="h-4 w-4" />, action: 'link', tooltip: 'Insert Link' },
  ];

  const handleFormat = (action: string) => {
    const textarea = document.querySelector('textarea');
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selection = value.substring(start, end);
    setSelectedText(selection);

    let formattedText = '';
    switch (action) {
      case 'bold':
        formattedText = `**${selection}**`;
        break;
      case 'italic':
        formattedText = `*${selection}*`;
        break;
      case 'bullet':
        formattedText = `\n- ${selection}`;
        break;
      case 'quote':
        formattedText = `\n> ${selection}`;
        break;
      case 'image':
        formattedText = `![${selection || 'alt text'}](image_url)`;
        break;
      case 'link':
        formattedText = `[${selection || 'link text'}](url)`;
        break;
      default:
        formattedText = selection;
    }

    const newValue = value.substring(0, start) + formattedText + value.substring(end);
    onChange(newValue);
  };

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden bg-white/50 backdrop-blur-sm">
      <div className="flex gap-2 p-2 border-b border-gray-200">
        {toolbar.map((item, index) => (
          <Tooltip key={index} content={item.tooltip}>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleFormat(item.action)}
              className="p-2"
            >
              {item.icon}
            </Button>
          </Tooltip>
        ))}
      </div>
      <div className="grid md:grid-cols-2 divide-x divide-gray-200">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full p-4 min-h-[400px] focus:outline-none focus:ring-2 focus:ring-orange-500 bg-transparent resize-none"
          placeholder="Write your blog content here using Markdown..."
        />
        <div className="p-4 prose prose-orange max-w-none">
          {/* TODO: Add Markdown preview */}
          <div className="text-gray-500">Preview will appear here...</div>
        </div>
      </div>
    </div>
  );
}