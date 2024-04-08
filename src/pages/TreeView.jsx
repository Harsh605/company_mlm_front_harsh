import { treeData } from "@/DummyData/Admin/TreeData";
import "../css/tree.css";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const Member = ({ member }) => (
  <div className="member-view-box">
    <div className="member-image">
      <img src={member.imageUrl} alt="Member" />
      <div className="member-details">
        <h3>{member.label}</h3>
      </div>
    </div>
  </div>
);

const GenealogyTree = ({ data }) => {
  const [treeData, setTreeData] = useState(data);

  const renderNode = (node) => (
    <li key={node.id}>
      <a
        onClick={(e) => {
          e.preventDefault(), toggleNode(node);
        }}
      >
        <Member member={node} />
      </a>
      {node.children.length > 0 && (
        <ul className={node.isOpen ? "active" : ""}>
          {node.children.map((child) => renderNode(child))}
        </ul>
      )}
    </li>
  );

  const toggleNode = (node) => {
    const updatedTreeData = toggleNodeInTree(treeData, node);
    setTreeData(updatedTreeData);
  };

  const toggleNodeInTree = (tree, targetNode) => {
    if (tree.id === targetNode.id) {
      return { ...tree, isOpen: !tree.isOpen };
    }
    if (tree.children) {
      return {
        ...tree,
        children: tree.children.map((child) =>
          toggleNodeInTree(child, targetNode)
        ),
      };
    }
    return tree;
  };

  return (
    <div className="genealogy-body genealogy-scroll">
      <div className="genealogy-tree">
        <ul>{treeData.map((node) => renderNode(node))}</ul>
      </div>
    </div>
  );
};

export default function TreeView() {
  const { t } = useTranslation();
  return (
    <div className="panel flex h-full flex-1 flex-col space-y-8 rounded-md border-2 p-4  md:p-8">
      <div>
        <div className="flex flex-col justify-between space-y-2 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              {t(`My Team`)}
            </h2>
            <p className="text-muted-foreground">
              {t(`Here is the Tree View of My Team.`)}
            </p>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-x-2 py-4">
        <GenealogyTree data={treeData} />
      </div>
    </div>
  );
}
