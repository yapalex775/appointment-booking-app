import React from 'react';
import { toast } from 'react-toastify';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.error('Error caught by ErrorBoundary:', error, errorInfo);
        toast.error('Something went wrong.');
    }

    render() {
        if (this.state.hasError) {
        return <h2 className='text-center mt-10 text-xl'>Oops, something broke.</h2>;
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
