var board = new Array();
var hasConflicted = new Array();
var score = 0;
$(function () {
    newgame();
});

function newgame() {
    //初始化棋盘格
    init();
    //在随机两个格子生成数字
    generateOneNumber();
    generateOneNumber();
}
function restartgame() {
    $("#gameover").remove();
    updateScore(0);
    newgame();
}
function init() {
    //i表示4乘4的格子中的行
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            var gridCell = $("#grid-cell-" + i + "-" + j);
            gridCell.css("top", getPosTop(i, j));
            gridCell.css("left", getPosLeft(i, j));
        }
    }

    for (var i = 0; i < 4; i++) {
        board[i] = new Array();
        hasConflicted[i] = new Array();
        for (var j = 0; j < 4; j++) {
            board[i][j] = 0;
            hasConflicted[i][j] = false;
        }
    }

    updateBoardView();
    score = 0;
}

function updateBoardView() {
    //首先清空之前的数字格布局内容
    $(".number-cell").remove();
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            //向棋盘格上增加数字格
            $("#grid-container").append("<div class='number-cell' id='number-cell-" + i + "-" + j + "'></div>");
            var numberCell = $("#number-cell-" + i + "-" + j);
            //如果棋盘格的值为0的话,设置数字格为高宽都为0
            if (board[i][j] == 0) {
                numberCell.css("width", "0px");
                numberCell.css("height", "0px");
                numberCell.css("top", getPosTop(i, j) + 100);
                numberCell.css("left", getPosLeft(i, j) + 100);
            }
            //如果棋盘格的值不为0的话,设置数字格为高宽为75并设置背景色和前景色及数字值
            else {
                numberCell.css("width", "100px");
                numberCell.css("height", "100px");
                numberCell.css("top", getPosTop(i, j));
                numberCell.css("left", getPosLeft(i, j));
                numberCell.css("background-color", getNumberBackgroundColor(board[i][j]));
                numberCell.css("color", getNumberColor(board[i][j]));
                numberCell.text(board[i][j]);
            }
            hasConflicted[i][j] = false;
        }
    }
    //设置数字值的字体样式
    $(".number-cell").css("line-height", "100px");
    $(".number-cell").css("font-size", "60px");
}
function generateOneNumber() {
    if (nospace(board)) {
        return false;
    }
    //随机一个x坐标的位置
    var randx = parseInt(Math.floor(Math.random() * 4));
    //随机一个y坐标的位置
    var randy = parseInt(Math.floor(Math.random() * 4));
    //定义一个死循环,完成生成随机空格子
    while (true) {
        //如果当前格子的值为0,满足条件
        if (board[randx][randy] == 0) {
            break;
        }
        //否则重新随机一个位置
        var randx = parseInt(Math.floor(Math.random() * 4));
        var randy = parseInt(Math.floor(Math.random() * 4));
    }

    //随机一个数字
    var randNumber = Math.random() < 0.5 ? 2 : 4;

    //在随机位置显示随机数字
    board[randx][randy] = randNumber;
    //实现随机数字显示的动画
    ShowNumberWithAnimation(randx, randy, randNumber);
    return true;
}

