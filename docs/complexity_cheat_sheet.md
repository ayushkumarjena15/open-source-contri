# Time and Space Complexity Cheat Sheet

A comprehensive quick-reference guide for the data structures, sorting, searching, and graph algorithms implemented in the **Open Source Developer Toolkit**.

---

## 📊 Data Structures Complexity

| Data Structure | Access | Search | Insertion | Deletion | Space Complexity | Notes |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Array** | $O(1)$ | $O(n)$ | $O(n)$ | $O(n)$ | $O(n)$ | Native index lookup |
| **Stack** | $O(n)$ | $O(n)$ | $O(1)$ | $O(1)$ | $O(n)$ | LIFO |
| **Queue** | $O(n)$ | $O(n)$ | $O(1)$ | $O(1)$ | $O(n)$ | FIFO |
| **Doubly Linked List** | $O(n)$ | $O(n)$ | $O(1)$ | $O(1)$ | $O(n)$ | Bi-directional pointers |
| **LRU Cache** | N/A | $O(1)$ | $O(1)$ | $O(1)$ | $O(capacity)$ | Hash Map + Doubly Linked List |
| **Trie (Prefix Tree)** | N/A | $O(L)$ | $O(L)$ | $O(L)$ | $O(N \cdot L)$ | $L$ = word length, $N$ = count |
| **Priority Queue / Binary Heap** | N/A | $O(n)$ | $O(\log n)$ | $O(\log n)$ | $O(n)$ | $O(1)$ peek min/max |

---

## 🔍 Search Algorithms Complexity

| Algorithm | Best Time | Average Time | Worst Time | Space Complexity | Requirements |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Binary Search** | $O(1)$ | $O(\log n)$ | $O(\log n)$ | $O(1)$ | Sorted Array |
| **Jump Search** | $O(1)$ | $O(\sqrt{n})$ | $O(\sqrt{n})$ | $O(1)$ | Sorted Array |
| **Exponential Search** | $O(1)$ | $O(\log n)$ | $O(\log n)$ | $O(1)$ | Sorted / Unbounded Array |
| **Interpolation Search** | $O(1)$ | $O(\log \log n)$ | $O(n)$ | $O(1)$ | Sorted & Uniformly Distributed |

---

## 🔄 Sorting Algorithms Complexity

| Algorithm | Best Time | Average Time | Worst Time | Space Complexity | Stable | In-Place |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Quick Sort** | $O(n \log n)$ | $O(n \log n)$ | $O(n^2)$ | $O(\log n)$ | No | No (Functional) |
| **Merge Sort** | $O(n \log n)$ | $O(n \log n)$ | $O(n \log n)$ | $O(n)$ | Yes | No |
| **Heap Sort** | $O(n \log n)$ | $O(n \log n)$ | $O(n \log n)$ | $O(1)$ auxiliary | No | Yes (Array-based) |
| **Radix Sort (LSD)** | $O(nk)$ | $O(nk)$ | $O(nk)$ | $O(n + k)$ | Yes | No |
| **Insertion Sort** | $O(n)$ | $O(n^2)$ | $O(n^2)$ | $O(1)$ | Yes | Yes |

---

## 🌐 Graph Algorithms Complexity

| Algorithm | Problem / Application | Time Complexity | Space Complexity |
| :--- | :--- | :--- | :--- |
| **Breadth-First Search (BFS)** | Shortest Path (Unweighted) / Level Traversal | $O(V + E)$ | $O(V)$ |
| **Depth-First Search (DFS)** | Topological Sorting / Connectivity | $O(V + E)$ | $O(V)$ |
| **Dijkstra's Algorithm** | Shortest Path (Weighted, Non-Negative) | $O((V + E) \log V)$ | $O(V)$ |
| **Topological Sort (Kahn's)** | Task Scheduling / Dependency Resolution | $O(V + E)$ | $O(V)$ |
| **Cycle Detection** | Graph Validation / Deadlock Detection | $O(V + E)$ | $O(V)$ |
