import { useState } from 'react';
import { Sparkles, X, Plus } from 'lucide-react';

function ChipInput({ 
    watch, 
    setValue, 
    errors, 
    fieldName = "skills", 
    label = "Your Tech Stack", 
    placeholder = "Type a skill & press Enter",
    limitReachedPlaceholder = "Limit reached",
    emptyMessage = "Add your skills below (e.g. React, Node.js, Python)...",
    maxLimit = 15, 
    maxCharLength = 30,
    charLimitErrorMsg = "Max 30 chars per chip",
    duplicateErrorMsg = "Skill already added",
    Icon = Sparkles
}) {
    const [chip, setChip] = useState("");
    const [chipError, setChipError] = useState("");
    
    const currentChips = watch(fieldName) || [];
    const isMaxLimitReached = currentChips.length >= maxLimit;

    const handleAddChip = (e) => {
        e.preventDefault();
        const newChip = chip.trim();
        if (!newChip) return;

        if (newChip.length > maxCharLength) {
            setChipError(charLimitErrorMsg);
            return;
        }

        const isDuplicate = currentChips.some(c => c.toLowerCase() === newChip.toLowerCase());
        if (isDuplicate) {
            setChipError(duplicateErrorMsg);
            return;
        }

        setChipError("");
        setValue(fieldName, [...currentChips, newChip], { shouldValidate: true, shouldDirty: true });
        setChip("");
    };

    const handleRemoveChip = (indexToRemove) => {
        const updated = currentChips.filter((_, i) => i !== indexToRemove);
        setValue(fieldName, updated, { shouldValidate: true, shouldDirty: true });
        if (updated.length < maxLimit) setChipError("");
    };

    const displayError = chipError || (errors?.[fieldName] && errors[fieldName].message);

    return (
        // 🚨 FIX: Padding p-4 for mobile, p-5 for desktop
        <div className="form-control bg-base-200/50 p-4 md:p-5 rounded-2xl border border-base-300 w-full overflow-hidden">
            <label htmlFor={`${fieldName}-input`} className={`label font-semibold text-base-content/80 pt-0 ${currentChips.length === 0 ? "" : 'mb-1 md:mb-2'}`}>
                <span className="label-text flex items-center gap-2 text-sm md:text-base">
                    {Icon && <Icon className="w-4 h-4 text-primary" />} 
                    {label}
                </span>
                <span className="text-[10px] md:text-xs text-base-content/50 font-normal">{currentChips.length}/{maxLimit}</span>
            </label>

            {/* 🚨 FIX: Gap tighter on mobile */}
            <div className={"flex flex-wrap gap-1.5 md:gap-2 mb-3 md:mb-4 w-full"}>
                {currentChips.length === 0 ? (
                    <span className="text-base-content/40 text-xs md:text-sm italic py-1 md:py-2">{emptyMessage}</span>
                ) : (
                    currentChips.map((chipItem, index) => (
                        // 🚨 THE FIX: 'py-4' hata kar 'py-1 md:py-1.5' kar diya hai taaki chip box jaisa bada na lage
                        <div key={index} className="badge badge-primary badge-outline gap-1 py-1 md:py-1.5 px-2.5 md:px-3 text-xs md:text-sm font-medium animate-fade-in-up max-w-full h-auto min-h-[28px] md:min-h-[32px]">
                            <span className="truncate">{chipItem}</span>
                            <button type="button" onClick={() => handleRemoveChip(index)} className="hover:bg-primary/20 hover:text-primary rounded-full p-0.5 md:p-1 transition-colors ml-1 shrink-0 focus:outline-none">
                                <X className="w-3 h-3 md:w-3.5 md:h-3.5" />
                            </button>
                        </div>
                    ))
                )}
            </div>

            <div className="flex gap-2 w-full">
                <input
                    id={`${fieldName}-input`}
                    type="text"
                    // 🚨 FIX: h-10 min-h-0 for crisp mobile inputs
                    className={`input input-bordered h-10 md:h-12 min-h-0 flex-1 min-w-0 outline-none focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all text-sm md:text-base ${displayError ? 'input-error' : ''}`}
                    placeholder={isMaxLimitReached ? limitReachedPlaceholder : placeholder}
                    value={chip}
                    disabled={isMaxLimitReached}
                    onChange={(e) => {
                        const val = e.target.value;
                        setChip(val);
                        if (val.trim().length > maxCharLength) setChipError(charLimitErrorMsg);
                        else setChipError("");
                    }}
                    onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddChip(e); } }}
                />
                <button type="button" onClick={handleAddChip} disabled={isMaxLimitReached || chip.trim() === ""} className="btn btn-primary btn-square h-10 min-h-0 w-10 md:h-12 md:w-12 shrink-0 shadow-lg shadow-primary/20 focus:outline-none p-0">
                    <Plus className="w-4 h-4 md:w-5 md:h-5" />
                </button>
            </div>
            {displayError && <span className="text-error text-[10px] md:text-xs mt-1.5 md:mt-2 ml-1 animate-pulse">{displayError}</span>}
        </div>
    );
}

export default ChipInput;