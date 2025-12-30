import React from 'react';
import { gigCategories } from '@/data/mockUsers';
import { Checkbox } from '@/components/ui/checkbox';

interface CategorySelectorProps {
  selectedCategories: string[];
  onSelectionChange: (categories: string[]) => void;
}

const CategorySelector: React.FC<CategorySelectorProps> = ({
  selectedCategories,
  onSelectionChange,
}) => {
  const handleToggle = (categoryId: string) => {
    if (selectedCategories.includes(categoryId)) {
      onSelectionChange(selectedCategories.filter((id) => id !== categoryId));
    } else {
      onSelectionChange([...selectedCategories, categoryId]);
    }
  };

  return (
    <div className="bg-card rounded-2xl shadow-card p-6">
      <h3 className="text-lg font-bold text-card-foreground mb-4">
        Select Your Gig Categories
      </h3>
      <p className="text-sm text-muted-foreground mb-6">
        Choose the types of work you do. This will help us show only the required documents.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {gigCategories.map((category) => {
          const isSelected = selectedCategories.includes(category.id);
          return (
            <label
              key={category.id}
              className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                isSelected
                  ? 'border-primary bg-primary/5'
                  : 'border-border hover:border-primary/50 hover:bg-muted/50'
              }`}
            >
              <Checkbox
                checked={isSelected}
                onCheckedChange={() => handleToggle(category.id)}
                className="h-6 w-6"
              />
              <div className="flex items-center gap-3">
                <span className="text-2xl">{category.icon}</span>
                <span className="font-medium text-card-foreground text-sm leading-tight">
                  {category.name}
                </span>
              </div>
            </label>
          );
        })}
      </div>
    </div>
  );
};

export default CategorySelector;
