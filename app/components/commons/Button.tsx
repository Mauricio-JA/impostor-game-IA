import { cn } from "@/lib/utils";
import {
  Button,
  type ButtonProps as BaseButtonProps,
} from "@/components/ui/button";
type ButtonProps = {
  children: React.ReactNode;
} & BaseButtonProps;
//======================================

export const Button_v1 = ({ children, ...rest }: ButtonProps) => {
  return (
    <Button
      {...rest}
      className={cn(
        "border-[0.5px] duration-200 rounded-sm bg-transparent",
        // light mode
        "shadow-[4px_4px_0px_0px_rgba(0,0,0)] active:shadow-none border-zinc-800 hover:bg-zinc-50 text-zinc-800",
        // dark mode
        "dark:border-zinc-600 dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,0.7)] active:dark:shadow-none dark:text-zinc-50 dark:bg-zinc-950",
        rest.className
      )}
    >
      {children}
    </Button>
  );
};

export const Button_v2 = ({ children, ...rest }: ButtonProps) => {
  return (
    <Button
      {...rest}
      className={cn(
        "group relative overflow-hidden ease-in-out hover:scale-105 hover:shadow-lg",
        // light mode
        "text-zinc-50 bg-gradient-to-tr from-zinc-900 to-zinc-700 hover:shadow-zinc-500/30",
        // dark mode
        "dark:text-zinc-900 dark:bg-gradient-to-tr dark:from-zinc-50 dark:to-zinc-100 dark:hover:shadow-zinc-700/30",
        rest.className
      )}
    >
      <span>{children}</span>
      <span className="absolute inset-0 flex size-full justify-center [transform:skew(-14deg)_translateX(-100%)] group-hover:duration-1000 group-hover:[transform:skew(-14deg)_translateX(100%)]">
        <span className="relative h-full w-8 bg-white/20 dark:bg-black/10" />
      </span>
    </Button>
  );
};
export const Button_v3 = ({ children, ...rest }: ButtonProps) => {
  return (
    <Button
      {...rest}
      className={cn(
        "relative overflow-hidden group hover:ring-2 hover:ring-offset-2 ease-out hover:bg-gradient-to-r",
        // light mode
        "bg-zinc-900 hover:from-zinc-800 hover:to-zinc-700 text-zinc-50 hover:ring-zinc-900",
        // dark mode
        "dark:bg-zinc-50 dark:hover:from-zinc-50 dark:hover:to-zinc-100 dark:text-zinc-800 dark:hover:ring-white dark:ring-offset-black",
        rest.className
      )}
    >
      <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white dark:bg-zinc-900 opacity-10 rotate-12 group-hover:-translate-x-60 ease"></span>
      <span className="relative">{children}</span>
    </Button>
  );
};

export const Button_v8 = ({ children, ...rest }: ButtonProps) => {
  return (
    <Button
      {...rest}
      className={cn(
        "shadow-embossed hover:shadow-none ease-out hover:scale-100 dark:bg-[#121212] dark:text-[#999999] bg-zinc-50 text-zinc-900",
        rest.className
      )}
    >
      {children}
    </Button>
  );
};
