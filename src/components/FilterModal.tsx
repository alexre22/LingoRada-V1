"use client";

import { useState } from "react";
import { X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

interface FilterModalProps {
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  onApplyFilters?: (filters: FilterOptions) => void;
}

export interface FilterOptions {
  learningLanguage: string;
  ageRange: [number, number];
  interests: string[];
}

const LANGUAGES = [
  { value: "english", label: "English" },
  { value: "spanish", label: "Spanish" },
  { value: "french", label: "French" },
  { value: "german", label: "German" },
  { value: "chinese", label: "Chinese" },
  { value: "japanese", label: "Japanese" },
  { value: "korean", label: "Korean" },
  { value: "russian", label: "Russian" },
  { value: "arabic", label: "Arabic" },
  { value: "portuguese", label: "Portuguese" },
];

const INTERESTS = [
  "Travel",
  "Music",
  "Movies",
  "Books",
  "Sports",
  "Cooking",
  "Photography",
  "Art",
  "Technology",
  "Gaming",
  "Hiking",
  "Dancing",
  "Writing",
  "Fashion",
  "Fitness",
];

export default function FilterModal({
  isOpen = false,
  onOpenChange,
  onApplyFilters,
}: FilterModalProps) {
  const [learningLanguage, setLearningLanguage] = useState<string>("");
  const [ageRange, setAgeRange] = useState<[number, number]>([18, 65]);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [interestInput, setInterestInput] = useState<string>("");

  const handleAgeRangeChange = (value: number[]) => {
    setAgeRange([value[0], value[1] || ageRange[1]]);
  };

  const addInterest = (interest: string) => {
    if (!selectedInterests.includes(interest) && interest.trim() !== "") {
      setSelectedInterests([...selectedInterests, interest]);
    }
    setInterestInput("");
  };

  const removeInterest = (interest: string) => {
    setSelectedInterests(selectedInterests.filter((i) => i !== interest));
  };

  const handleInterestKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && interestInput.trim() !== "") {
      e.preventDefault();
      addInterest(interestInput);
    }
  };

  const handleApply = () => {
    if (onApplyFilters) {
      onApplyFilters({
        learningLanguage,
        ageRange,
        interests: selectedInterests,
      });
    }
    if (onOpenChange) {
      onOpenChange(false);
    }
  };

  const handleReset = () => {
    setLearningLanguage("");
    setAgeRange([18, 65]);
    setSelectedInterests([]);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="bg-background sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Filters</DialogTitle>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Learning Language</label>
            <Select
              value={learningLanguage}
              onValueChange={setLearningLanguage}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                {LANGUAGES.map((language) => (
                  <SelectItem key={language.value} value={language.value}>
                    {language.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between">
              <label className="text-sm font-medium">Age Range</label>
              <span className="text-sm text-muted-foreground">
                {ageRange[0]} - {ageRange[1]}
              </span>
            </div>
            <Slider
              defaultValue={[ageRange[0], ageRange[1]]}
              max={100}
              min={18}
              step={1}
              value={[ageRange[0], ageRange[1]]}
              onValueChange={handleAgeRangeChange}
              className="py-4"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Interests</label>
            <div className="flex flex-wrap gap-2 mb-2">
              {selectedInterests.map((interest) => (
                <Badge key={interest} variant="secondary" className="px-3 py-1">
                  {interest}
                  <button
                    type="button"
                    onClick={() => removeInterest(interest)}
                    className="ml-2 text-muted-foreground hover:text-foreground"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                placeholder="Add interest"
                value={interestInput}
                onChange={(e) => setInterestInput(e.target.value)}
                onKeyDown={handleInterestKeyDown}
                className="flex-1"
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => addInterest(interestInput)}
                disabled={interestInput.trim() === ""}
              >
                Add
              </Button>
            </div>
            <div className="mt-2">
              <p className="text-xs text-muted-foreground mb-1">
                Suggested interests:
              </p>
              <div className="flex flex-wrap gap-1">
                {INTERESTS.filter(
                  (interest) => !selectedInterests.includes(interest),
                )
                  .slice(0, 5)
                  .map((interest) => (
                    <Badge
                      key={interest}
                      variant="outline"
                      className="cursor-pointer hover:bg-accent"
                      onClick={() => addInterest(interest)}
                    >
                      {interest}
                    </Badge>
                  ))}
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="flex flex-col sm:flex-row gap-2">
          <Button variant="outline" onClick={handleReset} className="sm:w-1/2">
            Reset
          </Button>
          <Button onClick={handleApply} className="sm:w-1/2">
            Apply
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
