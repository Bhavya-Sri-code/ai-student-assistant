const DUMMY_DATA = {
    "binary search": {
        explanation: `<p>Binary Search is an efficient algorithm for finding an item from a <strong>sorted list</strong> of items. It works by repeatedly dividing in half the portion of the list that could contain the item, until you've narrowed down the possible locations to just one.</p> <ul><li><strong>Time Complexity:</strong> O(log n)</li><li><strong>Space Complexity:</strong> O(1)</li></ul>`,
        code: `public class BinarySearch {
    public static int binarySearch(int[] arr, int target) {
        int left = 0;
        int right = arr.length - 1;
        
        while (left <= right) {
            int mid = left + (right - left) / 2;
            
            // Check if target is present at mid
            if (arr[mid] == target) {
                return mid;
            }
            // If target greater, ignore left half
            if (arr[mid] < target) {
                left = mid + 1;
            }
            // If target is smaller, ignore right half
            else {
                right = mid - 1;
            }
        }
        // Target not present
        return -1;
    }
}`,
        questions: {
            easy: ["Implement standard Binary Search iteratively.", "Find the first bad version of a software problem.", "Search insert position in a sorted array."],
            medium: ["Find the first and last position of element in sorted array.", "Search in a rotated sorted array.", "Search a 2D Matrix."],
            hard: ["Find minimum in rotated sorted array II (with duplicates).", "Median of two sorted arrays.", "Split Array Largest Sum."]
        }
    },
    "dynamic programming": {
        explanation: `<p>Dynamic Programming (DP) is an algorithmic technique for solving an optimization problem by breaking it down into simpler subproblems and utilizing the fact that the optimal solution to the overall problem depends upon the optimal solution to its subproblems.</p> <p>It uses memoization or tabulation to store the results of subproblems to avoid redundant computations.</p>`,
        code: `public class FibonacciDP {
    public static int fib(int n) {
        if (n <= 1) return n;
        
        int[] dp = new int[n + 1];
        dp[0] = 0;
        dp[1] = 1;
        
        for (int i = 2; i <= n; i++) {
            dp[i] = dp[i - 1] + dp[i - 2];
        }
        
        return dp[n];
    }
}`,
        questions: {
            easy: ["Calculate Fibonacci numbers.", "Climbing Stairs problem.", "Min Cost Climbing Stairs."],
            medium: ["Coin Change problem.", "Longest Increasing Subsequence.", "Unique Paths."],
            hard: ["Regular Expression Matching.", "Edit Distance.", "Burst Balloons."]
        }
    }
};

const DEFAULT_DATA = {
    explanation: `<p>This topic explores fundamental concepts in computer science, focusing on structuring data for efficient processing or discovering algorithms that optimize specific tasks.</p><p>Depending on the context, implementations can vary, but the goal is generally to strike a balance between time complexity and space complexity.</p>`,
    code: `public class ExampleImplementation {
    // A placeholder for the actual algorithm or structure
    public void processData(int[] input) {
        if (input == null || input.length == 0) return;
        
        // TODO: Implement the specific logic here
        for(int num : input) {
            System.out.println("Processing: " + num);
        }
    }
}`,
    questions: {
        easy: ["Explain the basic principle behind this concept.", "Provide a naive implementation.", "What are the edge cases to consider?"],
        medium: ["Optimize the time complexity of the naive approach.", "Implement the algorithm using a different data structure.", "How does this compare to alternative approaches?"],
        hard: ["Combine this concept with another complex algorithm.", "Solve the problem with strict O(1) space constraints.", "Adapt the structure to support parallel processing."]
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
    
    // UI elements for button state
    const btnText = generateBtn.querySelector('.btn-text');
    const loader = generateBtn.querySelector('.loader');

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

        // Simulate network request delay (1.5 seconds)
        setTimeout(() => {
            // Restore button state
            generateBtn.disabled = false;
            btnText.classList.remove('hidden');
            loader.classList.add('hidden');

            // Populate data
            const data = DUMMY_DATA[topic] || DEFAULT_DATA;
            
            explanationContent.innerHTML = data.explanation;
            
            // Set code and trigger highlight.js
            codeContent.textContent = data.code;
            codeContent.removeAttribute('data-highlighted'); // reset highlightjs flag
            hljs.highlightElement(codeContent);
            
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
});
