/* QUIZQUAKE — standalone adaptive quiz engine */
"use strict";

const TOPICS = [
  "Data Structures",
  "Algorithms",
  "Operating Systems",
  "Computer Networks"
];

const DIFFICULTIES = ["Easy", "Medium", "Hard"];
const QUIZ_LENGTH = 10;
const QUIZ_SECONDS = 600;
const HISTORY_KEY = "quizquake_history_v1";
const SESSION_KEY = "quizquake_active_v1";
const LOGIN_KEY = "quizquake_demo_user_v1";

const QUESTION_BANK = [
  // DATA STRUCTURES — EASY
  {id:"ds-e1",topic:TOPICS[0],difficulty:"Easy",q:"Which data structure follows the Last In, First Out (LIFO) principle?",o:["Queue","Stack","Tree","Graph"],a:1,ex:"A stack removes the most recently inserted item first. This is the Last In, First Out rule."},
  {id:"ds-e2",topic:TOPICS[0],difficulty:"Easy",q:"Which data structure stores elements in contiguous indexed positions?",o:["Linked list","Tree","Array","Graph"],a:2,ex:"An array stores elements in indexed, contiguous memory locations in the usual array model."},
  {id:"ds-e3",topic:TOPICS[0],difficulty:"Easy",q:"Which operation adds an element to the end of a queue?",o:["Push","Enqueue","Pop","Peek"],a:1,ex:"Enqueue inserts an element at the rear of a queue."},
  {id:"ds-e4",topic:TOPICS[0],difficulty:"Easy",q:"A node in a singly linked list typically contains data and a pointer to what?",o:["The previous node only","The next node","The root only","The array index"],a:1,ex:"Each singly linked-list node stores a link to the next node in the sequence."},
  {id:"ds-e5",topic:TOPICS[0],difficulty:"Easy",q:"Which data structure is commonly used to represent hierarchical data?",o:["Stack","Queue","Tree","Hash table"],a:2,ex:"Trees represent parent-child relationships and are widely used for hierarchical data."},

  // DATA STRUCTURES — MEDIUM
  {id:"ds-m1",topic:TOPICS[0],difficulty:"Medium",q:"What is the time complexity of accessing an array element by index?",o:["O(n)","O(log n)","O(1)","O(n log n)"],a:2,ex:"Direct index calculation gives constant-time array access, O(1)."},
  {id:"ds-m2",topic:TOPICS[0],difficulty:"Medium",q:"Which traversal of a binary search tree visits keys in sorted order?",o:["Preorder","Inorder","Postorder","Level order"],a:1,ex:"Inorder traversal visits left subtree, node, then right subtree; for a BST this yields sorted keys."},
  {id:"ds-m3",topic:TOPICS[0],difficulty:"Medium",q:"What is the worst-case search time in an unbalanced binary search tree with n nodes?",o:["O(1)","O(log n)","O(n)","O(n log n)"],a:2,ex:"An unbalanced BST can degenerate into a chain, requiring a linear scan."},
  {id:"ds-m4",topic:TOPICS[0],difficulty:"Medium",q:"Which structure is most suitable for implementing breadth-first search?",o:["Stack","Queue","Heap","Hash set"],a:1,ex:"BFS explores nodes level by level and uses a FIFO queue to manage the frontier."},
  {id:"ds-m5",topic:TOPICS[0],difficulty:"Medium",q:"In a max-heap, where is the largest element stored?",o:["At the root","At the leftmost leaf","At the last array index","At any leaf"],a:0,ex:"The max-heap property guarantees that every parent is at least as large as its children, so the maximum is at the root."},

  // DATA STRUCTURES — HARD
  {id:"ds-h1",topic:TOPICS[0],difficulty:"Hard",q:"What is the amortized time complexity of appending to a dynamic array that doubles capacity when full?",o:["O(n)","O(log n)","O(1)","O(n log n)"],a:2,ex:"Occasional resizing costs O(n), but spread across many appends the amortized cost per append is O(1)."},
  {id:"ds-h2",topic:TOPICS[0],difficulty:"Hard",q:"Which rotation fixes a left-right imbalance in an AVL tree?",o:["Single right rotation","Single left rotation","Left rotation on child, then right rotation","Right rotation on child, then left rotation"],a:2,ex:"A left-right case is corrected by rotating left at the left child, followed by rotating right at the unbalanced node."},
  {id:"ds-h3",topic:TOPICS[0],difficulty:"Hard",q:"For a graph with V vertices and E edges stored as an adjacency list, BFS runs in what time?",o:["O(V)","O(E log V)","O(V + E)","O(V²)"],a:2,ex:"BFS visits each vertex and scans each adjacency list edge at most a constant number of times: O(V + E)."},
  {id:"ds-h4",topic:TOPICS[0],difficulty:"Hard",q:"What is the expected search time for a well-distributed hash table with chaining and load factor kept bounded?",o:["O(1)","O(log n)","O(n)","O(n²)"],a:0,ex:"With a suitable hash function and bounded load factor, expected chain length is constant, giving expected O(1) search."},
  {id:"ds-h5",topic:TOPICS[0],difficulty:"Hard",q:"Which property distinguishes a B-tree from a binary search tree?",o:["It has no keys","A node may contain multiple keys and children","It is always unbalanced","It stores only leaf values"],a:1,ex:"B-trees are multiway balanced search trees whose nodes can hold multiple keys and have multiple children."},

  // ALGORITHMS — EASY
  {id:"al-e1",topic:TOPICS[1],difficulty:"Easy",q:"Which algorithmic technique solves a problem by trying choices and undoing them when they fail?",o:["Greedy method","Backtracking","Hashing","Pipelining"],a:1,ex:"Backtracking explores candidate solutions and reverses a choice when it cannot lead to a valid solution."},
  {id:"al-e2",topic:TOPICS[1],difficulty:"Easy",q:"Which search algorithm requires the input array to be sorted?",o:["Linear search","Binary search","Depth-first search","Breadth-first search"],a:1,ex:"Binary search repeatedly halves the search interval, which requires sorted data."},
  {id:"al-e3",topic:TOPICS[1],difficulty:"Easy",q:"What is the worst-case time complexity of linear search in an array of n items?",o:["O(1)","O(log n)","O(n)","O(n²)"],a:2,ex:"In the worst case, linear search examines every element, so its time is O(n)."},
  {id:"al-e4",topic:TOPICS[1],difficulty:"Easy",q:"Which sorting algorithm repeatedly compares and swaps adjacent out-of-order elements?",o:["Merge sort","Bubble sort","Heap sort","Counting sort"],a:1,ex:"Bubble sort compares adjacent items and swaps them when they are in the wrong order."},
  {id:"al-e5",topic:TOPICS[1],difficulty:"Easy",q:"What does an algorithm's input size usually represent?",o:["The screen resolution","The amount of data processed","The programming language","The CPU brand"],a:1,ex:"Input size measures how much data an algorithm receives and is used to analyze resource growth."},

  // ALGORITHMS — MEDIUM
  {id:"al-m1",topic:TOPICS[1],difficulty:"Medium",q:"What is the time complexity of merge sort in the average case?",o:["O(n)","O(log n)","O(n log n)","O(n²)"],a:2,ex:"Merge sort divides the input into halves and merges in linear time per level, giving O(n log n)."},
  {id:"al-m2",topic:TOPICS[1],difficulty:"Medium",q:"Which paradigm is used by Dijkstra's shortest-path algorithm with non-negative edge weights?",o:["Dynamic programming only","Greedy strategy","Backtracking","Brute-force enumeration"],a:1,ex:"Dijkstra repeatedly selects the unvisited vertex with the smallest tentative distance, a greedy choice."},
  {id:"al-m3",topic:TOPICS[1],difficulty:"Medium",q:"What is the space complexity of an iterative binary search on a sorted array?",o:["O(n)","O(log n)","O(1)","O(n log n)"],a:2,ex:"The iterative version uses a fixed number of variables, so its auxiliary space is O(1)."},
  {id:"al-m4",topic:TOPICS[1],difficulty:"Medium",q:"Which technique stores results of overlapping subproblems to avoid repeated computation?",o:["Dynamic programming","Linear probing","Selection sort","Depth limiting"],a:0,ex:"Dynamic programming stores subproblem results, commonly through memoization or tabulation."},
  {id:"al-m5",topic:TOPICS[1],difficulty:"Medium",q:"Which sorting algorithm is generally stable in its standard implementation?",o:["Heap sort","Merge sort","Selection sort","Quick sort"],a:1,ex:"Standard merge sort can preserve the relative order of equal keys, making it stable."},

  // ALGORITHMS — HARD
  {id:"al-h1",topic:TOPICS[1],difficulty:"Hard",q:"A problem is NP-complete when it is both in NP and what else?",o:["It is solvable in O(1)","It is NP-hard","It is undecidable","It has no certificate"],a:1,ex:"NP-complete problems are in NP and are NP-hard, meaning every problem in NP reduces to them in polynomial time."},
  {id:"al-h2",topic:TOPICS[1],difficulty:"Hard",q:"What is the time complexity of Floyd–Warshall for a graph with V vertices?",o:["O(V log V)","O(V²)","O(V³)","O(E log V)"],a:2,ex:"Floyd–Warshall considers every intermediate vertex for every source-destination pair, yielding O(V³)."},
  {id:"al-h3",topic:TOPICS[1],difficulty:"Hard",q:"Which condition is required for the standard greedy activity-selection strategy sorted by finish time?",o:["Choose the activity that finishes earliest among compatible activities","Choose the longest activity first","Choose the activity with the latest start","Choose randomly"],a:0,ex:"Selecting the compatible activity with the earliest finish leaves the maximum remaining time for future activities."},
  {id:"al-h4",topic:TOPICS[1],difficulty:"Hard",q:"What is the recurrence for the worst-case comparisons of binary search?",o:["T(n)=T(n−1)+1","T(n)=T(n/2)+1","T(n)=2T(n/2)+n","T(n)=T(n−1)+n"],a:1,ex:"Each binary-search step reduces the problem size by roughly half and performs constant additional work."},
  {id:"al-h5",topic:TOPICS[1],difficulty:"Hard",q:"Which statement about a minimum spanning tree of a connected, weighted, undirected graph is correct?",o:["It must contain every graph edge","It contains V−1 edges and connects all vertices without cycles","It is unique for every graph","It exists only for directed graphs"],a:1,ex:"A spanning tree connects all V vertices with exactly V−1 edges and contains no cycles. A minimum spanning tree has minimum total weight."},

  // OPERATING SYSTEMS — EASY
  {id:"os-e1",topic:TOPICS[2],difficulty:"Easy",q:"Which component manages hardware resources and provides services to programs?",o:["Compiler","Kernel","Browser","Text editor"],a:1,ex:"The kernel is the core of an operating system and manages CPU, memory, devices and system calls."},
  {id:"os-e2",topic:TOPICS[2],difficulty:"Easy",q:"What is a process?",o:["A program in execution","A file extension","A storage device","A network cable"],a:0,ex:"A process is an instance of a program that is currently executing, with its own execution state and resources."},
  {id:"os-e3",topic:TOPICS[2],difficulty:"Easy",q:"Which memory is typically volatile?",o:["ROM","SSD","RAM","Flash drive"],a:2,ex:"RAM is volatile memory: its contents are generally lost when power is removed."},
  {id:"os-e4",topic:TOPICS[2],difficulty:"Easy",q:"Which scheduling algorithm gives each ready process a fixed time slice?",o:["First Come First Served","Round Robin","Shortest Job First","Priority only"],a:1,ex:"Round Robin allocates a time quantum to each process in cyclic order."},
  {id:"os-e5",topic:TOPICS[2],difficulty:"Easy",q:"What is the main purpose of a file system?",o:["To schedule CPU tasks","To organize and manage stored files","To encrypt every network packet","To cool the processor"],a:1,ex:"A file system organizes, names, stores and retrieves data on storage devices."},

  // OPERATING SYSTEMS — MEDIUM
  {id:"os-m1",topic:TOPICS[2],difficulty:"Medium",q:"Which state transition occurs when a running process requests I/O and must wait?",o:["Running to waiting","Waiting to ready","Ready to running","Terminated to ready"],a:0,ex:"A process that requests I/O typically leaves the running state and enters a waiting or blocked state."},
  {id:"os-m2",topic:TOPICS[2],difficulty:"Medium",q:"Which page-replacement algorithm removes the page that has not been used for the longest time in the past?",o:["FIFO","LRU","Optimal","Clock only"],a:1,ex:"Least Recently Used (LRU) replaces the page whose most recent access is farthest in the past."},
  {id:"os-m3",topic:TOPICS[2],difficulty:"Medium",q:"What is a context switch?",o:["Changing source-code language","Saving one process state and loading another","Formatting a disk","Changing a file name"],a:1,ex:"A context switch saves the CPU state of one task and restores the state of another so execution can switch."},
  {id:"os-m4",topic:TOPICS[2],difficulty:"Medium",q:"Which synchronization primitive is commonly used to control access to a shared critical section?",o:["Semaphore","Compiler","Cache line","Scheduler queue"],a:0,ex:"A semaphore coordinates access to shared resources using counters and wait/signal operations."},
  {id:"os-m5",topic:TOPICS[2],difficulty:"Medium",q:"What is the purpose of virtual memory?",o:["To increase monitor resolution","To provide processes with a virtual address space backed by memory/storage","To remove the need for RAM","To make CPU clock faster"],a:1,ex:"Virtual memory maps virtual addresses to physical memory and can use secondary storage to support larger address spaces."},

  // OPERATING SYSTEMS — HARD
  {id:"os-h1",topic:TOPICS[2],difficulty:"Hard",q:"Which set lists the four necessary Coffman conditions for deadlock?",o:["Mutual exclusion, hold and wait, no preemption, circular wait","Paging, segmentation, swapping, caching","Arrival, burst, turnaround, waiting","Read, write, execute, delete"],a:0,ex:"Deadlock requires mutual exclusion, hold-and-wait, no preemption and circular wait to hold simultaneously."},
  {id:"os-h2",topic:TOPICS[2],difficulty:"Hard",q:"In the Banker's algorithm, what does a safe state guarantee?",o:["No process will ever perform I/O","There exists an order in which all processes can finish","Every process receives all resources immediately","Deadlock is already present"],a:1,ex:"A safe state has at least one safe sequence in which each process can obtain its remaining needs and complete."},
  {id:"os-h3",topic:TOPICS[2],difficulty:"Hard",q:"What is thrashing in a virtual-memory system?",o:["Excessive paging that leaves little time for useful execution","A CPU arithmetic overflow","A failed network handshake","A disk being formatted"],a:0,ex:"Thrashing occurs when processes spend most of their time handling page faults and swapping pages rather than executing."},
  {id:"os-h4",topic:TOPICS[2],difficulty:"Hard",q:"Which statement best describes a race condition?",o:["A process always finishes first","The result depends on the timing or interleaving of concurrent operations","A CPU runs at maximum frequency","A page is stored in cache"],a:1,ex:"A race condition occurs when concurrent operations access shared state and the outcome depends on their execution timing."},
  {id:"os-h5",topic:TOPICS[2],difficulty:"Hard",q:"In a multilevel page table, what is the main benefit of using multiple levels?",o:["It eliminates address translation","It allocates page-table portions only where needed","It guarantees zero page faults","It stores all pages in CPU registers"],a:1,ex:"Hierarchical page tables can reduce memory overhead by allocating lower-level tables only for portions of the virtual address space in use."},

  // COMPUTER NETWORKS — EASY
  {id:"net-e1",topic:TOPICS[3],difficulty:"Easy",q:"Which device forwards packets between different IP networks?",o:["Hub","Router","Repeater","Keyboard"],a:1,ex:"A router forwards packets between networks using network-layer addressing and routing information."},
  {id:"net-e2",topic:TOPICS[3],difficulty:"Easy",q:"How many layers are in the OSI reference model?",o:["4","5","7","8"],a:2,ex:"The OSI model defines seven layers, from Physical through Application."},
  {id:"net-e3",topic:TOPICS[3],difficulty:"Easy",q:"Which protocol is commonly used to transfer web pages securely?",o:["HTTP","HTTPS","FTP","SMTP"],a:1,ex:"HTTPS is HTTP protected by TLS, providing encryption and server authentication."},
  {id:"net-e4",topic:TOPICS[3],difficulty:"Easy",q:"What does IP stand for in TCP/IP?",o:["Internet Protocol","Internal Program","Input Process","Integrated Port"],a:0,ex:"IP stands for Internet Protocol and provides addressing and packet delivery across networks."},
  {id:"net-e5",topic:TOPICS[3],difficulty:"Easy",q:"Which protocol translates a domain name into an IP address?",o:["DHCP","DNS","SSH","ARP"],a:1,ex:"The Domain Name System resolves domain names to IP addresses and other records."},

  // COMPUTER NETWORKS — MEDIUM
  {id:"net-m1",topic:TOPICS[3],difficulty:"Medium",q:"Which transport protocol provides reliable, ordered byte-stream delivery?",o:["UDP","IP","TCP","ICMP"],a:2,ex:"TCP provides reliable, ordered delivery using sequence numbers, acknowledgements and retransmissions."},
  {id:"net-m2",topic:TOPICS[3],difficulty:"Medium",q:"What is the default port number for HTTPS?",o:["21","25","80","443"],a:3,ex:"HTTPS conventionally uses TCP port 443."},
  {id:"net-m3",topic:TOPICS[3],difficulty:"Medium",q:"Which OSI layer is responsible for logical addressing and routing?",o:["Data Link","Network","Transport","Session"],a:1,ex:"The Network layer handles logical addressing and routing packets across interconnected networks."},
  {id:"net-m4",topic:TOPICS[3],difficulty:"Medium",q:"What is the primary role of DHCP?",o:["Assign IP configuration automatically","Encrypt web traffic","Resolve domain names","Detect malware"],a:0,ex:"DHCP dynamically provides hosts with IP addresses and related network configuration."},
  {id:"net-m5",topic:TOPICS[3],difficulty:"Medium",q:"Which address is used by Ethernet switches to forward frames within a LAN?",o:["URL","MAC address","Port number","Domain name"],a:1,ex:"Ethernet switches learn MAC addresses and use their forwarding tables to deliver frames."},

  // COMPUTER NETWORKS — HARD
  {id:"net-h1",topic:TOPICS[3],difficulty:"Hard",q:"Which TCP mechanism prevents a fast sender from overwhelming a receiver's buffer?",o:["Congestion control","Flow control","DNS caching","Address resolution"],a:1,ex:"TCP flow control uses the receiver-advertised window to limit how much unacknowledged data the sender can transmit."},
  {id:"net-h2",topic:TOPICS[3],difficulty:"Hard",q:"In CIDR notation, how many IPv4 addresses are in a /26 subnet?",o:["16","32","64","128"],a:2,ex:"A /26 leaves 32−26 = 6 host bits, so there are 2⁶ = 64 total addresses."},
  {id:"net-h3",topic:TOPICS[3],difficulty:"Hard",q:"Which routing protocol is a link-state interior gateway protocol?",o:["RIP","OSPF","BGP","FTP"],a:1,ex:"OSPF is a link-state IGP that computes shortest paths using a topology database and Dijkstra's algorithm."},
  {id:"net-h4",topic:TOPICS[3],difficulty:"Hard",q:"What is the purpose of the TCP three-way handshake?",o:["To encrypt payload data","To establish and synchronize a TCP connection","To assign a MAC address","To resolve a hostname"],a:1,ex:"SYN, SYN-ACK and ACK establish the connection and synchronize initial sequence numbers."},
  {id:"net-h5",topic:TOPICS[3],difficulty:"Hard",q:"Which technique allows many private IPv4 hosts to share one public IPv4 address using port numbers?",o:["VLAN","NAT overload (PAT)","Subnet masking","CSMA/CD"],a:1,ex:"Port Address Translation maps multiple internal address-and-port pairs to one public address with distinct port mappings."}
];

