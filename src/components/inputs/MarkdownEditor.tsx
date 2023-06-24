'use client';

import dynamic from 'next/dynamic';
import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';
import rehypeSanitize from 'rehype-sanitize';
import { Control, Controller, FieldErrors } from 'react-hook-form';

interface MarkdownEditorProps {
  name: string;
  label: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  light?: boolean;
  control: Control<any>;
  errors: FieldErrors;
}

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false });

const MarkdownEditor: React.FC<MarkdownEditorProps> = ({
  name,
  label,
  placeholder,
  disabled,
  required,
  light,
  control,
  errors,
}) => {
  return (
    <div className="form-control w-full">
      <label className="label">{label}</label>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => (
          <MDEditor
            value={value}
            onChange={onChange}
            // sanitize preview
            previewOptions={{
              rehypePlugins: [[rehypeSanitize]],
            }}
            // remove unsafe commands
            commandsFilter={(cmd) =>
              cmd && /(link|image)/.test(cmd.name || '') ? false : cmd
            }
            textareaProps={{ placeholder, disabled, required }}
            data-color-mode={light ? 'light' : undefined}
          />
        )}
      />
      {errors[name] && (
        <label className="label">
          <span className="label-text-alt text-error">
            {errors[name]?.message?.toString()}
          </span>
        </label>
      )}
    </div>
  );
};

export default MarkdownEditor;
