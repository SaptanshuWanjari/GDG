"use client";
import React from "react";

// Types and Interfaces
interface SplitScreenProps {
  children: React.ReactNode;
  leftWeight?: number;
  rightWeight?: number;
  orientation?: "horizontal" | "vertical";
  className?: string;
}

interface LayoutSection {
  header?: React.ReactNode;
  sidebar?: React.ReactNode;
  content?: React.ReactNode;
  footer?: React.ReactNode;
}

// Configuration
const WEIGHT_TO_CLASS_MAP = {
  1: "w-1/4",
  2: "w-1/3",
  3: "w-1/2",
  4: "w-2/3",
  5: "w-3/4",
  6: "w-full",
} as const;

// Utility Functions
const getWidthClass = (weight: number): string => {
  return (
    WEIGHT_TO_CLASS_MAP[weight as keyof typeof WEIGHT_TO_CLASS_MAP] || "w-1/2"
  );
};

const parseChildren = (children: React.ReactNode): LayoutSection => {
  const childrenArray = React.Children.toArray(children);

  return {
    header: childrenArray[0] || null,
    sidebar: childrenArray[1] || null,
    content: childrenArray[2] || null,
    footer: childrenArray[3] || null,
  };
};

// Sub-components
const Header: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <header className="w-full bg-background border-b border-gray-200 shadow-sm text-foreground">
    {children}
  </header>
);

const Sidebar: React.FC<{
  children: React.ReactNode;
  width: string;
  className?: string;
}> = ({ children, width, className = "" }) => (
  <aside
    className={`${width} bg-background border-r border-gray-200 text-foreground ${className}`}
  >
    {children}
  </aside>
);

const MainContent: React.FC<{
  children: React.ReactNode;
  width: string;
  className?: string;
}> = ({ children, width, className = "" }) => (
  <main
    className={`${width} flex flex-col flex-1 bg-background text-foreground ${className}`}
  >
    <div className="flex-1 p-6">{children}</div>
  </main>
);

const Footer: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <footer className="w-full bg-background border-t border-gray-200 p-4 text-foreground">
    {children}
  </footer>
);

// Main SplitScreen Component
const SplitScreen: React.FC<SplitScreenProps> = ({
  children,
  leftWeight = 1,
  rightWeight = 3,
  orientation = "horizontal",
  className = "",
}) => {
  const sections = parseChildren(children);
  const leftWidthClass = getWidthClass(leftWeight);
  const rightWidthClass = getWidthClass(rightWeight);

  // Validation
  React.useEffect(() => {
    if (leftWeight + rightWeight > 6) {
      console.warn(
        "SplitScreen: Total weight exceeds maximum. Consider adjusting weights."
      );
    }
  }, [leftWeight, rightWeight]);

  const layoutClasses = orientation === "vertical" ? "flex-col" : "flex-row";

  return (
    <section className={`flex flex-col w-full min-h-screen ${className}`}>
      {/* Header Section */}
      {sections.header && <Header>{sections.header}</Header>}

      {/* Main Layout Area */}
      <div className={`flex flex-1 ${layoutClasses}`}>
        {/* Sidebar Section */}
        {sections.sidebar && (
          <Sidebar width={leftWidthClass} className="min-h-full">
            {sections.sidebar}
          </Sidebar>
        )}

        {/* Content Section */}
        {sections.content && (
          <MainContent
            width={sections.sidebar ? rightWidthClass : "w-full"}
            className="min-h-full"
          >
            {sections.content}
          </MainContent>
        )}
      </div>

      {/* Footer Section */}
      {sections.footer && <Footer>{sections.footer}</Footer>}
    </section>
  );
};

// Export with enhanced props for better usage
export default SplitScreen;
export type { SplitScreenProps, LayoutSection };