// APPLICATION STATE
let session = null;
let timerInterval = null;
let toastTimeout = null;
let lastReport = null;

function $(id) {
  return document.getElementById(id);
}

function showToast(message) {
  const el = $("toast");
  if (!el) return;

  el.textContent = message;
  el.classList.add("show");

  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    el.classList.remove("show");
  }, 2400);
}

function showScreen(id) {
  document.querySelectorAll(".screen").forEach(screen => {
    screen.classList.remove("active-screen");
  });

  const target = $(id);
  if (target) target.classList.add("active-screen");

  window.scrollTo({ top: 0, behavior: "smooth" });
}

function setActiveNav(which) {
  $("homeNav")?.classList.toggle("active", which === "home");
  $("historyNav")?.classList.toggle("active", which === "history");
}

function goHome() {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }

  session = null;
  sessionStorage.removeItem(SESSION_KEY);

  showScreen("homeScreen");
  setActiveNav("home");
}

function showHistory() {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }

  session = null;
  sessionStorage.removeItem(SESSION_KEY);

  renderHistory();
  showScreen("historyScreen");
  setActiveNav("history");
}

function getHistory() {
  try {
    return JSON.parse(localStorage.getItem(HISTORY_KEY) || "[]");
  } catch (error) {
    return [];
  }
}

