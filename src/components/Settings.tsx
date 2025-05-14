import { XMarkIcon } from '@heroicons/react/24/outline'
import { useEffect, useState } from 'react'
import LLMSettingsSection from './settings/LLMSettings'
import ModelParameters from './settings/ModelParameters'

interface SettingsProps {
  isOpen: boolean;
  onClose: () => void;
}

interface LLMSettings {
  baseUrl: string;
  apiKey: string;
  modelId: string;
  thinkingModel: boolean;
  prependThinkingTags: boolean;
}

interface ModelParams {
  temperature: number;
  maxTokens: number;
  topP: number;
  frequencyPenalty: number;
  presencePenalty: number;
}

export default function Settings({ isOpen, onClose }: SettingsProps) {
  const [llmSettings, setLlmSettings] = useState<LLMSettings>(() => {
    const saved = localStorage.getItem('llmSettings')
    return saved ? JSON.parse(saved) : {
      baseUrl: '',
      apiKey: '',
      modelId: '',
      thinkingModel: false,
      prependThinkingTags: false
    }
  })

  const [modelParams, setModelParams] = useState<ModelParams>(() => {
    const saved = localStorage.getItem('modelParams')
    return saved ? JSON.parse(saved) : {
      temperature: 0.7,
      maxTokens: 2048,
      topP: 1,
      frequencyPenalty: 0,
      presencePenalty: 0
    }
  })

  useEffect(() => {
    localStorage.setItem('llmSettings', JSON.stringify(llmSettings))
  }, [llmSettings])

  useEffect(() => {
    localStorage.setItem('modelParams', JSON.stringify(modelParams))
  }, [modelParams])

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/30 backdrop-blur-sm transition-opacity duration-300 z-40 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />
      
      {/* Settings Panel */}
      <div 
        className={`fixed inset-y-0 right-0 w-[80%] max-w-3xl bg-background shadow-2xl 
          transform transition-all duration-300 ease-out z-50 flex flex-col
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex-none p-6 border-b">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Settings</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-accent rounded-full transition-colors"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6">
            <LLMSettingsSection 
              settings={llmSettings}
              onSettingsChange={setLlmSettings}
            />
            <ModelParameters 
              settings={modelParams}
              onSettingsChange={setModelParams}
            />
          </div>
        </div>
      </div>
    </>
  );
}
