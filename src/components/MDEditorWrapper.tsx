import { createElement } from 'react';
import dynamic from 'next/dynamic';
import { MDEditorProps } from '@uiw/react-md-editor';

const MDEditor = dynamic(
  () => import('@uiw/react-md-editor').then((mod) => mod.default),
  { ssr: false },
);

const MDEditorWrapper: React.FC<MDEditorProps> = (props) => {
  return createElement(MDEditor, props);
};

export default MDEditorWrapper;
