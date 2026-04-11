const DUMMY_DATA = {
    "binary search": {
        explanation: {
            easy: `<p>Binary Search is like finding a word in a dictionary. Instead of checking every page from the beginning, you open it in the middle. If the word is earlier, you search the left half. If later, you search the right half.</p><ul><li><strong>Time Complexity:</strong> O(log n)</li></ul>`,
            medium: `<p>Binary Search is an efficient algorithm for finding an item from a <strong>sorted list</strong> of items. It works by repeatedly dividing in half the portion of the list that could contain the item, narrowing down the locations to just one.</p> <ul><li><strong>Time Complexity:</strong> O(log n)</li><li><strong>Space Complexity:</strong> O(1)</li></ul>`,
            hard: `<p>Binary Search goes beyond simple arrays; it's a paradigm to optimize any monotonic search space. Whether you are finding a root of mathematical functions or searching a monotonic discrete condition (e.g., capability limits), it fundamentally guarantees O(log(Search Space)) complexity.</p> <ul><li><strong>Time Complexity:</strong> O(log n)</li><li><strong>Space Complexity:</strong> O(1) or O(log n) recursively</li></ul>`
        },
        code: {
            easy: `public class BinarySearch {
    // Basic Iterative Approach
    public static int search(int[] arr, int target) {
        int left = 0, right = arr.length - 1;
        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (arr[mid] == target) return mid;
            if (arr[mid] < target) left = mid + 1;
            else right = mid - 1;
        }
        return -1;
    }
}`,
            medium: `public class BinarySearch {
    // Find First Occurrence
    public static int searchFirst(int[] arr, int target) {
        int left = 0, right = arr.length - 1;
        int result = -1;
        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (arr[mid] == target) {
                result = mid; // record and keep moving left
                right = mid - 1;
            }
            else if (arr[mid] < target) left = mid + 1;
            else right = mid - 1;
        }
        return result;
    }
}`,
            hard: `public class BinarySearch {
    // Search in Rotated Sorted Array
    public static int searchRotated(int[] nums, int target) {
        int left = 0, right = nums.length - 1;
        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (nums[mid] == target) return mid;
            
            // Left half is sorted
            if (nums[left] <= nums[mid]) {
                if (target >= nums[left] && target < nums[mid]) right = mid - 1;
                else left = mid + 1;
            } 
            // Right half is sorted
            else {
                if (target > nums[mid] && target <= nums[right]) left = mid + 1;
                else right = mid - 1;
            }
        }
        return -1;
    }
}`
        },
        questions: {
            easy: ["Implement standard Binary Search iteratively.", "Find the first bad version of a software problem.", "Search insert position in a sorted array."],
            medium: ["Find the first and last position of element in sorted array.", "Search in a rotated sorted array.", "Search a 2D Matrix."],
            hard: ["Find minimum in rotated sorted array II (with duplicates).", "Median of two sorted arrays.", "Split Array Largest Sum."]
        },
        interview: {
            questions: [
                "How would you modify binary search if the array contains duplicates and you need to find the first occurrence?",
                "Can you explain the advantage of calculating mid as left + (right - left) / 2 instead of (left + right) / 2?",
                "In what scenarios would binary search be slower than linear search?"
            ],
            problem: "Given a sorted array of distinct integers and a target value, return the index if the target is found. If not, return the index where it would be if it were inserted in order. You must write an algorithm with O(log n) runtime complexity."
        }
    },
    "dynamic programming": {
        explanation: {
            easy: `<p>Dynamic Programming (DP) is like remembering the answers to questions you've already solved. Instead of recalculating the same thing over and over, you store the result (cache it) and reuse it later, saving a lot of time!</p>`,
            medium: `<p>Dynamic Programming is an algorithmic technique for solving optimization problems by breaking them down into overlapping subproblems. It utilizes memoization (top-down) or tabulation (bottom-up) to avoid redundant computations.</p>`,
            hard: `<p>Dynamic Programming in advanced scopes entails abstract state-space reduction, bitmasking, and digit DP. At this level, discovering the optimal substructure requires defining multi-dimensional transition arrays and optimizing transitions via structures like segment trees or convex hull tricks.</p>`
        },
        code: {
            easy: `public class Fibonacci {
    // Basic Memoization
    static int[] memo = new int[100];
    
    public static int fib(int n) {
        if (n <= 1) return n;
        if (memo[n] != 0) return memo[n];
        
        memo[n] = fib(n - 1) + fib(n - 2);
        return memo[n];
    }
}`,
            medium: `public class DP_Tabulation {
    // Coin Change (Bottom-Up)
    public int coinChange(int[] coins, int amount) {
        int[] dp = new int[amount + 1];
        Arrays.fill(dp, amount + 1);
        dp[0] = 0;
        
        for (int i = 1; i <= amount; i++) {
            for (int coin : coins) {
                if (i - coin >= 0) {
                    dp[i] = Math.min(dp[i], dp[i - coin] + 1);
                }
            }
        }
        return dp[amount] > amount ? -1 : dp[amount];
    }
}`,
            hard: `public class DPSystem {
    // DP with Bitmasking (Travelling Salesperson Problem)
    public int tsp(int[][] dist, int mask, int pos, int[][] dp) {
        int n = dist.length;
        if (mask == (1 << n) - 1) return dist[pos][0]; // Return to start
        
        if (dp[mask][pos] != -1) return dp[mask][pos];
        
        int ans = Integer.MAX_VALUE;
        for (int city = 0; city < n; city++) {
            // If the city is essentially not visited
            if ((mask & (1 << city)) == 0) {
                int newAns = dist[pos][city] + tsp(dist, mask | (1 << city), city, dp);
                ans = Math.min(ans, newAns);
            }
        }
        return dp[mask][pos] = ans;
    }
}`
        },
        questions: {
            easy: ["Calculate Fibonacci numbers.", "Climbing Stairs problem.", "Min Cost Climbing Stairs."],
            medium: ["Coin Change problem.", "Longest Increasing Subsequence.", "Unique Paths."],
            hard: ["Regular Expression Matching.", "Edit Distance.", "Burst Balloons."]
        },
        interview: {
            questions: [
                "How do you determine if a problem can be solved using Dynamic Programming?",
                "What is the difference between Memoization and Tabulation? Which one is generally preferred and why?",
                "Can you explain the concept of optimal substructure and overlapping subproblems?"
            ],
            problem: "You are climbing a staircase. It takes n steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top? Optimize this to O(1) space."
        }
    }
};

