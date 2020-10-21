class Node {
    constructor(value) {
        this.value = value
        this.height = 1
        this.left = null
        this.right = null
    }
}

class AVLTree {
    constructor() {
        this.root = null
    }

    height(node) {
        return node ? node.height : 0;
    }

    add(node, value) {
        if (!node) {
            return new Node(value)
        }
        if (value < node.value) {
            node.left = this.add(node.left, value)
            if (this.height(node.left) - this.height(node.right) > 1) {
                // LL
                if (value < node.left.value) {
                    node = this.LLRotate(node)

                // LR
                } else {
                    node = this.LRRotate(node)
                }
            }
        } else {
            node.right = this.add(node.right, value)
            if (this.height(node.right) - this.height(node.left) > 1) {
                // RR
                if (value > node.right.value) {
                    node = this.RRRotate(node)
                
                // RL
                } else {
                    node = this.RLRotate(node)
                }
            }
        }
        node.height = Math.max(this.height(node.left), this.height(node.right)) + 1
        return node
    }

    insert(value) {
        this.root = this.add(this.root, value)
    }

    LLRotate(rootNode) {
        let leftNode = rootNode.left
        rootNode.left = leftNode.right
        leftNode.right = rootNode

        rootNode.height = Math.max(this.height(rootNode.left), this.height(rootNode.right)) + 1
        leftNode.height = Math.max(this.height(leftNode.left), rootNode.height) + 1
        
        return leftNode
    }

    RRRotate(rootNode) {
        let rightNode = rootNode.right
        rootNode.right = rightNode.left
        rightNode.left = rootNode

        rootNode.height = Math.max(this.height(rootNode.left), this.height(rootNode.right)) + 1
        rightNode.height = Math.max(this.height(rightNode.right), rootNode.height) + 1

        return rightNode
    }

    LRRotate(node) {
        node.left = this.RRRotate(node.left)
        return this.LLRotate(node)
    }

    RLRotate(node) {
        node.right = this.LLRotate(node.right)
        return this.RRRotate(node)
    }

    preOrder() {
        let result = []
        _inOrder(this.root)
        return result.join(',')
        function _inOrder(node) {
            result.push(node.value)
            node.left && _inOrder(node.left)
            node.right && _inOrder(node.right)
        }
    }

    inOrder() {
        let result = []
        _inOrder(this.root)
        return result.join(',')
        function _inOrder(node) {
            node.left && _inOrder(node.left)
            result.push(node.value)
            node.right && _inOrder(node.right)
        }
    }
}
function testAdd() {
    let bst = new AVLTree()
    let values = [15, 6, 3, 2, 4, 7, 13, 9, 18, 17, 20]
    values.forEach(v => {
        bst.insert(v)
        console.log(`insert ${v} ::`)
        console.log(bst.preOrder())
        console.log(bst.inOrder())
        console.log('*************************************')
    })
}

testAdd()