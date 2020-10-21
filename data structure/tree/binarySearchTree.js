
class Node {
    constructor(value) {
        this.value = value
        this.left = null
        this.right = null
        this.parent = null
    }
}

class BinarySearchTree {
    constructor() {
        this.root = null
    }

    add(value) {
        let newNode = new Node(value)
        if (!this.root) {
            this.root = newNode
            return
        }

        let pNode = null
        let cNode = this.root
        while(cNode) {
            pNode = cNode
            if (value < cNode.value) {
                cNode = cNode.left
            } else {
                cNode = cNode.right
            }
        }
        if (value < pNode.value) {
            pNode.left = newNode
        } else {
            pNode.right = newNode
        }
        newNode.parent = pNode
    }

    delete(value) {
        let deleteNode = this.find(value)
        if (!deleteNode) {
            throw new Error("Not found the node!!!")
        }

        let parent = deleteNode.parent
        // no left and right
        if (!deleteNode.left && !deleteNode.right) {
            if (parent) {
                parent.left === deleteNode ? parent.left = null : parent.right = null
            } else {
                this.root = null
            }
        
        // no left but has right
        } else if (!deleteNode.left) {
            if (parent) {
                parent.left === deleteNode ? parent.left = deleteNode.right : parent.right = deleteNode.right
            } else {
                this.root = deleteNode.right
            }
            deleteNode.right.parent = parent

        // no right but has left
        } else if (!deleteNode.right) {
            if (parent) {
                parent.left === deleteNode ? parent.left = deleteNode.left : parent.right = deleteNode.left
            } else {
                this.root = deleteNode.left
            }
            deleteNode.left.parent = parent

        // has left and right
        } else {
            let nextNode = this.findMinNode(deleteNode.right)
            if (nextNode !== deleteNode.right) {
                nextNode.parent.left = nextNode.right
                nextNode.right && (nextNode.right.parent = nextNode.parent)
                nextNode.left = deleteNode.left
                deleteNode.left && (deleteNode.left.parent = nextNode)
                nextNode.right = deleteNode.right
                deleteNode.right && (deleteNode.right.parent = nextNode)
            } else {
                nextNode.left = deleteNode.left
                deleteNode.left && (deleteNode.left.parent = nextNode)
            }

            if (parent) {
                parent.left === deleteNode ? parent.left = nextNode : parent.right = nextNode
            } else {
                this.root = nextNode
            }
            nextNode.parent = parent
        }

    }

    find(value) {
        let currentNode = this.root
        while (currentNode) {
            if (value === currentNode.value) {
                return currentNode
            } else {
                if (value < currentNode.value) {
                    currentNode = currentNode.left
                } else {
                    currentNode = currentNode.right
                }
            }
        }
        return null
    }

    findMinNode(node) {
        while (node.left) {
            node = node.left
        }
        return node
    }

    findMaxNode(node) {
        while (node.right) {
            node = node.right
        }
        return node
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

function testDelete(value) {
    let bst = new BinarySearchTree()
    let values = [15, 6, 3, 2, 4, 7, 13, 9, 18, 17, 20]
    values.forEach(v => {
        bst.add(v)
    })
    console.log(bst.preOrder())
    console.log(bst.inOrder())
    value.forEach(v => {
        bst.delete(v)
        if (bst.root) {
            console.log(`delete ${v}: `)
            console.log(bst.preOrder(), bst.inOrder())
        }
    })
}

testDelete([15, 6, 3, 2, 4, 7, 13, 9, 18, 17, 20])