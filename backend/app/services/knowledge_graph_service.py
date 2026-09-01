import networkx as nx
import json
import os
from typing import Dict, Any, List

class KnowledgeGraphService:
    def __init__(self):
        self.graph = nx.DiGraph()
        self.file_path = "kg_data.json"
        self.load_graph()

    def add_prediction_to_graph(self, prediction: Any):
        farm_node = f"Farm_{prediction.farm_id}"
        pred_node = f"Prediction_{prediction.id}"
        disease_node = f"Disease_{prediction.disease.replace(' ', '_')}"

        self.graph.add_node(farm_node, label="Farm")
        self.graph.add_node(pred_node, label="Prediction", confidence=prediction.confidence)
        self.graph.add_node(disease_node, label="Disease", name=prediction.disease)

        self.graph.add_edge(farm_node, pred_node, relationship="has_prediction")
        self.graph.add_edge(pred_node, disease_node, relationship="detects")
        self.save_graph()

    def add_feedback_to_graph(self, feedback: Any):
        pred_node = f"Prediction_{feedback.prediction_id}"
        user_node = f"User_{feedback.user_id}"

        self.graph.add_node(user_node, label="Farmer")
        if pred_node in self.graph:
            self.graph.add_edge(user_node, pred_node, relationship=f"confirms_{feedback.feedback_type}")
            self.save_graph()

    def find_similar_cases(self, disease: str, crop: str, limit: int = 5) -> List[Dict[str, Any]]:
        # Simplified similarity search
        disease_node = f"Disease_{disease.replace(' ', '_')}"
        cases = []
        if disease_node in self.graph:
            for pred in self.graph.predecessors(disease_node):
                if self.graph.nodes[pred].get("label") == "Prediction":
                    cases.append({"prediction_id": pred, "disease": disease})
                    if len(cases) >= limit:
                        break
        return cases

    def get_related_context(self, farm_id: int) -> Dict[str, Any]:
        return self.get_graph_data(farm_id)

    def get_graph_data(self, farm_id: int = None) -> Dict[str, Any]:
        nodes = []
        edges = []
        for n, data in self.graph.nodes(data=True):
            nodes.append({"id": n, "label": data.get("label", "Unknown"), "properties": data})
        for u, v, data in self.graph.edges(data=True):
            edges.append({"source": u, "target": v, "relationship": data.get("relationship", "")})
        return {"nodes": nodes, "edges": edges}

    def save_graph(self):
        data = nx.node_link_data(self.graph)
        try:
            with open(self.file_path, "w") as f:
                json.dump(data, f)
        except Exception:
            pass

    def load_graph(self):
        if os.path.exists(self.file_path):
            try:
                with open(self.file_path, "r") as f:
                    data = json.load(f)
                self.graph = nx.node_link_graph(data)
            except Exception:
                self.graph = nx.DiGraph()

kg_service = KnowledgeGraphService()