function saveHistory(items) {
  localStorage.setItem(HISTORY_KEY, JSON.stringify(items));
}

function shuffle(items) {
  const array = items.slice();

  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
}

function pickQuestion(topic, difficulty, usedIds) {
  let candidates = QUESTION_BANK.filter(question =>
    question.difficulty === difficulty &&
    !usedIds.includes(question.id) &&
    (!topic || question.topic === topic)
  );

  if (!candidates.length) {
    candidates = QUESTION_BANK.filter(question =>
      !usedIds.includes(question.id) &&
      (!topic || question.topic === topic)
    );
  }

  if (!candidates.length) {
    candidates = QUESTION_BANK.filter(question =>
      !usedIds.includes(question.id)
    );
  }

  return shuffle(candidates)[0] || null;
}

// START QUIZ
function startQuiz(remedial = false, topic = null) {
  const chosenTopic = topic && TOPICS.includes(topic) ? topic : null;
  const previousWeak = lastReport?.weakTopics || [];

  const drillTopics =
    remedial && previousWeak.length ? previousWeak : TOPICS;

  session = {
    remedial: Boolean(remedial),
    topic: chosenTopic,
    allowedTopics: remedial
      ? drillTopics
      : chosenTopic
        ? [chosenTopic]
        : TOPICS,

    answers: [],
    current: null,
    currentIndex: 0,
    difficulty: 1,
    correctStreak: 0,
    hardStreak: 0,
    bestHardStreak: 0,
    bonus: 0,
    highestDifficulty: 1,
    selected: null,
    questionStartedAt: Date.now(),
    startedAt: Date.now(),
    endsAt: Date.now() + QUIZ_SECONDS * 1000,
    usedIds: [],
    finished: false
  };

  sessionStorage.removeItem(SESSION_KEY);

  $("quizModeLabel").textContent = remedial
    ? "TARGETED REMEDIAL DRILL"
    : chosenTopic
      ? chosenTopic.toUpperCase() + " CHALLENGE"
      : "MIXED CHALLENGE";

  showScreen("quizScreen");
  setActiveNav("");

  loadQuestion();
  startTimer();
  persistSession();
}

