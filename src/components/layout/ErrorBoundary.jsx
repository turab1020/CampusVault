import React from 'react'

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props)
        this.state = { hasError: false, error: null }
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error }
    }

    componentDidCatch(error, errorInfo) {
        console.error('CampusVault Error Boundary Caught:', error, errorInfo)
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-warning relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                    <div className="relative z-10 max-w-2xl w-full bg-white border-4 border-black p-8 md:p-12 shadow-[12px_12px_0px_#000] rotate-1">
                        <h1 className="font-heading text-6xl md:text-8xl text-black uppercase tracking-tighter mb-4 leading-none">
                            CRASH.
                        </h1>
                        <h2 className="font-heading text-2xl md:text-3xl uppercase tracking-tighter text-danger mb-6">
                            SYSTEM FAILURE DETECTED
                        </h2>
                        <div className="bg-black text-white p-4 font-mono text-sm overflow-x-auto mb-8 border-l-8 border-danger">
                            {this.state.error?.toString() || 'Unknown Fatal Error'}
                        </div>
                        <p className="font-sans font-bold text-lg text-black mb-8">
                            Our brutalist architecture sustained critical damage. Hit the button below to force a full system reboot.
                        </p>
                        <button 
                            onClick={() => window.location.replace('/')}
                            className="bg-primary text-black font-heading text-xl md:text-2xl uppercase p-4 px-8 border-4 border-black hover:-translate-y-2 transition-transform shadow-[6px_6px_0px_#000] active:translate-y-0 active:shadow-none w-full"
                        >
                            <span className="tracking-widest mix-blend-multiply">REBOOT SYSTEM</span>
                        </button>
                    </div>
                </div>
            )
        }

        return this.props.children
    }
}

export default ErrorBoundary
