import React from 'react';

export default class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { error: null };
        this.reset = this.reset.bind(this);
    }

    static getDerivedStateFromError(error) {
        return { error };
    }

    componentDidCatch(error, errorInfo) {
        // optional: report
        if (this.props.onError) this.props.onError(error, errorInfo);
    }

    componentDidUpdate(prevProps) {
        const { resetKeys } = this.props;
        if (!this.state.error || !resetKeys) return;
        // reset if any key changed
        const changed = Array.isArray(resetKeys) && Array.isArray(prevProps.resetKeys)
            ? resetKeys.length !== prevProps.resetKeys.length ||
            resetKeys.some((k, i) => k !== prevProps.resetKeys[i])
            : resetKeys !== prevProps.resetKeys;

        if (changed) this.reset();
    }

    reset() {
        this.setState({ error: null });
        if (this.props.onReset) this.props.onReset();
    }

    render() {
        const { error } = this.state;
        const { children, fallback, fallbackRender } = this.props;

        if (error) {
            if (typeof fallbackRender === 'function') {
                return fallbackRender({ error, reset: this.reset });
            }
            if (React.isValidElement(fallback)) {
                return React.cloneElement(fallback, { error, reset: this.reset });
            }
            return (
                <div role="alert">
                    Something went wrong.
                    <pre style={{ whiteSpace: 'pre-wrap' }}>{String(error?.message || error)}</pre>
                    <button onClick={this.reset}>Retry</button>
                </div>
            );
        }

        return children;
    }
}
