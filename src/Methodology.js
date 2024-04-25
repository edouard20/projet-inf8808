import React, { useRef } from 'react';
import './Methodology.css';

const Methodology = ({ onClose }) => {
    const contentRef = useRef(null);
  return (
    <>
      <div className="overlay" onClick={onClose}></div>
      <div className="methodology-container">
        <button className="close-btn" onClick={onClose}>&times;</button>
        <div className="content" ref={contentRef}> 
        <h1>Méthodologie de Visualisation des Données de Formule 1</h1>
        
        <div id="source">
          <h2>1. Source des Données</h2>
          <p>Les données pour les visualisations sont extraites de <a href="https://www.kaggle.com/datasets/rohanrao/formula-1-world-championship-1950-2020">Kaggle</a>, sous forme de fichiers CSV initialement, puis converties en JSON pour les raisons suivantes :</p>
          <ul>
            <li><strong>Intercompatibilité :</strong> Le format JSON est largement reconnu pour sa facilité d'intégration avec les technologies web, en particulier avec JavaScript et les bibliothèques de visualisation comme D3.js.</li>
            <li><strong>Structure de données :</strong> JSON supporte des structures de données complexes telles que les objets imbriqués et les tableaux, ce qui est idéal pour représenter des données relationnelles complexes.</li>
            <li><strong>Performance :</strong> L'analyse des fichiers JSON est généralement plus rapide que celle des CSV dans les navigateurs, améliorant ainsi la réactivité des visualisations interactives.</li>
          </ul>
        </div>

        <div id="preprocessing">
          <h2>2. Prétraitement des Données</h2>
          <p>Le traitement des données est essentiel pour assurer la qualité et la pertinence des visualisations présentées. Les étapes de ce traitement incluent :</p>
          <ul>
            <li>Nettoyage des Données : Élimination des entrées incomplètes ou erronées.</li>
            <li>Transformation des Données : Normalisation et agrégation des attributs pour faciliter les comparaisons.</li>
            <li>Enrichissement des Données : Ajout de données contextuelles pour améliorer les visualisations géographiques.</li>
         </ul>
        </div>

        <div id="integration">
          <h2>3. Intégration des Données</h2>
          <p>Les données prétraitées sont intégrées dans des scripts de visualisation spécifiques à chaque type de graphique.</p>
        </div>

        <div id="objectives">
          <h2>4. Objectifs des Visualisations</h2>
          <p>Les visualisations visent à offrir une compréhension profonde des tendances historiques et actuelles de la Formule 1, permettant aux utilisateurs de découvrir des insights à travers des représentations visuelles interactives.</p>
        </div>

        <div id="accessibility">
          <h2>5. Accessibilité et Interaction</h2>
          <p>Les visualisations sont conçues pour être accessibles et interactives, permettant aux utilisateurs de filtrer, de trier et de naviguer à travers les données selon leurs préférences.</p>
        </div>
      </div>
      </div>
    </>
  );
};

export default Methodology;
