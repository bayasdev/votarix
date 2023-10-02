import Markdown from 'react-markdown';
import rehypeSanitize from 'rehype-sanitize';

interface MarkdownRendererProps {
  data: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ data }) => {
  return (
    <Markdown className="prose" rehypePlugins={[rehypeSanitize]}>
      {data}
    </Markdown>
  );
};

export default MarkdownRenderer;
