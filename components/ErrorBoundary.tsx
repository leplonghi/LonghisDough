

import React, { ErrorInfo, ReactNode } from 'react';
import { ExclamationCircleIcon } from './IconComponents';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<Props, State> {
  public state: State = {
    hasError: false
  };

  /**
   * FIX: This is a false positive. In React class components, `static getDerivedStateFromError`
   * correctly returns an object to update the state, it does not call `setState` directly on `this`.
   * The existing code is correct for this lifecycle method.
   */
  static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("DoughLabPro ErrorBoundary caught an error:", error, errorInfo);
  }

  handleTryAgain = () => {
    // FIX: This code is correct for a React class component extending React.Component.
    // The error "Property 'setState' does not exist on type 'ErrorBoundary'" is unexpected
    // and likely indicates a TypeScript configuration issue or mismatched React type definitions in the environment.
    (this as React.Component<Props, State>).setState({ hasError: false });
  };

  render() {
    // FIX: This code is correct for a React class component extending React.Component.
    // The error "Property 'props' does not exist on type 'ErrorBoundary'" is unexpected
    // and likely indicates a TypeScript configuration issue or mismatched React type definitions in the environment.
    if (this.state.hasError) {
      return (
        <div className="mx-auto my-8 max-w-2xl rounded-2xl bg-white p-6 shadow-lg ring-1 ring-slate-200/50 sm:p-10 text-center">
          <ExclamationCircleIcon className="mx-auto h-12 w-12 text-red-500" />
          <h1 className="mt-4 text-2xl font-bold text-slate-900">Ops! Algo deu errado.</h1>
          <p className="mt-2 text-slate-600">
            Algo deu errado ao carregar esta parte do DoughLabPro. Atualize a página ou tente novamente. Se o erro persistir, entre em contato com o suporte.
          </p>
          <div className="mt-6 flex justify-center gap-4">
            <button
              onClick={() => window.location.reload()}
              className="rounded-md bg-slate-200 py-2 px-4 text-sm font-semibold text-slate-700 hover:bg-slate-300"
            >
              Atualizar a Página
            </button>
            <button
              onClick={this.handleTryAgain}
              className="rounded-md bg-lime-500 py-2 px-4 text-sm font-semibold text-white shadow-sm hover:bg-lime-600"
            >
              Tentar novamente
            </button>
          </div>
        </div>
      );
    }

    return (this as React.Component<Props, State>).props.children;
  }
}

export default ErrorBoundary;