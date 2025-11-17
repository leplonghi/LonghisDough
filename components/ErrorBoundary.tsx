





import React, { Component, ReactNode, ErrorInfo } from 'react';
import { ExclamationCircleIcon } from './IconComponents';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  // FIX: Switched to a constructor for state initialization.
  // The class property syntax was causing TypeScript errors where `this.state`,
  // `this.setState`, and `this.props` were not found on the component instance in this environment.
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
    // FIX: Manually bind `this` for the event handler because arrow function class properties are not correctly configured in the build setup.
    this.handleTryAgain = this.handleTryAgain.bind(this);
  }

  static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("DoughLabPro ErrorBoundary caught an error:", error, errorInfo);
  }

  // FIX: Converted from an arrow function class property to a regular method to avoid issues with unsupported class property syntax.
  handleTryAgain() {
    this.setState({ hasError: false });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="mx-auto my-8 max-w-2xl rounded-2xl bg-white p-6 shadow-lg ring-1 ring-slate-200/50 dark:border dark:border-slate-700/50 dark:bg-slate-800 sm:p-10 text-center">
          <ExclamationCircleIcon className="mx-auto h-12 w-12 text-red-500" />
          <h1 className="mt-4 text-2xl font-bold text-slate-900 dark:text-white">Ops! Algo deu errado.</h1>
          <p className="mt-2 text-slate-600 dark:text-slate-300">
            Algo deu errado ao carregar esta parte do DoughLabPro. Atualize a página ou tente novamente. Se o erro persistir, entre em contato com o suporte.
          </p>
          <div className="mt-6 flex justify-center gap-4">
            <button
              onClick={() => window.location.reload()}
              className="rounded-md bg-slate-200 py-2 px-4 text-sm font-semibold text-slate-700 hover:bg-slate-300 dark:bg-slate-600 dark:text-slate-200 dark:hover:bg-slate-500"
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

    return this.props.children;
  }
}

export default ErrorBoundary;