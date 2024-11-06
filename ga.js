// Example usage
const fitnessScores = [
    { id: 1, fitness: 2 },
    { id: 2, fitness: 1 },
    { id: 3, fitness: 3 }
];

const posts = [
    { id: 1, content: "Exploring genetic algorithms for optimization." },
    { id: 2, content: "Search techniques in artificial intelligence." },
    { id: 3, content: "Understanding the principles of genetic algorithms." }
];

const selectedPosts = tournamentSelection(posts, fitnessScores, 2);
console.log(selectedPosts);

// Crossover (recombination) of posts to create a new generation
function crossover(post1, post2) {
    const newKeywords = post1.keywords.map((keyword, index) => 
        Math.random() > 0.5 ? keyword : post2.keywords[index] || keyword
    ).filter(Boolean);
    
    return {
        id: null, // New post will have a new ID
        keywords: newKeywords
    };
}

// Example usage
const post1 = {
    keywords: ["genetic algorithm", "optimization"]
};

const post2 = {
    keywords: ["artificial intelligence", "search"]
};

const newPost = crossover(post1, post2);
console.log(newPost);

// Mutation (variation of keywords) to enhance diversity among posts
function mutate(post, mutationRate) {
    const keywords = post.keywords.map(keyword => 
        Math.random() < mutationRate ? "recursion" : keyword
    );

    if (Math.random() < mutationRate) {
        keywords.push(`new_keyword_${Math.floor(Math.random() * 100)}`);
    }

    return {
        ...post,
        keywords: [...new Set(keywords)] // Remove duplicates
    };
}

// Example usage
const post = {
    keywords: ["search", "algorithm", "optimization"]
};

const mutatedPost = mutate(post, 0.3);
console.log(mutatedPost);

// Fitness function to evaluate post relevance
const fitnessFunction = (post, queryKeywords) =>
    queryKeywords.reduce((acc, keyword) => acc + (post.keywords.includes(keyword) ? 1 : 0), 0);

// Initialize and evaluate population
const evaluatePopulation = (posts, queryKeywords) => 
    posts.map(post => ({ ...post, fitness: fitnessFunction(post, queryKeywords) }));

// Select relevant posts
const selectParents = (population) =>
    population.sort((a, b) => b.fitness - a.fitness).slice(0, population.length / 2);

// Crossover and mutation
const evolve = (parents, mutationRate) => {
    return Array.from({ length: parents.length / 2 }, (_, i) => {
        const midpoint = Math.floor(parents[i * 2].keywords.length / 2);
        const child = {
            keywords: [
                ...parents[i * 2].keywords.slice(0, midpoint),
                ...parents[i * 2 + 1].keywords.slice(midpoint)
            ]
        };
        return { ...child, keywords: child.keywords.map(keyword => Math.random() < mutationRate ? 
        getRandomKeyword() : keyword) };
    });
};

// Main genetic search function
const geneticSearch = (posts, queryKeywords, generations, mutationRate) => {
    let population = evaluatePopulation(posts, queryKeywords);
    for (let generation = 0; generation < generations; generation++) {
        const parents = selectParents(population);
        population = evolve(parents, mutationRate);
    }
    return evaluatePopulation(population, queryKeywords).sort((a, b) => b.fitness - a.fitness);
};

// Function to adapt learning materials based on student performance
function adaptContent(studentData, learningMaterials) {
    return learningMaterials.filter(material => {
        // Adjusting the relevance based on student scores and preferences
        const relevanceScore = calculateRelevance(studentData, material);
        return relevanceScore > threshold; // e.g., threshold could be a minimum relevance score
    });
}

// Example of relevance calculation
function calculateRelevance(studentData, material) {
    // Example logic: higher weight for recent performance and lower for older data
    let score = 0;
    if (studentData.lastScore > 80) score += 2; // High score
    else if (studentData.lastScore > 50) score += 1; // Moderate score

    // Check if the material matches student preferences
    if (studentData.interests.includes(material.topic)) score += 2;

    return score;
}

