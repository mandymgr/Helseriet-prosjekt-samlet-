import { lazy, Suspense } from 'react';

// Lazy load the MD Editor and its styles
const MDEditor = lazy(async () => {
  // Dynamic imports for both the component and CSS
  const [module] = await Promise.all([
    import('@uiw/react-md-editor'),
    import('@uiw/react-md-editor/markdown-editor.css'),
    import('@uiw/react-markdown-preview/markdown.css'),
    import('../styles/rich-text-editor.css')
  ]);
  
  return { default: module.default };
});

interface LazyMDEditorProps {
  value?: string;
  onChange?: (value?: string) => void;
  height?: number;
  preview?: 'edit' | 'preview' | 'live';
  hideToolbar?: boolean;
  visibleDragBar?: boolean;
  visibleDragbar?: boolean; // Support both variants
  textareaProps?: any; // Allow any textarea props
}

export default function LazyMDEditor(props: LazyMDEditorProps) {
  return (
    <Suspense fallback={
      <div className="animate-pulse bg-gray-100 rounded-lg border min-h-[400px] flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-sage border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Laster editor...</p>
        </div>
      </div>
    }>
      <MDEditor {...props} />
    </Suspense>
  );
}