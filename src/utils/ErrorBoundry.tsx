import { Component, ReactNode } from "react";

interface Props {
  children?: ReactNode;
  fallback?: ReactNode;
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

  static getDerivedStateFromError(error: Error) {
    // Update state so the next render will show the fallback UI.
    if (error) {
      return { hasError: true };
    }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    const message = `Unable to render: ${error} ${JSON.stringify(errorInfo)}`;
    console.error(message);
  }

  render() {
    const { hasError } = this.state;
    const { children = null, fallback = null } = this.props;
    if (hasError) {
      return fallback;
    }
    return children;
  }
}

export default ErrorBoundary;
