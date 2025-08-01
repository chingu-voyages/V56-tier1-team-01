import * as React from 'react';
import * as SheetPrimitive from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

// Base sheet components
const Sheet = SheetPrimitive.Root;
const SheetTrigger = SheetPrimitive.Trigger;
const SheetClose = SheetPrimitive.Close;

// Portal for sheet content
const SheetPortal = ({ className, ...props }) => (
  <SheetPrimitive.Portal className={cn(className)} {...props} />
);
SheetPortal.displayName = SheetPrimitive.Portal.displayName;

// Overlay with glass effect
const SheetOverlayGlass = React.forwardRef(({ className, ...props }, ref) => (
  <SheetPrimitive.Overlay
    className={cn(
      'fixed inset-0 z-50',
      'bg-white/10 backdrop-blur-xl backdrop-saturate-200',
      'before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/20 before:to-transparent',
      'data-[state=open]:animate-in data-[state=closed]:animate-out',
      'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
      'data-[state=open]:scale-in-95 data-[state=closed]:scale-out-105',
      'transition-all duration-300 ease-out',
      className
    )}
    {...props}
    ref={ref}
  />
));
SheetOverlayGlass.displayName = SheetPrimitive.Overlay.displayName;

// Content of the sheet with customizable side and animations
const SheetContent = React.forwardRef(
  (
    { className, side = 'right', children, hideClose = false, ...props },
    ref
  ) => {
    const sideStyles = {
      right: 'inset-y-0 right-0 w-3/4 sm:max-w-sm border-l',
    };

    const slideAnimations = {
      right:
        'data-[state=open]:slide-in-from-right data-[state=closed]:slide-out-to-right',
    };

    return (
      <SheetPortal>
        <SheetOverlayGlass />
        <SheetPrimitive.Content
          ref={ref}
          className={cn(
            'fixed z-50 gap-4 bg-white p-6 shadow-lg transition ease-in-out',
            'data-[state=open]:animate-in data-[state=closed]:animate-out',
            'data-[state=closed]:duration-300 data-[state=open]:duration-500',
            sideStyles[side],
            slideAnimations[side],
            className
          )}
          {...props}
        >
          {children}

          {!hideClose && (
            <SheetPrimitive.Close className='absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none disabled:pointer-events-none'>
              <X className='h-4 w-4' />
              <span className='sr-only'>Close</span>
            </SheetPrimitive.Close>
          )}
        </SheetPrimitive.Content>
      </SheetPortal>
    );
  }
);

SheetContent.displayName = SheetPrimitive.Content.displayName;

// Exporting components for use in other parts of the application
export {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetPortal,
  SheetOverlayGlass,
};
