import React, { ErrorInfo, ReactElement, memo } from 'react';

import SomethingWentWrong from '../SomethingWentWrong';

interface Props {
  children: ReactElement;
}

interface State {
  error: Error | null;
  errorInfo: ErrorInfo | null;
  hasError: boolean;
}

class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { error: null, errorInfo: null, hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({
      error,
      errorInfo,
    });
  }

  render() {
    const { hasError, error, errorInfo } = this.state;
    const { children } = this.props;

    if (hasError) {
      return <SomethingWentWrong error={error} errorInfo={errorInfo} />;
    }

    return children;
  }
}

export default memo(ErrorBoundary);
