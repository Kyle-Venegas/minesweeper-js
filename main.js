const size = 10;
const MINES = 15;
var mines_remaining = MINES;
var game = document.getElementById("game");
var end;

var display = document.createElement("h1");
display.innerHTML = mines_remaining + ' mines remaining';
game.appendChild(display);

function resetButton() {
	var area = document.createElement('div');
	var reset = document.createElement("button");
	area.id = 'reset';
	reset.innerHTML = 'reset';
	area.appendChild(reset);
	game.appendChild(area);
	reset.onclick = function() { clear_board(); };
}

var mines = [];
for (var j = 0; j < size; j++) {
	mines[j] = [];
	for (var i = 0; i < size; i++) {
		mines[j][i] = 0;
	}
}

function addMines() {
	var n = 0;
	while (n < MINES) {
		let y = Math.floor((Math.random()*(size-1)) + 0);
		let x = Math.floor((Math.random()*(size-1)) + 0);
		if (mines[y][x] == 0) {
			mines[y][x] = 1;
		} else if (mines[y][x] == 1) {
			continue;
		} 
		n++;
	}
}

var board = []; //for numbers
for (var j = 0; j < size; j++) {
	board[j] = [];
	for (var i = 0; i < size; i++) {
		board[j][i] = "_";
	}
}

function clear_board() {
	for (var j = 0; j < size; j++) {
		for (var i = 0; i < size; i++) {
			board[j][i] = "_";
			mines[j][i] = 0;
			document.getElementById(j + "," + i).style.backgroundColor = 'white';
			document.getElementById(j + ',' + i).style.color = 'white';
			document.getElementById(j + ',' + i).innerHTML = '';
		}
	}
	end = false;
	mines_remaining = MINES;
	display.innerHTML = mines_remaining + ' mines remaining';
	addMines();
}

function createBoard() {
	var tbl = document.createElement("table");
	var tblBody = document.createElement("tbody");
	tbl.appendChild(tblBody);
	// cell creation
	for (let j = 0; j < size; j++) {
		// tr creation
		var row = document.createElement("tr");
		for (let i = 0; i < size; i++) {
			var cell = document.createElement("td");
			cell.id = j + "," + i;
			cell.addEventListener('click', function() { reveal(j, i, false); });
			cell.addEventListener('contextmenu', function(event) {
				reveal(j, i, true);
				event.preventDefault(); }, false);
			cell.style.backgroundColor = 'white';
			row.appendChild(cell);
		}
	tblBody.appendChild(row);
	} game.appendChild(tbl);
}

function reveal(j, i, flag) {
	if (end) {
		return;
	}
	if (flag) {
		if (board[j][i] == '_') {
			board[j][i] = 'f';
			document.getElementById(j + "," + i).style.backgroundColor = '#DC564E';
			mines_remaining--;
			display.innerHTML = mines_remaining + ' mines remaining';
		} else if (board[j][i] == 'f') {
			board[j][i] = '_';
			document.getElementById(j + "," + i).style.backgroundColor = 'white';
			mines_remaining++;
			display.innerHTML = mines_remaining + ' mines remaining';
		}
	} else {
		if (mines[j][i] == 0 && board[j][i] != 'f') {
			document.getElementById(j + "," + i).style.backgroundColor = '';
			free_space(j, i);
		} if (mines[j][i] && board[j][i] != 'f') {
			for (var j = 0; j < size; j++) {
				for (var i = 0; i < size; i++) {
					if (mines[j][i]) {
						document.getElementById(j + ',' + i).style.backgroundColor = '';
						document.getElementById(j + ',' + i).innerHTML = 'X';
						document.getElementById(j + ',' + i).style.color = 'red';
						end = true;
					}
				}
			} display.innerHTML = 'You lost';
		}
	}
	win();
}

