type QueryErrorProps = {
  message: string;
  onRetry: () => void;
};

export default function QueryError({ message, onRetry }: QueryErrorProps) {
  return (
    <div
      role="alert"
      className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
    >
      <span>{message}</span>
      <button
        type="button"
        onClick={onRetry}
        className="ml-3 font-bold underline"
      >
        আবার চেষ্টা করুন
      </button>
    </div>
  );
}