const DEFAULT_DATA = {
    explanation: {
        easy: `<p>This topic explores fundamental concepts in computer science. Think of it as organizing objects gracefully so you can find them later without effort!</p>`,
        medium: `<p>Focusing on structuring data dynamically for efficient processing, this topic balances computational complexity with physical hardware limits. It requires mindful handling of operations scaling.</p>`,
        hard: `<p>Advanced algorithmic boundaries. Deploying this structure demands profound awareness of mathematical heuristics, strict architectural optimizations, and cache-locality concerns.</p>`
    },
    code: {
        easy: `public class ExampleImplementation {
    // Level: Easy
    public void processData(int[] input) {
        if (input == null || input.length == 0) return;
        
        for(int num : input) {
            System.out.println("Processing Basic Logic: " + num);
        }
    }
}`,
        medium: `public class IntermediateImpl {
    // Level: Medium - Using Collections
    public void optimize(List<Integer> input) {
        Map<Integer, Integer> freqMap = new HashMap<>();
        for(int num : input) {
            freqMap.put(num, freqMap.getOrDefault(num, 0) + 1);
        }
        System.out.println("Computed Frequencies.");
    }
}`,
        hard: `public class AdvancedImpl {
    // Level: Hard - Bitwise and Parallel Streams
    public long processGigabytes(int[] input) {
        return Arrays.stream(input).parallel()
            .mapToLong(x -> x ^ (x >>> 1))
            .sum();
    }
}`
    },
    questions: {
        easy: ["Explain the basic principle behind this concept.", "Provide a naive implementation.", "What are the edge cases to consider?"],
        medium: ["Optimize the time complexity of the naive approach.", "Implement the algorithm using a different data structure.", "How does this compare to alternative approaches?"],
        hard: ["Combine this concept with another complex algorithm.", "Solve the problem with strict O(1) space constraints.", "Adapt the structure to support parallel processing."]
    },
    interview: {
        questions: [
            "Explain the time and space complexity of your approach.",
            "How does this concept scale with extremely large datasets?",
            "What are the common edge cases you look out for when using this structure?"
        ],
        problem: "Implement a robust solution for the core problem of this topic that can handle null inputs, negative numbers, and extremely large data lengths efficiently."
    }
};

