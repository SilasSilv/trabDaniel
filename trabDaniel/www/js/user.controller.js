angular.module('starter.controllers')

.controller('UserCtrl', function($scope, $ionicModal, $ionicListDelegate) {

	$scope.users = {
		"admin": [],
		"pres":[],
		"cip":[]
	};
	$scope.typeUser = [
		{"code": 1, "name": "Administrador"},
		{"code": 2, "name": "Presidente"},
		{"code": 3, "name": "Cipeiro"}
	];
	$scope.user = {};
	$scope.userTemp = {};
	$scope.sensor = 0;

	$ionicModal.fromTemplateUrl('form_add_user.html', {
	    scope: $scope,
	    animation: 'slide-in-up'
	 }).then(function(modal) {
	    $scope.modal = modal;
	});

  $scope.openModal = function() {
    $scope.modal.show();
  };
  $scope.closeModal = function() {
    $scope.modal.hide();
		clearUser();
  };

	$scope.switchUser = function(user) {
		if ($scope.sensor == 0){
			$scope.saveUser(user);
		} else if ($scope.sensor == 1){
			$scope.editSaveUser(user);
		}
	}

	$scope.saveShowUser = function() {
		$scope.openModal();
		$scope.sensor = 0;
 }

  $scope.saveUser = function(user) {
  	userTemp = angular.copy(user);

  	switch(userTemp.type.code) {
  		case 1:
  			$scope.users.admin.push(userTemp);
  			break;
  		case 2:
  			$scope.users.pres.push(userTemp);
  			break;
  		case 3:
  			$scope.users.cip.push(userTemp);
  			break;
  		default:
  			console.log("O usuário não selecionou nenhum tipo");
  	}

  	$scope.closeModal();
		clearUser();
  }

	$scope.editShowUser = function(userList) {
		$scope.openModal();
		$ionicListDelegate.closeOptionButtons();
		$scope.userTemp = userList;
		$scope.user = angular.copy(userList);
		$scope.sensor = 1;
	}

	$scope.editSaveUser = function(user) {
  	switch(user.type.code) {
  		case 1:
  		case 2:
  		case 3:
				$scope.userTemp.code = user.code;
		  	$scope.userTemp.name = user.name;
		  	$scope.userTemp.password = user.password;
		  	$scope.userTemp.email = user.email;
		  	$scope.userTemp.type = user.type;
  			break;
  		default:
  			console.log("O usuário não selecionou nenhum tipo");
  	}

  	$scope.closeModal();
		clearUser();
  }

	$scope.deleteUser = function(user){
		$ionicListDelegate.closeOptionButtons();
		switch(user.type.code) {
  		case 1:
				index = $scope.users.admin.indexOf(user);
				$scope.users.admin.splice(index, 1);
				break;
  		case 2:
				index = $scope.users.pres.indexOf(user);
				$scope.users.pres.splice(index, 1);
				break;
  		case 3:
				index = $scope.users.cip.indexOf(user);
				$scope.users.cip.splice(index, 1);
  	}
	}

	function clearUser (){
		$scope.user.code = "";
  	$scope.user.name = "";
  	$scope.user.password = "";
  	$scope.user.email = "";
  	$scope.user.type = {};
	}

});
