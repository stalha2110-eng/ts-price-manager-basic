import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Plus, FolderOpen, AlertCircle, Save, Info } from 'lucide-react';
import { Category } from '../types';
import { Button } from './ui/Button';

interface CategoryAddModalProps {
  onClose: () => void;
  onSave: (names: string[]) => void;
  currentCategories: Category[];
  t: any;
}

export function CategoryAddModal({ onClose, onSave, currentCategories, t }: CategoryAddModalProps) {
  const [inputValue, setInputValue] = useState('');
  const [pendingCategories, setPendingCategories] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleAddPending = () => {
    if (!inputValue.trim()) return;

    // Split by commas or new lines
    const parsed = inputValue
      .split(/[\n,]+/)
      .map(item => item.trim())
      .filter(item => item.length > 0);

    const duplicates: string[] = [];
    const valid: string[] = [];

    parsed.forEach(name => {
      const lowerName = name.toLowerCase();
      // Check if already exists in saved categories
      const existsInSaved = currentCategories.some(c => c.name.toLowerCase() === lowerName);
      // Check if already exists in pending list
      const existsInPending = pendingCategories.some(p => p.toLowerCase() === lowerName);
      const existsInParsed = valid.some(v => v.toLowerCase() === lowerName);

      if (existsInSaved || existsInPending || existsInParsed) {
        duplicates.push(name);
      } else {
        valid.push(name);
      }
    });

    if (duplicates.length > 0) {
      setError(`Notice: Some categories like "${duplicates.slice(0, 2).join(', ')}" were ignored as they already exist.`);
    } else {
      setError(null);
    }

    if (valid.length > 0) {
      setPendingCategories(prev => [...prev, ...valid]);
      setInputValue('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleAddPending();
    }
  };

  const removePending = (index: number) => {
    setPendingCategories(prev => prev.filter((_, i) => i !== index));
  };

  const handleConfirm = () => {
    if (pendingCategories.length === 0) {
      setError('Please add at least one category.');
      return;
    }
    onSave(pendingCategories);
    onClose();
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
    >
      <motion.div 
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 20 }}
        className="w-full max-w-lg bg-[var(--card)] rounded-[2.5rem] border border-[var(--border)] shadow-2xl p-6 md:p-8 relative overflow-hidden"
      >
        <div className="absolute -right-24 -top-24 h-56 w-56 rounded-full bg-[var(--primary)]/10 blur-3xl pointer-events-none" />
        
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-[var(--primary)]/10 text-[var(--primary)] flex items-center justify-center shadow-inner">
              <FolderOpen size={20} />
            </div>
            <div>
              <h3 className="text-lg font-black uppercase tracking-tight text-[var(--foreground)]">
                Add Categories
              </h3>
              <p className="text-[10px] font-black uppercase tracking-widest opacity-40">
                Bulk Management Terminal
              </p>
            </div>
          </div>
          <button 
            type="button"
            onClick={onClose} 
            className="rounded-full h-8 w-8 hover:bg-white/10 flex items-center justify-center border border-white/5 transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        <div className="space-y-6">
          {/* Current Categories List (Mini view) */}
          <div className="space-y-2">
            <h4 className="text-[9px] font-black uppercase tracking-widest opacity-40">Active Categories ({currentCategories.length})</h4>
            <div className="flex flex-wrap gap-1.5 max-h-[80px] overflow-y-auto pr-1 no-scrollbar">
              {currentCategories.map(cat => (
                <span 
                  key={cat.id} 
                  className="px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider rounded-lg bg-[var(--background)] border border-[var(--border)] opacity-60"
                >
                  {cat.name}
                </span>
              ))}
            </div>
          </div>

          {/* Quick instructions */}
          <div className="flex items-start gap-2 p-3.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-bold leading-relaxed">
            <Info size={14} className="shrink-0 mt-0.5" />
            <div>
              Type multiple category names separated by commas (e.g. <span className="text-white">Beverages, Grains, Sweets</span>) or press Enter after each one to batch stage them.
            </div>
          </div>

          {/* Input Area */}
          <div className="space-y-2">
            <label className="text-[9px] font-black uppercase tracking-widest opacity-40">Staging Input</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type name & hit Enter or Comma..."
                className="flex-1 rounded-xl border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-xs focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)] focus:outline-none shadow-sm transition-all"
              />
              <Button 
                type="button" 
                onClick={handleAddPending}
                className="rounded-xl px-4"
              >
                <Plus size={16} />
              </Button>
            </div>
          </div>

          {/* Staged Category Chips */}
          <div className="space-y-2">
            <h4 className="text-[9px] font-black uppercase tracking-widest opacity-40">Staged to Sync ({pendingCategories.length})</h4>
            <div className="min-h-[70px] max-h-[140px] overflow-y-auto rounded-2xl bg-[var(--background)] border border-[var(--border)] p-3 flex flex-wrap gap-2 items-start content-start no-scrollbar">
              <AnimatePresence>
                {pendingCategories.length === 0 ? (
                  <div className="text-[10px] text-center w-full py-4 opacity-30 font-bold uppercase tracking-wider">
                    Staging area empty.
                  </div>
                ) : (
                  pendingCategories.map((name, idx) => (
                    <motion.span
                      key={idx}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="inline-flex items-center gap-1.5 px-3 py-1 text-[10px] font-extrabold uppercase tracking-wide rounded-xl bg-[var(--primary)]/10 text-[var(--primary)] border border-[var(--primary)]/20"
                    >
                      {name}
                      <button
                        type="button"
                        onClick={() => removePending(idx)}
                        className="hover:bg-[var(--primary)]/20 rounded-full p-0.5 text-[var(--primary)]/70 hover:text-[var(--primary)] transition-colors"
                      >
                        <X size={10} strokeWidth={3} />
                      </button>
                    </motion.span>
                  ))
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Feedback/Errors */}
          {error && (
            <div className="flex items-start gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-[10px] font-bold">
              <AlertCircle size={14} className="shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1 rounded-2xl py-3 text-[10px] font-black uppercase tracking-widest border-white/5"
            >
              Abort
            </Button>
            <Button
              type="button"
              variant="primary"
              onClick={handleConfirm}
              disabled={pendingCategories.length === 0}
              className="flex-1 rounded-2xl py-3 text-[10px] font-black uppercase tracking-widest gap-2"
            >
              <Save size={14} /> Commit & Sync
            </Button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
