import express from 'express'
import cors from 'cors'

const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

app.post('/bfhl', (req, res) => {
  try {
    const { data } = req.body

    if (!data) {
      return res.status(400).json({
        success: false,
        message: "Request body must contain 'data' field."
      })
    }

    if (!Array.isArray(data)) {
      return res.status(400).json({
        success: false,
        message: "'data' must be an array of strings."
      })
    }

    const invalid_entries = []
    const duplicate_edges = []
    const seenEdges = new Set()
    const childParent = new Map()
    const validEdges = []

    for (let item of data) {
      if (typeof item !== 'string') {
        invalid_entries.push(String(item))
        continue
      }

      item = item.trim()

      if (!/^[A-Z]->[A-Z]$/.test(item)) {
        invalid_entries.push(item)
        continue
      }

      const [parent, child] = item.split('->')

      if (parent === child) {
        invalid_entries.push(item)
        continue
      }

      if (seenEdges.has(item)) {
        if (!duplicate_edges.includes(item)) {
          duplicate_edges.push(item)
        }
        continue
      }

      seenEdges.add(item)

      if (childParent.has(child)) continue

      childParent.set(child, parent)
      validEdges.push([parent, child])
    }

    const graph = {}

    for (const [parent, child] of validEdges) {
      if (!graph[parent]) graph[parent] = []
      if (!graph[child]) graph[child] = []
      graph[parent].push(child)
    }

    const nodes = Object.keys(graph)
    const undirected = {}

    for (const node of nodes) undirected[node] = []

    for (const [parent, child] of validEdges) {
      undirected[parent].push(child)
      undirected[child].push(parent)
    }

    const visited = new Set()
    const groups = []

    for (const node of nodes) {
      if (visited.has(node)) continue

      const queue = [node]
      const component = []
      visited.add(node)

      while (queue.length) {
        const current = queue.shift()
        component.push(current)

        for (const next of undirected[current]) {
          if (!visited.has(next)) {
            visited.add(next)
            queue.push(next)
          }
        }
      }

      groups.push(component)
    }

    function hasCycle(group) {
      const groupSet = new Set(group)
      const visiting = new Set()
      const visited = new Set()

      function dfs(node) {
        if (visiting.has(node)) return true
        if (visited.has(node)) return false

        visiting.add(node)

        for (const child of graph[node]) {
          if (groupSet.has(child)) {
            if (dfs(child)) return true
          }
        }

        visiting.delete(node)
        visited.add(node)
        return false
      }

      for (const node of group) {
        if (dfs(node)) return true
      }

      return false
    }

    function buildTree(node) {
      const result = {}

      for (const child of graph[node]) {
        result[child] = buildTree(child)
      }

      return result
    }

    function getDepth(node) {
      if (graph[node].length === 0) return 1

      let maxDepth = 0

      for (const child of graph[node]) {
        maxDepth = Math.max(maxDepth, getDepth(child))
      }

      return maxDepth + 1
    }

    const hierarchies = []
    let total_trees = 0
    let total_cycles = 0
    let largest_tree_root = ''
    let maxDepth = 0

    for (const group of groups) {
      const cycle = hasCycle(group)

      const childSet = new Set()

      for (const [parent, child] of validEdges) {
        if (group.includes(child)) childSet.add(child)
      }

      let roots = group.filter(node => !childSet.has(node))

      let root =
        roots.length > 0
          ? roots.sort()[0]
          : [...group].sort()[0]

      if (cycle) {
        hierarchies.push({
          root,
          tree: {},
          has_cycle: true
        })

        total_cycles++
      } else {
        const depth = getDepth(root)

        hierarchies.push({
          root,
          tree: {
            [root]: buildTree(root)
          },
          depth
        })

        total_trees++

        if (
          depth > maxDepth ||
          (depth === maxDepth && root < largest_tree_root)
        ) {
          maxDepth = depth
          largest_tree_root = root
        }
      }
    }

    return res.status(200).json({
      user_id: "prajashkumarpatel_25042004",
      email_id: "pp8638@srmist.edu.in",
      college_roll_number: "RA2311004010390",
      hierarchies,
      invalid_entries,
      duplicate_edges,
      summary: {
        total_trees,
        total_cycles,
        largest_tree_root
      }
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Unexpected server error.",
      error: error.message
    })
  }
})

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found."
  })
})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})