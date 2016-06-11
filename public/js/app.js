var app = angular.module('ahsWelfareApp', ['ui.bootstrap','ngResource','angular-alert-banner']);


app.factory('Registrations', function ($resource) {
    return $resource('api/registrations/:id', {}, {"update": {
            method: 'PUT'
        }});
});

app.controller('ModalDemoCtrl',['$scope','$modal','$log', function ($scope, $modal, $log) {
  $scope.item = {};
  $scope.hostels = [{id:1,name:'Sant Dnyaneshwar Boys Govt. Hostel'},{id:2,name:'Sant Janabai Backward class Girls Hostel'},{id:3,name:'Sant Tukaram Backward class Boys Hostel'}];
  $scope.studentsTypes = [{id:1,name:'Alumni'},{id:2,name:'New'}];
  $scope.item.segmentName = $scope.hostels[0].name;//hostels
  $scope.item.studentType= $scope.studentsTypes[0].name;//Alumni-New

 $scope.open = function () {
	 $scope.sessiontopics = [
		{ name: 'Engineering',selected: true},
		{ name: 'Medical',selected: false},
		{ name: 'Art', selected: false},
		{ name: 'Commerce',selected: false},
		{ name: 'Science',selected: false},
		{ name: 'Business Management',selected: false}];

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
   var ok;

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
          studentType:$scope.item.studentType,
          // productName : $scope.item.productName,
          segmentName : $scope.item.segmentName,
          sessionsSelected : $scope.item.sessionsSelected,
          firstName : $scope.item.firstName,
          lastName : $scope.item.lastName,
         //  username : $scope.item.username,
         //  password : $scope.item.password,
          phone:$scope.item.phone,
          email:$scope.item.email,
          dateOfBirth:$scope.item.dateOfBirth,
          occupation:$scope.item.occupation,
          education:$scope.item.education,
          officeAddress:$scope.item.officeAddress,
          officeAcheievements:$scope.item.officeAcheievements
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
               message: 'Opps! Error while registering your data. Please reach out to system administrator.'
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
