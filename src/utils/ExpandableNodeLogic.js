// src/utils/ExpandableNodeLogic.js

export function createExpandableLogic(parentId, childNodes) {
  return `
    var expanded_${parentId} = false;

    network.on("click", function(params) {
      if (params.nodes[0] === "${parentId}") {
        expanded_${parentId} = !expanded_${parentId};

        if (expanded_${parentId}) {
          // ADD CHILDREN
          var newNodes = [
            ${childNodes
              .map(
                c => `
            {
              id: "${c.id}",
              label: "${c.label}",
              title: \`${c.title}\`,
              color: "${c.color}",
              shape: "dot"
            }
          `
              )
              .join(",")}
          ];

          newNodes.forEach(function(n) {
            nodes.add(n);
            edges.add({ from: "${parentId}", to: n.id });
          });

        } else {
          // REMOVE CHILDREN
          var ids = [${childNodes.map(c => `"${c.id}"`).join(",")}];
          ids.forEach(id => nodes.remove({ id }));
        }
      }
    });
  `;
}
