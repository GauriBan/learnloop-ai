import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const API = "http://localhost:5000/api";

// const demo = {
//   topic: "JavaScript Arrays",
//   explanation:
//     "An array stores multiple values in one ordered collection. In JavaScript, arrays are zero-indexed, so the first item is at index 0. Start with creating arrays, reading values, updating values, and then learn methods such as map, filter and reduce.",
//   keyPoints: [
//     "Arrays keep values in an ordered list.",
//     "Indexes start at 0.",
//     "map creates a transformed array.",
//     "filter keeps items that match a condition.",
//     "reduce combines values into one result."
//   ],
//   examples: [
//     "const nums = [1, 2, 3];",
//     "nums.map(n => n * 2);",
//     "nums.filter(n => n > 1);"
//   ]
// };


const demoExplanations = {
  "JavaScript Arrays": {
    topic: "JavaScript Arrays",
    explanation:
      "An array stores multiple values in one ordered collection. JavaScript arrays are zero-indexed, so the first item is at index 0. You can add, remove, transform and search values using built-in methods.",
    keyPoints: [
      "Arrays store multiple values in one collection.",
      "Array indexes start from 0.",
      "map creates a new transformed array.",
      "filter keeps values that match a condition.",
      "reduce combines values into one result."
    ],
    examples: [
      "const nums = [1, 2, 3];",
      "nums.map(n => n * 2);",
      "nums.filter(n => n > 1);"
    ]
  },

  "React Hooks": {
    topic: "React Hooks",
    explanation:
      "React Hooks are functions that let functional components use React features such as state and lifecycle behavior. Common hooks include useState and useEffect.",
    keyPoints: [
      "Hooks are used inside React functional components.",
      "useState lets a component store and update state.",
      "useEffect runs side effects after rendering.",
      "Hooks should be called at the top level of a component.",
      "Custom hooks let you reuse stateful logic."
    ],
    examples: [
      "const [count, setCount] = useState(0);",
      "setCount(count + 1);",
      "useEffect(() => { console.log('Loaded'); }, []);"
    ]
  },

  "DBMS": {
    topic: "DBMS",
    explanation:
      "A Database Management System, or DBMS, is software used to store, organize, retrieve and manage data. It provides a structured way for applications and users to work with databases.",
    keyPoints: [
      "DBMS manages stored data.",
      "Tables contain rows and columns in relational databases.",
      "SQL is commonly used to work with relational databases.",
      "Primary keys uniquely identify records.",
      "Normalization helps reduce unnecessary data duplication."
    ],
    examples: [
      "CREATE TABLE Students (...);",
      "SELECT * FROM Students;",
      "UPDATE Students SET name = 'Gauri' WHERE id = 1;"
    ]
  },

  "Data Structures": {
    topic: "Data Structures",
    explanation:
      "Data structures are ways of organizing and storing data so that programs can use it efficiently. Common examples include arrays, linked lists, stacks, queues, trees and hash maps.",
    keyPoints: [
      "Arrays store elements in an indexed collection.",
      "Stacks follow the LIFO principle.",
      "Queues commonly follow the FIFO principle.",
      "Linked lists connect elements using references.",
      "Hash maps store key-value pairs for fast lookup."
    ],
    examples: [
      "const stack = [];",
      "stack.push(10);",
      "const user = new Map();"
    ]
  }
};

function getDemoExplanation(topic) {
  const cleanTopic = topic.trim();

  if (demoExplanations[cleanTopic]) {
    return demoExplanations[cleanTopic];
  }

  return {
    topic: cleanTopic,
    explanation:
      `${cleanTopic} is an important topic to learn step by step. Start with the basic definition, understand the main concepts, practice small examples, and then solve practical problems.`,
    keyPoints: [
      `Understand the basic meaning of ${cleanTopic}.`,
      "Learn the important concepts and terminology.",
      "Practice simple examples.",
      "Try small problems related to the topic.",
      "Review the concepts and test yourself."
    ],
    examples: [
      `Start with a basic ${cleanTopic} example.`,
      `Practice one small ${cleanTopic} problem.`,
      `Build a tiny project using ${cleanTopic}.`
    ]
  };
}

