"use client";

import {
    AnimatePresence,
    motion,
    MotionConfig,
    MotionValue,
    Transition,
    useMotionValue,
    useSpring,
    useTransform
} from "framer-motion";
import { useEffect, useState } from "react";

// Utility function for className merging
function cn(...classes: (string | undefined | null | boolean)[]): string {
  return classes.filter(Boolean).join(" ");
}

// Icon components
function TbCommand({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3" />
    </svg>
  );
}

function TbSearch({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <circle cx="11" cy="11" r="8" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export interface TOC_INTERFACE {
  name: string;
  value?: string;
  icon?: React.ReactNode;
  description?: string;
}

interface Props {
  value?: TOC_INTERFACE;
  setValue?: (v: TOC_INTERFACE) => void;
  data: TOC_INTERFACE[];
  ref?: any;
  transition?: Transition;
  className?: string;
  lPrefix?: string;
}

const cKey = "command-palette";
const iKey = "command-items";

const CommandPalette = ({
  data,
  value: _v,
  setValue: _setValue,
  ref,
  className,
  lPrefix = "cmd",
  transition = { type: "spring", duration: 0.4, bounce: 0.1 }
}: Props) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(_v || data[0]);
  const [searchQuery, setSearchQuery] = useState("");
  const sp = useMotionValue(0);

  useEffect(() => {
    if (_v) {
      setValue(_v);
    }
  }, [_v]);

  // Keyboard shortcut handler
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "k") {
        event.preventDefault();
        setOpen((prev) => !prev);
        setSearchQuery("");
      }
      if (event.key === "Escape") {
        setOpen(false);
        setSearchQuery("");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Scroll progress tracking
  useEffect(() => {
    const c = ref?.current || window;

    const updateScrollProgress = () => {
      const scrollTop = c === window ? window.scrollY : c.scrollTop;
      const scrollHeight =
        c === window ? document.body.scrollHeight : c.scrollHeight;
      const clientHeight = c === window ? window.innerHeight : c.clientHeight;

      const progress = scrollTop / (scrollHeight - clientHeight) || 0;
      sp.set(Math.max(0, Math.min(1, progress)));
    };

    c.addEventListener("scroll", updateScrollProgress);
    updateScrollProgress();

    return () => {
      c.removeEventListener("scroll", updateScrollProgress);
    };
  }, [ref?.current, sp]);

  function handleSelect(newValue: TOC_INTERFACE) {
    setValue(newValue);
    _setValue?.(newValue);
    setOpen(false);
    setSearchQuery("");
  }

  // Filter data based on search query
  const filteredData = data.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <MotionConfig transition={transition}>
      {/* Backdrop */}
      <AnimatePresence mode="popLayout" initial={false}>
  {open && (
    <motion.div
      layoutId={`${lPrefix}-${cKey}`}
      className={cn(
        "absolute bottom-0 inset-x-0 mx-auto",
        "bg-black/95 backdrop-blur-md border border-gray-700 shadow-2xl rounded-2xl",
        "overflow-hidden"
      )}
      style={{
        // Dynamic island is about 130px, leave equal margin
        maxWidth: "calc(100% - 140px)", // <-- adjust for padding
      }}
      initial={{ height: 56, width: 380 }}
      animate={{ height: "auto", width: "calc(100% - 140px)" }}
      exit={{ height: 56, width: 380 }}
    >
      {/* content here */}
    </motion.div>
  )}
</AnimatePresence>

      {/* Fixed positioning container */}
      <div className="fixed bottom-6 left-0 right-0 z-50 flex justify-center">
        <div className="relative">
          {/* Collapsed Command Palette */}
          <motion.div
            role="button"
            aria-label="Open Command Palette"
            tabIndex={0}
            onClick={() => setOpen((prev) => !prev)}
            layoutId={`${lPrefix}-${cKey}`}
            className={cn(
              "cursor-pointer select-none bg-black/90 backdrop-blur-md border border-gray-700 shadow-2xl",
              "w-[320px] h-12 rounded-full flex items-center px-4",
              "hover:bg-black/95 transition-colors",
              className
            )}
          >
            <div className="flex items-center gap-3 flex-1">
              <ScrollProgressIndicator sp={sp} />
              <span className="text-gray-300 text-sm">
                {value?.name || "Search"}
              </span>
            </div>

            <div className="flex items-center gap-1 text-xs text-gray-500 bg-gray-800 px-2 py-1 rounded">
              <TbCommand className="w-3 h-3" />
              <span>K</span>
            </div>
          </motion.div>

          {/* Expanded Command Palette */}
          <AnimatePresence mode="popLayout" initial={false}>
            {open && (
              <motion.div
                layoutId={`${lPrefix}-${cKey}`}
                className={cn(
                  "absolute bottom-0 inset-x-0 mx-auto", // ✅ keep it centered
                  "w-[500px] bg-black/95 backdrop-blur-md border border-gray-700 shadow-2xl rounded-2xl",
                  "overflow-hidden"
                )}
                initial={{ height: 56, width: 380 }}
                animate={{ height: "auto", width: 500 }}
                exit={{ height: 56, width: 380 }}
              >
                {/* Search Header */}
                <div className="p-4 border-b border-gray-800">
                  <div className="flex items-center gap-3">
                    <ScrollProgressIndicator sp={sp} />
                    <input
                      type="text"
                      placeholder="Search navigation..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="flex-1 bg-transparent border-none outline-none text-white placeholder-gray-500"
                      autoFocus
                    />
                    <div className="flex items-center gap-1 text-xs text-gray-500 bg-gray-800 px-2 py-1 rounded">
                      <TbCommand className="w-3 h-3" />
                      <span>K</span>
                    </div>
                  </div>
                </div>

                {/* Command Items */}
                <motion.div
                  layoutId={`${lPrefix}-${iKey}`}
                  className="max-h-64 overflow-y-auto p-2"
                >
                  <CommandItems
                    data={filteredData}
                    setValue={handleSelect}
                    searchQuery={searchQuery}
                  />
                </motion.div>

                {/* Footer */}
                <div className="px-4 py-2 border-t border-gray-800 text-xs text-gray-500">
                  <div className="flex items-center justify-between">
                    <span>Navigate with ↑↓ arrows</span>
                    <ScrollPercentage sp={sp} />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </MotionConfig>
  );
};

function ScrollProgressIndicator({ sp }: { sp: MotionValue }) {
  const circum = 2 * Math.PI * 8;
  const strokeDashoffset = useTransform(sp, [0, 1], [circum, 0]);
  const springOffset = useSpring(strokeDashoffset, {
    stiffness: 400,
    damping: 40,
    mass: 0.8
  });

  return (
    <div className="relative w-4 h-4 flex-shrink-0">
      <svg
        width="16"
        height="16"
        viewBox="0 0 20 20"
        className="transform -rotate-90"
      >
        <motion.circle
          cx="10"
          cy="10"
          r="8"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray={circum}
          strokeDashoffset={springOffset}
          className="text-cyan-400"
        />
      </svg>
    </div>
  );
}

function CommandItems({
  data,
  setValue,
  searchQuery
}: {
  data: TOC_INTERFACE[];
  setValue: (v: TOC_INTERFACE) => void;
  searchQuery: string;
}) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    setSelectedIndex(0);
  }, [searchQuery]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowDown") {
        event.preventDefault();
        setSelectedIndex((prev) => Math.min(prev + 1, data.length - 1));
      } else if (event.key === "ArrowUp") {
        event.preventDefault();
        setSelectedIndex((prev) => Math.max(prev - 1, 0));
      } else if (event.key === "Enter" && data[selectedIndex]) {
        event.preventDefault();
        setValue(data[selectedIndex]);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [data, selectedIndex, setValue]);

  if (data.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500">
        No results found for "{searchQuery}"
      </div>
    );
  }

  return (
    <div className="space-y-1">
      {data.map((item, index) => (
        <motion.button
          key={item.value || item.name}
          onClick={() => setValue(item)}
          className={cn(
            "w-full text-left p-3 rounded-lg transition-all duration-200 flex items-center gap-3",
            "hover:bg-gray-800 focus:bg-gray-800 focus:outline-none",
            selectedIndex === index && "bg-gray-800 ring-1 ring-cyan-500/50"
          )}
          onMouseEnter={() => setSelectedIndex(index)}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.02 }}
        >
          {item.icon && (
            <div className="w-5 h-5 text-gray-400 flex-shrink-0">{item.icon}</div>
          )}
          <div className="flex-1 min-w-0">
            <div className="font-medium text-white text-sm">
              {highlightMatch(item.name, searchQuery)}
            </div>
            {item.description && (
              <div className="text-xs text-gray-500 mt-1">
                {highlightMatch(item.description, searchQuery)}
              </div>
            )}
          </div>
          {selectedIndex === index && (
            <div className="text-xs text-cyan-400 flex-shrink-0">↵</div>
          )}
        </motion.button>
      ))}
    </div>
  );
}

function ScrollPercentage({ sp }: { sp: MotionValue }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const unsubscribe = sp.on("change", (v) =>
      setProgress(Math.round(v * 100))
    );
    setProgress(Math.round(sp.get() * 100));
    return unsubscribe;
  }, [sp]);

  return <span>Scroll: {progress}%</span>;
}

function highlightMatch(text: string, query: string) {
  if (!query.trim()) return text;

  const index = text.toLowerCase().indexOf(query.toLowerCase());
  if (index === -1) return text;

  return (
    <>
      {text.slice(0, index)}
      <span className="bg-cyan-500/20 text-cyan-300">
        {text.slice(index, index + query.length)}
      </span>
      {text.slice(index + query.length)}
    </>
  );
}

export default CommandPalette;