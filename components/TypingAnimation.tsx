import React from 'react';
import { motion } from 'framer-motion';
import Markdown from 'react-markdown';

interface TypingAnimationProps {
  text: string;
}

const TypingAnimation: React.FC<TypingAnimationProps> = ({ text }) => {
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.01, delayChildren: 0.04 * i },
    }),
  };

  const markdownComponents: any = {
    p: ({children}: {children?: React.ReactNode}) => <p className="mb-4 last:mb-0 leading-relaxed">{children}</p>,
    strong: ({children}: {children?: React.ReactNode}) => <strong className="font-semibold text-green-700">{children}</strong>,
    em: ({children}: {children?: React.ReactNode}) => <em className="italic text-green-600">{children}</em>,
    ul: ({children}: {children?: React.ReactNode}) => <ul className="mb-4 ml-4 space-y-2 list-disc list-inside">{children}</ul>,
    ol: ({children}: {children?: React.ReactNode}) => <ol className="mb-4 ml-4 space-y-2 list-decimal list-inside">{children}</ol>,
    li: ({children}: {children?: React.ReactNode}) => <li className="pl-2">{children}</li>,
    code({ inline, className, children, ...props }: any) {
        return (
          <code className={`px-1.5 py-1 bg-green-100/80 rounded text-sm text-green-800 font-mono ${!inline ? 'block whitespace-pre-wrap p-4 my-4' : ''}`} {...props}>
            {children}
          </code>
        )
      },
    h3: ({children}: {children?: React.ReactNode}) => <h3 className="pb-2 mt-6 mb-3 text-lg font-semibold border-b text-green-800 border-green-300">{children}</h3>,
  };

  return (
    <motion.div variants={container} initial="hidden" animate="visible" className="text-base text-inherit">
      <Markdown components={markdownComponents}>
          {text}
      </Markdown>
    </motion.div>
  );
};

export default TypingAnimation;