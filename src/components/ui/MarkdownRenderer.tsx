'use client';

import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import rehypeSanitize from 'rehype-sanitize';

interface MarkdownRendererProps {
  data: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ data }) => {
  return (
    <ReactMarkdown className="prose" rehypePlugins={[rehypeSanitize]}>
      {data}
    </ReactMarkdown>
  );
};

export default MarkdownRenderer;
