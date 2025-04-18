---
layout: gptcourse
---

# Programming Concepts Tutorial

<section class="example-section">
    <h2>Factorial Functions</h2>
    <p>Learn about different factorial implementations:</p>
    {% include dialog id="factorial" text="show chat" %}
</section>
<script type="application/dialog" id="factorial">
{
    "messages": [
        {
            "sender": "user",
            "content": "Explain recursive factorial with complexity analysis"
        },
        {
            "sender": "ai",
            "content": "Recursive implementation:\n\n```python\ndef factorial(n):\n    if n == 0:\n        return 1\n    return n * factorial(n-1)\n```\n\nComplexity:\n\n| Metric        | Value |\n|---------------|-------|\n| Time          | O(n)  |\n| Space         | O(n)  |\n| Stack Depth    | O(n)  |"
        }
    ]
}
</script>

<h2>Fibonacci Sequence</h2>
<p>Compare Fibonacci implementations:</p>
{% include dialog id="fibonacci" text="show chat" %}
<script type="application/dialog" id="fibonacci">
{
    "messages": [
        {
            "sender": "user",
            "content": "Compare Fibonacci implementations"
        },
        {
            "sender": "ai",
            "content": "Fibonacci approaches:\n\n```python\ndef fib_recursive(n):\n    if n <= 1:\n        return n\n    return fib_recursive(n-1) + fib_recursive(n-2)\n```\n\nComplexity comparison:\n\n| Method      | Time Complexity | Space Complexity |\n|-------------|-----------------|------------------|\n| Recursive   | O(2^n)          | O(n)             |\n| Iterative   | O(n)            | O(1)             |\n| DP          | O(n)            | O(n)             |"
        }
    ]
}
</script>

<!-- Add this section anywhere in your tutorial-content -->
<section class="qa-section">
    <h2>Common Questions</h2>
    
    {% include qa 
       q="What is time complexity?" 
       a="Time complexity describes how the runtime of an algorithm grows with the input size." 
    %}


    <div class="qa-item">
        <button class="qa-question">What's the difference between iterative and recursive?</button>
        <div class="qa-answer">
            <p>Iterative approaches use loops, while recursive approaches call the function itself.</p>
        </div>
    </div>
</section>