function getRoundRobinTopic() {
  const topics = session.allowedTopics;

  if (session.topic) return session.topic;

  const counts = {};

  topics.forEach(topic => {
    counts[topic] = session.answers.filter(
      answer => answer.topic === topic
    ).length;
  });

  return topics.slice().sort(
    (a, b) => counts[a] - counts[b]
  )[0];
}

// LOAD ONE QUESTION AT A TIME
function loadQuestion() {
  if (!session || session.finished) return;

  const totalQuestions = session.remedial ? 5 : QUIZ_LENGTH;

  if (session.currentIndex >= totalQuestions) {
    finishQuiz(false);
    return;
  }

  const topic = getRoundRobinTopic();

  const question = pickQuestion(
    topic,
    DIFFICULTIES[session.difficulty - 1],
    session.usedIds
  );

  if (!question) {
    finishQuiz(false);
    return;
  }

  session.current = question;
  session.usedIds.push(question.id);
  session.selected = null;
  session.questionStartedAt = Date.now();

  $("questionCounter").textContent =
    `QUESTION ${String(session.currentIndex + 1).padStart(2, "0")} / ${totalQuestions}`;

  $("progressPercent").textContent =
    `${Math.round((session.currentIndex / totalQuestions) * 100)}%`;

  $("progressFill").style.width =
    `${(session.currentIndex / totalQuestions) * 100}%`;

  $("topicTag").textContent = question.topic.toUpperCase();

  $("difficultyTag").textContent =
    question.difficulty.toUpperCase();

  $("difficultyTag").className =
    `difficulty ${question.difficulty.toLowerCase()}`;

  $("questionText").textContent = question.q;

  $("optionsList").innerHTML = "";

  question.o.forEach((option, index) => {
    const button = document.createElement("button");

    button.type = "button";
    button.className = "option-btn";

    button.innerHTML = `
      <span class="option-letter">${String.fromCharCode(65 + index)}</span>
      <span></span>
    `;

    button.querySelector("span:last-child").textContent = option;

    button.addEventListener("click", () => {
      selectOption(index);
    });

    $("optionsList").appendChild(button);
  });

  $("nextBtn").disabled = true;

  $("nextBtn").innerHTML =
    session.currentIndex === totalQuestions - 1
      ? 'SUBMIT QUIZ <span>→</span>'
      : 'LOCK ANSWER <span>→</span>';

  updateLiveStats();
  updateDifficultyUI();
  persistSession();
}

