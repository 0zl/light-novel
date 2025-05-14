import { ChevronUpIcon } from '@heroicons/react/24/outline'
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

interface ModelParams {
  temperature: number;
  maxTokens: number;
  topP: number;
  frequencyPenalty: number;
  presencePenalty: number;
}

interface ModelParametersProps {
  settings: ModelParams;
  onSettingsChange: (settings: ModelParams) => void;
}

export default function ModelParameters({ settings, onSettingsChange }: ModelParametersProps) {
  const handleSliderChange = (value: number[], key: string) => {
    onSettingsChange({ ...settings, [key]: value[0] });
  };

  const handleInputChange = (value: string, key: string) => {
    const numValue = parseFloat(value);
    if (!isNaN(numValue)) {
      onSettingsChange({ ...settings, [key]: numValue });
    }
  };

  return (
    <Collapsible
      defaultOpen={true}
      className="border rounded-lg p-4"
    >
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Model Parameters</h3>
        <CollapsibleTrigger className="hover:bg-accent p-2 rounded-full">
          <ChevronUpIcon 
            className="h-5 w-5 transition-transform duration-200 data-[state=closed]:rotate-180"
          />
        </CollapsibleTrigger>
      </div>

      <CollapsibleContent className="mt-4 space-y-4">
        {/* Temperature */}
      <div className="space-y-2">
        <div className="flex justify-between">
          <Label>Temperature</Label>
          <Input
            type="number"
            value={settings.temperature}
            onChange={(e) => handleInputChange(e.target.value, "temperature")}
            className="w-20 h-8"
            step={0.1}
            min={0}
            max={2}
          />
        </div>
        <Slider
          value={[settings.temperature]}
          onValueChange={(value) => handleSliderChange(value, "temperature")}
          max={2}
          step={0.1}
        />
      </div>

      {/* Max Tokens */}
      <div className="space-y-2">
        <div className="flex justify-between">
          <Label>Max Tokens</Label>
          <Input
            type="number"
            value={settings.maxTokens}
            onChange={(e) => handleInputChange(e.target.value, "maxTokens")}
            className="w-20 h-8"
            min={1}
            max={4096}
          />
        </div>
        <Slider
          value={[settings.maxTokens]}
          onValueChange={(value) => handleSliderChange(value, "maxTokens")}
          min={1}
          max={4096}
          step={1}
        />
      </div>

      {/* Top P */}
      <div className="space-y-2">
        <div className="flex justify-between">
          <Label>Top P</Label>
          <Input
            type="number"
            value={settings.topP}
            onChange={(e) => handleInputChange(e.target.value, "topP")}
            className="w-20 h-8"
            step={0.1}
            min={0}
            max={1}
          />
        </div>
        <Slider
          value={[settings.topP]}
          onValueChange={(value) => handleSliderChange(value, "topP")}
          max={1}
          step={0.1}
        />
      </div>

      {/* Frequency Penalty */}
      <div className="space-y-2">
        <div className="flex justify-between">
          <Label>Frequency Penalty</Label>
          <Input
            type="number"
            value={settings.frequencyPenalty}
            onChange={(e) => handleInputChange(e.target.value, "frequencyPenalty")}
            className="w-20 h-8"
            step={0.1}
            min={0}
            max={2}
          />
        </div>
        <Slider
          value={[settings.frequencyPenalty]}
          onValueChange={(value) => handleSliderChange(value, "frequencyPenalty")}
          max={2}
          step={0.1}
        />
      </div>

      {/* Presence Penalty */}
      <div className="space-y-2">
        <div className="flex justify-between">
          <Label>Presence Penalty</Label>
          <Input
            type="number"
            value={settings.presencePenalty}
            onChange={(e) => handleInputChange(e.target.value, "presencePenalty")}
            className="w-20 h-8"
            step={0.1}
            min={0}
            max={2}
          />
        </div>
        <Slider
          value={[settings.presencePenalty]}
          onValueChange={(value) => handleSliderChange(value, "presencePenalty")}
          max={2}
          step={0.1}
        />
      </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
