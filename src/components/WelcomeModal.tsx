"use client";

import React, { useState, useEffect } from "react";

export default function WelcomeModal() {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    const hasSeen = localStorage.getItem("hasSeenWelcomeModal_v2");
    if (!hasSeen) {
      setIsOpen(true);
    }
  }, []);

  const handleClose = () => {
    localStorage.setItem("hasSeenWelcomeModal_v2", "true");
    setIsOpen(false);
  };

  if (!mounted || !isOpen) return null;

  return (
    <div style={overlayStyle} className="animate-modal-overlay">
      <div style={modalStyle} className="glass-panel animate-modal-content">
        {/* Animated Background Glow */}
        <div style={glowStyle} />

        {/* Trophy Icon */}
        <div style={iconContainerStyle}>
          <svg 
            width="32" 
            height="32" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="var(--accent-color)" 
            strokeWidth="2.2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
            <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
            <path d="M4 22h16" />
            <path d="M10 14.66V17c0 .55-.45 1-1 1H4v2h16v-2h-5c-.55 0-1-.45-1-1v-2.34" />
            <path d="M12 2a5 5 0 0 0-5 5v5a5 5 0 0 0 10 0V7a5 5 0 0 0-5-5z" />
          </svg>
        </div>

        {/* Message */}
        <h2 style={titleStyle}>
          Sınava Girecek Katip Adaylarına Başarılar Dilerim.
        </h2>

        {/* Notice */}
        <p style={subtitleStyle}>
          (Sitemizde eksiklerin ve sorunların farkındayız sizlerin çalışmaları bölünmemesi adına sınavdan sonra yayına alacağız.)
        </p>

        {/* Author Name */}
        <div style={authorContainerStyle}>
          <div style={lineStyle}></div>
          <span style={authorTextStyle}>Furkan Morova</span>
          <div style={lineStyle}></div>
        </div>

        {/* Action Button */}
        <button
          onClick={handleClose}
          style={buttonStyle}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-3px)";
            e.currentTarget.style.boxShadow = "0 8px 25px var(--accent-glow)";
            e.currentTarget.style.background = "linear-gradient(135deg, #4f46e5, #3b82f6)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 4px 15px var(--accent-glow)";
            e.currentTarget.style.background = "linear-gradient(135deg, #3b82f6, #1d4ed8)";
          }}
        >
          Teşekkür Ederiz
        </button>
      </div>
    </div>
  );
}

// Inline CSS Styles for absolute safety & self-containment
const overlayStyle: React.CSSProperties = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: 9999,
  backgroundColor: "rgba(10, 11, 15, 0.8)",
  backdropFilter: "blur(12px)",
  WebkitBackdropFilter: "blur(12px)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "1.5rem",
};

const modalStyle: React.CSSProperties = {
  position: "relative",
  width: "100%",
  maxWidth: "480px",
  padding: "3.5rem 2.5rem 3rem",
  textAlign: "center",
  borderRadius: "24px",
  background: "rgba(22, 25, 37, 0.95)",
  border: "1px solid rgba(255, 255, 255, 0.08)",
  boxShadow: "0 25px 60px -15px rgba(0, 0, 0, 0.7), 0 0 50px rgba(59, 130, 246, 0.15)",
  overflow: "hidden",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

const glowStyle: React.CSSProperties = {
  position: "absolute",
  top: "-15%",
  left: "50%",
  transform: "translateX(-50%)",
  width: "250px",
  height: "250px",
  borderRadius: "50%",
  background: "rgba(59, 130, 246, 0.25)",
  filter: "blur(60px)",
  pointerEvents: "none",
  zIndex: 0,
};

const iconContainerStyle: React.CSSProperties = {
  width: "72px",
  height: "72px",
  borderRadius: "50%",
  backgroundColor: "rgba(59, 130, 246, 0.08)",
  border: "1px solid rgba(59, 130, 246, 0.2)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: "2rem",
  position: "relative",
  zIndex: 1,
  boxShadow: "0 8px 20px rgba(59, 130, 246, 0.05)",
};

const titleStyle: React.CSSProperties = {
  fontSize: "1.75rem",
  fontWeight: "800",
  lineHeight: "1.4",
  color: "#ffffff",
  marginBottom: "1.5rem",
  letterSpacing: "-0.5px",
  position: "relative",
  zIndex: 1,
};

const subtitleStyle: React.CSSProperties = {
  fontSize: "0.95rem",
  fontWeight: "500",
  lineHeight: "1.6",
  color: "rgba(255, 255, 255, 0.6)",
  marginBottom: "2.5rem",
  position: "relative",
  zIndex: 1,
  maxWidth: "420px",
};

const authorContainerStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "12px",
  width: "100%",
  marginBottom: "3rem",
  position: "relative",
  zIndex: 1,
};

const authorTextStyle: React.CSSProperties = {
  fontSize: "1.1rem",
  fontWeight: "700",
  color: "var(--accent-color)",
  letterSpacing: "3px",
  whiteSpace: "nowrap",
};

const lineStyle: React.CSSProperties = {
  height: "1px",
  flex: 1,
  maxWidth: "30px",
  background: "linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.4), transparent)",
};

const buttonStyle: React.CSSProperties = {
  width: "100%",
  padding: "1rem 2rem",
  fontSize: "1.1rem",
  fontWeight: "700",
  color: "#ffffff",
  background: "linear-gradient(135deg, #3b82f6, #1d4ed8)",
  border: "none",
  borderRadius: "50px",
  cursor: "pointer",
  outline: "none",
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  boxShadow: "0 4px 15px var(--accent-glow)",
  position: "relative",
  zIndex: 1,
  letterSpacing: "0.5px",
};
