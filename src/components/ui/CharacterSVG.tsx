/* Character pulling a rope — illustrated 2D SVG */
export function CharacterSVG({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 320 480"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Illustrated character pulling a rope"
      role="img"
    >
      {/* Shadow */}
      <ellipse cx="160" cy="455" rx="60" ry="12" fill="#000" opacity="0.3" />

      {/* Shoes */}
      <ellipse cx="118" cy="440" rx="22" ry="9" fill="#1a1a1a" />
      <ellipse cx="175" cy="445" rx="22" ry="9" fill="#1a1a1a" />

      {/* Trousers */}
      <rect x="110" y="310" width="38" height="130" rx="12" fill="#1f2937" />
      <rect x="155" y="310" width="38" height="135" rx="12" fill="#1f2937" />

      {/* Belt */}
      <rect x="108" y="308" width="90" height="10" rx="3" fill="#374151" />
      <rect x="145" y="306" width="20" height="14" rx="2" fill="#D7FF00" opacity="0.9" />

      {/* Body / T-shirt */}
      <rect x="100" y="210" width="110" height="110" rx="20" fill="#1e3a5f" />

      {/* Logo on shirt */}
      <text
        x="130"
        y="272"
        fontFamily="monospace"
        fontSize="9"
        fill="#D7FF00"
        fontWeight="bold"
        letterSpacing="1"
      >
        BXU
      </text>

      {/* Left arm — pulling back */}
      <g id="arm-left" style={{ transformOrigin: "108px 230px" }}>
        <rect
          x="52"
          y="220"
          width="62"
          height="24"
          rx="12"
          fill="#1e3a5f"
          transform="rotate(-20 52 220)"
        />
        {/* Left hand */}
        <circle cx="52" cy="232" r="13" fill="#c8956a" />
        <rect x="40" y="240" width="10" height="10" rx="3" fill="#c8956a" />
        <rect x="52" y="240" width="10" height="10" rx="3" fill="#c8956a" />
      </g>

      {/* Right arm — pulling back */}
      <g id="arm-right" style={{ transformOrigin: "200px 230px" }}>
        <rect
          x="195"
          y="220"
          width="62"
          height="24"
          rx="12"
          fill="#1e3a5f"
          transform="rotate(20 262 232)"
        />
        {/* Right hand */}
        <circle cx="262" cy="232" r="13" fill="#c8956a" />
        <rect x="250" y="240" width="10" height="10" rx="3" fill="#c8956a" />
        <rect x="262" y="240" width="10" height="10" rx="3" fill="#c8956a" />
      </g>

      {/* Neck */}
      <rect x="143" y="190" width="24" height="28" rx="8" fill="#c8956a" />

      {/* Head */}
      <ellipse cx="156" cy="168" rx="46" ry="50" fill="#c8956a" />

      {/* Hair */}
      <ellipse cx="156" cy="124" rx="46" ry="22" fill="#1a0a00" />
      <rect x="110" y="118" width="92" height="22" rx="8" fill="#1a0a00" />

      {/* Eyes */}
      <ellipse cx="140" cy="162" rx="7" ry="8" fill="white" />
      <ellipse cx="172" cy="162" rx="7" ry="8" fill="white" />
      <ellipse cx="142" cy="164" rx="4" ry="5" fill="#1a1a1a" />
      <ellipse cx="174" cy="164" rx="4" ry="5" fill="#1a1a1a" />
      {/* Eye shine */}
      <circle cx="143" cy="162" r="1.5" fill="white" />
      <circle cx="175" cy="162" r="1.5" fill="white" />

      {/* Eyebrows — determined expression */}
      <path d="M133 152 Q140 148 147 152" stroke="#1a0a00" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <path d="M165 152 Q172 148 179 152" stroke="#1a0a00" strokeWidth="2.5" strokeLinecap="round" fill="none" />

      {/* Nose */}
      <ellipse cx="156" cy="176" rx="4" ry="3" fill="#b07c56" />

      {/* Mouth — determined */}
      <path d="M145 188 Q156 193 167 188" stroke="#8a5c3a" strokeWidth="2" strokeLinecap="round" fill="none" />

      {/* Ear */}
      <ellipse cx="110" cy="168" rx="8" ry="11" fill="#c8956a" />
      <ellipse cx="202" cy="168" rx="8" ry="11" fill="#c8956a" />
    </svg>
  );
}
