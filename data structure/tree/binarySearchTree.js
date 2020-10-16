
class BinarySearchTree {
    constructor() {
        this.root = null
    }

    add(value) {
        if (this.root) {
            let currentNode = this.root
            let newNode = {
                value,
                left: null,
                right: null
            }
            while (currentNode) {
                if (value < currentNode.value) {
                    if (!currentNode.left) {
                        return currentNode.left = newNode
                    }
                    currentNode = currentNode.left
                } else {
                    if (!currentNode.right) {
                        return currentNode.right = newNode
                    }
                    currentNode = currentNode.right
                }
            }

        } else {
            this.root = {
                value,
                left: null,
                right: null
            }
        }
    }

    delete(value) {
        let currentNode = this.find(value)
        if (!currentNode) {
            throw new Error("Not found the value!!!")
        }

        let node = currentNode.node
        let parent = currentNode.parentNode

        // no left and right
        if (!node.left && !node.right) {
            if (parent) {
                parent.left === node ? parent.left = null : parent.right = null
            } else {
                this.root = null
            }
        
        // no left but has right
        } else if (!node.left) {
            if (parent) {
                parent.left === node ? parent.left = node.right : parent.right = node.right
            } else {
                this.root = node.right
            }

        // no right but has left
        } else if (!node.right) {
            if (parent) {
                parent.left === node ? parent.left = node.left : parent.right = node.left
            } else {
                this.root = node.left
            }

        // has left and right
        } else {
            let max = this.findMaxNode(node.left)
            let mParent = max.parentNode
            let mNode = max.node
            mParent.left === mNode ? mParent.left = null : mParent.right = null
            mNode.left = node.left
            mNode.right = node.right

            if (parent) {
                parent.left === node ? parent.left = mNode : parent.right = mNode
            } else {
                this.root = mNode
            }
        }

    }

    find(value) {
        let currentNode = this.root
        let parentNode = null
        while (currentNode) {
            if (value === currentNode.value) {
                return {
                    parentNode,
                    node: currentNode
                }
            } else {
                parentNode = currentNode
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
        let preNode = node
        let parentNode = null
        while (node.left) {
            parentNode = node
            node = node.left
            preNode = node
        }
        return {
            parentNode,
            node: preNode
        }
    }

    findMaxNode(node) {
        let nextNode = node
        let parentNode = null
        while (node.right) {
            parentNode = node
            node = node.right
            nextNode = node
        }
        return {
            parentNode,
            node: nextNode
        }

    }

    preOrder(node) {
        console.log(node.value)
        node.left && this.print(node.left)
        node.right && this.print(node.right)
    }
}

function testAdd() {
    let bst = new BinarySearchTree()
    bst.add(3)
    bst.add(2)
    bst.add(4)
    bst.add(1)
    bst.add(2.5)
    // bst.print(bst.root)
    // console.log(bst.find(2))
    // console.log(bst.find(8))
    // console.log(bst.findMinNode(bst.root.left))
    // console.log(bst.findMaxNode(bst.root.left))
    bst.delete(3)
    console.log(bst)
    bst.delete(2)
    console.log(bst)
    bst.delete(4)
    console.log(bst)
}

testAdd()