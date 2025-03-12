import React, { useState, useEffect } from 'react';
import { RiFilterLine, RiCloseLine, RiCheckLine, RiRefreshLine } from 'react-icons/ri';
import { useUIStore } from '@/store/uiStore';

interface FocusModeProps {
  onApply?: (selectedSections: string[]) => void;
}

const FocusMode: React.FC<FocusModeProps> = ({ onApply }) => {
  const { focusMode, setFocusMode } = useUIStore();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSections, setSelectedSections] = useState<string[]>(focusMode.sections);

  // Update local state when store changes
  useEffect(() => {
    setSelectedSections(focusMode.sections);
  }, [focusMode.sections]);

  const toggleSection = (section: string) => {
    if (selectedSections.includes(section)) {
      setSelectedSections(selectedSections.filter(s => s !== section));
    } else {
      setSelectedSections([...selectedSections, section]);
    }
  };

  const handleApply = () => {
    const updatedFocusMode = {
      enabled: selectedSections.length > 0,
      sections: selectedSections
    };
    
    setFocusMode(updatedFocusMode);
    if (onApply) {
      onApply(selectedSections);
    }
    setIsOpen(false);
  };

  const handleReset = () => {
    const defaultSections = ['metrics', 'insights', 'activity', 'milestones', 'cofounder', 'funding'];
    setSelectedSections(defaultSections);
  };

  const toggleFocusMode = () => {
    if (focusMode.enabled && !isOpen) {
      // If focus mode is on and we're just toggling the button (not opening modal)
      setFocusMode({
        enabled: false,
        sections: focusMode.sections
      });
    } else {
      // Otherwise, open the modal
      setIsOpen(true);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={toggleFocusMode}
        className={`flex items-center px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
          focusMode.enabled
            ? 'bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300'
            : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700'
        }`}
      >
        <RiFilterLine className="mr-1.5 w-4 h-4" />
        {focusMode.enabled ? 'Focus Mode On' : 'Focus Mode'}
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-xl max-w-md w-full p-6 relative">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200"
            >
              <RiCloseLine className="w-5 h-5" />
            </button>
            
            <h2 className="text-xl font-semibold text-neutral-900 dark:text-white mb-1">Focus Mode</h2>
            <p className="text-neutral-600 dark:text-neutral-400 mb-4">
              Select which sections to display on your dashboard
            </p>
            
            <div className="space-y-3 mb-6">
              <div 
                className={`flex items-center justify-between p-3 rounded-lg border ${
                  selectedSections.includes('metrics') 
                    ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20' 
                    : 'border-neutral-200 dark:border-neutral-700'
                }`}
                onClick={() => toggleSection('metrics')}
              >
                <div className="flex items-center">
                  <div className={`w-5 h-5 rounded flex items-center justify-center ${
                    selectedSections.includes('metrics') 
                      ? 'bg-primary-500 text-white' 
                      : 'border border-neutral-300 dark:border-neutral-600'
                  }`}>
                    {selectedSections.includes('metrics') && <RiCheckLine className="w-4 h-4" />}
                  </div>
                  <span className="ml-3 font-medium text-neutral-900 dark:text-white">Key Metrics</span>
                </div>
              </div>
              
              <div 
                className={`flex items-center justify-between p-3 rounded-lg border ${
                  selectedSections.includes('insights') 
                    ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20' 
                    : 'border-neutral-200 dark:border-neutral-700'
                }`}
                onClick={() => toggleSection('insights')}
              >
                <div className="flex items-center">
                  <div className={`w-5 h-5 rounded flex items-center justify-center ${
                    selectedSections.includes('insights') 
                      ? 'bg-primary-500 text-white' 
                      : 'border border-neutral-300 dark:border-neutral-600'
                  }`}>
                    {selectedSections.includes('insights') && <RiCheckLine className="w-4 h-4" />}
                  </div>
                  <span className="ml-3 font-medium text-neutral-900 dark:text-white">AI Insights</span>
                </div>
              </div>
              
              <div 
                className={`flex items-center justify-between p-3 rounded-lg border ${
                  selectedSections.includes('activity') 
                    ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20' 
                    : 'border-neutral-200 dark:border-neutral-700'
                }`}
                onClick={() => toggleSection('activity')}
              >
                <div className="flex items-center">
                  <div className={`w-5 h-5 rounded flex items-center justify-center ${
                    selectedSections.includes('activity') 
                      ? 'bg-primary-500 text-white' 
                      : 'border border-neutral-300 dark:border-neutral-600'
                  }`}>
                    {selectedSections.includes('activity') && <RiCheckLine className="w-4 h-4" />}
                  </div>
                  <span className="ml-3 font-medium text-neutral-900 dark:text-white">Activity Stream</span>
                </div>
              </div>
              
              <div 
                className={`flex items-center justify-between p-3 rounded-lg border ${
                  selectedSections.includes('milestones') 
                    ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20' 
                    : 'border-neutral-200 dark:border-neutral-700'
                }`}
                onClick={() => toggleSection('milestones')}
              >
                <div className="flex items-center">
                  <div className={`w-5 h-5 rounded flex items-center justify-center ${
                    selectedSections.includes('milestones') 
                      ? 'bg-primary-500 text-white' 
                      : 'border border-neutral-300 dark:border-neutral-600'
                  }`}>
                    {selectedSections.includes('milestones') && <RiCheckLine className="w-4 h-4" />}
                  </div>
                  <span className="ml-3 font-medium text-neutral-900 dark:text-white">Milestone Tracker</span>
                </div>
              </div>
              
              <div 
                className={`flex items-center justify-between p-3 rounded-lg border ${
                  selectedSections.includes('cofounder') 
                    ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20' 
                    : 'border-neutral-200 dark:border-neutral-700'
                }`}
                onClick={() => toggleSection('cofounder')}
              >
                <div className="flex items-center">
                  <div className={`w-5 h-5 rounded flex items-center justify-center ${
                    selectedSections.includes('cofounder') 
                      ? 'bg-primary-500 text-white' 
                      : 'border border-neutral-300 dark:border-neutral-600'
                  }`}>
                    {selectedSections.includes('cofounder') && <RiCheckLine className="w-4 h-4" />}
                  </div>
                  <span className="ml-3 font-medium text-neutral-900 dark:text-white">Co-Founder Hub</span>
                </div>
              </div>
              
              <div 
                className={`flex items-center justify-between p-3 rounded-lg border ${
                  selectedSections.includes('funding') 
                    ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20' 
                    : 'border-neutral-200 dark:border-neutral-700'
                }`}
                onClick={() => toggleSection('funding')}
              >
                <div className="flex items-center">
                  <div className={`w-5 h-5 rounded flex items-center justify-center ${
                    selectedSections.includes('funding') 
                      ? 'bg-primary-500 text-white' 
                      : 'border border-neutral-300 dark:border-neutral-600'
                  }`}>
                    {selectedSections.includes('funding') && <RiCheckLine className="w-4 h-4" />}
                  </div>
                  <span className="ml-3 font-medium text-neutral-900 dark:text-white">Funding & Pitch</span>
                </div>
              </div>
            </div>
            
            <div className="flex justify-between">
              <button
                onClick={handleReset}
                className="flex items-center px-4 py-2 rounded-lg border border-neutral-300 text-neutral-700 hover:bg-neutral-50 dark:border-neutral-600 dark:text-neutral-300 dark:hover:bg-neutral-700"
              >
                <RiRefreshLine className="mr-1.5 w-4 h-4" />
                Reset
              </button>
              
              <div className="space-x-2">
                <button
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 rounded-lg border border-neutral-300 text-neutral-700 hover:bg-neutral-50 dark:border-neutral-600 dark:text-neutral-300 dark:hover:bg-neutral-700"
                >
                  Cancel
                </button>
                <button
                  onClick={handleApply}
                  className="px-4 py-2 rounded-lg bg-primary-600 text-white hover:bg-primary-700 dark:bg-primary-700 dark:hover:bg-primary-800"
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FocusMode;
