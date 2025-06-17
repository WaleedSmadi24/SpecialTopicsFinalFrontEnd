import React from 'react';
import { useLoading } from '../context/LoadingContext';
import './CSS/LoadingOverlay.css';

const LoadingOverlay = () => {
  const { loading } = useLoading();

  if (!loading) return null;

  return (
    <div className="loading-overlay">
      <div className="spinner" />
    </div>
  );
};

export default LoadingOverlay;
