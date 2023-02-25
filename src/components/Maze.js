function generate(dimensions) {
    /*
        [[""x7],[""x7],[""x7],[""x7],[""x7],[""x7],[""x7]]

        "w" "w" "w" "w" "w" "w" "w" "w"
        "" "" "" "" "" "" "" ""
        "" "" "" "" "" "" "" ""
        "" "" "" "" "" "" "" ""
        "" "" "" "" "" "" "" ""
        "" "" "" "" "" "" "" ""
        "" "" "" "" "" "" "" ""
        
    */
    let grid = []; // 創空陣列
    for (let i = 0; i < dimensions; i++) {
        grid[i] = [];
        for (let j = 0; j < dimensions; j++) {
            grid[i][j] = "";
        }
    }
    addOuterWalls(grid);
    addInnerWalls(true, 1, grid.length - 2, 1, grid.length - 2, grid);
    return grid
}

function addInnerWalls(h, minX, maxX, minY, maxY, grid) {
    if (h) {  // 水平
        if (maxX - minX < 2) { // 停止點
            return;
        }

        let y = Math.floor(randomNumber(minY, maxY)/2)*2; // 切點
        if (y!==0) {
            addHWall(minX, maxX, y, grid);;
        }
        console.log(minX, maxX)
        console.log("y",y)

        addInnerWalls(!h, minX, maxX, minY, y-1, grid);
        addInnerWalls(!h, minX, maxX, y + 1, maxY, grid);
    } else { // 垂直
        if (maxY - minY < 2) { // 停止點
            return;
        }

        let x = Math.floor(randomNumber(minX, maxX)/2)*2; // 切點
        if (x!==0) {
            addVWall(minY, maxY, x, grid);
        }
        console.log(minX, maxX)
        console.log("x",x)

        addInnerWalls(!h, minX, x-1, minY, maxY, grid);
        addInnerWalls(!h, x + 1, maxX, minY, maxY, grid);
    }
}

function addHWall(minX, maxX, y, grid) {
    let hole = Math.floor(randomNumber(minX, maxX)/2)*2+1; // 打洞
    for (let i = minX; i <= maxX; i++) {
        if (i == hole) grid[y][i] = "";
        else grid[y][i] = "w";
    }
}

function addVWall(minY, maxY, x, grid) {
    let hole = Math.floor(randomNumber(minY, maxY)/2)*2+1; // 打洞
    for (let i = minY; i <= maxY; i++) {
        if (i == hole) grid[i][x] = "";
        else grid[i][x] = "w";
    }
}

function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function addOuterWalls(grid) {
    for (let i = 0; i < grid.length; i++) {
        if (i == 0 || i == (grid.length - 1)) {
            // 平行線
            for (let j = 0; j < grid.length; j++) {
                grid[i][j] = "w";
            }
        } else {
            // 垂直線
            grid[i][0] = "w"; // 左
            grid[i][grid.length - 1] = "w"; // 右
        }
    }
}