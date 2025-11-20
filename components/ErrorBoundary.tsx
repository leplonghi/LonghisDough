import React, { ErrorInfo, ReactNode } from 'react';
import { ExclamationCircleIcon } from './IconComponents';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("DoughLabPro ErrorBoundary caught an error:", error, errorInfo);
  }

  handleTryAgain = () => {
    this.setState({ hasError: false });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="mx-auto my-8 max-w-2xl rounded-2xl bg-white p-6 shadow-lg ring-1 ring-slate-200/50 sm:p-10 text-center">
          <ExclamationCircleIcon className="mx-auto h-12 w-12 text-red-500" />
          <h1 className="mt-4 text-2xl font-bold text-slate-900">Ops! Algo deu errado.</h1>
          <p className="mt-2 text-slate-600">
            Algo deu errado ao carregar esta parte do DoughLabPro. Atualize a página ou tente novamente.
          </p>
          <div className="mt-6 flex justify-center gap-4">
            <button
              onClick={() => window.location.reload()}
              className="rounded-md bg-slate-200 py-2 px-4 text-sm font-semibold text-slate-700 hover:bg-slate-300"
            >
              Atualizar
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