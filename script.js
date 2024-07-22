let playerText = document.getElementById('gamer_wins');
let restartBtn = document.getElementById('restartBtn');
let boxes = Array.from(document.getElementsByClassName('box'));
let winnerIndicator =getComputedStyle(document.body).getPropertyValue('--winning-blocks');
const O_Text ='O';
const X_Text ='X';
let current_player =X_Text;
let spaces=Array(9).fill(null);
const startgame = () =>
{
    boxes.forEach(box => box.addEventListener('click',boxClicked));
}

function boxClicked(e)
{
    const id = e.target.id;
    if (!spaces[id] && !playerWon())
    {
        spaces[id]=current_player;
        e.target.innerText=current_player;
        if(playerWon() !== false)
        {
            playerText.innerText=`${current_player} has won`;      
            let winning_blocks = playerWon();
            winning_blocks.map(box=> boxes[box].style.backgroundColor=winnerIndicator)
        }
        current_player= current_player == X_Text? O_Text : X_Text
    }
}

restartBtn.addEventListener('click',restart)
function restart()
{
    spaces.fill(null);
    boxes.forEach(box => { box.innerText=''});
    playerText.innerText= 'TIC TAC TOE';
    current_player=X_Text;
}

const winningCombos=[[0,1,2],[3,4,5],[6,7,8],[0,4,8],[2,4,6],[0,3,6],[1,4,7],[2,5,8]];
function playerWon()
{
    for (const condition of winningCombos)
    {
        let [a,b,c] =condition;
        if (spaces[a] && (spaces[a] == spaces[b] && spaces[a]==spaces[c]))
        {
            return [a,b,c]
        }
    }
    return false;
}

startgame()