const demoQuizzes = {
  "JavaScript Arrays": [
    {
      question: "Which index is the first item of a JavaScript array?",
      options: ["0", "1", "-1", "2"],
      answer: 0,
      explanation: "JavaScript arrays use zero-based indexing."
    },
    {
      question: "Which method creates a new array by transforming every item?",
      options: ["push", "map", "pop", "findIndex"],
      answer: 1,
      explanation: "map returns a new array containing transformed values."
    },
    {
      question: "Which method keeps only matching items?",
      options: ["filter", "join", "slice", "sort"],
      answer: 0,
      explanation: "filter returns items that pass a condition."
    },
    {
      question: "What does reduce commonly do?",
      options: [
        "Remove the first item",
        "Combine values into one result",
        "Reverse an array",
        "Add an HTML element"
      ],
      answer: 1,
      explanation: "reduce accumulates array values into a final result."
    },
    {
      question: "Which syntax creates an array?",
      options: ["{1,2,3}", "[1,2,3]", "(1,2,3)", "<1,2,3>"],
      answer: 1,
      explanation: "Square brackets create an array literal."
    }
  ],

  "React Hooks": [
    {
      question: "Which Hook is commonly used to manage component state?",
      options: ["useState", "useRoute", "useData", "useClass"],
      answer: 0,
      explanation: "useState lets a functional component store and update state."
    },
    {
      question: "Which Hook is commonly used for side effects?",
      options: ["useEffect", "useStyle", "useHTML", "useArray"],
      answer: 0,
      explanation: "useEffect is used for side effects such as API calls or subscriptions."
    },
    {
      question: "Where should Hooks normally be called?",
      options: [
        "Inside loops",
        "Inside if statements",
        "At the top level of a component",
        "Inside HTML tags"
      ],
      answer: 2,
      explanation: "Hooks should be called at the top level of React components or custom Hooks."
    },
    {
      question: "What does useState return?",
      options: [
        "A component and a prop",
        "A state value and a setter function",
        "Only a state value",
        "Only a function"
      ],
      answer: 1,
      explanation: "useState returns the current state value and a function to update it."
    },
    {
      question: "What is a custom Hook?",
      options: [
        "A CSS file",
        "A reusable function containing Hook-based logic",
        "An HTML element",
        "A database"
      ],
      answer: 1,
      explanation: "Custom Hooks allow reusable stateful logic to be shared between components."
    }
  ],

  "DBMS": [
    {
      question: "What does DBMS stand for?",
      options: [
        "Database Management System",
        "Data Backup Management Software",
        "Database Machine System",
        "Data Memory System"
      ],
      answer: 0,
      explanation: "DBMS stands for Database Management System."
    },
    {
      question: "Which language is commonly used with relational databases?",
      options: ["HTML", "CSS", "SQL", "XML"],
      answer: 2,
      explanation: "SQL is commonly used to work with relational databases."
    },
    {
      question: "What uniquely identifies a record in a table?",
      options: ["Primary key", "CSS", "Folder", "Loop"],
      answer: 0,
      explanation: "A primary key uniquely identifies records in a table."
    },
    {
      question: "What is normalization mainly used for?",
      options: [
        "Styling tables",
        "Reducing unnecessary data duplication",
        "Creating animations",
        "Writing HTML"
      ],
      answer: 1,
      explanation: "Normalization organizes data to reduce unnecessary redundancy."
    },
    {
      question: "Which command is used to retrieve data from a database?",
      options: ["SELECT", "REMOVE", "DISPLAY", "GETDATA"],
      answer: 0,
      explanation: "SELECT is used to retrieve data in SQL."
    }
  ],

  "Data Structures": [
    {
      question: "Which data structure follows LIFO?",
      options: ["Queue", "Stack", "Array", "Tree"],
      answer: 1,
      explanation: "A stack follows Last In, First Out."
    },
    {
      question: "Which data structure commonly follows FIFO?",
      options: ["Stack", "Queue", "Tree", "Graph"],
      answer: 1,
      explanation: "A queue follows First In, First Out."
    },
    {
      question: "What does an array use to access elements?",
      options: ["Index", "Key only", "Pointer only", "SQL"],
      answer: 0,
      explanation: "Array elements are accessed using indexes."
    },
    {
      question: "Which structure stores key-value pairs?",
      options: ["Stack", "Queue", "Hash Map", "Array only"],
      answer: 2,
      explanation: "A hash map stores data as key-value pairs."
    },
    {
      question: "Which data structure consists of connected nodes?",
      options: ["Linked List", "String", "Number", "Boolean"],
      answer: 0,
      explanation: "A linked list consists of nodes connected through references."
    }
  ]
};

