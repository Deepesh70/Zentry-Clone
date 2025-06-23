import React from 'react';

/**
 * VideoPreview Component
 * 
 * A simple wrapper component that renders its children directly.
 * This component serves as a passthrough container, allowing for potential future 
 * enhancements like video preview functionality while maintaining a consistent component structure.
 * 
 * @param {Object} props - Component props
 * @param {ReactNode} props.children - Child elements to be rendered within the component
 * @returns {ReactNode} The children passed to this component
 */
const VideoPreview = ({ children }) => {
  return <>{children}</>;
};

export default VideoPreview;