let addedSquares = [];

function Square(x, y, children, parent) {
    return {
        x: x,
        y: y,
        children: children,
        parent: parent,
    }
}

function knightsMoves(start, end) {
    let root = Square(start[0], start[1], [], null);
    if (root.x === end[0] && root.y === end[1]) {
        return [root.x, root.y];
    }

    let nextMoves = nextPossibleMoves([root.x, root.y]);
    nextMoves = getUniqueSquares(nextMoves);
    nextMoves = getValidSquares(nextMoves);
    
    nextMoves.forEach(move => {
        let node = Square(move[0], move[1], [], root)
        root.children.push(node);
    })
    // console.log(root);

    // root.children = nextMoves;
    let currentNode = root;
    let nextLevel = currentNode.children;

    let keepLooking = true;
    let foundNode = null;
    while (keepLooking) {
        nextLevel.forEach(node => {
            if (node.x === end[0] && node.y === end[1]) {
                keepLooking = false;
                foundNode = node;
            }
        })
        let tempNodeArray = [];
        nextLevel.forEach(node => {
            let nextMoves = nextPossibleMoves([node.x, node.y]);
            nextMoves = getUniqueSquares(nextMoves);
            nextMoves = getValidSquares(nextMoves);
            
            nextMoves.forEach(move => {
                let newNode = Square(move[0], move[1], [], node)
                node.children.push(newNode);
                tempNodeArray.push(newNode);
            })
        })
        nextLevel = tempNodeArray;
    }
    let tempNode = foundNode;
    while (tempNode !== null) {
        console.log(tempNode.x,", ", tempNode.y);
        tempNode = tempNode.parent;
    }

}



// function knightsMoves(start, end) {
//     let squareQueue = [start];
//     return moves(start, end, [start]);

//     function moves(start, end, currentPath) {
//         // while (true) {
//             // let toReturn = null;
//         //     squareQueue.forEach(square => {
//         //         if (square[0] === end[0] && square[1] === end[1]) {
//         //             return currentPath;
//         //         }
//         //     })
//         //     if (toReturn != null) {
//         //         return currentPath;
//         //     }

//         //     let nextMoves = nextPossibleMoves(start);
//         //     nextMoves = getUniqueSquares(nextMoves);
//         //     nextMoves = getValidSquares(nextMoves);
            
//         //     nextMoves.forEach(square => {
//         //     squareQueue.push(square);
//         // })
//         // }

//         if (start[0] === end[0] && start[1] === end[1]) {
//             return currentPath;
//         }
        
//         let nextMoves = nextPossibleMoves(start);
//         nextMoves = getUniqueSquares(nextMoves);
//         nextMoves = getValidSquares(nextMoves);
        
//         nextMoves.forEach(square => {
//             squareQueue.push(square);
//         })
//         let initialSquareQueueSize = squareQueue.length;

//         let toReturn = null;
//         squareQueue.forEach(square => {
//             if (square[0] === end[0] && square[1] === end[1]) {
//                 currentPath.push(square);
//                 toReturn = currentPath;
//             } else {
                
//             }
//         })
//         if (toReturn !== null) {
//             return toReturn;
//         }

//         console.log(squareQueue);
        
//         squareQueue.forEach(square => {
//             let nextMoves = nextPossibleMoves(square);
//             nextMoves = getUniqueSquares(nextMoves);
//             nextMoves = getValidSquares(nextMoves);
//             nextMoves.forEach(next => {
//                 squareQueue.push(next)
//             })
//         })

//         squareQueue = squareQueue.slice(initialSquareQueueSize);
        
//         console.log(squareQueue);
//     }
// }

function nextPossibleMoves(square) {
    let nextMoves = [];
    let x = square[0];
    let y = square[1];

    nextMoves.push([x+2,y+1])
    nextMoves.push([x+2,y-1])
    nextMoves.push([x+1,y+2])
    nextMoves.push([x+1,y-2])
    nextMoves.push([x-1,y+2])
    nextMoves.push([x-1,y-2])
    nextMoves.push([x-2,y+1])
    nextMoves.push([x-2,y-1])

    return nextMoves;
}

//only new squares
function getUniqueSquares(squares) {
    let uniqueSquares = [];
    // console.log(addedSquares);
    squares.forEach(square => {
        let x = square[0];
        let y = square[1];
        if (!addedSquares.includes(10*x + y)) {
            uniqueSquares.push(square);
        } 
    });
    return uniqueSquares;
}

//only squares on board
function getValidSquares(squares) {
    let validSquares = [];
    squares.forEach(square => {
        let x = square[0];
        let y = square[1];
        if (!(x < 0 || y < 0 || x > 7 || y > 7)) {
            validSquares.push(square);
        }
    })
    return validSquares;
}

knightsMoves([0,7], [7,7]);

// console.log(getValidSquares(getUniqueSquares(nextPossibleMoves([1,2]))));