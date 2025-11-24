import React, { Component, ErrorInfo, ReactNode } from 'react';
import { ExclamationCircleIcon } from './Icons';

interface ErrorBoundaryProps {
  children?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(_: Error): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("DoughLabPro ErrorBoundary caught an error:", error, errorInfo);
  }

  handleTryAgain = () => {
    this.setState({ hasError: false });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="mx-auto my-8 max-w-2xl rounded-2xl bg-white p-6 shadow-lg ring-1 ring-slate-200/50 sm:p-10 text-center">
          <ExclamationCircleIcon className="mx-auto h-12 w-12 text-red-500" />
          <h1 className="mt-4 text-2xl font-bold text-slate-900">Oops! Something went wrong.</h1>
          <p className="mt-2 text-slate-600">
            Something went wrong while loading this part of DoughLabPro. Refresh the page or try again. If the error persists, please contact support.
          </p>
          <div className="mt-6 flex justify-center gap-4">
            <button
              onClick={() => window.location.reload()}
              className="rounded-md bg-slate-200 py-2 px-4 text-sm font-semibold text-slate-700 hover:bg-slate-300"
            >
              Refresh Page
            </button>
            <button
              onClick={this.handleTryAgain}
              className="rounded-md bg-lime-500 py-2 px-4 text-sm font-semibold text-white shadow-sm hover:bg-lime-600"
            >
              Try Again
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}