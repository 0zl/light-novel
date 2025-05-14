import { ChevronUpIcon } from '@heroicons/react/24/outline'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

interface LLMSettings {
  baseUrl: string;
  apiKey: string;
  modelId: string;
  thinkingModel: boolean;
  prependThinkingTags: boolean;
}

interface LLMSettingsSectionProps {
  settings: LLMSettings;
  onSettingsChange: (settings: LLMSettings) => void;
}

export default function LLMSettingsSection({ settings, onSettingsChange }: LLMSettingsSectionProps) {
  const handleSettingChange = (key: keyof LLMSettings) => (e: React.ChangeEvent<HTMLInputElement>) => {
    onSettingsChange({
      ...settings,
      [key]: e.target.value
    })
  }

  const handleSwitchChange = (key: keyof LLMSettings) => (checked: boolean) => {
    onSettingsChange({
      ...settings,
      [key]: checked
    })
  }

  return (
    <Collapsible
      defaultOpen={true}
      className="border rounded-lg p-4"
    >
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">LLM Configuration</h3>
        <CollapsibleTrigger className="hover:bg-accent p-2 rounded-full">
          <ChevronUpIcon 
            className="h-5 w-5 transition-transform duration-200 data-[state=closed]:rotate-180"
          />
        </CollapsibleTrigger>
      </div>

      <CollapsibleContent className="mt-4 space-y-4">
        <div className="space-y-2">
          <Label htmlFor="base-url">Base URL</Label>
          <Input
            id="base-url"
            placeholder="Enter base URL"
            value={settings.baseUrl}
            onChange={handleSettingChange('baseUrl')}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="api-key">API Key</Label>
          <Input
            id="api-key"
            type="password"
            placeholder="Enter API key"
            value={settings.apiKey}
            onChange={handleSettingChange('apiKey')}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="model-id">Model ID</Label>
          <Input
            id="model-id"
            placeholder="Enter model ID"
            value={settings.modelId}
            onChange={handleSettingChange('modelId')}
          />
        </div>

        <div className="space-y-4 pt-2 border-t">
          <div className="flex items-start justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="thinking-model">Thinking Model</Label>
              <p className="text-sm text-muted-foreground">
                Enable model's thinking process
              </p>
            </div>
            <Switch
              id="thinking-model"
              checked={settings.thinkingModel}
              onCheckedChange={handleSwitchChange('thinkingModel')}
            />
          </div>

          <div className="flex items-start justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="prepend-tags">Prepend Thinking Tags</Label>
              <p className="text-sm text-muted-foreground">
                Add thinking tags to the output
              </p>
            </div>
            <Switch
              id="prepend-tags"
              checked={settings.prependThinkingTags}
              onCheckedChange={handleSwitchChange('prependThinkingTags')}
            />
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
