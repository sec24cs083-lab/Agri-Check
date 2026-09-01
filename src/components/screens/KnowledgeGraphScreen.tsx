import React, { useEffect, useRef } from 'react';
import { Language, KnowledgeGraph } from '../../types/agri';

interface KnowledgeGraphScreenProps {
  language: Language;
  graph: KnowledgeGraph;
  onNavigate: (screen: string) => void;
}

const NODE_COLORS: Record<string, { fill: string; stroke: string; text: string; emoji: string }> = {
  farmer: { fill: '#1a5e1a', stroke: '#22c55e', text: '#ffffff', emoji: '👨‍🌾' },
  farm: { fill: '#166534', stroke: '#4ade80', text: '#ffffff', emoji: '🌾' },
  crop: { fill: '#15803d', stroke: '#86efac', text: '#ffffff', emoji: '🍅' },
  disease: { fill: '#991b1b', stroke: '#f87171', text: '#ffffff', emoji: '🦠' },
  weather: { fill: '#1e3a5f', stroke: '#60a5fa', text: '#ffffff', emoji: '🌤️' },
  prediction: { fill: '#5b21b6', stroke: '#a78bfa', text: '#ffffff', emoji: '🤖' },
  feedback: { fill: '#065f46', stroke: '#34d399', text: '#ffffff', emoji: '✅' },
  location: { fill: '#7c3aed', stroke: '#c4b5fd', text: '#ffffff', emoji: '📍' },
};

const LAYOUT: Record<string, { x: number; y: number }> = {
  farmer_1: { x: 50, y: 12 },
  farm_1: { x: 50, y: 28 },
  crop_tomato: { x: 25, y: 45 },
  disease_eb: { x: 50, y: 62 },
  disease_lb: { x: 80, y: 45 },
  weather_hum: { x: 50, y: 80 },
  pred_101: { x: 75, y: 62 },
  feedback_1: { x: 75, y: 80 },
  loc_salem: { x: 20, y: 28 },
};

export const KnowledgeGraphScreen: React.FC<KnowledgeGraphScreenProps> = ({ language, graph, onNavigate }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  const getNodePos = (nodeId: string) => {
    const layout = LAYOUT[nodeId];
    if (!layout) return { x: 50, y: 50 };
    return layout;
  };

  const getPixelPos = (nodeId: string, width: number, height: number) => {
    const { x, y } = getNodePos(nodeId);
    return { px: (x / 100) * width, py: (y / 100) * height };
  };

  return (
    <div className="pb-6 space-y-4">
      {/* Header */}
      <div className="rounded-2xl p-4" style={{ background: 'linear-gradient(135deg, #0f3d0f, #1a5e1a)' }}>
        <p className="text-xs text-green-300 uppercase tracking-wider font-semibold">Knowledge Graph</p>
        <h2 className="text-white font-black text-lg mt-0.5">Farm Intelligence Network</h2>
        <div className="flex gap-3 mt-2">
          <span className="text-green-300 text-xs">{graph.nodes.length} nodes</span>
          <span className="text-green-500 text-xs">•</span>
          <span className="text-green-300 text-xs">{graph.edges.length} relationships</span>
        </div>
      </div>

      {/* SVG Graph */}
      <div className="rounded-2xl overflow-hidden" style={{ background: '#0a1628', border: '1px solid #1a3a5c', height: '380px' }}>
        <svg ref={svgRef} width="100%" height="100%" viewBox="0 0 400 380">
          <defs>
            <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#4ade80" opacity="0.7" />
            </marker>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>

          {/* Grid background */}
          {Array.from({ length: 20 }).map((_, i) => (
            <line key={`v${i}`} x1={i * 20} y1="0" x2={i * 20} y2="380" stroke="#162032" strokeWidth="1" />
          ))}
          {Array.from({ length: 20 }).map((_, i) => (
            <line key={`h${i}`} x1="0" y1={i * 20} x2="400" y2={i * 20} stroke="#162032" strokeWidth="1" />
          ))}

          {/* Edges */}
          {graph.edges.map((edge, i) => {
            const from = getPixelPos(edge.source, 400, 380);
            const to = getPixelPos(edge.target, 400, 380);
            const midX = (from.px + to.px) / 2;
            const midY = (from.py + to.py) / 2;
            return (
              <g key={i}>
                <line
                  x1={from.px} y1={from.py} x2={to.px} y2={to.py}
                  stroke="#22c55e" strokeWidth="1.5" opacity="0.5"
                  strokeDasharray="4,3"
                  markerEnd="url(#arrowhead)"
                />
                <text x={midX} y={midY - 4} textAnchor="middle" fill="#4ade80" fontSize="7" opacity="0.8"
                  fontFamily="monospace">
                  {edge.label}
                </text>
              </g>
            );
          })}

          {/* Nodes */}
          {graph.nodes.map((node) => {
            const { px, py } = getPixelPos(node.id, 400, 380);
            const colors = NODE_COLORS[node.type] || NODE_COLORS.farmer;
            return (
              <g key={node.id} style={{ cursor: 'pointer' }}>
                {/* Glow ring */}
                <circle cx={px} cy={py} r="18" fill={colors.stroke} opacity="0.15" filter="url(#glow)" />
                {/* Main circle */}
                <circle cx={px} cy={py} r="14" fill={colors.fill} stroke={colors.stroke} strokeWidth="1.5" />
                {/* Emoji */}
                <text x={px} y={py + 4} textAnchor="middle" fontSize="11">{colors.emoji}</text>
                {/* Label below */}
                <text x={px} y={py + 28} textAnchor="middle" fill="#a0aec0" fontSize="7.5" fontWeight="600"
                  fontFamily="sans-serif">
                  {node.label.length > 14 ? node.label.slice(0, 14) + '…' : node.label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Legend */}
      <div className="rounded-2xl p-4" style={{ background: 'white', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
        <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Legend</p>
        <div className="grid grid-cols-2 gap-2">
          {Object.entries(NODE_COLORS).map(([type, colors]) => (
            <div key={type} className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 text-xs"
                style={{ background: colors.fill, border: `1.5px solid ${colors.stroke}` }}>
                {colors.emoji}
              </div>
              <span className="text-xs text-gray-600 capitalize">{type}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Relationships */}
      <div className="rounded-2xl p-4" style={{ background: 'white', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
        <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Key Relationships</p>
        <div className="space-y-2">
          {graph.edges.map((edge, i) => {
            const srcNode = graph.nodes.find(n => n.id === edge.source);
            const tgtNode = graph.nodes.find(n => n.id === edge.target);
            return (
              <div key={i} className="flex items-center gap-2 text-xs py-1">
                <span className="text-gray-700 font-semibold">{srcNode?.label || edge.source}</span>
                <span className="px-2 py-0.5 rounded-full text-green-700 text-xs font-mono"
                  style={{ background: '#dcfce7' }}>→ {edge.label} →</span>
                <span className="text-gray-700 font-semibold">{tgtNode?.label || edge.target}</span>
              </div>
            );
          })}
        </div>
      </div>

      <button onClick={() => onNavigate('continualLearning')}
        className="w-full py-3.5 rounded-2xl text-white font-bold text-sm transition-all active:scale-95"
        style={{ background: 'linear-gradient(135deg, #22c55e, #16a34a)' }}>
        🤖 View Continual Learning Status
      </button>
    </div>
  );
};
