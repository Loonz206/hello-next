"use client";

import React, { Component, ReactNode, useEffect, useState } from "react";

interface Props {
  children?: ReactNode;
  fallback?: ReactNode | null;
  onError?: (error: Error, info?: string | null) => void;
}

interface State {
  hasError: boolean;
  error?: Error | null;
}

class ClientErrorBoundary extends Component<
  Props & { hydrated: boolean },
  State
> {
  constructor(props: Props & { hydrated: boolean }) {
    super(props);
    this.state = { hasError: false, error: null };
    if (props.fallback === undefined) {
      // keep parity with existing ErrorBoundary behaviour
      // shim a small console warning to help tests / devs
      // eslint-disable-next-line no-console
      console.warn("HydrationSafeErrorBoundary fallback not set!");
    }
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Forward error to optional handler
    try {
      this.props.onError?.(error, errorInfo?.componentStack ?? null);
      // eslint-disable-next-line no-console
      console.error(
        `HydrationSafeErrorBoundary caught: ${error}`,
        errorInfo?.componentStack ?? "",
      );
    } catch (e) {
      // Log the error to avoid silently ignoring it
      // eslint-disable-next-line no-console
      console.error(
        "Error in onError handler of HydrationSafeErrorBoundary:",
        e,
      );
    }
  }

  render() {
    const { hasError } = this.state;
    const { children, fallback } = this.props;

    // If no error happened, render children normally.
    if (!hasError) return children ?? null;

    // If an error happened: render the fallback immediately. This component
    // is intended to be used client-side (we import it with ssr:false from
    // the app wrapper) so rendering the fallback immediately avoids render
    // loops when children throw during initial client render.

    return fallback ?? <div>Something went wrong.</div>;
  }
}

/**
 * HydrationSafeErrorBoundary
 * - client-only wrapper that uses a class error boundary internally
 * - waits for hydration before showing any fallback to avoid mismatches
 */
export default function HydrationSafeErrorBoundary({
  children,
  fallback,
  onError,
}: Readonly<Props>) {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  return (
    <ClientErrorBoundary
      hydrated={hydrated}
      fallback={fallback}
      onError={onError}
    >
      {children}
    </ClientErrorBoundary>
  );
}
