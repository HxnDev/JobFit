import { Component } from 'react';

/**
 * Keeps a WebGL failure (no GPU, context loss, blocked canvas) from taking
 * down the app — we just fall back to the CSS gradient backdrop.
 */
class CanvasErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { failed: false };
  }

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error) {
    // eslint-disable-next-line no-console
    console.warn('Aurora background disabled:', error?.message);
  }

  render() {
    if (this.state.failed) return null;
    return this.props.children;
  }
}

export default CanvasErrorBoundary;