function selectOption(index) {
  if (!session || session.finished) return;

  session.selected = index;

  [...$("optionsList").children].forEach((button, i) => {
    button.classList.toggle("selected", i === index);
  });

  $("nextBtn").disabled = false;
}

// SUBMIT ANSWER
function submitAnswer() {
  if (
    !session ||
    session.finished ||
    session.selected === null
  ) {
    return;
  }

  const question = session.current;
  const correct = session.selected === question.a;

  const timeSpent = Math.max(
    0,
    Math.round((Date.now() - session.questionStartedAt) / 1000)
  );

  session.answers.push({
    id: question.id,
    topic: question.topic,
    difficulty: question.difficulty,
    question: question.q,
    options: question.o,
    correctIndex: question.a,
    selectedIndex: session.selected,
    isCorrect: correct,
    explanation: question.ex,
    timeSpent
  });

  if (correct) {
    session.correctStreak++;

    if (question.difficulty === "Hard") {
      session.hardStreak++;

      session.bestHardStreak = Math.max(
        session.bestHardStreak,
        session.hardStreak
      );

      session.bonus += 10;
    } else {
      session.hardStreak = 0;
    }

    if (session.correctStreak >= 2) {
      session.difficulty = Math.min(
        3,
        session.difficulty + 1
      );

      session.correctStreak = 0;
      showToast("Difficulty increased — keep climbing!");
    }
  } else {
    session.correctStreak = 0;
    session.hardStreak = 0;

    session.difficulty = Math.max(
      1,
      session.difficulty - 1
    );
  }

  session.highestDifficulty = Math.max(
    session.highestDifficulty,
    session.difficulty
  );

  session.currentIndex++;

  updateLiveStats();
  persistSession();

  const totalQuestions = session.remedial ? 5 : QUIZ_LENGTH;

  if (session.currentIndex >= totalQuestions) {
    finishQuiz(false);
    return;
  }

  loadQuestion();
}

function updateLiveStats() {
  if (!session) return;

  const correct = session.answers.filter(
    answer => answer.isCorrect
  ).length;

  $("liveCorrect").textContent = correct;

  $("liveAnswered").textContent =
    `${session.answers.length} / ${session.remedial ? 5 : 10}`;

  $("liveStreak").textContent =
    `${session.hardStreak}×`;
}

function updateDifficultyUI() {
  if (!session) return;

  const label = DIFFICULTIES[session.difficulty - 1];

  $("sideLevel").textContent = label.toUpperCase();

  $("sideLevel").style.color =
    session.difficulty === 1
      ? "#79e4c1"
      : session.difficulty === 2
        ? "#ffc47c"
        : "#ff8795";

  $("levelTrack").style.width =
    `${session.difficulty * 33.333}%`;

  $("levelMessage").textContent =
    session.difficulty === 1
      ? "Warm up and find your rhythm."
      : session.difficulty === 2
        ? "Good momentum. Keep your focus sharp."
        : "You're in the deep end. Own the challenge.";

  $("adaptiveHint").textContent =
    session.correctStreak === 1
      ? "One more correct answer raises your difficulty."
      : "Two consecutive correct answers raise the tier; one wrong answer lowers it.";
}

// TIMER
function startTimer() {
  clearInterval(timerInterval);

  updateTimer();

  timerInterval = setInterval(() => {
    if (!session || session.finished) {
      clearInterval(timerInterval);
      return;
    }

    if (Date.now() >= session.endsAt) {
      finishQuiz(true);
      return;
    }

    updateTimer();
    persistSession();
  }, 250);
}

function updateTimer() {
  if (!session) return;

  const remaining = Math.max(
    0,
    Math.ceil((session.endsAt - Date.now()) / 1000)
  );

  const minutes = String(
    Math.floor(remaining / 60)
  ).padStart(2, "0");

  const seconds = String(
    remaining % 60
  ).padStart(2, "0");

  $("timer").textContent = `${minutes}:${seconds}`;

  $("timer").parentElement.classList.toggle(
    "warning",
    remaining <= 60
  );
}

function persistSession() {
  if (!session || session.finished) return;

  try {
    sessionStorage.setItem(
      SESSION_KEY,
      JSON.stringify(session)
    );
  } catch (error) {
    console.warn("Could not save active session:", error);
  }
}