function getDemoQuiz(topic) {
  return demoQuizzes[topic.trim()] || demoQuizzes["JavaScript Arrays"];
}

const demoPlans = {
  "JavaScript Arrays": [
    { day: 1, title: "Array basics", tasks: ["Understand arrays and indexes", "Write 5 small array examples"] },
    { day: 2, title: "Array methods", tasks: ["Practice push and pop", "Practice slice and splice"] },
    { day: 3, title: "map()", tasks: ["Solve 5 map problems", "Compare map with for loops"] },
    { day: 4, title: "filter()", tasks: ["Solve 5 filter problems", "Build a small search list"] },
    { day: 5, title: "reduce()", tasks: ["Practice sum and grouping", "Solve 3 reduce problems"] },
    { day: 6, title: "Mini project", tasks: ["Build a score tracker", "Store results locally"] },
    { day: 7, title: "Review", tasks: ["Take the quiz again", "Write 5 things you learned"] }
  ],

  "React Hooks": [
    { day: 1, title: "React Hooks basics", tasks: ["Understand what Hooks are", "Learn the Rules of Hooks"] },
    { day: 2, title: "useState", tasks: ["Create state with useState", "Build a simple counter"] },
    { day: 3, title: "useEffect", tasks: ["Understand side effects", "Practice a simple useEffect example"] },
    { day: 4, title: "State and events", tasks: ["Handle user events", "Update state from button clicks"] },
    { day: 5, title: "Custom Hooks", tasks: ["Understand custom Hooks", "Create a small reusable Hook"] },
    { day: 6, title: "Mini project", tasks: ["Build a React task tracker", "Use useState and useEffect"] },
    { day: 7, title: "Review", tasks: ["Take the React Hooks quiz", "Explain useState and useEffect in your own words"] }
  ],

  "DBMS": [
    { day: 1, title: "DBMS basics", tasks: ["Understand DBMS", "Learn database terminology"] },
    { day: 2, title: "Tables and keys", tasks: ["Practice primary keys", "Understand foreign keys"] },
    { day: 3, title: "SQL basics", tasks: ["Practice SELECT", "Practice INSERT and UPDATE"] },
    { day: 4, title: "SQL queries", tasks: ["Practice WHERE", "Practice ORDER BY and GROUP BY"] },
    { day: 5, title: "Normalization", tasks: ["Understand data redundancy", "Learn basic normal forms"] },
    { day: 6, title: "Mini database", tasks: ["Design a small student database", "Write basic SQL queries"] },
    { day: 7, title: "Review", tasks: ["Take the DBMS quiz", "Review keys and normalization"] }
  ],

  "Data Structures": [
    { day: 1, title: "DSA basics", tasks: ["Understand data structures", "Learn time and space complexity basics"] },
    { day: 2, title: "Arrays", tasks: ["Practice array traversal", "Solve 5 simple array problems"] },
    { day: 3, title: "Linked Lists", tasks: ["Understand nodes", "Practice insertion and deletion"] },
    { day: 4, title: "Stacks and Queues", tasks: ["Understand LIFO and FIFO", "Implement a simple stack and queue"] },
    { day: 5, title: "Hash Maps", tasks: ["Understand key-value storage", "Solve 3 lookup problems"] },
    { day: 6, title: "Practice problems", tasks: ["Solve 5 beginner DSA problems", "Review mistakes"] },
    { day: 7, title: "Review", tasks: ["Take the DSA quiz", "Explain each structure with an example"] }
  ]
};

