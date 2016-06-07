var app = angular.module('ahsWelfareApp', ['ui.bootstrap','ngResource','angular-alert-banner']);


app.factory('Registrations', function ($resource) {
    return $resource('api/registrations/:id', {}, {"update": {
            method: 'PUT'
        }});
});

app.controller('ModalDemoCtrl',['$scope','$modal','$log', function ($scope, $modal, $log) {


 $scope.groups = [];


 $scope.open = function () {

	$scope.item = {};
	$scope.item.segmentName = $scope.groups[0];

	 $scope.sessiontopics = [];

    var modalInstance = $modal.open({
      scope : $scope,
      templateUrl: 'myModalContent.html',
      controller: 'ModalInstanceCtrl',
      size: 'lg',
      resolve: {
        item: function () {
          return $scope.item;
        }
      }
    });

    modalInstance.result.then(function () {
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };


}]);

app.controller('ModalInstanceCtrl',['$scope','$modalInstance','item','Registrations','AlertBanner',function ($scope, $modalInstance,item,Registrations,AlertBanner) {
  $scope.item = item;


  $scope.sessionSelected = function() {

	  var result = false;
	  $scope.sessiontopics.forEach(function(topic) {
		  if (topic.selected) {
             result = true;
		  }
	  });

	  return result;

  }

  $scope.ok = function () {

   var sessionsSelected = [];

   $scope.sessiontopics.forEach(function(topic) {
		  if (topic.selected) {
             sessionsSelected.push(topic.name);
		  }
	});
    $scope.item.sessionsSelected = sessionsSelected;


	var registration = new Registrations({
               name : $scope.item.name,
			   productName : $scope.item.productName,
			   segmentName : $scope.item.segmentName,
			   sessionsSelected : $scope.item.sessionsSelected
    });


	registration.$save(function (data) {
		                console.log(data);
						AlertBanner.publish({
							type: 'success',
							message: 'Thank You! Your Registration is complete.'
						});
						$modalInstance.close(data);
					}, function () {
						AlertBanner.publish({
							type: 'error',
							message: 'Opps! Error while registering your data. Please reach out to prashant.dhiwar@gmail.com.'
						});
						console.log('Couldn\'t save receipt data.');
						$modalInstance.close();
	});

    $modalInstance.close();
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
}]);