function free_space(j, i) {
	if (mines[j][i] || board[j][i] != '_') {
		return;
	} if (board[j][i] != '_') {
		return;
	}

	board[j][i] = numbers(j, i);
	document.getElementById(j + ',' + i).innerHTML = board[j][i];
	document.getElementById(j + ',' + i).style.backgroundColor = '';
	if (board[j][i] == 0) {
		document.getElementById(j + ',' + i).innerHTML = '';
	}

	if (numbers(j, i) > 0) {
		return;
	}

	if (i == 0) {
		if (j == 0) {
			for (var y = 0; y <= 1; y++) {
				for (var x = 0; x <= 1; x++) {
					if (y == 0 && x == 0) {
					  continue;
					} free_space(j + y, i+ x);
				} 
			}
		} else if (j == size - 1) {
			for (var y = -1; y <= 0; y++) {
				for (var x = 0; x <= 1; x++) {
					if (y == 0 && x == 0) {
						continue;
					} free_space(j + y, i+ x);
				}
			}
		} else {
			for (var y = -1; y <= 1; y++) {
				for (var x = 0; x <= 1; x++) {
					if (y == 0 && x == 0) {
						continue;
					} free_space(j + y, i+ x);
				}
			}
		}
	} else if (i == size - 1) {
		if (j == 0) {
			for (let y = 0; y <= 1; y++) {
				for (let x = -1; x <= 0; x++) {
					if (y == 0 && x == 0) {
					  continue;
					} free_space(j + y, i+ x);
				} 
			}
		} else if (j == size - 1) {
			for (var y = -1; y <= 0; y++) {
				for (var x = -1; x <= 0; x++) {
					if (y == 0 && x == 0) {
						continue;
					} free_space(j + y, i+ x);
				}
			}
		} else {
			for (var y = -1; y <= 1; y++) {
				for (var x = -1; x <= 0; x++) {
					if (y == 0 && x == 0) {
						continue;
					} free_space(j + y, i+ x);
				}
			}
		}
	}

	else if (j == 0) {
		for (var y = 0; y <= 1; y++) {
			for (var x = -1; x <= 1; x++) {
				if (y == 0 && x == 0) {
					continue;
				} free_space(j + y, i+ x);
			}
		}
	} else if (j == size - 1) {
		for (var y = -1; y <= 0; y++) {
			for (var x = -1; x <= 1; x++) {
				if (y == 0 && x == 0) {
					continue;
				} free_space(j + y, i+ x);
			}
		}
	}

	else {
		for (var y = -1; y <= 1; y++) {
			for (var x = -1; x <= 1; x++) {
				if (y == 0 && x == 0) {
					continue;
				} free_space(j + y, i+ x);
			}
		}
	}
}

function numbers(j, i) {
	let n = 0;
	if (i == 0) {
		if (j == 0) {
			for (let y = 0; y <= 1; y++) {
				for (let x = 0; x <= 1; x++) {
					if (y == 0 && x == 0) {
					  continue;
					} if (mines[j+y][i+x]) {
						n++;
					}
				} 
			}
		} else if (j == size - 1) {
			for (var y = 0; y >= -1; y--) {
				for (var x = 0; x <= 1; x++) {
					if (y == 0 && x == 0) {
						continue;
					} if (mines[j+y][i+x]) {
						n++;
					}
				}
			}
		} else {
			for (var y = -1; y <= 1; y++) {
				for (var x = 0; x <= 1; x++) {
					if (y == 0 && x == 0) {
						continue;
					} if (mines[j+y][i+x]) {
						n++;
					}
				}
			}
		}
	} else if (i == size - 1) {
		if (j == 0) {
			for (let y = 0; y <= 1; y++) {
				for (let x = -1; x <= 0; x++) {
					if (y == 0 && x == 0) {
					  continue;
					} if (mines[j+y][i+x]) {
						n++;
					}
				} 
			}
		} else if (j == size - 1) {
			for (var y = -1; y <= 0; y++) {
				for (var x = -1; x <= 0; x++) {
					if (y == 0 && x == 0) {
						continue;
					} if (mines[j+y][i+x]) {
						n++;
					}
				}
			}
		} else {
			for (var y = -1; y <= 1; y++) {
				for (var x = -1; x <= 0; x++) {
					if (y == 0 && x == 0) {
						continue;
					} if (mines[j+y][i+x]) {
						n++;
					}
				}
			}
		}
	} 

	else if (j == 0) {
		for (var y = 0; y <= 1; y++) {
			for (var x = -1; x <= 1; x++) {
				if (y == 0 && x == 0) {
					continue;
				} if (mines[j+y][i+x]) {
					n++;
				}
			}
		}
	} else if (j == size - 1) {
		for (var y = -1; y <= 0; y++) {
			for (var x = -1; x <= 1; x++) {
				if (y == 0 && x == 0) {
					continue;
				} if (mines[j+y][i+x]) {
					n++;
				}
			}
		}
	}

	else {
		for (var y = -1; y <= 1; y++) {
			for (var x = -1; x <= 1; x++) {
				if (y == 0 && x == 0) {
					continue;
				} if (mines[j+y][i+x]) {
					n++;
				}
			}
		}
	}
	return n;
}
	
function win() {
	n = 0;
	for (var y = 0; y < size; y++) {
		for (var x = 0; x < size; x++) {
			if (board[y][x] == '_') {
				break;
			} if (board[y][x] == 'f' && mines[y][x]) {
				n++;
				if (n == MINES) {
					display.innerHTML = 'You win';
					end = true;
				}
			}
		}
	}
}

createBoard();
addMines();
resetButton();
