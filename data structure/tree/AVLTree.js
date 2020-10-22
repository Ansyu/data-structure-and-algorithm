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

    _delete(rootNode, deleteNode) {
        if (!deleteNode || !rootNode) {
            return rootNode
        }
        if (deleteNode.value < rootNode.value) {
            rootNode.left = this._delete(rootNode.left, deleteNode)
            if (this.height(rootNode.right) - this.height(rootNode.left) > 1) {
                let rightNode = rootNode.right
                // RL
                if (this.height(rightNode.left) > this.height(rightNode.right)) {
                    rootNode = this.RLRotate(rootNode)

                // RR
                } else {
                    rootNode = this.RRRotate(rootNode)
                }
            }
        } else if (deleteNode.value > rootNode.value) {
            rootNode.right = this._delete(rootNode.right, deleteNode)
            if (this.height(rootNode.left) - this.height(rootNode.right) > 1) {
                let leftNode = rootNode.left
                // LR
                if (this.height(leftNode.right) > this.height(leftNode.left)) {
                    rootNode = this.LRRotate(rootNode)

                // LL
                } else {
                    rootNode = this.LLRotate(rootNode)
                }
            }
        } else {
            if (deleteNode.left && deleteNode.right) {
                if (this.height(deleteNode.left) > this.height(deleteNode.right)) {
                    let max = this.findMax(deleteNode.left)
                    deleteNode.value = max.value
                    deleteNode.left = this._delete(deleteNode.left, max)
                } else {
                    let min = this.findMin(deleteNode.right)
                    deleteNode.value = min.value
                    deleteNode.right = this._delete(deleteNode.right, min)
                }
            } else {
                rootNode = rootNode.left ? rootNode.left : rootNode.right
            }
        }
        return rootNode
    }

    delete(value) {
        this.root = this._delete(this.root, this.find(value))
    }

    find(value) {
        let currentNode = this.root
        while (currentNode) {
            if (currentNode.value === value) {
                return currentNode
            } else if (value < currentNode.value) {
                currentNode = currentNode.left
            } else {
                currentNode = currentNode.right
            }
        }
        return null
    }
    findMin(node) {
        if (!node) {
            return null
        }
        let currentNode = node
        while(currentNode.left) {
            currentNode = currentNode.left
        }
        return currentNode
    }

    findMax(node) {
        if (!node) {
            return null
        }
        let currentNode = node
        while(currentNode.right) {
            currentNode = currentNode.right
        }
        return currentNode
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
    let avl = new AVLTree()
    let values = [15, 6, 3, 2, 4, 7, 13, 9, 18, 17, 20]
    values.forEach(v => {
        avl.insert(v)
        console.log(`insert ${v} ::`)
        console.log(avl.preOrder())
        console.log(avl.inOrder())
        console.log('*************************************')
    })
}

function testDelete() {
    let avl = new AVLTree()
    let values = [15, 6, 3, 2, 4, 7, 13, 9, 18, 17, 20]
    values.forEach(v => {
        avl.insert(v)
    });
    console.log(avl.preOrder())
    console.log(avl.inOrder())
    console.log('*************************************');
    [20, 7, 9, 6].forEach(v => {
        avl.delete(v)
        console.log(`delete ${v} ::`)
        console.log(avl.preOrder())
        console.log(avl.inOrder())
        console.log('*************************************')
    })
}

// testAdd()
testDelete()