export default function AnimatedInkDiagram() {
  return (
    <svg
      className="animated-ink-diagram"
      viewBox="0 0 420 180"
      role="img"
      aria-label="Hand drawn diagram connecting projects, open source, data, and writing"
    >
      <defs>
        <filter id="ink-wobble">
          <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="2" seed="8" />
          <feDisplacementMap in="SourceGraphic" scale="1.8" />
        </filter>
      </defs>
      <g filter="url(#ink-wobble)" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path
          d="M28 44C48 27 111 26 136 44C162 63 145 92 91 93C41 93 7 68 28 44Z"
          className="ink-line ink-muted"
        />
        <path
          d="M254 45C279 27 347 28 376 48C405 69 383 99 323 98C268 97 225 67 254 45Z"
          className="ink-line ink-muted"
        />
        <path
          d="M102 124C131 105 207 107 236 128C265 149 238 173 174 173C114 173 70 145 102 124Z"
          className="ink-line ink-muted"
        />
        <path
          d="M143 64C176 57 211 57 254 64"
          className="ink-line ink-muted"
        />
        <path
          d="M300 97C280 111 258 123 235 135"
          className="ink-line ink-muted"
        />
        <path
          d="M62 108C83 113 102 120 122 131"
          className="ink-line ink-muted"
        />
        <path
          d="M49 158C85 151 122 151 158 159"
          className="ink-line ink-muted"
        />
      </g>
      <g className="diagram-labels">
        <text x="54" y="62">projects</text>
        <text x="286" y="65">open source</text>
        <text x="136" y="146">data trails</text>
        <text x="42" y="127">writing</text>
      </g>
    </svg>
  );
}