function confirmLeave() {
  if (!session) {
    goHome();
    return;
  }

  if (confirm("Exit this quiz? Your current attempt will not be saved.")) {
    goHome();
  }
}

// FINISH QUIZ
function finishQuiz(autoSubmitted) {
  if (!session || session.finished) return;

  session.finished = true;

  clearInterval(timerInterval);
  timerInterval = null;

  const total = session.answers.length;

  const correct = session.answers.filter(
    answer => answer.isCorrect
  ).length;

  const topicStats = {};

  session.allowedTopics.forEach(topic => {
    topicStats[topic] = {
      correct: 0,
      total: 0
    };
  });

  session.answers.forEach(answer => {
    if (!topicStats[answer.topic]) {
      topicStats[answer.topic] = {
        correct: 0,
        total: 0
      };
    }

    topicStats[answer.topic].total++;

    if (answer.isCorrect) {
      topicStats[answer.topic].correct++;
    }
  });

  const weakTopics = Object.entries(topicStats)
    .filter(([topic, stats]) =>
      stats.total > 0 &&
      stats.correct / stats.total < 0.6
    )
    .sort((a, b) =>
      (a[1].correct / a[1].total) -
      (b[1].correct / b[1].total)
    )
    .map(([topic]) => topic);

  const accuracy = total
    ? Math.round((correct / total) * 100)
    : 0;

  const elapsed = Math.min(
    QUIZ_SECONDS,
    Math.round((Date.now() - session.startedAt) / 1000)
  );

  const report = {
    id: Date.now(),
    date: new Date().toISOString(),
    topic: session.topic ||
      (session.remedial ? "Remedial drill" : "Mixed challenge"),
    remedial: session.remedial,
    autoSubmitted,
    answers: session.answers,
    correct,
    total,
    accuracy,
    elapsed,
    bonus: session.bonus,
    highestDifficulty:
      DIFFICULTIES[session.highestDifficulty - 1],
    weakTopics,
    topicStats,
    percentile: Math.max(
      5,
      Math.min(99, Math.round(accuracy * 0.88 + 8))
    )
  };

  lastReport = report;

  const history = getHistory();
  history.unshift(report);
  saveHistory(history.slice(0, 50));

  sessionStorage.removeItem(SESSION_KEY);

  renderResults(report);
  showScreen("resultScreen");
  setActiveNav("");

  if (autoSubmitted) {
    showToast("Time is up — your quiz was submitted.");
  }
}

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;

  return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

// RESULT PAGE
function renderResults(report) {
  $("resultSubtitle").textContent = report.autoSubmitted
    ? "The timer reached zero and your answers were submitted automatically."
    : "Every attempt is progress. Here's what your answers revealed.";

  $("scoreValue").textContent = report.correct;

  $("scoreMessage").textContent =
    report.accuracy >= 80
      ? "Excellent work. You're mastering the arena."
      : report.accuracy >= 50
        ? "Solid progress. A little targeted practice will move you forward."
        : "Good effort. Your diagnostic map shows where to focus next.";

  $("accuracyValue").textContent =
    `${report.accuracy}% accuracy`;

  $("percentileValue").textContent =
    `Top ${100 - report.percentile}% · simulated`;

  $("resultCorrect").textContent =
    `${report.correct} / ${report.total}`;

  $("resultTime").textContent =
    formatTime(report.elapsed);

  $("resultBonus").textContent =
    `+${report.bonus}`;

  $("resultLevel").textContent =
    report.highestDifficulty;

  $("reviewCount").textContent =
    `${report.total} QUESTIONS`;

  const weak = report.weakTopics;

  $("weakTopics").innerHTML = weak.length
    ? weak.map(topic =>
        `<span class="weak-chip">FOCUS · ${escapeHTML(topic)}</span>`
      ).join("")
    : '<span class="weak-chip">NO CRITICAL WEAK TOPIC DETECTED</span>';

  $("recommendTitle").textContent = weak.length
    ? `Focus on ${weak[0]}`
    : "Keep the momentum";

  $("recommendText").textContent = weak.length
    ? `Your lowest mastery signal was in ${weak.join(", ")}. A targeted five-question drill can help reinforce these concepts.`
    : "Your topic accuracy looks balanced in this attempt. Try another mixed round at a higher level.";

  renderRadar(report);

  $("reviewList").innerHTML = report.answers.map(
    (answer, index) => `
      <div class="review-item">
        <div class="review-top" role="button" tabindex="0" aria-expanded="false">
          <span class="review-number">${String(index + 1).padStart(2, "0")}</span>
          <strong>${escapeHTML(answer.question)}</strong>
          <span class="review-status ${answer.isCorrect ? "correct" : "wrong"}">
            ${answer.isCorrect ? "CORRECT" : "REVIEW"}
          </span>
        </div>

        <div class="review-detail">
          <p>
            <b>Your answer:</b>
            ${escapeHTML(answer.options[answer.selectedIndex] ?? "Not answered")}
            <br>

            <b>Correct answer:</b>
            ${escapeHTML(answer.options[answer.correctIndex])}
            <br>

            <b>Explanation:</b>
            ${escapeHTML(answer.explanation)}
            <br>

            <b>Time spent:</b> ${answer.timeSpent}s ·
            <b>Topic:</b> ${escapeHTML(answer.topic)} ·
            <b>Tier:</b> ${escapeHTML(answer.difficulty)}
          </p>
        </div>
      </div>
    `
  ).join("");

  document.querySelectorAll(".review-top").forEach(element => {
    const toggle = () => {
      const item = element.parentElement;
      item.classList.toggle("open");

      element.setAttribute(
        "aria-expanded",
        item.classList.contains("open") ? "true" : "false"
      );
    };

    element.addEventListener("click", toggle);

    element.addEventListener("keydown", event => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        toggle();
      }
    });
  });
}

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, character => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[character]);
}

