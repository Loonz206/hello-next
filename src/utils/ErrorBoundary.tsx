import { Component, ReactNode } from "react";

interface Props {
  children?: ReactNode;
  fallback?: ReactNode | null;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
    const { fallback } = props;
    if (fallback === undefined) {
      console.warn("ErrorBoundary fallback not set!");
    }
  }

  static getDerivedStateFromError(): Partial<State> {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    const message = `Unable to render: ${error} ${JSON.stringify(errorInfo)}`;
    console.error(message);
  }

  render() {
    const { hasError } = this.state;
    const { children, fallback } = this.props;
    if (hasError) {
      return fallback ?? <div>Something went wrong.</div>;
    }
    return children;
  }
}

export default ErrorBoundary;
