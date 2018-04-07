mainApp.controller("boardController", function($scope) {
   $scope.curPlayer = 'X';
   $scope.board = 
		 [[-1,-1,-1],
		  [-1,-1,-1],
		  [-1,-1,-1]];
   $scope.winner = '';
   $scope.tableVal = 
		[{row:'0',column:[{val:'0'},{val:'1'},{val:'2'}]},
         {row:'1',column:[{val:'0'},{val:'1'},{val:'2'}]},
         {row:'2',column:[{val:'0'},{val:'1'},{val:'2'}]}];
   
   $scope.cellClick = function(event){
	  $scope.disable(event);
	  event.target.textContent = $scope.curPlayer;
	  var cr = event.target.id.split('-');
	  $scope.board[cr[0]][cr[1]] = $scope.curPlayer;
	  if($scope.judge($scope.curPlayer, cr[0], cr[1]))
		  $scope.winner = $scope.curPlayer;
	  
	  
	  if($scope.curPlayer == 'X')
		  $scope.curPlayer = 'O';
	  else
		  $scope.curPlayer = 'X';
   };
   
   $scope.judge = function(player, c, r){
	   for(i=0; i<3; i++){
	      if($scope.board[c][i] != player)
			  break;
		  if(i == 2) return true;
	   }
	   for(i=0; i<3; i++){
	      if($scope.board[i][r] != player)
			  break;
		  if(i == 2) return true;
	   }
	   if(c == r)
		  for(i=0; i<3; i++){
			  if($scope.board[i][i] != player)
				  break;
			  if(i == 2) return true;
	   }
	   if((c==2 && r==0) || (c==0 && r==2) || (c==1 && r==1)){
		   if($scope.board[0][2] != player)return false;
		   if($scope.board[1][1] != player)return false;
		   if($scope.board[2][0] != player)return false;
		   return true;
	   }
	   return false;
   };
   
   $scope.disable = function(event){
	   event.target.disabled = true;
   }
   
   $scope.reset = function(){
	   $scope.winner = '';
	   for(i=0; i<3; i++){
		   for(j=0; j<3; j++){
			   $scope.board[i][j] = -1;
			   var myElement = document.getElementById(i+'-'+j);
			   myElement.disabled = false;
			   myElement.innerHTML = '&nbsp;&nbsp;&nbsp;';
		   }
	   }
   }
});