function getDemoPlan(topic) {
  return demoPlans[topic.trim()] || demoPlans["JavaScript Arrays"];
}

async function post(path, body) {
  try {
    const res = await fetch(`${API}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });
    if (!res.ok) throw new Error("API request failed");
    return await res.json();
  } catch {
    return null;
  }
}

function App() {
  const [topic, setTopic] = useState("");
  const [active, setActive] = useState("learn");
  const [loading, setLoading] = useState(false);
  const [explanation, setExplanation] = useState(null);
  const [quiz, setQuiz] = useState([]);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [plan, setPlan] = useState([]);
  const [history, setHistory] = useState(() => JSON.parse(localStorage.getItem("learnloop-history") || "[]"));

  const currentTopic = topic.trim() || "JavaScript Arrays";

  const stats = useMemo(() => {
    const total = history.length;
const avg = total
  ? Math.round(
      history.reduce((a, x) => a + (x.score / x.total) * 100, 0) / total
    )
  : 0;
    return { total, avg };
  }, [history]);

  async function explain() {
    setLoading(true);
    const data = await post("/explain", { topic: currentTopic });
   // setExplanation(data || { ...demo, topic: currentTopic });
   setExplanation(data || getDemoExplanation(currentTopic));
    setActive("learn");
    setLoading(false);
  }

  async function makeQuiz() {
    setLoading(true);
    setScore(null);
    setAnswers({});
    const data = await post("/quiz", { topic: currentTopic });
    // setQuiz(data?.questions || demoQuiz);
    setQuiz(data?.questions || getDemoQuiz(currentTopic));
    setActive("quiz");
    setLoading(false);
  }

  async function makePlan() {
    setLoading(true);
    const data = await post("/plan", { topic: currentTopic });
    setPlan(data?.plan || getDemoPlan(currentTopic));
    setActive("plan");
    setLoading(false);
  }

  function submitQuiz() {
    const result = quiz.reduce((sum, q, i) => sum + (Number(answers[i]) === Number(q.answer) ? 1 : 0), 0);
    setScore(result);
    const next = [...history, { topic: currentTopic, score: result, total: quiz.length, date: new Date().toLocaleDateString() }].slice(-12);
    setHistory(next);
    localStorage.setItem("learnloop-history", JSON.stringify(next));
  }

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="brand"><span className="logo">L</span><div><strong>LearnLoop</strong><small>AI learning companion</small></div></div>
        <nav>
          <button className={active === "learn" ? "active" : ""} onClick={() => setActive("learn")}>✦ Learn</button>
          <button className={active === "quiz" ? "active" : ""} onClick={() => setActive("quiz")}>✓ Practice</button>
          <button className={active === "plan" ? "active" : ""} onClick={() => setActive("plan")}>◷ Study plan</button>
          <button className={active === "progress" ? "active" : ""} onClick={() => setActive("progress")}>↗ Progress</button>
        </nav>
        <div className="side-note"><b>Learn in loops.</b><br/>Understand → practice → review → improve.</div>
      </aside>

      <main className="main">
        <header>
          <div><p className="eyebrow">AI-POWERED STUDY SPACE</p><h1>Learn something today.</h1><p className="muted">Turn a confusing topic into a clear path you can actually follow.</p></div>
          <div className="avatar">G</div>
        </header>

        <section className="search-card">
          <label>What do you want to learn?</label>
          <div className="search-row">
            <input value={topic} onChange={e => setTopic(e.target.value)} placeholder="e.g. JavaScript promises, DBMS normalization..." />
            <button className="primary" onClick={explain}>{loading ? "Thinking..." : "Explain topic"}</button>
          </div>
          <div className="chips">
            {["JavaScript Arrays", "DBMS", "React Hooks", "Data Structures"].map(x => <button key={x} onClick={() => setTopic(x)}>{x}</button>)}
          </div>
        </section>

        <div className="quick-actions">
          <button onClick={makeQuiz}>✓ Generate practice quiz</button>
          <button onClick={makePlan}>◷ Build 7-day study plan</button>
        </div>

        {active === "learn" && <section className="content">
          {!explanation ? <div className="empty"><div className="empty-icon">✦</div><h2>Your learning loop starts here</h2><p>Enter a topic above. LearnLoop will explain it in simple language and highlight the concepts worth remembering.</p></div> :
          <div className="panel">
            <div className="panel-head"><div><span className="tag">EXPLANATION</span><h2>{explanation.topic}</h2></div><button className="ghost" onClick={makeQuiz}>Practice this →</button></div>
            <p className="lead">{explanation.explanation}</p>
            <div className="grid2"><div><h3>Key ideas</h3><ul>{explanation.keyPoints?.map((x,i)=><li key={i}>{x}</li>)}</ul></div><div><h3>Quick examples</h3><div className="codebox">{explanation.examples?.map((x,i)=><code key={i}>{x}</code>)}</div></div></div>
          </div>}
        </section>}

        {active === "quiz" && <section className="content"><div className="panel"><div className="panel-head"><div><span className="tag">PRACTICE</span><h2>{currentTopic}</h2></div><span className="score-badge">{score !== null ? `${score}/${quiz.length}` : `${quiz.length} questions`}</span></div>
          {quiz.length === 0 ? <div className="empty small"><p>No quiz yet.</p><button className="primary" onClick={makeQuiz}>Generate quiz</button></div> :
          <div className="quiz-list">{quiz.map((q,i)=><div className="question" key={i}><b>{i+1}. {q.question}</b>{q.options.map((o,j)=><label className={score !== null && j === q.answer ? "correct" : ""} key={j}><input type="radio" name={`q${i}`} checked={String(answers[i]) === String(j)} onChange={() => setAnswers({...answers,[i]:j})}/>{o}</label>)}{score !== null && <small className="answer-note">{q.explanation}</small>}</div>)}
          <button className="primary submit" onClick={submitQuiz}>Check answers</button></div>}
        </div></section>}

        {active === "plan" && <section className="content"><div className="panel"><span className="tag">7-DAY ROADMAP</span><h2>{currentTopic}</h2><p className="muted">A focused plan you can adjust as you learn.</p><div className="plan">{(plan.length ? plan : demoPlan).map(d=><div className="day" key={d.day}><span>{d.day}</span><div><b>{d.title}</b>{d.tasks.map((t,i)=><p key={i}>• {t}</p>)}</div></div>)}</div></div></section>}

        {active === "progress" && <section className="content"><div className="stats"><div><span>Quiz attempts</span><b>{stats.total}</b></div><div><span>Average score</span><b>{stats.avg}%</b></div><div><span>Topics explored</span><b>{new Set(history.map(x=>x.topic)).size}</b></div></div><div className="panel"><span className="tag">RECENT ACTIVITY</span><h2>Your learning history</h2>{history.length === 0 ? <p className="muted">Complete a quiz to see progress here.</p> : <div className="history">{history.slice().reverse().map((x,i)=><div key={i}><b>{x.topic}</b><span>{x.score}/{x.total} · {x.date}</span></div>)}</div>}</div></section>}

        <footer>LearnLoop AI · Built as an original hackathon prototype</footer>
      </main>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
