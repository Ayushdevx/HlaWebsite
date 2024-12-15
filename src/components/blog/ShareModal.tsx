import React from 'react';
import { motion } from 'framer-motion';
import { X, Facebook, Twitter, Linkedin, Link as LinkIcon } from 'lucide-react';
import Button from '../ui/Button';

interface ShareModalProps {
  url: string;
  title: string;
  onClose: () => void;
}

export default function ShareModal({ url, title, onClose }: ShareModalProps) {
  const fullUrl = `${window.location.origin}${url}`;

  const shareButtons = [
    {
      name: 'Facebook',
      icon: <Facebook className="h-5 w-5" />,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(fullUrl)}`
    },
    {
      name: 'Twitter',
      icon: <Twitter className="h-5 w-5" />,
      url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(fullUrl)}&text=${encodeURIComponent(title)}`
    },
    {
      name: 'LinkedIn',
      icon: <Linkedin className="h-5 w-5" />,
      url: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(fullUrl)}&title=${encodeURIComponent(title)}`
    }
  ];

  const copyToClipboard = () => {
    navigator.clipboard.writeText(fullUrl);
    // TODO: Show success toast
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.9 }}
        className="bg-white rounded-lg p-6 max-w-sm w-full mx-4"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Share this blog</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6">
          {shareButtons.map(button => (
            <a
              key={button.name}
              href={button.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {button.icon}
              <span className="text-sm">{button.name}</span>
            </a>
          ))}
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            value={fullUrl}
            readOnly
            className="flex-1 px-3 py-2 rounded-lg border border-gray-200 bg-gray-50 text-sm"
          />
          <Button onClick={copyToClipboard}>
            <LinkIcon className="h-4 w-4" />
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
}