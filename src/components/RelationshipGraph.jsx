import React, { useEffect, useRef } from "react";
import "../styles/relationshipGraph.css";

export default function RelationshipGraph({ data }) {
  const containerRef = useRef(null);
  const networkRef = useRef(null);

  useEffect(() => {
    if (!window.vis || !window.vis.Network) {
      console.error("vis-network not loaded. Check CDN in index.html");
      return;
    }

    const { Network, DataSet } = window.vis;

    /* --------------------------------------------------
       SAFE DATA
    -------------------------------------------------- */
    const name = data?.identity?.name || "Unknown";
    const coreFamily = data?.family?.core || [];
    const extendedFamily = data?.family?.extended || [];
    const associates = data?.associates || [];
    const neighbors = data?.neighbors || [];

    /* --------------------------------------------------
       DATASETS
    -------------------------------------------------- */
    const nodes = new DataSet([
      {
        id: "ROOT",
        label: name,
        shape: "box",
        color: "#2563eb",
        font: { size: 20, color: "#ffffff", bold: true },
      },
      {
        id: "FAMILY",
        label: "Family ▶",
        shape: "box",
        color: "#16a34a",
      },
      {
        id: "ASSOCIATES",
        label: "Associates ▶",
        shape: "box",
        color: "#f59e0b",
      },
      {
        id: "NEIGHBORS",
        label: "Neighbors ▶",
        shape: "box",
        color: "#a855f7",
      },
    ]);

    const edges = new DataSet([
      { from: "ROOT", to: "FAMILY" },
      { from: "ROOT", to: "ASSOCIATES" },
      { from: "ROOT", to: "NEIGHBORS" },
    ]);

    /* --------------------------------------------------
       STATE
    -------------------------------------------------- */
    const expanded = {
      familyGroups: false,
      core: false,
      extended: false,
      associates: false,
      neighbors: false,
    };

    /* --------------------------------------------------
       NETWORK INIT
    -------------------------------------------------- */
    const network = new Network(
      containerRef.current,
      { nodes, edges },
      {
        layout: {
          hierarchical: {
            enabled: true,
            direction: "LR",
            levelSeparation: 180,
            nodeSpacing: 160,
          },
        },
        interaction: {
          dragNodes: false,
          zoomView: true,
          dragView: true,
        },
        physics: false,
        nodes: {
          borderWidth: 0,
          shapeProperties: { borderRadius: 6 },
          font: { color: "#ffffff", size: 14 },
        },
        edges: {
          color: "#6b7280",
          smooth: { type: "cubicBezier" },
        },
      }
    );

    networkRef.current = network;

    /* --------------------------------------------------
       CLICK HANDLER
    -------------------------------------------------- */
    network.on("click", ({ nodes: clicked }) => {
      if (!clicked.length) return;
      const id = clicked[0];

      /* FAMILY GROUP */
      if (id === "FAMILY") {
        const show = !expanded.familyGroups;

        if (show) {
          nodes.add([
            {
              id: "CORE_FAMILY",
              label: "Core Family ▶",
              shape: "box",
              color: "#22c55e",
            },
            {
              id: "EXT_FAMILY",
              label: "Extended Family ▶",
              shape: "box",
              color: "#86efac",
            },
          ]);
          edges.add([
            { from: "FAMILY", to: "CORE_FAMILY" },
            { from: "FAMILY", to: "EXT_FAMILY" },
          ]);
        } else {
          nodes.remove(["CORE_FAMILY", "EXT_FAMILY"]);
        }

        expanded.familyGroups = show;
        expanded.core = false;
        expanded.extended = false;
        return;
      }

      /* CORE FAMILY */
      if (id === "CORE_FAMILY") {
        const show = !expanded.core;

        if (show) {
          coreFamily.forEach((f, i) => {
            nodes.add({
              id: `core-${i}`,
              label: `${f.name}\n(${f.relation})`,
              shape: "dot",
              size: 14,
              color: "#4ade80",
            });
            edges.add({ from: "CORE_FAMILY", to: `core-${i}` });
          });
        } else {
          coreFamily.forEach((_, i) => nodes.remove(`core-${i}`));
        }

        expanded.core = show;
        return;
      }

      /* EXTENDED FAMILY */
      if (id === "EXT_FAMILY") {
        const show = !expanded.extended;

        if (show) {
          extendedFamily.forEach((f, i) => {
            nodes.add({
              id: `ext-${i}`,
              label: `${f.name}\n(${f.relation})`,
              shape: "dot",
              size: 14,
              color: "#86efac",
            });
            edges.add({ from: "EXT_FAMILY", to: `ext-${i}` });
          });
        } else {
          extendedFamily.forEach((_, i) => nodes.remove(`ext-${i}`));
        }

        expanded.extended = show;
        return;
      }

      /* ASSOCIATES */
      if (id === "ASSOCIATES") {
        const show = !expanded.associates;

        if (show) {
          associates.forEach((a, i) => {
            nodes.add({
              id: `assoc-${i}`,
              label: `${a.name}\n${a.location || ""}`,
              shape: "dot",
              size: 14,
              color: "#fde68a",
            });
            edges.add({ from: "ASSOCIATES", to: `assoc-${i}` });
          });
        } else {
          associates.forEach((_, i) => nodes.remove(`assoc-${i}`));
        }

        expanded.associates = show;
        return;
      }

      /* NEIGHBORS */
      if (id === "NEIGHBORS") {
        const show = !expanded.neighbors;

        if (show) {
          neighbors.forEach((n, i) => {
            nodes.add({
              id: `neigh-${i}`,
              label: `${n.name}\n${n.address || ""}`,
              shape: "dot",
              size: 14,
              color: "#e9d5ff",
            });
            edges.add({ from: "NEIGHBORS", to: `neigh-${i}` });
          });
        } else {
          neighbors.forEach((_, i) => nodes.remove(`neigh-${i}`));
        }

        expanded.neighbors = show;
      }
    });

    return () => network.destroy();
  }, [data]);

  /* --------------------------------------------------
     UI
  -------------------------------------------------- */
  return (
    <div className="bg-gray-900 rounded-xl border border-gray-700 shadow-lg">
      <div className="px-4 py-3 border-b border-gray-700">
        <h3 className="text-lg font-semibold text-white">
          🌳 Hierarchical Relationship Network
        </h3>
        <p className="text-xs text-gray-400">
          Click nodes to expand or collapse relationships
        </p>
      </div>

      {/* GRAPH WINDOW */}
      <div
        ref={containerRef}
        style={{
          height: "600px",
          width: "100%",
          background: "#1f2937",
        }}
      />
    </div>
  );
}
