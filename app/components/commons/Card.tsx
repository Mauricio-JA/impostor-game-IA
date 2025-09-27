import { cn } from "@/lib/utils";

type CardProps = {
  title?: string;
  description?: string;
  children?: React.ReactNode;
  className?: string;
};

const CardBody = ({ className = "p-4", title = "", description = "" }) => (
  <div className={cn("text-start", className)}>
    <h3 className="text-lg font-bold mb-1 text-gray-900 dark:text-gray-100">
      {title}
    </h3>
    <p className="text-gray-700 dark:text-gray-300">{description}</p>
  </div>
);

export const SimpleCardV1 = ({
  children,
  className: cardClassName,
  ...props
}: CardProps) => {
  const Ellipses = () => {
    const sharedClasses =
      "rounded-full outline outline-8 dark:outline-gray-950 sm:my-6 md:my-8 size-1 my-4 outline-gray-50 bg-green-400";
    return (
      <div className="absolute z-0 grid h-full w-full items-center gap-8 lg:grid-cols-2">
        <section className="absolute z-0 grid h-full w-full grid-cols-2 place-content-between">
          <div className={`${sharedClasses} -mx-[2.5px]`}></div>
          <div className={`${sharedClasses} -mx-[2px] place-self-end`}></div>
          <div className={`${sharedClasses} -mx-[2.5px]`}></div>
          <div className={`${sharedClasses} -mx-[2px] place-self-end`}></div>
        </section>
      </div>
    );
  };
  const Container = ({ children }: { children: React.ReactNode }) => (
    <div className="relative mx-auto w-full rounded-lg border border-dashed border-zinc-300 px-4 dark:border-zinc-800 sm:px-6 md:px-8">
      <div className="absolute left-0 top-4 -z-0 h-px w-full bg-zinc-400 dark:bg-zinc-700 sm:top-6 md:top-8"></div>
      <div className="absolute bottom-4 left-0 z-0 h-px w-full bg-zinc-400 dark:bg-zinc-700 sm:bottom-6 md:bottom-8"></div>
      <div className="relative w-full border-x border-zinc-400 dark:border-zinc-700">
        <Ellipses />
        <div className={cn("relative z-20 mx-auto py-8", cardClassName)}>
          {children}
        </div>
      </div>
    </div>
  );
  return (
    <div>
      <Container>
        <div className="p-3 w-full center">
          {children ? children : <CardBody {...props} />}
        </div>
      </Container>
    </div>
  );
};

export const SimpleCardV7 = ({ children, className, ...props }: CardProps) => {
  const Icon = ({
    className: iconClassName,
    ...rest
  }: React.HTMLAttributes<HTMLDivElement>) => {
    return (
      <div
        {...rest}
        className={cn(
          "dark:border-zinc-200 border-zinc-700 size-6 absolute",
          iconClassName
        )}
      />
    );
  };
  return (
    <div
      className={cn(
        "border-2 border-zinc-100 dark:border-zinc-700 relative rounded-md",
        className
      )}
    >
      <Icon className="-top-0.5 -left-0.5 border-l-2 border-t-2 rounded-tl-md" />
      <Icon className="-top-0.5 -right-0.5 border-r-2 border-t-2 rounded-tr-md" />
      <Icon className="-bottom-0.5 -left-0.5 border-l-2 border-b-2 rounded-bl-md" />
      <Icon className="-bottom-0.5 -right-0.5 border-r-2 border-b-2 rounded-br-md" />
      {children ? (
        <div className="p-6">{children}</div>
      ) : (
        <CardBody className="p-6" {...props} />
      )}
    </div>
  );
};
