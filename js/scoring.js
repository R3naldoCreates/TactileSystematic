/**
 * Tactile Systematic Scoring Engine
 * 
 * 8 Dimensions:
 * 1. Tactile Index (TI) - Physical/tangible feeling weight=0.25
 * 2. Systematic Logic (SL) - Logical coherence weight=0.20
 * 3. Competence Porn (CP) - Skill display weight=0.15
 * 4. Dialogue Utility (DU) - Dialogue effectiveness weight=0.15
 * 5. Momentum Velocity (MV) - Pacing/engagement weight=0.15
 * 6. Industrial Grit (IG) - Raw authenticity weight=0.10
 * 7. Meta Penalty (MP) - Self-awareness deduction (capped at -5)
 * 8. Nihilism Cap (NC) - Existential weight ceiling
 * 
 * Formula:
 *   Raw = (TI*0.25) + (SL*0.20) + (CP*0.15) + (DU*0.15) + (MV*0.15) + (IG*0.10)
 *   MetaAdjusted = Raw - min(MP, 5)
 *   NihilismCapped = MetaAdjusted * max(1 - NC/100, 0.5)
 *   Final = round(NihilismCapped * 10) / 10
 */

const ScoringEngine = {
  // Dimension weights
  weights: {
    tactileIndex: 0.25,
    systematicLogic: 0.20,
    competencePorn: 0.15,
    dialogueUtility: 0.15,
    momentumVelocity: 0.15,
    industrialGrit: 0.10
  },

  // Dimension display names and descriptions
  dimensions: {
    tactileIndex: {
      name: 'Tactile Index',
      shortName: 'Tactility',
      description: 'The physical, tangible feeling of the film. How much does it make you FEEL the textures, weight, and presence of the world it creates?',
      weight: 0.25,
      color: '#ef4444'
    },
    systematicLogic: {
      name: 'Systematic Logic',
      shortName: 'Logic',
      description: 'Internal logical consistency and coherence. Does the world follow its own rules? Are consequences earned?',
      weight: 0.20,
      color: '#f97316'
    },
    competencePorn: {
      name: 'Competence Porn',
      shortName: 'Competence',
      description: 'The joy of watching skilled people do skilled things. Craft, expertise, and mastery on display.',
      weight: 0.15,
      color: '#eab308'
    },
    dialogueUtility: {
      name: 'Dialogue Utility',
      shortName: 'Dialogue',
      description: 'Every line earns its place. No wasted words. Dialogue that reveals character, advances plot, or both.',
      weight: 0.15,
      color: '#22c55e'
    },
    momentumVelocity: {
      name: 'Momentum Velocity',
      shortName: 'Momentum',
      description: 'Pacing that pulls you forward. Not just "fast" — the RIGHT speed for the story being told.',
      weight: 0.15,
      color: '#3b82f6'
    },
    industrialGrit: {
      name: 'Industrial Grit',
      shortName: 'Grit',
      description: 'Raw, unpolished authenticity. The feeling that this world exists with or without the camera.',
      weight: 0.10,
      color: '#8b5cf6'
    }
  },

  // Special dimensions (penalty/cap)
  specialDimensions: {
    metaPenalty: {
      name: 'Meta Penalty',
      shortName: 'Meta',
      description: 'Self-awareness that breaks immersion. Winking at the audience. "Aren\'t we clever?" moments. Max deduction: -5 points.',
      max: 5,
      color: '#ec4899'
    },
    nihilismCap: {
      name: 'Nihilism Cap',
      shortName: 'Nihilism',
      description: 'How much the film\'s existential weight limits its ceiling. 0=unaffected, 100=halved. Floor is 50% of score.',
      max: 100,
      color: '#6b7280'
    }
  },

  /**
   * Calculate final score from dimension values
   * @param {Object} scores - Object with dimension keys and 0-10 values
   * @returns {Object} - { final, raw, metaAdjusted, nihilismCapped, breakdown }
   */
  calculateFinalScore(scores) {
    const w = this.weights;
    
    // Calculate weighted raw score
    const raw = (
      (scores.tactileIndex || 0) * w.tactileIndex +
      (scores.systematicLogic || 0) * w.systematicLogic +
      (scores.competencePorn || 0) * w.competencePorn +
      (scores.dialogueUtility || 0) * w.dialogueUtility +
      (scores.momentumVelocity || 0) * w.momentumVelocity +
      (scores.industrialGrit || 0) * w.industrialGrit
    );

    // Apply meta penalty (capped at -5)
    const metaPenalty = Math.min(scores.metaPenalty || 0, 5);
    const metaAdjusted = raw - metaPenalty;

    // Apply nihilism cap (floor is 50% of score)
    const nihilismRaw = scores.nihilismCap || 0;
    const nihilismFactor = Math.max(1 - nihilismRaw / 100, 0.5);
    const nihilismCapped = metaAdjusted * nihilismFactor;

    // Round to 1 decimal
    const final = Math.round(Math.max(0, nihilismCapped) * 10) / 10;

    return {
      final,
      raw: Math.round(raw * 100) / 100,
      metaAdjusted: Math.round(metaAdjusted * 100) / 100,
      nihilismCapped: Math.round(nihilismCapped * 100) / 100,
      metaPenalty: Math.round(metaPenalty * 100) / 100,
      nihilismFactor: Math.round(nihilismFactor * 1000) / 1000,
      breakdown: {
        tactileContribution: Math.round((scores.tactileIndex || 0) * w.tactileIndex * 100) / 100,
        logicContribution: Math.round((scores.systematicLogic || 0) * w.systematicLogic * 100) / 100,
        competenceContribution: Math.round((scores.competencePorn || 0) * w.competencePorn * 100) / 100,
        dialogueContribution: Math.round((scores.dialogueUtility || 0) * w.dialogueUtility * 100) / 100,
        momentumContribution: Math.round((scores.momentumVelocity || 0) * w.momentumVelocity * 100) / 100,
        gritContribution: Math.round((scores.industrialGrit || 0) * w.industrialGrit * 100) / 100
      }
    };
  },

  /**
   * Get a score tier label
   */
  getScoreTier(score) {
    if (score >= 9.0) return { label: 'Brilliant', color: '#fbbf24' };
    if (score >= 7.0) return { label: 'Great', color: '#22c55e' };
    if (score >= 5.0) return { label: 'Watchable', color: '#facc15' };
    if (score >= 4.0) return { label: 'Low Watchable', color: '#eab308' };
    return { label: 'Discard', color: '#ef4444' };
  },

  /**
   * Calculate similarity between two score profiles
   */
  calculateSimilarity(profileA, profileB) {
    const dims = ['tactileIndex', 'systematicLogic', 'competencePorn', 
                  'dialogueUtility', 'momentumVelocity', 'industrialGrit'];
    let sumSqDiff = 0;
    for (const d of dims) {
      const diff = (profileA[d] || 0) - (profileB[d] || 0);
      sumSqDiff += diff * diff;
    }
    // Convert from Euclidean distance to similarity (0-1)
    const maxDist = Math.sqrt(6 * 100); // max possible distance
    return Math.round((1 - Math.sqrt(sumSqDiff) / maxDist) * 100) / 100;
  },

  /**
   * Get genre compatibility score for a movie given user's genre weights
   */
  getGenreCompatibility(movieGenres, userGenreWeights) {
    if (!movieGenres || !userGenreWeights) return 0;
    
    let totalWeight = 0;
    let matchedWeight = 0;
    
    for (const [genre, weight] of Object.entries(userGenreWeights)) {
      if (weight <= 0) continue; // OFF genres excluded
      totalWeight += weight;
      if (movieGenres.includes(genre)) {
        matchedWeight += weight;
      }
    }
    
    return totalWeight > 0 ? matchedWeight / totalWeight : 0;
  }
};
