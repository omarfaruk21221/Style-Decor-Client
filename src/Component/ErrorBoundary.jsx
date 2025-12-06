import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        // Log error details
        console.error('Error caught by boundary:', error, errorInfo);
        this.setState({
            error,
            errorInfo
        });
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-base-100 to-base-200 p-4">
                    <div className="glass-effect p-8 rounded-3xl max-w-2xl w-full text-center">
                        <div className="text-error text-6xl mb-6">⚠️</div>
                        <h1 className="text-4xl font-bold mb-4">Oops! Something went wrong</h1>
                        <p className="text-base-content/70 mb-6">
                            We're sorry for the inconvenience. The application encountered an unexpected error.
                        </p>

                        {process.env.NODE_ENV === 'development' && this.state.error && (
                            <details className="text-left bg-base-200 p-4 rounded-lg mb-6">
                                <summary className="cursor-pointer font-semibold mb-2">Error Details (Development Only)</summary>
                                <pre className="text-sm overflow-auto text-error">
                                    {this.state.error.toString()}
                                    {this.state.errorInfo && this.state.errorInfo.componentStack}
                                </pre>
                            </details>
                        )}

                        <button
                            onClick={() => window.location.href = '/'}
                            className="btn btn-primary btn-lg"
                        >
                            Go Back Home
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