// RADAR CHART
function renderRadar(report) {
  const canvas = $("radarChart");
  const ctx = canvas.getContext("2d");

  const width = canvas.width;
  const height = canvas.height;

  ctx.clearRect(0, 0, width, height);

  const centerX = width / 2;
  const centerY = height / 2 + 5;
  const radius = Math.min(width * 0.34, height * 0.36);

  const topics = TOPICS.filter(topic =>
    report.topicStats[topic] &&
    report.topicStats[topic].total > 0
  );

  const labels = topics.length ? topics : TOPICS;

  const values = labels.map(topic => {
    const stats = report.topicStats[topic];

    return stats && stats.total
      ? Math.round(stats.correct / stats.total * 100)
      : 0;
  });

  ctx.font = "16px Manrope";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  for (let ring = 1; ring <= 4; ring++) {
    const ringRadius = radius * ring / 4;

    ctx.beginPath();

    labels.forEach((topic, index) => {
      const angle =
        -Math.PI / 2 + index * 2 * Math.PI / labels.length;

      const x = centerX + Math.cos(angle) * ringRadius;
      const y = centerY + Math.sin(angle) * ringRadius;

      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });

    ctx.closePath();
    ctx.strokeStyle = "rgba(174,183,230,.18)";
    ctx.lineWidth = 1;
    ctx.stroke();
  }

  labels.forEach((topic, index) => {
    const angle =
      -Math.PI / 2 + index * 2 * Math.PI / labels.length;

    const x = centerX + Math.cos(angle) * radius;
    const y = centerY + Math.sin(angle) * radius;

    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(x, y);
    ctx.strokeStyle = "rgba(174,183,230,.2)";
    ctx.stroke();

    const labelX =
      centerX + Math.cos(angle) * (radius + 43);

    const labelY =
      centerY + Math.sin(angle) * (radius + 36);

    ctx.fillStyle = "#b5bdd8";
    ctx.font = "13px Manrope";
    ctx.fillText(topic, labelX, labelY);
  });

  ctx.beginPath();

  values.forEach((value, index) => {
    const angle =
      -Math.PI / 2 + index * 2 * Math.PI / labels.length;

    const pointRadius = radius * value / 100;

    const x = centerX + Math.cos(angle) * pointRadius;
    const y = centerY + Math.sin(angle) * pointRadius;

    if (index === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  });

  ctx.closePath();
  ctx.fillStyle = "rgba(163,120,255,.22)";
  ctx.strokeStyle = "#b18aff";
  ctx.lineWidth = 3;
  ctx.fill();
  ctx.stroke();

  values.forEach((value, index) => {
    const angle =
      -Math.PI / 2 + index * 2 * Math.PI / labels.length;

    const x =
      centerX + Math.cos(angle) * radius * value / 100;

    const y =
      centerY + Math.sin(angle) * radius * value / 100;

    ctx.beginPath();
    ctx.arc(x, y, 5, 0, Math.PI * 2);
    ctx.fillStyle = "#f3a5dd";
    ctx.fill();
  });
}

// REMEDIAL QUIZ
function startRemedial() {
  if (!lastReport) {
    showToast("Complete a quiz first to unlock a targeted drill.");
    return;
  }

  startQuiz(true, null);
}

// HISTORY
function renderHistory() {
  const history = getHistory();

  $("historyAttempts").textContent = history.length;

  $("historyBest").textContent = history.length
    ? `${Math.max(...history.map(item => item.accuracy))}%`
    : "0%";

  $("historyAverage").textContent = history.length
    ? `${(
        history.reduce((sum, item) => sum + item.correct, 0) /
        history.length
      ).toFixed(1)}/10`
    : "0/10";

  if (!history.length) {
    $("historyList").innerHTML = `
      <div class="history-empty">
        No attempts yet. Enter the arena and your progress will appear here.
      </div>
    `;
    return;
  }

  $("historyList").innerHTML = history.map(report => `
    <div class="history-row">
      <div>
        <strong>${escapeHTML(report.topic)}</strong>
        <small>
          ${report.remedial ? "REMEDIAL DRILL" : "QUIZ ATTEMPT"}
          · ${new Date(report.date).toLocaleString()}
        </small>
      </div>

      <span class="history-score">
        ${report.correct}/${report.total}
      </span>

      <span class="history-date">
        ${report.accuracy}%
      </span>
    </div>
  `).join("");
}

function clearHistory() {
  if (!confirm("Clear all saved quiz attempts from this browser?")) {
    return;
  }

  saveHistory([]);
  renderHistory();

  lastReport = null;

  showToast("Attempt history cleared.");
}

// EXPORT REPORT
function exportReport() {
  if (!lastReport) {
    showToast("No report available yet.");
    return;
  }

  const report = lastReport;

  const rows = report.answers.map((answer, index) => `
${index + 1}. ${answer.question}
Your answer: ${answer.options[answer.selectedIndex] ?? "Not answered"}
Correct answer: ${answer.options[answer.correctIndex]}
Explanation: ${answer.explanation}
Time: ${answer.timeSpent}s
  `).join("\n");

  const reportText = `
QUIZQUAKE — BRAINSTORM ARENA
DIAGNOSTIC REPORT

Date: ${new Date(report.date).toLocaleString()}
Challenge: ${report.topic}
Score: ${report.correct}/${report.total}
Accuracy: ${report.accuracy}%
Time used: ${formatTime(report.elapsed)}
Hard streak bonus: ${report.bonus}
Highest difficulty: ${report.highestDifficulty}
Simulated percentile: ${report.percentile}
Weak topics: ${report.weakTopics.join(", ") || "None detected"}

SOLUTION REVIEW
${rows}
`;

  const printWindow = window.open("", "_blank");

  if (!printWindow) {
    showToast("Allow pop-ups to print your PDF report.");
    return;
  }

  printWindow.document.write(`
    <!doctype html>
    <html>
    <head>
      <title>QuizQuake Diagnostic Report</title>

      <style>
        body {
          font: 14px Arial, sans-serif;
          max-width: 850px;
          margin: 40px auto;
          color: #182033;
          line-height: 1.6;
        }

        h1 { color: #6942c2; }

        pre {
          white-space: pre-wrap;
          font: 13px Arial;
        }

        button {
          padding: 10px 18px;
          background: #6942c2;
          color: white;
          border: 0;
          border-radius: 6px;
        }

        @media print {
          button { display: none; }
        }
      </style>
    </head>

    <body>
      <h1>QUIZQUAKE — DIAGNOSTIC REPORT</h1>

      <button onclick="window.print()">
        Print / Save as PDF
      </button>

      <pre>${escapeHTML(reportText)}</pre>

      <script>
        setTimeout(() => window.print(), 500);
      <\/script>
    </body>
    </html>
  `);

  printWindow.document.close();
}

// RESTORE ACTIVE QUIZ AFTER REFRESH
function restoreSession() {
  try {
    const saved = JSON.parse(
      sessionStorage.getItem(SESSION_KEY) || "null"
    );

    if (!saved || saved.finished || !saved.current) {
      return;
    }

    if (saved.endsAt <= Date.now()) {
      session = saved;
      finishQuiz(true);
      return;
    }

    session = saved;

    showScreen("quizScreen");
    setActiveNav("");

    $("quizModeLabel").textContent = session.remedial
      ? "TARGETED REMEDIAL DRILL"
      : session.topic
        ? session.topic.toUpperCase() + " CHALLENGE"
        : "MIXED CHALLENGE";

    const question = session.current;

    const totalQuestions = session.remedial ? 5 : QUIZ_LENGTH;

    $("questionCounter").textContent =
      `QUESTION ${String(session.currentIndex + 1).padStart(2, "0")} / ${totalQuestions}`;

    $("progressFill").style.width =
      `${(session.currentIndex / totalQuestions) * 100}%`;

    $("progressPercent").textContent =
      `${Math.round((session.currentIndex / totalQuestions) * 100)}%`;

    $("topicTag").textContent = question.topic.toUpperCase();

    $("difficultyTag").textContent =
      question.difficulty.toUpperCase();

    $("difficultyTag").className =
      `difficulty ${question.difficulty.toLowerCase()}`;

    $("questionText").textContent = question.q;

    $("optionsList").innerHTML = "";

    question.o.forEach((option, index) => {
      const button = document.createElement("button");

      button.type = "button";
      button.className = "option-btn";

      button.innerHTML = `
        <span class="option-letter">
          ${String.fromCharCode(65 + index)}
        </span>
        <span></span>
      `;

      button.querySelector("span:last-child").textContent = option;

      button.addEventListener("click", () => {
        selectOption(index);
      });

      if (session.selected === index) {
        button.classList.add("selected");
      }

      $("optionsList").appendChild(button);
    });

    $("nextBtn").disabled = session.selected === null;

    updateLiveStats();
    updateDifficultyUI();
    startTimer();

  } catch (error) {
    console.error("Could not restore quiz:", error);
    sessionStorage.removeItem(SESSION_KEY);
  }
}

// DEMO LOGIN — front-end only; no server-side identity verification.
function getSignedInUser() {
  try { return sessionStorage.getItem(LOGIN_KEY) || ""; }
  catch (error) { return ""; }
}

function updateAuthUI(isLoggedIn) {
  const nav = $("mainNavigation");
  const logout = $("logoutBtn");
  if (nav) nav.hidden = !isLoggedIn;
  if (logout) logout.hidden = !isLoggedIn;
}

function handleLogin(event) {
  event.preventDefault();
  const email = $("loginEmail").value.trim();
  const password = $("loginPassword").value;
  const error = $("loginError");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    error.textContent = "Please enter a valid email address.";
    $("loginEmail").focus();
    return;
  }
  if (password.length < 4) {
    error.textContent = "Password must contain at least 4 characters.";
    $("loginPassword").focus();
    return;
  }
  try {
    sessionStorage.setItem(LOGIN_KEY, email);
  } catch (storageError) {
    error.textContent = "Your browser blocked session storage. Please enable it and try again.";
    return;
  }
  error.textContent = "";
  updateAuthUI(true);
  showScreen("homeScreen");
  setActiveNav("home");
  showToast("Welcome to QuizQuake!");
}

