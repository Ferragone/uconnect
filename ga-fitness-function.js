// Define the function to optimize
const fitnessFunction = (x) => x * Math.sin(x);

// Parameters for the genetic algorithm
const populationSize = 20;
const generations = 100;
const mutationRate = 0.1;
const lowerBound = 0;
const upperBound = Math.PI * 10; // Example range [0, 10π]

// Initialize a random population
const initializePopulation = () => 
  Array.from({ length: populationSize }, () => Math.random() * (upperBound - lowerBound) + lowerBound);

// Evaluate fitness for the population
const evaluateFitness = (population) => 
  population.map((x) => ({ x, fitness: fitnessFunction(x) }));

// Select parents (roulette wheel selection)
const selectParents = (fitnessPopulation) => {
  const totalFitness = fitnessPopulation.reduce((sum, p) => sum + p.fitness, 0);
  const pick = Math.random() * totalFitness;
  let cumulativeFitness = 0;
  for (const individual of fitnessPopulation) {
    cumulativeFitness += individual.fitness;
    if (cumulativeFitness >= pick) {
      return individual.x;
    }
  }
  return fitnessPopulation[fitnessPopulation.length - 1].x; // Fallback
};

// Crossover (blend crossover)
const crossover = (parent1, parent2) => {
  const alpha = Math.random();
  return alpha * parent1 + (1 - alpha) * parent2;
};

// Mutation
const mutate = (value) => {
  if (Math.random() < mutationRate) {
    const mutation = (Math.random() - 0.5) * (upperBound - lowerBound) * 0.1; // Small mutation
    return Math.min(upperBound, Math.max(lowerBound, value + mutation));
  }
  return value;
};

// Run the genetic algorithm
const runGeneticAlgorithm = () => {
  let population = initializePopulation();
  for (let gen = 0; gen < generations; gen++) {
    const fitnessPopulation = evaluateFitness(population).sort((a, b) => b.fitness - a.fitness);
    const nextGeneration = [];

    // Elitism: Keep the best individual
    nextGeneration.push(fitnessPopulation[0].x);

    while (nextGeneration.length < populationSize) {
      const parent1 = selectParents(fitnessPopulation);
      const parent2 = selectParents(fitnessPopulation);
      let child = crossover(parent1, parent2);
      child = mutate(child);
      nextGeneration.push(child);
    }

    population = nextGeneration;
    const bestFitness = fitnessPopulation[0].fitness;
    console.log(`Generation ${gen + 1}: Best fitness = ${bestFitness.toFixed(4)}`);
  }

  const bestSolution = evaluateFitness(population).sort((a, b) => b.fitness - a.fitness)[0];
  console.log(`Best solution found: x = ${bestSolution.x.toFixed(4)}, fitness = ${bestSolution.fitness.toFixed(4)}`);
};

runGeneticAlgorithm();
