interface CalculatorShellProps {
  inputs: React.ReactNode;
  results: React.ReactNode;
}

export default function CalculatorShell({ inputs, results }: CalculatorShellProps) {
  return (
    <div className="grid gap-8 lg:grid-cols-[3fr_2fr]">
      <div>{inputs}</div>
      <div className="lg:sticky lg:top-20 lg:self-start">{results}</div>
    </div>
  );
}