function logoutUser() {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
  session = null;
  sessionStorage.removeItem(SESSION_KEY);
  sessionStorage.removeItem(LOGIN_KEY);
  updateAuthUI(false);
  showScreen("loginScreen");
  $("loginPassword").value = "";
  showToast("You have been signed out.");
}

function initializeLogin() {
  const form = $("loginForm");
  if (form) form.addEventListener("submit", handleLogin);
  const toggle = $("togglePassword");
  if (toggle) toggle.addEventListener("click", () => {
    const password = $("loginPassword");
    const showing = password.type === "text";
    password.type = showing ? "password" : "text";
    toggle.textContent = showing ? "SHOW" : "HIDE";
    toggle.setAttribute("aria-label", showing ? "Show password" : "Hide password");
  });
  const signedIn = Boolean(getSignedInUser());
  updateAuthUI(signedIn);
  if (signedIn) showScreen("homeScreen");
  else showScreen("loginScreen");
}

// CUSTOM ANIMATED CURSOR + INITIALIZATION
document.addEventListener("DOMContentLoaded", () => {
  if (window.matchMedia("(hover:hover) and (pointer:fine)").matches) {
    const dot = $("cursorDot");
    const ring = $("cursorRing");

    document.body.classList.add("cursor-ready");

    let mouseX = innerWidth / 2;
    let mouseY = innerHeight / 2;

    let ringX = mouseX;
    let ringY = mouseY;

    window.addEventListener("mousemove", event => {
      mouseX = event.clientX;
      mouseY = event.clientY;

      dot.style.left = mouseX + "px";
      dot.style.top = mouseY + "px";
    });

    const animateCursor = () => {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;

      ring.style.left = ringX + "px";
      ring.style.top = ringY + "px";

      requestAnimationFrame(animateCursor);
    };

    animateCursor();

    document.addEventListener("mouseover", event => {
      if (event.target.closest("button,a")) {
        ring.classList.add("hover");
      }
    });

    document.addEventListener("mouseout", event => {
      if (event.target.closest("button,a")) {
        ring.classList.remove("hover");
      }
    });
  }

  initializeLogin();
  if (getSignedInUser()) restoreSession();
});