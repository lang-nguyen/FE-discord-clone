import { ChevronDown, Plus } from 'lucide-react';
import { cn } from '@/shared/lib/utils';
import { useState, useRef, useEffect } from 'react';

const ChannelCategory = ({ 
    title,
    defaultExpanded = true,
    onAdd,
    children 
}) => {
    const contentRef = useRef(null);
    const isFirstRender = useRef(true);
    const [isExpanded, setIsExpanded] = useState(defaultExpanded);
    const [height, setHeight] = useState(defaultExpanded ? 'auto' : 0);
    const [showContent, setShowContent] = useState(defaultExpanded);

    const handleToggle = () => {
        setIsExpanded(prev => !prev);
    };

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        let timeoutId;
        let frameId;

        if (isExpanded) {
            setShowContent(true);
            setHeight(contentRef.current?.scrollHeight || 'auto');
        } else {
            setHeight(contentRef.current?.scrollHeight || 0);
            frameId = requestAnimationFrame(() => {
                setHeight(0);
            });
            timeoutId = setTimeout(() => {
                setShowContent(false);
            }, 200);
        }

        return () => {
            if (frameId) cancelAnimationFrame(frameId);
            if (timeoutId) clearTimeout(timeoutId);
        };
    }, [isExpanded]);

    return (
        <div className="mb-2">
            <div 
                className="flex items-center justify-between px-4 py-1 mb-[2px] cursor-pointer text-[#949BA4] hover:text-[#DBDEE1] transition-colors group"
                onClick={handleToggle}
            >
                <div className="flex items-center flex-1 min-w-0">
                    <ChevronDown 
                        className={cn(
                            "w-3 h-3 mr-0.5 transition-transform duration-200 stroke-[3]",
                            !isExpanded ? "-rotate-90" : ""
                        )} 
                    />
                    <span className="text-[11px] font-bold uppercase tracking-wide truncate">
                        {title}
                    </span>
                </div>
                
                {onAdd && (
                    <button 
                        onClick={(e) => {
                            e.stopPropagation();
                            onAdd();
                        }}
                        className="ml-1 p-0.5 rounded-sm hover:text-[#F2F3F5] transition-colors"
                        aria-label={`Add ${title}`}
                    >
                        <Plus className="w-4 h-4" />
                    </button>
                )}
            </div>
            
            <div 
                className={cn(
                    "overflow-hidden transition-[height] duration-200 ease-in-out",
                    !showContent && height === 0 ? "hidden" : "block"
                )}
                style={{ height }}
                onTransitionEnd={(e) => {
                    if (e.target === e.currentTarget && e.propertyName === 'height' && isExpanded) {
                        setHeight('auto');
                    }
                }}
            >
                <div ref={contentRef}>
                    {children}
                </div>
            </div>
        </div>
    );
};

export { ChannelCategory };
