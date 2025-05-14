import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useState, useCallback, useEffect } from 'react'
import { Markdown } from 'tiptap-markdown'
import { Cog6ToothIcon } from '@heroicons/react/24/outline'
import AIPrompt from './AIPrompt'
import Settings from './Settings'
import { Button } from "@/components/ui/button"

export default function NovelEditor() {
  const [wordCount, setWordCount] = useState(0)
  const [isPromptVisible, setIsPromptVisible] = useState(false)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  
  const editor = useEditor({
    extensions: [StarterKit, Markdown],
    editorProps: {
      attributes: {
        class: 'prose prose-lg max-w-none h-full focus:outline-none',
      },
      handleKeyDown: (_view, event) => {
        if (event.key === '/' && event.ctrlKey) {
          event.preventDefault();
          setIsPromptVisible(true);
          return true;
        }
        return false;
      },
    },
    onUpdate: ({ editor }) => {
      const words = editor.getText().split(/\s+/).filter(word => word.length > 0)
      setWordCount(words.length)
    },
  })

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsSettingsOpen(false);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  const handlePromptSubmit = useCallback((instruction: string) => {
    alert(`Instruction received: ${instruction}`);
    setIsPromptVisible(false);
  }, []);

  const handlePromptClose = useCallback(() => {
    setIsPromptVisible(false);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6 h-[calc(100vh-2rem)] flex flex-col gap-4">
        <header className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSettingsOpen(true)}
              aria-label="Settings"
            >
              <Cog6ToothIcon className="h-5 w-5" />
            </Button>
            <div className="text-sm text-muted-foreground">
              {wordCount} words
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsPromptVisible(true)}
          >
            AI Assist (Ctrl + /)
          </Button>
        </header>
        
        <main className="flex-grow relative">
          <div className="absolute inset-0 rounded-lg border bg-card text-card-foreground shadow-sm overflow-auto">
            <div className="h-full p-6">
              <EditorContent 
                editor={editor} 
                className="min-h-full prose prose-lg dark:prose-invert max-w-none focus:outline-none"
              />
            </div>
          </div>
          <AIPrompt
            isVisible={isPromptVisible}
            onSubmit={handlePromptSubmit}
            onClose={handlePromptClose}
          />
        </main>
        <Settings isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
      </div>
    </div>
  )
}
