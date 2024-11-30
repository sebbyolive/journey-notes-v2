type TypographyProps = {
  children: string;
  className?: string;
};

// Headings

export function H1({ children, className }: TypographyProps) {
  return (
    <h1 className="text-pretty text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl">
      {children}
    </h1>
  );
}

export function H2({ children, className }: TypographyProps) {
  return (
    <h2 className="scroll-m-20  pb-2 text-3xl font-semibold tracking-tight first:mt-0">
      {children}
    </h2>
  );
}

export function H3({ children, className }: TypographyProps) {
  return (
    <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
      {children}
    </h3>
  );
}

export function H4({ children, className }: TypographyProps) {
  return (
    <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
      {children}
    </h4>
  );
}

// Body

export function P({ children, className }: TypographyProps) {
  return (
    <p className="mt-8 text-pretty text-lg font-medium text-gray-500 sm:max-w-md sm:text-xl/8 lg:max-w-none">
      {children}{" "}
    </p>
  );
}