document.addEventListener("DOMContentLoaded", () => {
    const generateBtn = document.getElementById('generate-btn');
    const topicInput = document.getElementById('topic-input');
    const difficultySelect = document.getElementById('difficulty-select');
    
    const outputSection = document.getElementById('output-section');
    const explanationContent = document.getElementById('explanation-content');
    const codeContent = document.getElementById('code-content');
    const difficultyBadge = document.getElementById('difficulty-badge');
    const practiceQuestions = document.getElementById('practice-questions');
    
    // Interview Elements
    const interviewBtn = document.getElementById('interview-btn');
    const interviewSection = document.getElementById('interview-section');
    const interviewQuestions = document.getElementById('interview-questions');
    const interviewProblem = document.getElementById('interview-problem');
    const intBtnText = interviewBtn.querySelector('.btn-text');
    const intLoader = interviewBtn.querySelector('.loader');
    
    // Global Elements
    const globalLoader = document.getElementById('global-loader');
    const copyBtn = document.getElementById('copy-btn');
    const copyText = copyBtn.querySelector('.copy-text');
    
    // UI elements for button state
    const btnText = generateBtn.querySelector('.btn-text');
    const loader = generateBtn.querySelector('.loader');

    // Copy Button functionality
    copyBtn.addEventListener('click', () => {
        const code = codeContent.textContent;
        navigator.clipboard.writeText(code).then(() => {
            copyText.textContent = "Copied!";
            copyBtn.classList.add('copied');
            setTimeout(() => {
                copyText.textContent = "Copy";
                copyBtn.classList.remove('copied');
            }, 2000);
        });
    });

    generateBtn.addEventListener('click', () => {
        const topic = topicInput.value.trim().toLowerCase();
        const difficulty = difficultySelect.value;
        
        if (!topic || !difficulty) {
            alert('Please enter a DSA topic and select a difficulty level.');
            return;
        }

        // Set Loading state
        generateBtn.disabled = true;
        btnText.classList.add('hidden');
        loader.classList.remove('hidden');
        outputSection.classList.add('hidden');
        interviewSection.classList.add('hidden');
        globalLoader.classList.remove('hidden');

        // Simulate network request delay (1.5 seconds)
        setTimeout(() => {
            // Restore button state
            generateBtn.disabled = false;
            btnText.classList.remove('hidden');
            loader.classList.add('hidden');
            globalLoader.classList.add('hidden');

            // Populate data
            const data = DUMMY_DATA[topic] || DEFAULT_DATA;
            
            // Render Dynamic Data based on difficulty
            explanationContent.innerHTML = data.explanation[difficulty];
            
            // Set code and trigger highlight.js
            codeContent.textContent = data.code[difficulty];
            codeContent.removeAttribute('data-highlighted'); // reset highlightjs flag
            hljs.highlightElement(codeContent);
            
            // Update difficulty badge
            difficultyBadge.textContent = difficulty.charAt(0).toUpperCase() + difficulty.slice(1);
            difficultyBadge.className = `badge ${difficulty}`; // Reset and set color class
            
            // Populate questions based on difficulty
            practiceQuestions.innerHTML = '';
            const questions = data.questions[difficulty];
            questions.forEach(q => {
                const li = document.createElement('li');
                li.textContent = q;
                practiceQuestions.appendChild(li);
            });

            // Show output section
            outputSection.classList.remove('hidden');
            
            // Scroll to output
            outputSection.scrollIntoView({ behavior: 'smooth', block: 'start' });

        }, 1500);
    });

    interviewBtn.addEventListener('click', () => {
        const topic = topicInput.value.trim().toLowerCase();
        
        if (!topic) {
            alert('Please enter a DSA topic to prepare for an interview.');
            return;
        }

        // Set Loading state
        interviewBtn.disabled = true;
        intBtnText.classList.add('hidden');
        intLoader.classList.remove('hidden');
        interviewSection.classList.add('hidden');
        outputSection.classList.add('hidden');
        globalLoader.classList.remove('hidden');

        // Simulate network request delay
        setTimeout(() => {
            // Restore button state
            interviewBtn.disabled = false;
            intBtnText.classList.remove('hidden');
            intLoader.classList.add('hidden');
            globalLoader.classList.add('hidden');

            // Populate data
            const data = DUMMY_DATA[topic] || DEFAULT_DATA;
            const interviewData = data.interview;
            
            // Populate questions
            interviewQuestions.innerHTML = '';
            interviewData.questions.forEach(q => {
                const li = document.createElement('li');
                li.textContent = q;
                interviewQuestions.appendChild(li);
            });

            // Set problem text
            interviewProblem.textContent = interviewData.problem;

            // Show output section
            interviewSection.classList.remove('hidden');
            
            // Scroll to output
            interviewSection.scrollIntoView({ behavior: 'smooth', block: 'start' });

        }, 1500);
    });
});
