import { MapPin, Accessibility, Briefcase } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export const FilterSidebar = () => {
  return (
    <Card className="p-6 sticky top-4">
      <h2 className="text-2xl font-bold mb-6">Filters</h2>
      
      {/* Location Filter */}
      <div className="mb-6">
        <Label className="flex items-center gap-2 text-base font-semibold mb-3">
          <MapPin className="w-5 h-5 text-primary" />
          Location
        </Label>
        <Input
          type="text"
          placeholder="Enter location..."
          className="w-full"
        />
      </div>
      
      {/* Accessibility Features */}
      <div className="mb-6">
        <Label className="flex items-center gap-2 text-base font-semibold mb-3">
          <Accessibility className="w-5 h-5 text-primary" />
          Accessibility Features
        </Label>
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Checkbox id="remote" />
            <label
              htmlFor="remote"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
            >
              🏠 Remote Work
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="wheelchair" />
            <label
              htmlFor="wheelchair"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
            >
              ♿ Wheelchair Accessible
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="flexible" />
            <label
              htmlFor="flexible"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
            >
              🕐 Flexible Hours
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="onsite" />
            <label
              htmlFor="onsite"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
            >
              🏢 On-site Support
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="quiet" />
            <label
              htmlFor="quiet"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
            >
              🔇 Quiet Workspace
            </label>
          </div>
        </div>
      </div>
      
      {/* Job Type */}
      <div>
        <Label className="flex items-center gap-2 text-base font-semibold mb-3">
          <Briefcase className="w-5 h-5 text-primary" />
          Job Type
        </Label>
        <RadioGroup defaultValue="all">
          <div className="flex items-center space-x-2 mb-2">
            <RadioGroupItem value="all" id="all" />
            <Label htmlFor="all" className="cursor-pointer">All</Label>
          </div>
          <div className="flex items-center space-x-2 mb-2">
            <RadioGroupItem value="fulltime" id="fulltime" />
            <Label htmlFor="fulltime" className="cursor-pointer">Full-time</Label>
          </div>
          <div className="flex items-center space-x-2 mb-2">
            <RadioGroupItem value="parttime" id="parttime" />
            <Label htmlFor="parttime" className="cursor-pointer">Part-time</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="contract" id="contract" />
            <Label htmlFor="contract" className="cursor-pointer">Contract</Label>
          </div>
        </RadioGroup>
      </div>
    </Card>
  );
};
